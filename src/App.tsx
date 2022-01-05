
import axios from "axios";
import React, { useEffect, useContext, useState } from "react";

import './App.css'
import { National } from "./components/National";
import Provincial from "./components/Provincial";

function App() {
  const [provinces, setProvinces] = useState([]);
  const [national, setNational] = useState([]);
  useEffect(() => {
    getAll(setProvinces, setNational);
  }, []);
  document.title = "COVID-19 Canada";
  return (
    provinces.length > 0 && national.length > 0 ? (
      <div className="App">
      <h1>Canada Covid-19</h1>
      {/* <National /> */}
      {/* <Provincial provinces={provinces} /> */}
      <div style={{display:'flex', justifyContent:'center'}}>
      <pre>{JSON.stringify(national, null, 2)}</pre>
      <pre>{JSON.stringify(provinces, null, 2)}</pre>
      </div>

    </div>
    ) : (
      <div>Loading... </div>
    )

  );
}


const getAll = (setProvinces:React.Dispatch<React.SetStateAction<never[]>>, setNational:React.Dispatch<React.SetStateAction<never[]>>) => {
  let url = 'https://canada-covid19.herokuapp.com/'
  let provinceurl = 'https://canada-covid19.herokuapp.com/ontario'
  axios.get(url).then(res => {
    setNational(res.data)
  })
  axios.get(provinceurl).then(res => {
    setProvinces(res.data)
  })
}

export default App;
