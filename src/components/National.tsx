import Card from "./Card/Card";
import { useState, useEffect } from "react";
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

export const National = ({ data, timeseries, aspect }: any) => {
  const [timeline, setTimeline] = useState(90);
  const [nationalChart, setNationalChart] = useState<any>([]);

  let canada = data.filter((item: any) => item.name === "Canada");
  let chart = timeseries.filter((item: any) => item.name === "Canada");
  let moving_deaths = movingAverage(
    chart.map((x: any) => x.deaths),
    7
  );

  chart = chart.map((x: any, i: number) => ({
    ...x,
    moving_deaths: parseInt(moving_deaths[i]),
  }));

  useEffect(() => {
    setNationalChart(chart.slice(-timeline));
  }, [timeline]);

  return (
    <div style={{ border: "2px black solid" }}>
      <div>
        {canada.map((item: any, i: number) => (
          <div key={i}>
            <div>
              <h4>National</h4>
              <h5>Date Updated: {item.date}</h5>
            </div>
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
          <ResponsiveContainer width="100%" aspect={aspect}>
            <LineChart data={nationalChart}>
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={true}
                vertical={false}
              />
              <XAxis dataKey="date" />
              <YAxis width={50} />
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

        <div className="column">
          <ResponsiveContainer width="100%" aspect={aspect}>
            <LineChart width={700} data={nationalChart}>
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={true}
                vertical={false}
              />
              <XAxis dataKey="date" />
              <YAxis width={50} />
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
    </div>
  );
};

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
