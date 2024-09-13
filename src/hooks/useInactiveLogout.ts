import { LogOutUserAPI, getPopUpDetailsAPI } from '@/redux/reducers/homepageReducer';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '.';
import { IPopUpDetails } from '@/apis/services/ConfigServices';

const useInactiveLogout = (logoutTimeout = 300000, toggleSessionExpireDialog: any) => {
  const { isLoggedIn, userDetails } = useAppSelector((state) => state.homePage)
  const [userInactiveTime, setUserInactiveTime] = useState(0);
  const dispatch = useAppDispatch()
  // Function to reset the user inactive time
  const resetUserInactiveTime = () => {
    setUserInactiveTime(0);
  };

  // Function to handle user activity
  const handleUserActivity = () => {
    // Reset the inactive time
    resetUserInactiveTime();
  };

  // Function to handle logout
  const handleLogout = async () => {
    let currentCountForTheInactiveUserSessions;
    if (isLoggedIn) {

      let currentCountForUser = localStorage.getItem('countOfTheInactiveSessions')

      if (Number(currentCountForUser) < 2) {
        currentCountForTheInactiveUserSessions = 3
        localStorage.setItem('countOfTheInactiveSessions', (Number(currentCountForUser || 0) + 1).toString())
      } else {
        currentCountForTheInactiveUserSessions = 4
        localStorage.setItem('countOfTheInactiveSessions', (0).toString())
        dispatch(LogOutUserAPI() as any)
      }

      localStorage.setItem('countOfTheInactiveSessionsForGuest', (0).toString())

    } else {

      let currentCountForUser = localStorage.getItem('countOfTheInactiveSessionsForGuest')

      if (Number(currentCountForUser) < 2) {
        currentCountForTheInactiveUserSessions = 1
        localStorage.setItem('countOfTheInactiveSessionsForGuest', (Number(currentCountForUser || 0) + 1).toString())
      } else {
        currentCountForTheInactiveUserSessions = 2
        localStorage.setItem('countOfTheInactiveSessionsForGuest', (0).toString())
      }

      localStorage.setItem('countOfTheInactiveSessions', (0).toString())
    }

    const paramsObj: IPopUpDetails = {
      'HRERYvCbB': isLoggedIn ? userDetails?.customerId! : 0,
      'kRNqk': currentCountForTheInactiveUserSessions,
      'KhgMNHTfVh9C': 'Home'
    }
    // Call the logout API or perform any other logout actions
    // ===================================================================todo====================
    toggleSessionExpireDialog(true)
    // =============================================================================================
    await dispatch(getPopUpDetailsAPI(paramsObj))
    setUserInactiveTime(-Infinity)
    // Redirect to the login page or perform any other actions
    // window.location.href = '/login';
  };

  useEffect(() => {


    // Set up the interval to check for user inactivity
    let interval: any;
    if (userInactiveTime > -1) {
      // Add event listeners for user activity
      document.addEventListener('mousemove', handleUserActivity);
      document.addEventListener('keydown', handleUserActivity);
      interval = setInterval(() => {
        setUserInactiveTime(prevTime => prevTime + 10000); // Increment the inactive time by 1 second

        // console.log("🚀 ~ interval=setInterval ~ userInactiveTime:", userInactiveTime)
        // Check if the user has been inactive for the logout timeout duration
        if (userInactiveTime >= logoutTimeout) {
          handleLogout(); // Call the logout function
        }
      }, 10000); // Check every 1 second for user inactivity
    }
    // Cleanup function to remove event listeners and clear interval
    return () => {
      document.removeEventListener('mousemove', handleUserActivity);
      document.removeEventListener('keydown', handleUserActivity);
      clearInterval(interval);
    };
  }, [logoutTimeout, userInactiveTime]);

  return resetUserInactiveTime; // Return the reset function in case it's needed externally
};

export default useInactiveLogout;
