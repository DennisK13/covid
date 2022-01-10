import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faVirus } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import { National } from "./components/National";
import Provincial from "./components/Provincial";

// create a function for seven day moving average

function App() {
  // const [provinces, setProvinces] = useState([]);
  const [national, setNational] = useState<any>([]);
  const [timeseries, setTimeseries] = useState<any>([]);

  const [summary, setSummary] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [healthUnit, setHealthUnit] = useState<any>([]);

  useEffect(() => {
    var requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://sheets.googleapis.com/v4/spreadsheets/15A3xx5H9nt36JmJX5S6NpGgyVtzKDYifJt2rn05Jb8g/values/AllTimeseries?key=AIzaSyCoeJxmBR8fmBoFpaisChI0SlLMBH2nlcY",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setNational(result))
      .catch((error) => console.log("error", error));

    fetch(
      "https://sheets.googleapis.com/v4/spreadsheets/15A3xx5H9nt36JmJX5S6NpGgyVtzKDYifJt2rn05Jb8g/values/Summary?key=AIzaSyCoeJxmBR8fmBoFpaisChI0SlLMBH2nlcY",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setSummary(result))
      .catch((error) => console.log("error", error));

      fetch(
        "https://sheets.googleapis.com/v4/spreadsheets/15A3xx5H9nt36JmJX5S6NpGgyVtzKDYifJt2rn05Jb8g/values/Sheet10?key=AIzaSyCoeJxmBR8fmBoFpaisChI0SlLMBH2nlcY",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => setHealthUnit(result['values']))
        .catch((error) => console.log("error", error));
    return () => {};
  }, []);

  useEffect(() => {
    if (summary["values"].length > 0 && national["values"].length > 0 && healthUnit.length > 0) {
      let values = summary["values"].map((x: any) => {
        return {
          id: x[0],
          name: x[1],
          date: x[2],
          cases: x[3],
          totalCases: x[4],
          active: x[5],
          totaltested: x[6],
          tested: x[7],
          totalDeaths: x[8],
          deaths: x[9],
        };
      });
      let healthRegions = healthUnit.map((x: any) => {
        return {
          province: x[0],
          health_region: x[1],
          date: x[2],
          cases: parseInt(x[3]),
          totalCases: x[4],
          deaths: x[5],
          totalDeaths: x[6],
          numtotal_last14: x[7],
          numdeaths_last14: (x[8]),
          numtotal_last7: (x[9]),
          numdeaths_last7: parseInt(x[10]),
          avgtotal_last7: parseInt(x[11]).toFixed(0),
          avgdeaths_last7: x[12],
        };
      });
      let nationalValues = national["values"].map((x: any) => {
        return {
          id: x[0],
          name: x[1],
          date: x[2],
          cases: parseInt(x[3]),
          totalCases: x[4],
          active: parseInt(x[5]),
          totalTested: x[6],
          tested: x[7],
          totalDeaths: x[8],
          deaths: parseInt(x[9]),
        };
      });
      nationalValues.shift();
      nationalValues.shift();
      values.shift();
      values.shift();
      healthRegions.shift();
      setTimeseries(nationalValues);
      setData(values);
      setHealthUnit(healthRegions);
    }
  }, [summary, national]);

  document.title = "COVID-19 Canada";

  return data.length > 0 ? (
    <div className="App">
      <h1>
        Canada Covid-19 <FontAwesomeIcon icon={faVirus} color="darkred" />
      </h1>

      <National data={data} />
      <div className="row center" style={{ padding: "35px" }}>
        <Provincial data={data} timeseries={timeseries} healthUnit={healthUnit} />
      </div>
    </div>
  ) : (
    <div style={{textAlign:'center'}}>Loading... </div>
  );
}

export default App;
