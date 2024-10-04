import { generateGUID, parseCookies } from "@/components/common/Utils";
import { store } from "@/redux/store";
import axios, { AxiosResponse, AxiosError } from "axios";

interface CustomHeaders {
  Storecode: number;
  Validkey: string;
}
export const BASE_URL = process.env.GATSBY_BASE_URL;
export const VALID_KEY = process.env.GATSBY_VALID_KEY;

const axiosInstance = axios.create({
  baseURL: process.env.GATSBY_BASE_URL,
  headers: {
    Storecode: process.env.GATSBY_STORE_CODE,
    Validkey: process.env.GATSBY_VALID_KEY,
  },
  // timeout: 5000, // Timeout in milliseconds
});
export const axiosWithContext = (context: any) => {
  return {
    get: (url: string, config = {}) => axiosInstance.get(url, { ...config, context } as any),
    post: (url: string, data: any, config = {}) => axiosInstance.post(url, data, { ...config, context } as any),
    put: (url: string, data: any, config = {}) => axiosInstance.put(url, data, { ...config, context } as any),
    delete: (url: string, config = {}) => axiosInstance.delete(url, { ...config, context } as any),
  };
};
// const axiosInstance = axios.create({
//     baseURL: "https://qmapistaging.qmint.com/api/v1/",
//     headers: {
//         "Storecode": 12,
//         "Validkey": "MBXCSv6SGIx8mx1tHvrMw5b0H3R91eMmtid4c2ItRHRKL4Pnzo"
//     }
//     // timeout: 5000, // Timeout in milliseconds
// });
// Request interceptor
// Request interceptor
axiosInstance.interceptors.request.use(
  (config: any) => {
    const { isLoggedIn: isLoggedInFromStore, userDetails } = store.getState().homePage;
    let uniqueSessionId: string;
    let isLoggedIn: boolean;
    let cookieString: string = "";
    let cookies: any = {};

    if (config.context) {
      cookieString = config.context?.headers?.get('cookie') || '';
    } else if (typeof window !== 'undefined') {
      cookieString = document.cookie || '';
    }

    cookies = parseCookies(cookieString);
    isLoggedIn = cookies.isLoggedIn === 'true';

    if (isLoggedInFromStore) {
      isLoggedIn = isLoggedInFromStore
    }

    uniqueSessionId = userDetails?.customerGuid ?? cookies.uniqueSessionId; // No need to generate a new ID here

    if (!uniqueSessionId || uniqueSessionId.includes('undefined')) {
      uniqueSessionId = userDetails?.customerGuid && !userDetails?.customerGuid?.includes('undefined') ? userDetails?.customerGuid : generateGUID(); // Generate only on the client-side if it doesn't exist
      if (typeof window !== 'undefined') {
        document.cookie = `uniqueSessionId=${uniqueSessionId}; path=/; max-age=${7 * 24 * 60 * 60}`; // Set the cookie for 7 days
      } else if (config?.context?.res?.setHeader) {
        config?.context?.res?.setHeader?.('Set-Cookie', `uniqueSessionId=${uniqueSessionId}; Path=/; Max-Age=${7 * 24 * 60 * 60}`);
      }
    }

    config.headers["LogInUser"] = isLoggedIn ? "true" : "false";
    config.headers["SessionId"] = uniqueSessionId;
    if (userDetails?.token) {
      config.headers.Authorization = `Bearer ${userDetails?.token}`;
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
