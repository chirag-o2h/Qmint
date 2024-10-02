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

    // Check if request is server-side or client-side
    if (config.context) {
      // Server-side: Retrieve cookies from the request headers
      cookieString = config.context?.headers?.get('cookie') || '';
    } else if (typeof window !== 'undefined') {
      // Client-side: Retrieve cookies from document.cookie
      cookieString = document.cookie || '';
    }

    // Parse the cookie string into an object
    cookies = parseCookies(cookieString);
    console.log("🚀 ~ cookies:", cookies);
    // Determine login state based on cookies
    isLoggedIn = cookies.isLoggedIn === 'true'; // Adjust based on how 'isLoggedIn' is stored
    console.log("🚀 ~ isLoggedIn:", isLoggedIn)

    if (isLoggedInFromStore) {
      isLoggedIn = isLoggedInFromStore
    }

    // Retrieve existing sessionId from cookies
    uniqueSessionId = cookies.uniqueSessionId; // No need to generate a new ID here

    // If no sessionId exists, handle this on the client-side (set cookie)
    console.log("🚀 ~ sessionId: generated", uniqueSessionId)
    if (typeof window !== 'undefined' && !uniqueSessionId) {
      uniqueSessionId = generateGUID(); // Generate only on the client-side if it doesn't exist
      document.cookie = `uniqueSessionId=${uniqueSessionId}; path=/; max-age=${7 * 24 * 60 * 60}`; // Set the cookie for 7 days
    }

    // Add session details to request headers
    config.headers["LogInUser"] = isLoggedIn ? "true" : "false";
    config.headers["SessionId"] = uniqueSessionId;

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
