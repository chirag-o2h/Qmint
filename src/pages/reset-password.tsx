import React, { useState } from 'react'
import { Button, Container, Box, DialogActions, DialogContent, DialogTitle, InputAdornment, Stack, TextField, Typography, IconButton } from "@mui/material"

// Assets
import { ContainedCheckIcon, ContainedCrossIcon, EyeOffIcon, EyeOnIcon } from "../assets/icons/index"
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
import RenderFields from '@/components/common/RenderFields';
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


function ResetPassword() {
  const { configDetails: configDetailsState, loadingForSignIn } = useAppSelector((state) => state.homePage)
  const checkLoadingStatus = useAppSelector(state => state.homePage.loadingForSignIn);
  const isLoggedIn = useAppSelector(state => state.homePage.isLoggedIn)
  const openToaster = useAppSelector(state => state.homePage.openToaster)
  console.log("🚀 ~ ResetPassword ~ openToaster:", openToaster)
  const { showToaster } = useShowToaster();

  const [passwordVisible, setPasswordVisible] = useState(false)
  const [loadingForNavigate, setLoadingForNavigate] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null);
  const dispatch: Dispatch<any> = useAppDispatch()

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  const { register, control, handleSubmit, formState: { errors, touchedFields }, getValues } = useForm();

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
  const renderPasswordConditionItem = (condition: string, status: boolean) => {
    return (
      <Stack className="PasswordConditionItem">
        {status ? <ContainedCheckIcon /> : <ContainedCrossIcon />}
        <Typography>{condition}</Typography>
      </Stack>
    )
  }
  // if (isLoggedIn) {
  //   console.log("🚀 ~ onSubmit ~ lastPage:", "isLoggedIn")
  //   const lastPage = getLastPage();
  //   console.log("🚀 ~ onSubmit ~ lastPage:", lastPage)
  //   if (lastPage && !lastPage.includes('login')) {
  //     // Redirect the user to the last visited page
  //     console.log("🚀 ~ onSubmit ~ lastPage:", "isLoggedIn", lastPage)
  //     navigate(lastPage, { replace: true });
  //   } else {
  //     // Redirect the user to a default page
  //     navigate('/', { replace: true })
  //   }
  //   return;
  // }
  return (
    <>
      {openToaster && <Toaster />}
      <Loader open={checkLoadingStatus || loadingForNavigate} />
      <MainLayout blackTheme>
        <Stack id="BmkResetPassword">
          <Box className="LeftPart">
            <img className="LoginImage" src={configDetailsState?.Loginpage_Leftside_pic?.value} alt="left-image" />
          </Box>
          <Stack className="RightPart">
            <form id="reset-password-form" onKeyDown={handleEnterKeyPress}>
              <Box className="Header">
                <Typography variant="h3" component="p">reset password</Typography>
                <Typography variant="body2" component="p" className="SuccessMessage">Your password has succesfully changed.<br />Please <Link target="_blank" className='BackToLogin' to="#">click here
                </Link> to login.</Typography>
              </Box>
              <Stack className="FieldWrapper">
                <TextField
                  label="New Password"
                  variant="standard"
                  placeholder="New password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          onClick={togglePasswordVisibility}
                        >
                          {!passwordVisible ? (
                            <EyeOffIcon />
                          ) : (
                            <EyeOnIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 5,
                      message: "Password must be at least 5 characters long"
                    }
                  })}
                  type={passwordVisible ? "text" : "password"}
                  error={!!errors.password && touchedFields.password}
                  helperText={errors.password && touchedFields.password ? errors.password.message as string : ""}
                  margin="none"
                  required
                  fullWidth
                />
                <Box className="PasswordCondition">
                  <Typography className="Message">Your Password Must :</Typography>
                  <Stack className="ConditionWrapper">
                    {renderPasswordConditionItem("Be at least 8 characters in length", false)}
                    {renderPasswordConditionItem("An uppercase letter (A - Z)", false)}
                    {renderPasswordConditionItem("A lowercase letter (a - z)", false)}
                    {renderPasswordConditionItem("A number (0 - 9)", false)}
                  </Stack>
                </Box>
                <TextField
                  label="Confirm Password"
                  variant="standard"
                  placeholder="Confirm password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          onClick={togglePasswordVisibility}
                        >
                          {!passwordVisible ? (
                            <EyeOffIcon />
                          ) : (
                            <EyeOnIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 5,
                      message: "Password must be at least 5 characters long"
                    }
                  })}
                  type={passwordVisible ? "text" : "password"}
                  error={!!errors.password && touchedFields.password}
                  helperText={errors.password && touchedFields.password ? errors.password.message as string : ""}
                  margin="none"
                  required
                  fullWidth
                />
              </Stack>
              <Stack className="FormAction">
                <Button name="recover" aria-label="recover" onClick={handleSubmit(onSubmit)} variant="contained" size="large" fullWidth disabled={loadingForSignIn}>Recover</Button>
              </Stack>
            </form>
          </Stack>
        </Stack>
      </MainLayout>
    </>
  )
}

export default ResetPassword