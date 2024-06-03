import React, { useState } from 'react'
import { Button, Container, Box, DialogActions, DialogContent, DialogTitle, InputAdornment, Stack, TextField, Typography, IconButton } from "@mui/material"

// Assets
import { useAppDispatch, useAppSelector } from '@/hooks'
import { useForm } from "react-hook-form";
import { LoginUserAPI, configDetails } from '@/redux/reducers/homepageReducer';
import { THEME_TYPE } from "@/axiosfolder"
import { ENDPOINTS, StoreData } from '@/utils/constants';
import { Dispatch } from '@reduxjs/toolkit';
import { isActionRejected } from '@/components/common/Utils';
import { Link, navigate } from 'gatsby';
import { AxiosError } from 'axios';
import { getLastPage } from '@/utils/common';
import Loader from '@/components/common/Loader';
import useAPIoneTime from '@/hooks/useAPIoneTime';
import ConfigServices from '@/apis/services/ConfigServices';
import useShowToaster from '@/hooks/useShowToaster';
import Toaster from '@/components/common/Toaster';
import MainLayout from '@/components/common/MainLayout';
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

function ForgotPassword() {
  const { configDetails: configDetailsState, loadingForSignIn } = useAppSelector((state) => state.homePage)
  const checkLoadingStatus = useAppSelector(state => state.homePage.loadingForSignIn);
  const isLoggedIn = useAppSelector(state => state.homePage.isLoggedIn)
  const openToaster = useAppSelector(state => state.homePage.openToaster)
  console.log("🚀 ~ ForgotPassword ~ openToaster:", openToaster)
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
      setLoginError(((response.payload as AxiosError).response?.data as { message?: string }).message || "Something went wrong")
      return
    }
    const lastPage = getLastPage();
    console.log("🚀 ~ onSubmit ~ lastPage:", lastPage)
    if (lastPage) {
      // Redirect the user to the last visited page
      console.log("🚀 ~ onSubmit ~ lastPage:", "isLoggedIn", lastPage)
      navigate(lastPage);
    } else {
      // Redirect the user to a default page
      navigate('/');
    }
  };

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

  const handleEnterKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      handleSubmit(onSubmit)()
    }
  }

  return (
    <>
      {openToaster && <Toaster />}
      {/* <Loader open={checkLoadingStatus || loadingForNavigate} /> */}
      <MainLayout blackTheme>
        <Stack id="BmkForgotPassword">
          <Box className="LeftPart">
            <img className="LoginImage" src={configDetailsState?.Loginpage_Leftside_pic?.value} alt="left-image" />
          </Box>
          <Stack className="RightPart">
            <form id="forgot-password-form" onKeyDown={handleEnterKeyPress}>
              <Box className="Header">
                <Typography variant="h3" component="p">Forgot Password</Typography>
                <Typography variant="body2" component="p" className="SuccessMessage">Email with instructions has been sent to you.</Typography>
              </Box>
              <Stack className="FieldWrapper">
                <TextField
                  variant="standard"
                  placeholder="Enter email address"
                  label="Email Address"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid email address"
                    }
                  })}
                  type="email"
                  error={!!errors.email && touchedFields.email}
                  helperText={errors.email && touchedFields.email ? errors.email.message as string : ""}
                  margin="none"
                  required
                  fullWidth
                />
              </Stack>
              <Link target="_blank" to="#">
                <Button name="Back To Login" aria-label="Back To Login" className="BackToLogin" color="secondary" onClick={() => {
                }}>Back To Login</Button></Link>
              <Stack className="FormAction">
                <Button name="submit" aria-label="submit" onClick={handleSubmit(onSubmit)} variant="contained" size="large" fullWidth>Submit</Button>
              </Stack>
            </form>
          </Stack>
        </Stack>
      </MainLayout>
    </>
  )
}

export default ForgotPassword