import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import "./src/scss/style.scss";
import { Provider } from 'react-redux';
import { store } from "@/redux/store";
import theme from '@/theme';

let inactivityTimeout: string | number | NodeJS.Timeout | undefined;
let isActive = false; // Track the user's active/inactive state
const inactivityTimeLimit = 5000; // 1 minute of inactivity threshold

// Function to track user activity/inactivity status
const trackUserStatus = (status: string) => {
  console.log("🚀 ~ trackUserStatus ~ status:", status)
  // fetch('/your-api-endpoint', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     userId: 'unique-user-id', // Replace with dynamic user ID
  //     status: status, // 'active' or 'inactive'
  //     timestamp: new Date().toISOString(),
  //   }),
  // }).catch((err) => console.error('Failed to send user tracking data', err));
};

// Reset inactivity timer when user performs any action
const resetInactivityTimer = () => {
  console.log("🚀 ~ resetInactivityTimer ~ resetInactivityTimer:", resetInactivityTimer)
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
  console.log("🚀 ~ setupEventListeners ~ setupEventListeners:", setupEventListeners)
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
};

// Gatsby onRouteUpdate to reset activity timer when navigating pages
export const onRouteUpdate = () => {
  resetInactivityTimer(); // Reset inactivity timer when the user navigates to a new page
};

// Existing wrapRootElement for Redux and ThemeProvider
export const wrapRootElement = ({ element }: any) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {element}
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
