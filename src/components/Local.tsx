import { useState, useEffect } from "react";
import Card from "../components/Card/Card";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
} from "recharts";
import { useWindowSize } from "../hooks/useWindowSize";

interface Props {
  healthUnit?: any;
  aspect: any;
  provinceName?: any;
}

export const Local = (props: Props) => {
  const { healthUnit, aspect, provinceName } = props;
  const [region, setRegion] = useState<any>("Algoma");
  const [timeseries, setTimeseries] = useState([]);
  const [recent, setRecent] = useState<any>(null);
  const [regionNames, setRegionNames] = useState<any>([]);
  const [unit, setUnit] = useState<any>("");
  const windowSize = useWindowSize();
  console.log(provinceName)
  useEffect(() => {
    if (healthUnit.length > 0) {
      setUnit(healthUnit.filter((x: any) => x.province === provinceName));
    }
  }, [provinceName]);

  useEffect(() => {
    if (unit.length > 0) {
      console.log(unit);
      let temp = everyNth(unit, 7);
      temp = temp.filter((x: any) => x.health_region !== "Not Reported");
      temp = temp.map((x: any) => x.health_region);
      setRegionNames(temp);
      setRegion(temp[0]);
      let selected = unit.filter(
        (item: any) => item.health_region === region
      );
      setTimeseries(selected);
      setRecent(selected[selected.length - 1]);
    }
  }, [unit, provinceName]);

  useEffect(() => {
    if (healthUnit.length > 0) {
      
      let selected = healthUnit.filter(
        (item: any) => item.health_region === region
      );
      setTimeseries(selected);
      setRecent(selected[selected.length - 1]);
    }
  }, [region]);

  useEffect(() => {}, [windowSize]);

  return healthUnit.length > 0 ? (
    <div>
      <div style={{ border: "2px black solid" }}>
        <h5>Local: Last 7 days</h5>
        <select onChange={(e) => setRegion(e.target.value)} value={region}>
          {regionNames.map((x: any, i: number) => (
            <option key={i} value={x}>
              {x}
            </option>
          ))}
        </select>
        {recent ? (
          <div className="row center">
            <div
              className={
                windowSize?.width !== undefined && windowSize.width < 1100
                  ? "row center"
                  : "row center"
              }
            >
              <Card
                total={recent.totalCases}
                type={"cases"}
                change={formatNumber(recent.cases)}
              />
              <Card
                total={formatNumber(recent.numtotal_last7)}
                type={"weekly cases"}
                change={formatNumber(recent.avgtotal_last7)}
                today={true}
              />
              <Card
                total={recent.totalDeaths}
                type={"deaths"}
                change={recent.deaths}
              />
              <Card
                total={recent.numdeaths_last7}
                type={"weekly deaths"}
                change={recent.avgdeaths_last7}
                today={true}
              />
            </div>
            <div
              className="chart center"
              style={{
                width:
                  windowSize?.width !== undefined && windowSize.width < 1100
                    ? "100%"
                    : "100%",
              }}
            >
              <ResponsiveContainer width="100%" aspect={2}>
                <LineChart width={700} height={500} data={timeseries}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={true}
                    vertical={false}
                  />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend verticalAlign="top" />

                  <Line
                    dataKey={"cases"}
                    name="Cases"
                    fill="#8884d8"
                    dot={false}
                    strokeWidth={2}
                    type={"monotone"}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  ) : null;
};

function formatNumber(num: string | number) {
  if (num === null) {
    return "null";
  } else if (typeof num === "string") {
    num = parseInt(num);
  }
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const everyNth = (arr: Array<any>, nth: number) =>
  arr.filter((e, i) => i % nth === nth - 1);
