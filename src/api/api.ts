
import React, { useEffect, useContext, useState, createContext } from "react";
import {
  NationalSummary,
  AllProvincesSummary,
  ProvinceData,
  NationalArr,
  Response,
} from "./apiInterfaces";

import axios, { AxiosResponse } from "axios";

// const apiUrl = "https://canada-covid19.herokuapp.com"

const instance = axios.create({
    baseURL: "https://api.covid19tracker.ca/",
    timeout: 10000,
})

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => instance.get(url ).then(responseBody),
}

export const CovidData = {
    getSummary: (): Promise<Response> => requests.get("summary"),
    getAllProvinces: (): Promise<Response> => requests.get("summary/split"),
    getRegions: (province: string): Promise<Response> => requests.get(`province/${province}/regions`),
    getHealthUnits: (): Promise<Response> => requests.get(`summary/split/hr`),
    getNationalTimeseries: (): Promise<Response> => requests.get(`reports`),
}


