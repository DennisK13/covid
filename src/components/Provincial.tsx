import { useState, useEffect } from "react";
import Card from "./Card/Card";
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
  data?: any;
  timeseries?: any;
  setTimeseries?: any;
  healthUnit?: any;
  aspect: number;
  provinceData?: any;
  setProvinceName?: any;
  provinceName?: any;
  setProvinceData?: any;
}
function movingAverage(arr: any, n: number) {
  let movingAverage = [];
  let movingSum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (i < n) {
      movingSum += arr[i];
      movingAverage.push((movingSum / (i + 1)).toFixed(2));
    } else {
      movingSum += arr[i];
      movingSum -= arr[i - n];
      movingAverage.push((movingSum / n).toFixed(2));
    }
  }
  return movingAverage;
}
const Provincial = (props: Props) => {
  const {
    data,
    timeseries,
    healthUnit,
    aspect,
    provinceData,
    provinceName,
    setProvinceData,
    setProvinceName,
  } = props;
  const [timeline, setTimeline] = useState<number>(90);
  const [province, setProvince] = useState<any>([]);

  useEffect(() => {
    if (data.length > 0) {
      let provinceData = data.filter(
        (x: any) => x.name !== "Canada" && x.name !== "Repatriated travellers"
      );
      let province = provinceData.filter((x: any) => x.name === provinceName);
      setProvinceData(province);
    }

    if (timeseries.length > 0) {
      let filtered = timeseries.filter((x: any) => x.name === provinceName);
      filtered = filtered.slice(-timeline);
      let temp = filtered.map((x: any) => x.cases);
      let moving = movingAverage(temp, 7);
      let temp2 = filtered.map((x: any) => x.deaths);
      let moving2 = movingAverage(temp2, 7);
      let tempProvince = filtered.map((x: any, i: number) => ({
        ...x,
        moving: moving[i],
        moving_deaths: parseInt(moving2[i]),
      }));
      setProvince(tempProvince);
    }

  }, [provinceName, data, timeline]);

  return data.length > 0 ? (
    <div>
      <div style={{ border: "2px solid black" }} className="center">
        <div>
          <h4>Provincial</h4>
          <select
            value={provinceName}
            onChange={(e) => setProvinceName(e.target.value)}
          >
            {data
              .filter(
                (x: any) =>
                  x.name !== "Canada" && x.name !== "Repatriated travellers"
              )
              .map((item: any, i: number) => (
                <option key={i} value={item.name}>
                  {item.name}
                </option>
              ))}
          </select>

          {provinceData.map((item: any, i: number) => (
            <div key={i}>
              <div className="row center">
                <Card
                  total={item.totalCases}
                  type={"cases"}
                  change={item.cases}
                />
                <Card
                  total={item.totalDeaths}
                  type={"deaths"}
                  change={item.deaths}
                />
                <Card
                  total={item.totaltested}
                  type={"tested"}
                  change={item.tested}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="chart center">
          <div className="column">
            <p>Cases</p>
            <div>
              <ResponsiveContainer width="100%" aspect={aspect}>
                <LineChart width={700} height={500} data={province}>
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
          <div className="column">
            <p>Deaths</p>
            <div>
              <ResponsiveContainer width="100%" aspect={aspect}>
                <LineChart width={700} height={500} data={province}>
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
                    dataKey={"moving_deaths"}
                    name="Moving Average Deaths"
                    stroke="darkred"
                    fill="red"
                    dot={false}
                    strokeWidth={2}
                    type={"monotone"}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div>
          <div className="row center" style={{ padding: "25px" }}>
            <button
              onClick={() => {
                setTimeline(90);
              }}
              style={{
                backgroundColor: timeline === 90 ? "red" : "gray",
                color: "white",
                minWidth: "80px",
                minHeight: "25px",
              }}
            >
              3 months
            </button>
            <button
              onClick={() => setTimeline(180)}
              style={{
                backgroundColor: timeline === 180 ? "red" : "gray",
                color: "white",
                minWidth: "80px",
                minHeight: "25px",
              }}
            >
              6 months
            </button>
            <button
              onClick={() => setTimeline(365)}
              style={{
                backgroundColor: timeline === 365 ? "red" : "gray",
                color: "white",
                minWidth: "80px",
                minHeight: "25px",
              }}
            >
              12 months
            </button>
            <button
              onClick={() => setTimeline(0)}
              style={{
                backgroundColor: timeline === 0 ? "red" : "gray",
                color: "white",
                minWidth: "80px",
                minHeight: "25px",
              }}
            >
              All Time
            </button>
          </div>
          {/* <div>{timeline === 0 ? "All Time" : timeline + " days"}</div> */}
        </div>
      </div>
    </div>
  ) : (
    <div>Loading</div>
  );
};

export default Provincial;
