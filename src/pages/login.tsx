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
import { getLastPage, storeLastPage } from '@/utils/common';
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

function SignInPage() {
  const { configDetails: configDetailsState, loadingForSignIn } = useAppSelector((state) => state.homePage)
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

  useEffect(() => {
    setTimeout(() => {
      storeLastPage(window.location.pathname)
    }, 2000);
  }, [])

  if (isLoggedIn) {
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
    return;
  }
  return (
    <>
      {openToaster && <Toaster />}
      {checkLoadingStatus || loadingForNavigate && <Loader open={checkLoadingStatus || loadingForNavigate} />}
      {THEME_TYPE == '1' ? (
        <MainLayout blackTheme>
          <Stack id="BmkSignInPage">
            <Box className="LeftPart">
              <img className="LoginImage" src={configDetailsState?.Loginpage_Leftside_pic?.value} alt="" />
            </Box>
            <Stack className="RightPart">
              <form id="login-form" onKeyDown={handleEnterKeyPress}>
                <Box className="Header">
                  <Typography variant="h3" component="p">{configDetailsState?.Loginpage_Rightside_Title?.value}</Typography>
                  <Typography variant="body2" className="Description" component="p">{configDetailsState?.Loginpage_Rightside_Subtitle?.value}</Typography>
                  {loginError && <Typography variant="body2" component="p" className="ErrorMessage" dangerouslySetInnerHTML={{
                    __html : loginError
                  }}></Typography>}
                  {/* {message && !loginError && <Typography variant="body2" component="p" className="SuccessMessage">{message}</Typography>} */}
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
                  <TextField
                    label="Password"
                    variant="standard"
                    placeholder="Enter password"
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
                <Link target="_blank" to={'/forgot-password'}>
                  <Button name="Forgot Your Password" aria-label="Forgot Your Password" className="ForgotPassword" color="secondary" onClick={() => {
                  }}>Forgot Password?</Button></Link>
                <Stack className="FormAction">
                  <Button name="signIn" aria-label="signIn" onClick={handleSubmit(onSubmit)} variant="contained" size="large" fullWidth disabled={loadingForSignIn}>Sign Me In</Button>
                  <Button onClick={navigateToRegister1} name="Create My Account" aria-label="Create My Account" variant="outlined" size="large" fullWidth disabled={loadingForNavigate}>Create My Account</Button>
                </Stack>
              </form>
            </Stack>
          </Stack>
        </MainLayout>
      ) : (
        <Box id="SignInPage">
          <Container maxWidth="sm" >
            <DialogTitle component="p">
              <img onClick={() => { navigate('/') }} src={configDetailsState?.BrandLogoURL_Header?.value} alt="QMint logo" loading='eager' />
            </DialogTitle>
            {loginError && <Typography variant='subtitle1' component="p" className='LoginError' dangerouslySetInnerHTML={{
              __html: loginError
            }}></Typography>}
            <DialogContent>
              <form id='login-form' onKeyDown={handleEnterKeyPress}>
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
                    required
                  />

                  <TextField
                    label="Password"
                    variant="standard"
                    placeholder="Enter password"
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
                    required
                  />
                </Stack>
                <Link target='_blank' to={ENDPOINTS.forgotPasswordLink + '/?id=' + StoreData.storeCode}>
                  <Button name='Forgot Your Password' aria-label='Forgot Your Password' className="ForgotPassword" color="secondary" onClick={() => {
                  }}>Forgot Your Password?</Button></Link>
              </form>
            </DialogContent>
            <DialogActions>
              <Button name='signIn' aria-label='signIn' onClick={handleSubmit(onSubmit)} variant="contained" size="large" fullWidth disabled={loadingForSignIn}>Sign Me In</Button>
              {/* <Link target='_blank' to={ENDPOINTS.createMyAccount + StoreData.returnUrl}> */}
              <Button onClick={navigateToRegister} name='Create My Account' aria-label='Create My Account' variant="outlined" size="large" fullWidth disabled={loadingForNavigate}>Create My Account</Button>
              {/* </Link> */}
              <Stack className="SignUpAction">
                <Typography className="Message" variant="overline">Don't have an account?</Typography>
                <Button name='Sign Up' aria-label='Sign Up' color="secondary" onClick={navigateToRegister} disabled={loadingForNavigate}>Sign Up</Button>
              </Stack>
            </DialogActions>
          </Container>
        </Box>
      )}
    </>
  )
}

export default SignInPage