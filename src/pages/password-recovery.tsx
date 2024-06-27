import React, { useLayoutEffect, useMemo, useState } from 'react'
import { Button, Container, Box, DialogActions, DialogContent, DialogTitle, InputAdornment, Stack, TextField, Typography, IconButton } from "@mui/material"

// Assets
import { ContainedCheckIcon, ContainedCrossIcon, EyeOffIcon, EyeOnIcon } from "../assets/icons/index"
import { useAppDispatch, useAppSelector } from '@/hooks'
import { useForm, useWatch } from "react-hook-form";
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
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { passwordRecoverySave, passwordRecoveryTokenVarified } from '@/redux/reducers/authReducer';
import { IrecoveryPasswordSave } from '@/apis/services/authServices';

function ResetPassword(params: any) {
  const searchParams = useMemo(() => new URLSearchParams(window.location.search), [window.location.search]);
  const [isTokenVarified, setIsTokenVarified] = useState<boolean>(false)
  const { configDetails: configDetailsState, loadingForSignIn } = useAppSelector((state) => state.homePage)
  const openToaster = useAppSelector(state => state.homePage.openToaster)

  const dispatch: Dispatch<any> = useAppDispatch()

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState<any>(null)
  const { showToaster } = useShowToaster();

  useLayoutEffect(() => {
    const verifyToken = async () => {
      setLoading(() => true)
      const response: any = await dispatch(passwordRecoveryTokenVarified({ url: ENDPOINTS.passwordRecoveryTokenVarified.replace('{{token}}', searchParams.get("token") as string) }))
      // console.log("🚀 ~ verifyToken ~ response:", response)
      if (isActionRejected(response.type)) {
        setLoginError(((response.payload as AxiosError).response?.data as { message?: string }).message || "Something went wrong")
        setLoading(() => false)
        return
      }
      if (response?.payload?.data?.data) {
        setIsTokenVarified(true)
      }

      if (!response?.payload?.data?.data) {
        setLoginError((response?.payload?.data?.message || "Something went wrong"))
      } else {
        response?.payload?.data?.message && setMessage(() => response?.payload?.data?.message)
        setLoginError(null)
      }
      setCustomerId(response?.payload?.data?.data?.customerId ?? null)
      setLoading(() => false)
    }

    verifyToken()
    return () => {
      // showToaster({
      //   message: ((response.payload as AxiosError).response?.data as { message?: string }).message || "Something went wrong",
      //   severity: 'error'
      // })
    };
  }, [])

  const schema = yup.object().shape({
    Password: yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must have at least one uppercase letter')
      .matches(/[a-z]/, 'Password must have at least one lowercase letter')
      .matches(/[0-9]/, 'Password must have at least one number'),
    ConfirmPassword: yup.string()
      .required('Confirm Password is required')
      .oneOf([yup.ref('Password'), ''], 'Passwords must match'),
  });
  const { register, control, handleSubmit, formState: { errors }, getValues } = useForm({ resolver: yupResolver(schema) });

  useAPIoneTime({ service: configDetails, endPoint: ENDPOINTS.getConfigStore })

  const renderPasswordConditionItem = (condition: string, status: boolean) => {
    return (
      <Stack className="PasswordConditionItem">
        {status ? <ContainedCheckIcon /> : <ContainedCrossIcon />}
        <Typography>{condition}</Typography>
      </Stack>
    )
  }
  const password = useWatch({ control, name: 'Password', defaultValue: '' });


  const handleFormSubmit = async (data: any) => {
    setLoading(true)
    const body: IrecoveryPasswordSave = {
      CustomerId: customerId,
      Password: data?.Password
    }

    const response: any = await dispatch(passwordRecoverySave({ url: ENDPOINTS.passwordRecoverySave, data: body }))
    setIsTokenVarified(false)
    if (isActionRejected(response.type)) {
      setLoginError(((response.payload as AxiosError).response?.data as { message?: string }).message || "Something went wrong")
      // showToaster({message: ((response.payload as AxiosError).response?.data as { message?: string }).message || "Something went wrong", severity: 'error'})
      setLoading(() => false)
      return
    }
    setMessage(() => response?.payload?.data?.message)
    // console.log("🚀 ~ handleFormSubmit ~ res:", response)
    setLoading(false)
  }
  return (
    <>
      {openToaster && <Toaster />}
      {loading && <Loader open={loading} />}
      <MainLayout blackTheme>
        <Stack id="BmkResetPassword">
          <Box className="LeftPart">
            <img className="LoginImage" src={configDetailsState?.Loginpage_Leftside_pic?.value} alt="left-image" />
          </Box>
          <Stack className="RightPart">
            <form id="reset-password-form" onSubmit={handleSubmit(handleFormSubmit)}>
              <Box className="Header">
                <Typography variant="h3" component="p">Reset password</Typography>
                {loginError && <Typography variant="body2" component="p" className="ErrorMessage" dangerouslySetInnerHTML={{
                  __html: loginError
                }}></Typography>}
                {message && !loginError && <Typography variant="body2" component="p" className="SuccessMessage" dangerouslySetInnerHTML={{
                  __html: message
                }}></Typography>}
              </Box>
              {isTokenVarified && <> <Stack className="FieldWrapper">
                <RenderFields
                  type="password"
                  register={register}
                  error={errors.Password}
                  name="Password"
                  placeholder="Password"
                  className="Password"
                  control={control}
                  variant="outlined"
                  margin="none"
                  fullWidth
                  label={"New Password"}
                />
                {/* <TextField
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
                /> */}
                <Box className="PasswordCondition">
                  <Typography className="Message">Your Password Must :</Typography>
                  <Stack className="ConditionWrapper">
                    {renderPasswordConditionItem("Be at least 8 characters in length", password.length >= 8)}
                    {renderPasswordConditionItem("An uppercase letter (A - Z)", /[A-Z]/.test(password))}
                    {renderPasswordConditionItem("A lowercase letter (a - z)", /[a-z]/.test(password))}
                    {renderPasswordConditionItem("A number (0 - 9)", /[0-9]/.test(password))}
                  </Stack>
                </Box>
                <RenderFields
                  type="password"
                  register={register}
                  error={errors.ConfirmPassword}
                  name="ConfirmPassword"
                  placeholder="Confirm Password"
                  className="Password"
                  control={control}
                  variant="outlined"
                  margin="none"
                  fullWidth
                  label={"Confirm Password"}
                />
                {/* <TextField
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
                /> */}
              </Stack>
                <Stack className="FormAction">
                  <Button type="submit" name="recover" aria-label="recover" variant="contained" size="large" fullWidth disabled={loadingForSignIn}>Recover</Button>
                </Stack></>}
            </form>
          </Stack>
        </Stack>
      </MainLayout>
    </>
  )
}

export default ResetPassword