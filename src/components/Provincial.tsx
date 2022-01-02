import React, { useState, useEffect } from "react";
import { ProvinceData } from "../api/apiInterfaces";
import { CovidData } from "../api/api";
import Card from "./Card/Card";
import { LineChart , Line } from 'recharts';
import { Local } from "./Local";
interface Props {
  provinces: any;
}

const Provincial = (props: Props) => {
  const { provinces } = props;
  const [provincialSummary, setProvincialSummary] = useState<ProvinceData[]>(
    []
  );
  const [selected, setSelected] = useState<string>("0");
  const [regionIndex, setRegionIndex] = useState<number>(0);
  const [regions, setRegion] = useState<any>([]);
  const [unitID, setUnitID] = useState<string>("3526");
  const [healthUnits, setHealthUnits] = useState<any>([]);
  const [selectedHealthRegion, setSelectedHealthRegion] = useState<any>([]);

  useEffect(() => {
    CovidData.getAllProvinces()
      .then((res) => {
        setProvincialSummary(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    CovidData.getHealthUnits()
      .then((res) => {
        setHealthUnits(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {};
  }, []);

  useEffect(() => {
    if (provincialSummary.length > 0) {
      CovidData.getRegions(provincialSummary[parseInt(selected)].province)
        .then((res) => {
          setRegion(res);
        })
        .catch((err) => {
          console.log(err);
        });

      return () => {};
    } else {
      CovidData.getRegions("ON")
        .then((res) => {
          setRegion(res);
        })
        .catch((err) => {
          console.log(err);
        });
      return () => {};
    }
  }, [selected]);

  useEffect(() => {
    if (regions.length > 0 && provincialSummary.length > 0) {
      if (regions[regionIndex] !== undefined) {
        setUnitID(regions[regionIndex].hr_uid);
      } else {
        setUnitID(regions[0].hr_uid);
      }
    }
  }, [regions]);

  useEffect(() => {
    setSelectedHealthRegion(
      healthUnits.filter((unit: any) => unit.hr_uid == unitID)
    );
  }, [unitID, healthUnits]);
  return (
    <>
      {provincialSummary.length > 0 ? (
        <div style={{margin: 20}}>
            <div style={{display:'flex', justifyContent:'space-around'}}>
            <div style={{flexDirection:'column'}}>
            <h5>Provinces:</h5>
            <select
            onChange={(e) => {
              setSelected(e.target.value);
            }}
          >
            {provinces.map((item:any) => (
              <option key={item.id-1} value={item.id-1}>
                {item.name}
              </option>
            ))}
          </select>
          <h5>{provinces[parseInt(selected)].name} <span style={{color: provinces[parseInt(selected)].data_status !== 'Reported' ? 'red' : 'green'}}>{provinces[parseInt(selected)].data_status !== "Reported" ? " - Not Yet Submitted" : " - Reported"}</span></h5>
            <Card
              total={provincialSummary[parseInt(selected)][
                "total_cases"
              ]}
              type="cases"
              change={provincialSummary[parseInt(selected)][
                "change_cases"
              ]}
            />
            <Card
              total={provincialSummary[parseInt(selected)][
                "total_fatalities"
              ]}
              type="deaths"
              change={provincialSummary[parseInt(selected)][
                "change_fatalities"
              ]}
            />
            <Card
              total={provincialSummary[parseInt(selected)][
                "total_hospitalizations"
              ]}
              type="hospitalized"
              change={provincialSummary[parseInt(selected)][
                "change_hospitalizations"
              ]}
            />
            <Card
              total={provincialSummary[parseInt(selected)][
                "total_recoveries"
              ]}
              type="recovered"
              change={provincialSummary[parseInt(selected)][
                "change_recoveries"
              ]}
            />
            <Card
              total={provincialSummary[parseInt(selected)][
                "total_tests"
              ]}
              type="tests"
              change={provincialSummary[parseInt(selected)][
                "change_tests"
              ]}
            />
          </div>
          <div >
          <div>
            <h5>Regions:</h5>
            <select
              onChange={(e) => {
                setUnitID(e.target.value);
                setRegionIndex(e.target.selectedIndex);
              }}
              style={{width:250}}
            >
              {regions.map((item: any, i: number) => (
                <option key={i} value={item.hr_uid}>
                  {item.engname}
                </option>
              ))}
            </select>
          </div>
          <Local healthUnits={selectedHealthRegion} name={regions[regionIndex]}/>
          </div>
          </div>
             
        </div>
      ) : null}
    </>
  );
};

export default Provincial;
