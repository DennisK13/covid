import React from "react";
import Card from "../components/Card/Card";
interface Props {
  healthUnits: any;
  name?: any;
}

interface LocalRegion {
  hr_uid: number;
  date: string;
  change_cases: number | null;
  change_fataities: number | null;
  change_tests: number | null;
  change_hospitalizations: number | null;
  change_criticals: number | null;
  change_recoveries: number | null;
  change_vaccinations: number | null;
  change_vaccinated: number | null;
  change_boosters_1: number | null;
  total_cases: number | null;
  total_fatalities: number | null;
  total_tests: number | null;
  total_hospitalizations: number | null;
  total_criticals: number | null;
  total_recoveries: number | null;
  total_vaccinations: number | null;
  total_vaccinated: number | null;
  total_boosters_1: number | null;
}

export const Local = (props: Props) => {
  const { healthUnits, name } = props;

  return healthUnits.length > 0 && name ? (
    <>
      
      <div style={{flexDirection:'column' }}>
        <h5>{name?.engname}</h5>
        <Card
          total={healthUnits[0].total_cases || 0}
          type="cases"
          change={
            healthUnits[0].change_cases ? healthUnits[0].change_cases : "0"
          }
        />
        <Card
          total={healthUnits[0].total_tests ? healthUnits[0].total_tests : "0"}
          type="tests"
          change={
            healthUnits[0].change_tests ? healthUnits[0].change_tests : "0"
          }
        />
        <Card
          total={
            healthUnits[0].total_fatalities
              ? healthUnits[0].total_fatalities
              : "0"
          }
          type="deaths"
          change={
            healthUnits[0].change_fatalities
              ? healthUnits[0].change_fatalities
              : "0"
          }
        />
        <Card
          total={
            healthUnits[0].total_hospitalizations
              ? healthUnits[0].total_hospitalizations
              : "0"
          }
          type="hospitalizations"
          change={
            healthUnits[0].change_hospitalizations
              ? healthUnits[0].change_hospitalizations
              : "0"
          }
        />
        <Card
          total={
            healthUnits[0].total_recovered
              ? healthUnits[0].total_recovered
              : "0"
          }
          type="recovered"
          change={
            healthUnits[0].change_recovered
              ? healthUnits[0].change_recovered
              : "0"
          }
        />
      </div>
    </>
  ) : null;
};
