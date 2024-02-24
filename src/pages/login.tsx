import React, { useState } from 'react'
import { Button, Container, Box, DialogActions, DialogContent, DialogTitle, InputAdornment, Stack, TextField, Typography, IconButton } from "@mui/material"

// Assets
import { EyeOffIcon, EyeOnIcon } from "../assets/icons/index"
import { useAppDispatch, useAppSelector } from '@/hooks'
import { useForm } from "react-hook-form";
import { LoginUserAPI } from '@/redux/reducers/homepageReducer';
import { ENDPOINTS, StoreData } from '@/utils/constants';
import { Dispatch } from '@reduxjs/toolkit';
import { isActionRejected } from '@/components/common/Utils';
import { Link, navigate } from 'gatsby';
import axios, { AxiosError } from 'axios';
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
function SignInPage() {
  const { configDetails: configDetailsState, loadingForSignIn } = useAppSelector((state) => state.homePage)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [loadingForNavigate,setLoadingForNavigate] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null);
  const dispatch: Dispatch<any> = useAppDispatch()
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }
  const { register, handleSubmit, formState: { errors, touchedFields } } = useForm();

  const onSubmit = async (data: any) => {
    const response: any = await dispatch<any>(LoginUserAPI({ url: ENDPOINTS.loginUser, body: data }))
    if (isActionRejected(response.type)) {
      setLoginError(((response.payload as AxiosError).response?.data as { message?: string }).message || "Something went wrong")
      return
    }
    navigate("/");
  };
function navigateToRegister(){
  setLoadingForNavigate(true)
  navigate(ENDPOINTS.createMyAccount + StoreData.returnUrl);
  setLoadingForNavigate(false)
}
  return (
    <Box id="SignInPage">
      <Container maxWidth="sm" >
        <DialogTitle component="p">
          <img onClick={() => { navigate('/') }} src={configDetailsState?.storelogourl?.value} alt="QMint logo" loading='eager' />
        </DialogTitle>
        {loginError && <Typography variant='subtitle1' className='LoginError'>{loginError}</Typography>}
        <DialogContent>
          <form id='login-form'>
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
  )
}

export default SignInPage