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
  Area,
  AreaChart
} from "recharts";
// function that removes commas from numbers
const removeCommas = (num: any) => {
  return num.toString().replace(/,/g, "");
};
export const National = ({ data,timeseries }: any) => {
  let canada = data.filter((item: any) => item.name === "Canada");
  let chart = timeseries.filter((item: any) => item.name === "Canada")
  return (
    <div style={{border:'2px black solid' }}>
    <div >
      {canada.map((item: any, i:number) => (
        <div key={i}>
          <div>
            <h4>National</h4>
            <h5>Date Updated: {item.date}</h5>
          </div>
          <div className="row center">
            <Card total={item.totalCases} type={"cases"} change={item.cases} />
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
      <div >
      <div className="row center">
      
          <div className="row center" style={{ margin: "20px",width: "80%" }}>
            <ResponsiveContainer width="100%" aspect={3}>
            <LineChart width={700} height={500} data={chart}>
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
      </div>
    </div>
  );
};
