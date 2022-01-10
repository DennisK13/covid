import React, { useState, useEffect } from "react";
import Card from "./Card/Card";
import { Local } from "./Local";
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
  const { data, timeseries, healthUnit } = props;
  const [timeline, setTimeline] = useState(90);
  const [provinceData, setProvinceData] = useState<any>([]);
  const [provinceName, setProvinceName] = useState<any>("Ontario");
  const [unit, setUnit] = useState<any>("");
  const [province, setProvince] = useState<any>([]);

  useEffect(() => {
    if (data.length > 0) {
      let provinceData = data.filter((x: any) => x.name !== "Canada" && x.name !== "Repatriated travellers")
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
    if (healthUnit.length > 0) {
      setUnit(healthUnit.filter((x: any) => x.province === provinceName));
    }
  }, [provinceName, data, timeline]);

  return data.length > 0 ? (
    <div style={{ width: "100%", border: "2px solid black" }}>
      <div>
        <h5>Provincial</h5>
        <select
          value={provinceName}
          onChange={(e) => setProvinceName(e.target.value)}
        >
          {data.map((item: any, i: number) => (
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
            <div className="row center" style={{ marginTop: "25px" }}>
              <button onClick={() => setTimeline(90)}>3 months</button>
              <button onClick={() => setTimeline(180)}>6 months</button>
              <button onClick={() => setTimeline(365)}>12 months</button>
              <button onClick={() => setTimeline(0)}>All Time</button>
            </div>
            <div>{timeline === 0 ? "All Time" : timeline + " days"}</div>
          </div>
        ))}
      </div>
      <div className="row center">
        <div style={{ width: "45%" }}>
          <p>Cases</p>
          <div className="row" style={{ margin: "20px" }}>
            <ResponsiveContainer width="100%" aspect={1}>
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
                <Line
                  dataKey={"moving"}
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
        <div style={{ width: "45%" }}>
          <p>Deaths</p>
          <div className="row" style={{ margin: "20px" }}>
            <ResponsiveContainer width="100%" aspect={1}>
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
                  stroke="red"
                  dot={false}
                  strokeWidth={2}
                  type={"monotone"}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <Local healthUnits={unit} name={provinceName} />
    </div>
  ) : (
    <div>Loading</div>
  );
};

export default Provincial;
