import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export const getBrand = () => instance.get(`/Make`);
export const getModel = id => instance.get(`/Model?MakeID=${id}`);
// export const getVersion = id => instance.get(`/Version?ModelID=${id}`);
export const getVersion = id => instance.get(`/Version`);
export const getVehicles = id => instance.get(`Vehicles?Page=1`);