import React, { useEffect, useState } from 'react'
import { Button, Container, Box, DialogActions, DialogContent, DialogTitle, InputAdornment, Stack, TextField, Typography, IconButton } from "@mui/material"

// Assets
import { EyeOffIcon, EyeOnIcon } from "../assets/icons/index"
import { useAppDispatch, useAppSelector } from '@/hooks'
import { useForm } from "react-hook-form";
import { LoginUserAPI, configDetails } from '@/redux/reducers/homepageReducer';
import { THEME_TYPE } from "@/axiosfolder"
import { ENDPOINTS, StoreData } from '@/utils/constants';
import { Dispatch } from '@reduxjs/toolkit';
import { isActionRejected } from '@/components/common/Utils';
import { Link, navigate } from 'gatsby';
import { AxiosError } from 'axios';
import { getLastPage, isBrowser, storeLastPage } from '@/utils/common';
import Loader from '@/components/common/Loader';
import useAPIoneTime from '@/hooks/useAPIoneTime';
import ConfigServices from '@/apis/services/ConfigServices';
import useShowToaster from '@/hooks/useShowToaster';
import Toaster from '@/components/common/Toaster';
import MainLayout from '@/components/common/MainLayout';
import { getConfigData, IconfigDataFromServer } from '@/utils/getConfigData';
import Seo from '@/components/common/Seo';
export interface IdispatchType {
  type: string,
  meta: {
    arg: {
      url: string,
      body: Object
    },
    requestId: string,
    rejectedWithValue: boolean,
    requestStatus: "rejected" | "fulfilled" | "pending"
    aborted: boolean,
    condition: boolean,
  },
  error: {
    name: any,
    message: string,
    stack: string,
    code: string
  }
}
// Declare the global function on the window object
declare global {
  interface Window {
    handleLinkClick: () => void;
  }
}

function SignInPage({ serverData }: { serverData: IconfigDataFromServer }) {
  const { loadingForSignIn } = useAppSelector((state) => state.homePage)
  const checkLoadingStatus = useAppSelector(state => state.homePage.loadingForSignIn);
  const isLoggedIn = useAppSelector(state => state.homePage.isLoggedIn)
  const openToaster = useAppSelector(state => state.homePage.openToaster)
  const { showToaster } = useShowToaster();

  const [passwordVisible, setPasswordVisible] = useState(false)
  const [loadingForNavigate, setLoadingForNavigate] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null);
  const dispatch: Dispatch<any> = useAppDispatch()

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  const { register, handleSubmit, formState: { errors, touchedFields }, getValues } = useForm();

  const onSubmit = async (data: any) => {
    const response: any = await dispatch<any>(LoginUserAPI({ url: ENDPOINTS.loginUser, body: data }))
    if (isActionRejected(response.type)) {
      // console.log("🚀 ~ onSubmit ~ response:", response)
      setLoginError(((response.payload as AxiosError).response?.data as { message?: string }).message || "Something went wrong")
      return
    }
    const lastPage = getLastPage();
    // console.log("🚀 ~ onSubmit ~ lastPage:", lastPage)
    if (lastPage) {
      // Redirect the user to the last visited page
      // console.log("🚀 ~ onSubmit ~ lastPage:", "isLoggedIn", lastPage)
      navigate(lastPage);
    } else {
      // Redirect the user to a default page
      navigate('/');
    }
  };
  // console.log("loginError", loginError)
  function navigateToRegister1() {
    setLoadingForNavigate(true)
    navigate('/registration');
    setLoadingForNavigate(false)
  }
  function navigateToRegister() {
    setLoadingForNavigate(true)
    navigate(ENDPOINTS.createMyAccount + StoreData.returnUrl);
    setLoadingForNavigate(false)
  }
  useAPIoneTime({ service: configDetails, endPoint: ENDPOINTS.getConfigStore })
  useEffect(() => {
    window.handleLinkClick = async () => {
      setLoadingForNavigate(true)
      const email = getValues('email');
      const response = await ConfigServices.sendVerificationEmailAPI(ENDPOINTS.sendVerificationEmail.replace('useEmail', email));
      setLoadingForNavigate(false)
      setLoginError(null)
      showToaster({
        message: response.data.message,
        severity: 'success'
      })
    };
  }, [])
  
  // if (isBrowser) {
  //   window.handleLinkClick = async () => {
  //     setLoadingForNavigate(true)
  //     const email = getValues('email');
  //     const response = await ConfigServices.sendVerificationEmailAPI(ENDPOINTS.sendVerificationEmail.replace('useEmail', email));
  //     setLoadingForNavigate(false)
  //     setLoginError(null)
  //     showToaster({
  //       message: response.data.message,
  //       severity: 'success'
  //     })
  //   };
  // }
  const handleEnterKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      handleSubmit(onSubmit)()
    }
  }

  useEffect(() => {
    setTimeout(() => {
      storeLastPage(window.location.pathname)
    }, 2000);
  }, [])

  if (isLoggedIn) {
    console.log("inside the islogged in ")
    // console.log("🚀 ~ onSubmit ~ lastPage:", "isLoggedIn")
    const lastPage = getLastPage();
    // console.log("🚀 ~ onSubmit ~ lastPage:", lastPage)
    if (lastPage && !lastPage.includes('login')) {
      // Redirect the user to the last visited page
      // console.log("🚀 ~ onSubmit ~ lastPage:", "isLoggedIn", lastPage)
      navigate(lastPage, { replace: true });
    } else {
      // Redirect the user to a default page
      navigate('/', { replace: true })
    }
    return
  }
  return (
    <>
      <Seo
        lang="en"
        keywords={[`Login`, ...(serverData?.keywords || [])]}
        configDetailsState={serverData?.configDetails}
      />
    </>
  )
}
export const getServerData = async (context: any) => {
  return await getConfigData();
};
export default SignInPage