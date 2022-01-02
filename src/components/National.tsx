import React, { useState, useEffect } from "react";
import { CovidData } from "../api/api";
import { NationalSummary } from "../api/apiInterfaces";
import Card from "./Card/Card";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// format a string to change the underscore to a space
function formatString(str: string) {
  return str.replace(/_/g, " ");
}

// format a number to add commas
function formatNumber(num: string) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function selectTimeline(arr: any, num: number) {
  return arr.slice(-num);
}

function movingAverage(arr: any, num: number) {
  let sum = 0;
  let avg = [];
  for (let i = 0; i < arr.length; i++) {
    if (i < num) {
      sum += arr[i];
      avg.push(sum / (i + 1));
    } else {
      sum += arr[i];
      sum -= arr[i - num];
      avg.push(sum / num);
    }
  }
  return avg;
}

export const National = () => {
  const [nationalSummary, setNationalSummary] = useState<NationalSummary[]>([]);
  const [timeseries, setTimeseries] = useState<any>([]);
  const [timeline, setTimeline] = useState<any>(0);
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    CovidData.getSummary()
      .then((res) => {
        setNationalSummary(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {};
  }, []);

  useEffect(() => {
    CovidData.getNationalTimeseries()
      .then((res) => {
        setTimeseries(res.data);
        setTimeline(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {};
  }, []);
  //   cases, deaths, hospitalized, recovered, tests, doses

  let x = timeseries.map((x: any) => x.change_cases);
  let arr = movingAverage(x, 7);
  let arr2 = arr.map((x: any) => parseInt(x.toFixed(0)));
  let timeseries2 = timeseries.map((x: any, i: number) => {
    return {
      ...x,
      moving_average: arr2[i],
    };
  });
  let arr3 = timeseries.map((x: any) => x.change_criticals);
  console.log(arr3)
  return (
    <>
      {nationalSummary.length > 0
        ? nationalSummary.map((item) => (
            <div
              key={item.latest_date}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h3>Updated: {item.latest_date}</h3>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <Card
                  total={item.total_cases}
                  type={"cases"}
                  change={item.change_cases}
                />

                <Card
                  total={item.total_fatalities}
                  type={"deaths"}
                  change={item.change_fatalities}
                />
                <Card
                  total={item.total_hospitalizations}
                  type={"hospitalized"}
                  change={item.change_hospitalizations}
                />
                {/* <Card
                  total={item.total_recoveries}
                  type={"recovered"}
                  change={item.change_recoveries}
                /> */}
                <Card
                  total={item.total_tests}
                  type={"tests"}
                  change={item.change_tests}
                />
                <Card
                  total={item.total_vaccinations}
                  type={"vaccinations"}
                  change={item.change_vaccinations}
                />
              </div>
              <div
                style={{ backgroundColor: "whitesmoke", borderRadius: "10px" }}
              >
                <h2>National Cases</h2>
                <h4>
                  Timeline: {timeline > 365 ? "All Time" : timeline + " days"}
                </h4>
                <div>
                  <button onClick={() => setTimeline(90)}>3 months</button>
                  <button onClick={() => setTimeline(180)}>6 months</button>
                  <button onClick={() => setTimeline(365)}>12 months</button>
                  <button onClick={() => setTimeline(timeseries.length)}>
                    all time
                  </button>
                </div>
                <ResponsiveContainer>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <LineChart
                      width={1000}
                      height={400}
                      data={selectTimeline(timeseries2, timeline)}
                      margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                    >
                      <Line
                        type="monotone"
                        dataKey="change_cases"
                        stroke="#8884d8"
                        dot={false}
                        strokeWidth={3}
                      />
                      {/* <Line type="monotone" dataKey="change_cases" stroke="#FFA500" dot={false}  strokeWidth={1}   /> */}
                      <Line
                        type="monotone"
                        dataKey="total_hospitalizations"
                        stroke="#FFA500"
                        dot={false}
                        strokeWidth={3}
                      />
                      <CartesianGrid stroke="#ccc" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                    </LineChart>
                  </div>
                </ResponsiveContainer>
              </div>
            </div>
          ))
        : null}
    </>
  );
};
