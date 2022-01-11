import React, { useState, useEffect } from "react";
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
interface Props {
  healthUnits?: any;
}
const everyNth = (arr: Array<any>, nth: number) =>
  arr.filter((e, i) => i % nth === nth - 1);

export const Local = (props: Props) => {
  const { healthUnits } = props;
  const [region, setRegion] = useState<any>("Algoma");
  const [timeseries, setTimeseries] = useState([]);
  const [recent, setRecent] = useState<any>(null);
  const [regionNames, setRegionNames] = useState<any>([]);

  useEffect(() => {
    if (healthUnits.length > 0) {
      let temp = everyNth(healthUnits, 7);
      temp = temp.filter((x: any) => x.health_region !== "Not Reported");
      temp = temp.map((x: any) => x.health_region);
      setRegionNames(temp);
      setRegion(temp[0]);
      let selected = healthUnits.filter(
        (item: any) => item.health_region === region
      );
      setTimeseries(selected);
      setRecent(selected[selected.length - 1]);
    }
  }, [healthUnits]);

  useEffect(() => {
    if (healthUnits.length > 0) {
      let selected = healthUnits.filter(
        (item: any) => item.health_region === region
      );
      setTimeseries(selected);
      setRecent(selected[selected.length - 1]);
    }
  }, [region]);

  return healthUnits.length > 0 ? (
    <>
      <div>
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
            <div className="">
              <Card
                total={(recent.totalCases)}
                type={"cases"}
                change={formatNumber(recent.cases)}
              />
              <Card
                total={formatNumber(recent.numtotal_last7)}
                type={"total weekly cases"}
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
                type={"total weekly deaths"}
                change={recent.avgdeaths_last7}
                today={true}
              />
            </div>
            <div className="row" style={{ margin: "20px", width: "75%" }}>
              <ResponsiveContainer width="100%" aspect={3}>
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
                  <Line
                    dataKey={"avgtotal_last7"}
                    name="Moving Average Cases"
                    stroke="#FFA500"
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
    </>
  ) : null;
};

function formatNumber(num: string | number) {
  if (num === null) {
    return "null";
  }
  if (typeof num === "string") {
    num = parseInt(num);
  }
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
