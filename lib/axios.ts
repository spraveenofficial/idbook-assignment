import axios, { AxiosInstance } from "axios";


// Axios Instances
const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://reqres.in/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});


export { axiosInstance };
