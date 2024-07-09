import { generateGUID } from "@/components/common/Utils";
import { store } from "@/redux/store";
import axios, { AxiosResponse, AxiosError } from "axios";

interface CustomHeaders {
  Storecode: number;
  Validkey: string;
}
export const STORE_CODE = 25;
export const BASE_URL = process.env.BASE_URL;
export const VALID_KEY = process.env.VALID_KEY;
export const THEME_TYPE = process.env.THEME_TYPE;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Storecode: 25,
    Validkey: VALID_KEY,
  },
  // timeout: 5000, // Timeout in milliseconds
});
// const axiosInstance = axios.create({
//     baseURL: "https://qmapistaging.qmint.com/api/v1/",
//     headers: {
//         "Storecode": 12,
//         "Validkey": "MBXCSv6SGIx8mx1tHvrMw5b0H3R91eMmtid4c2ItRHRKL4Pnzo"
//     }
//     // timeout: 5000, // Timeout in milliseconds
// });
// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const { isLoggedIn, userDetails } = store.getState().homePage;
    if (isLoggedIn) {
      config.headers.Authorization = `Bearer ${userDetails?.token}`;
      config.headers["LogInUser"] = "true";
      config.headers["SessionId"] = userDetails?.customerGuid;
    } else {
      config.headers["LogInUser"] = "false";
      config.headers["SessionId"] = generateGUID();
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // You can handle successful responses here
    return response;
  },
  (error: AxiosError) => {
    // if (error.response) {
    //     // The request was made and the server responded with a status code
    //     // that falls out of the range of 2xx
    //     console.log(error.response.data,".data"); // Backend error response data
    //     console.log(error.response.status,"error.response.status"); // Backend error response status
    //     console.log(error.response.headers,"error.response.headers"); // Backend error response headers
    // } else if (error.request) {
    //     // The request was made but no response was received
    //     console.log(error.request);
    // } else {
    //     // Something happened in setting up the request that triggered an Error
    //     console.log('Error', error.message);
    // }

    // You can handle errors here (e.g., redirecting for unauthorized requests)
    return Promise.reject(error);
  }
);

export default axiosInstance;
