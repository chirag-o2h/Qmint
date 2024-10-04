import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import "./src/scss/style.scss";
import { Provider } from 'react-redux';
import { store } from "@/redux/store";
import theme from '@/theme';
import axiosInstance from "@/axiosfolder";
import { ENDPOINTS } from "@/utils/constants";
import { getDeviceType } from "@/utils/common";
import SessionManager from "@/components/common/SessionManager";
import { generateGUID } from "@/components/common/Utils";

let inactivityTimeout: string | number | NodeJS.Timeout | undefined;
let isActive = false; // Track the user's active/inactive state
// const configData = await axiosInstance.get(ENDPOINTS.getConfigStore);
// const finalRequiredData = configData.data.data.find((item: { key: string; })=>item.key === "Real_Time_Online_User_Idle_Timeout")
// console.log("🚀 ~ trackUserStatus ~ configData:", finalRequiredData)
// Immediately invoked function to set inactivityTimeLimit
// Function to fetch the config data, either from sessionStorage or API
const getConfigData = async () => {
  // Check if the config data exists in sessionStorage
  const storedConfig = sessionStorage.getItem("configData");
  if (storedConfig) {
    // If exists, return the parsed stored data
    return JSON.parse(storedConfig);
  } else {
    // Fetch the config from the API
    const configData = await axiosInstance.get(ENDPOINTS.getConfigStore);
    const finalRequiredData = configData.data.data.find(
      (item: { key: string }) => item.key === "Real_Time_Online_User_Idle_Timeout"
    );

    // Store the fetched config in sessionStorage
    sessionStorage.setItem("configData", JSON.stringify(finalRequiredData));
    return finalRequiredData;
  }
};
let inactivityTimeLimit: number //= Number(process.env.GATSBY_USER_ACTIVITY_TRACK_TIMIOUT || 1*60*1000);  // 1 minute of inactivity threshold
(async () => {
  const finalRequiredData = await getConfigData();
  console.log("🚀 ~ trackUserStatus ~ finalRequiredData:", finalRequiredData);

  // Set inactivityTimeLimit from the fetched data or default to 1 minute
  inactivityTimeLimit = Number((Number(finalRequiredData?.value ?? 1) * 60 * 1000) || 1 * 60 * 1000);
})();

// Function to track user activity/inactivity status
const trackUserStatus = async (status: 'active' | 'inactive') => {
  // console.log("🚀 ~ trackUserStatus ~ status:", status)
  const body = {
    "Url": window.location.href,
    "Device": getDeviceType(),
    "IsActive": status == 'active'
  }
  // console.log("track user body", body)
  await axiosInstance.post(ENDPOINTS.realTimeTrackUsers, body)
};

// Reset inactivity timer when user performs any action
const resetInactivityTimer = () => {
  // console.log("🚀 ~ resetInactivityTimer ~ resetInactivityTimer:", inactivityTimeout,":---",resetInactivityTimer)
  clearTimeout(inactivityTimeout);

  if (!isActive) {
    // If the user was previously inactive, notify the backend that the user is now active
    trackUserStatus('active');
    isActive = true; // Update the user's state to active
  }

  // Set the inactivity timer to send 'inactive' status after a period of no activity
  inactivityTimeout = setTimeout(() => {
    trackUserStatus('inactive');
    isActive = false; // Update the user's state to inactive
  }, inactivityTimeLimit);
};

// Set up event listeners for user activity
const setupEventListeners = () => {
  // console.log("🚀 ~ setupEventListeners ~ setupEventListeners:", setupEventListeners)
  window.addEventListener('mousemove', resetInactivityTimer);
  window.addEventListener('mousedown', resetInactivityTimer);
  window.addEventListener('keydown', resetInactivityTimer);
  window.addEventListener('scroll', resetInactivityTimer);
  window.addEventListener('touchstart', resetInactivityTimer);
};

// Detect when the user closes the page or switches tabs
const handleBeforeUnload = () => {
  trackUserStatus('inactive'); // Mark the user as inactive when they leave the page
};

// Gatsby onClientEntry to set up activity tracking on app load
export const onClientEntry = () => {
  setupEventListeners();
  resetInactivityTimer(); // Start the inactivity timer
  window.addEventListener('beforeunload', handleBeforeUnload);
  const { isLoggedIn, userDetails } = store.getState().homePage;

  if (!document.cookie.includes('isLoggedIn')) {
    document.cookie = `isLoggedIn=${isLoggedIn}; path=/; max-age=${7 * 24 * 60 * 60}`; // 7 days expiry
  }
  // Ensure session is initialized on the client if not already
  if (!document.cookie.includes('uniqueSessionId')) {
    const uniqueSessionId = userDetails?.customerGuid ?? generateGUID();
    document.cookie = `uniqueSessionId=${uniqueSessionId}; path=/; max-age=${7 * 24 * 60 * 60}`;
  }
};

// Gatsby onRouteUpdate to reset activity timer when navigating pages
export const onRouteUpdate = () => {
  resetInactivityTimer(); // Reset inactivity timer when the user navigates to a new page
  // Call the API to notify the backend of the user's current URL and status
  trackUserStatus('active');

  // console.log(`Navigated to new page: ${location.pathname}`);
};

// Existing wrapRootElement for Redux and ThemeProvider
export const wrapRootElement = ({ element }: any) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SessionManager>
        {element}
      </SessionManager>
    </ThemeProvider>
  </Provider>
);

// import { store, persistor } from '@/redux/store';

// import { PersistGate } from 'redux-persist/integration/react';
// import LogoutUserOnTabClose from '@/components/common/LogoutUserOnTabClose';
// // Wraps every page in a component
// export const wrapPageElement = ({ element, props }:any) => {
//   return <Layout {...props}>{element}</Layout>
// }
