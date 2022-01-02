
import axios from "axios";
import React, { useEffect, useContext, useState } from "react";

import './App.css'
import { National } from "./components/National";
import Provincial from "./components/Provincial";

function App() {
  const [provinces, setProvinces] = useState([]);
  useEffect(() => {
    getAll(setProvinces);
  }, []);
  document.title = "COVID-19 Canada";
  return (
    provinces.length > 0 ? (
      <div className="App">
      <h1>Canada Covid-19</h1>
      <National />
      <Provincial provinces={provinces} />
    </div>
    ) : (
      <div>Loading...</div>
    )

  );
}


const getAll = (setProvinces:React.Dispatch<React.SetStateAction<never[]>>) => {
  let url = 'https://api.covid19tracker.ca/provinces'
  axios.get(url).then(res => {
    setProvinces(res.data.slice(0, 13))
  })
}

export default App;
