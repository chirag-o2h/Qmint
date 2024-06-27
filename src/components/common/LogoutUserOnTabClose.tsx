import { useAppDispatch } from "@/hooks";
import { LogOutUserAPI } from "@/redux/reducers/homepageReducer";
import { localStorageSetItem } from "@/utils/common";
import React, { useEffect } from "react";

const LogoutUserOnTabClose = ({ children }: any) => {
  const dispatch = useAppDispatch();
  const logoutUser = () => {
    // Your logout logic here
    dispatch(LogOutUserAPI() as any);
    // Example: localStorage.removeItem('authToken');
    // Example: fetch('/api/logout', { method: 'POST' });
    // localStorageSetItem('userDetails', '')
    // localStorageSetItem('isLoggedIn', JSON.stringify(false))
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      logoutUser();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      // localStorageSetItem('userDetails', '')
      // localStorageSetItem('isLoggedIn', JSON.stringify(false))
      dispatch(LogOutUserAPI() as any);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return <>{children}</>;
};

export default LogoutUserOnTabClose;
