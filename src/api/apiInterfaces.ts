export {}

export interface Response {
    data: NationalSummary | AllProvincesSummary | ProvinceData[] | any;
    last_updated: string;
}


// https://api.covid19tracker.ca/summary
// interface for the /summary endpoint 
export type NationalArr = {
    data: NationalSummary[];
}
export interface NationalSummary {
    latest_date: string;
    change_cases: string;
    change_fatalities: string;
    change_tests: string;
    change_hospitalizations: string;
    change_criticals: string;
    change_recoveries: string;
    change_vaccinations: string;
    change_vaccinated: string;
    change_boosters_1: string;
    change_vaccines_distributed: string;
    total_cases: string;
    total_fatalities: string;
    total_tests: string;
    total_hospitalizations: string;
    total_criticals: string;
    total_recoveries: string;
    total_vaccinations: string;
    total_vaccinated: string;
    total_boosters_1: string;
    total_vaccines_distributed: string;
}

'https://api.covid19tracker.ca/provinces'
// interface for the provinces endpoint
export interface AllProvincesDetails {
    provinces: ProvinceDetails[];
}
//   create interface for the province variable
export interface ProvinceDetails {
    id: number;
    code: string;
    name: string;
    data_source: string;
    population: number;
    area: number;
    gdp: number;
    geographic: number;
    data_status: string;
    created_at: string;
    updated_at: string;
    density: number;
}


'https://api.covid19tracker.ca/summary/split'
// interface for the /summary/split endpoint

export interface AllProvincesSummary {
    provinces: ProvinceData[];
}

export interface ProvinceData {
    province: string;
    date: string;
    change_cases: number;
    change_fatalities: number;
    change_tests: number;
    change_hospitalizations: number;
    change_criticals: number;
    change_recoveries: number;
    change_vaccinations: number;
    change_vaccinated: number;
    change_boosters_1: number;
    change_vaccines_distributed: number;
    total_cases: number;
    total_fatalities: number;
    total_tests: number;
    total_hospitalizations: number;
    total_criticals: number;
    total_recoveries: number;
    total_vaccinations: number;
    total_vaccinated: number;
    total_boosters_1: number;
    total_vaccines_distributed: number;
}