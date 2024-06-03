import React, { useState, useEffect, useRef } from "react"
import { useMediaQuery, useScrollTrigger, Box, Typography, Button, Stack, MenuItem, Autocomplete, FormHelperText, TextField, IconButton, InputAdornment, FormControlLabel, Radio, RadioGroup } from "@mui/material"
import { useForm, useWatch } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, A11y } from 'swiper/modules'
import classNames from "classnames"
import { SwiperOptions } from "swiper/types"
import { Link } from "gatsby"

// Assets
import { RadioUncheckedRoundIcon, ContainedCheckIcon, ContainedCrossIcon, SmallRightIcon, TickIcon } from "@/assets/icons"

// Hooks
import { useAppDispatch, useAppSelector } from "@/hooks"

// Utils

// Components
import MainLayout from "@/components/common/MainLayout"
import GoogleMaps from "@/components/common/GoogleMaps"
import RenderFields from "@/components/common/RenderFields"
import { AddressComponents } from "@/utils/parseAddressComponents"
import { checkImageUrl, isValidPhoneNumber } from "@/components/common/Utils"
import { StateOrCountry, getStateAndCountryLists } from "@/redux/reducers/checkoutReducer";
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { ENDPOINTS } from "@/utils/constants"
import Toaster from "@/components/common/Toaster"
import Loader from "@/components/common/Loader"
import { getRegistrationOTP, registration, verifyRegistrationOTP } from "@/redux/reducers/authReducer"
import { hasFulfilled } from "@/utils/common"
import useShowToaster from "@/hooks/useShowToaster"
import { AxiosError } from "axios"

interface Inputs {
  FirstName: string,
  LastName: string,
  Password: string,
  ConfirmPassword: string,
  PhoneNumber: string,
  Email: string,
  OTP: string,
  Address1: string,
  Address2: string,
  City: string,
  Country: string,
  State: string,
  Code: number,
  AgentCode: string,
  PrivacyPolicy: boolean,
  TermsCondition: boolean
}

const config: SwiperOptions = {
  slidesPerView: 1,
  centeredSlides: true,
  spaceBetween: 20,
  pagination: {
    clickable: true,
  },
  loop: true,
  speed: 300,
  modules: [Pagination, Autoplay, A11y],
  scrollbar: {
    draggable: true
  },
  grabCursor: true,
  autoplay: {
    delay: 8000,
  },
};

const createSchema = (includeAgentCode: boolean, phoneNumberValue: { value: string, country: any }) => {
  return yup.object().shape({
    FirstName: yup.string().trim().required("First name is a required field"),
    LastName: yup.string().trim().required("Last name is a required field"),
    Company: yup.string().trim(),
    PhoneNumber: yup.string().trim().test("valid-phone-number", "Please enter a valid phone number", function (value) {
      if (value) return isValidPhoneNumber(value, phoneNumberValue?.country?.countryCode);
      else return false;
    }),
    Password: yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must have at least one uppercase letter')
      .matches(/[a-z]/, 'Password must have at least one lowercase letter')
      .matches(/[0-9]/, 'Password must have at least one number'),
    ConfirmPassword: yup.string()
      .required('Confirm Password is required')
      .oneOf([yup.ref('Password'), ''], 'Passwords must match'),
    Email: yup.string().email().required(),
    OTP: yup.string(),
    Address1: yup.string().trim().required("Address 1 is a required field"),
    Address2: yup.string().trim(),
    City: yup.string().required().trim(),
    State: yup.string().required(),
    Country: yup.string().notOneOf(["none"], "Country is a required field"),
    Code: yup.string().required("Zip / Postal code is required").trim(),
    PrivacyPolicy: yup.boolean().oneOf([true], "Please accept the privacy policy"),
    TermsCondition: yup.boolean().oneOf([true], "Please accept the terms and condition"),
    ...(includeAgentCode && { AgentCode: yup.string().required("Agent code is required") })
  });
};

function Registration() {
  const { configDetails: configDetailsState } = useAppSelector((state) => state.homePage)
  const loading = useAppSelector(state => state.auth.loading)
  const openToaster = useAppSelector(state => state.homePage.openToaster)
  const dispatch = useAppDispatch();
  const countryList = useAppSelector(state => state.checkoutPage.countryList);
  const stateListall = useAppSelector(state => state.checkoutPage.stateList);
  const [stateList, setStateList] = useState<{ id: number, name: string }[]>([])
  const [googleAddressComponents, setGoogleAddressComponents] = useState<AddressComponents & { postalCode?: string } | null>(null);
  const [countryValue, setcountryValue] = useState<any>("none")
  const [stateValue, setstateValue] = useState<any>(undefined)
  const [showOTPField, setShowOTPField] = useState<boolean>(false)
  const { showToaster } = useShowToaster();
  // const [password, setPassword] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false)
  const [radioButtonInput, setRadioButtonInput] = useState("agent");
  const [timer, setTimer] = useState(20);
  const [includeAgentCode, setIncludeAgentCode] = useState<boolean>(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const [sliderImageHeight, setSliderImageHeight] = useState<number>(0);
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('md'))
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: isMobile ? 68 : 50,
  })
  const topImageMinHeight = 300

  const [phoneNumberValue, setPhoneNumberValue] = useState<{ value: string, country: any }>({
    value: "",
    country: {}
  })

  const firstTimeRender = useRef(true);

  // this useEffect will handle the timer for the resend OTP button
  useEffect(() => {
    let interval: any;

    if (timer > 0 && showOTPField) {
      setIsButtonDisabled(true);
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsButtonDisabled(false);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timer, showOTPField]);

  const handleResendClick = () => {
    getOtpHandler();
    setTimer(20);
  };

  useAPIoneTime({ service: getStateAndCountryLists, endPoint: ENDPOINTS.getStateAndCountryLists });

  const validationSchema = createSchema(includeAgentCode, phoneNumberValue);
  const {
    register,
    reset,
    clearErrors,
    handleSubmit,
    control,
    setValue,
    setError,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema)
  })

  const password = useWatch({ control, name: 'Password', defaultValue: '' });
  const privacyPolicy = useWatch({ control, name: 'PrivacyPolicy' });
  const termsAndCondition = useWatch({ control, name: 'TermsCondition' });

  useEffect(() => {
    if (googleAddressComponents) {
      setValue('Address1', googleAddressComponents.address)
      countryList.forEach((country) => {
        if (country.name === googleAddressComponents.country.trim()) {
          setValue('Country', country.id.toString())
          setcountryValue(country.id.toString())
        }
      })
      setValue('State', googleAddressComponents.state)
      setstateValue(googleAddressComponents.state)
      setValue('City', googleAddressComponents?.city)
      setValue('Address2', googleAddressComponents.address2)
      if (googleAddressComponents?.postalCode) {
        setValue("Code", Number(googleAddressComponents?.postalCode));
      }
      clearErrors('Country')
      clearErrors('State')
      clearErrors('City')
      clearErrors('Address1')
      clearErrors('Code')
    }
  }, [googleAddressComponents])

  useEffect(() => {
    const data: any = stateListall.filter((state: any) => {
      return state.enumValue == countryValue || countryValue == "none"
    })
    setStateList(data)
  }, [stateListall, countryValue])

  useEffect(() => {
    if (firstTimeRender.current) {
      firstTimeRender.current = false;
      return;
    }
    if (!isValidPhoneNumber(phoneNumberValue.value, phoneNumberValue?.country?.countryCode)) {
      setError("PhoneNumber", {
        type: "manual",
        message: "Please enter a valid phone number"
      });
    }
    else {
      clearErrors("PhoneNumber")
    }
  }, [phoneNumberValue])

  const renderPasswordConditionItem = (condition: string, status: boolean) => {
    return (
      <Stack className="PasswordConditionItem">
        {status ? <ContainedCheckIcon /> : <ContainedCrossIcon />}
        <Typography>{condition}</Typography>
      </Stack>
    )
  }

  const handleFormSubmit = async (data: any) => {
    if (!isOtpVerified) {
      showToaster({
        message: "Please verify Phone number to proceed",
        severity: "warning"
      })
      return;
    }

    const payload = {
      FirstName: data.FirstName,
      LastName: data.LastName,
      Password: data.Password,
      ConfirmPassword: data.ConfirmPassword,
      Email: data.Email,
      Phonenumber: phoneNumberValue.value,
      Address1: data.Address1,
      Address2: data.Address2,
      Country: data.Country,
      StateName: data.State,
      State: stateList.find((state) => state.name === data.State)?.id || 0,
      City: data.City,
      Pincode: data.Code,
      IsAgentId: radioButtonInput === "agent",
      AgentCode: radioButtonInput === "agent" ? data.AgentCode : null,
      DailyPriceAlert: radioButtonInput === "dailyPriceAlert",
      NewsLetter: radioButtonInput === "newsletter",
      IAcceptPrivacyPolicy: true,
      Termsofservice: true
    }

    const response = await dispatch(registration({ url: ENDPOINTS.registration, body: payload }));

    if (hasFulfilled(response.type)) {
      showToaster({
        message: response?.payload?.data.message,
        severity: "success"
      })
    }
    else {
      showToaster({
        message: (response?.payload as AxiosError)?.response?.data?.message || "Failed to register",
        severity: "error"
      })
    }
  }

  const OnChange = (value: any) => {
    setcountryValue(value)
    setValue('Country', value)
  }

  const getOtpHandler = async () => {
    const response = await dispatch(getRegistrationOTP({ url: ENDPOINTS.getRegistrationOTP, body: { Phonenumber: getValues("PhoneNumber") } }));
    console.log("🚀 ~ getOtpHandler ~ response:", response)

    if (hasFulfilled(response.type)) {
      const resData = response?.payload?.data.data;
      if (resData == true) {
        setShowOTPField(true)
        showToaster({
          message: response?.payload?.data.message,
          severity: "success"
        })
      }
      else {
        showToaster({
          message: response?.payload?.data.message,
          severity: "error"
        })
      }
    }
    else {
      showToaster({
        message: "Failed to send OTP",
        severity: "error"
      })
    }
  }

  const verifyOtpHandler = async () => {
    const response = await dispatch(verifyRegistrationOTP({ url: ENDPOINTS.verifyRegistrationOTP, body: { ContactNo: getValues("PhoneNumber"), OTP: getValues("OTP") } }));

    if (hasFulfilled(response.type)) {
      const resData = response?.payload?.data.data;
      if (resData == true) {
        setIsOtpVerified(true)
        showToaster({
          message: response?.payload?.data.message,
          severity: "success"
        })
      }
      else {
        showToaster({
          message: "Failed to veify OTP",
          severity: "error"
        })
      }
    }
    else {
      showToaster({
        message: "Failed to verify OTP",
        severity: "error"
      })
    }
  }
  const [validImageUrls, setValidImageUrls] = useState<any[]>([]);

  useEffect(() => {
    const fetchValidUrls = async () => {
      // if want to any new pic then update here 
      const imageUrls = [
        configDetailsState?.Registrationpage_Bottom_Leftside_pic_one?.value,
        configDetailsState?.Registrationpage_Bottom_Leftside_pic_two?.value,
        configDetailsState?.Registrationpage_Bottom_Leftside_pic_three?.value,
        configDetailsState?.Registrationpage_Bottom_Leftside_pic_four?.value,
        configDetailsState?.Registrationpage_Bottom_Leftside_pic_five?.value,
      ];

      const validUrls: any[] = [];
      for (const url of imageUrls) {
        if (url) {
          const isValid = await checkImageUrl(url);
          console.log("🚀 ~ fetchValidUrls ~ isValid:", isValid)
          if (isValid) {
            validUrls.push(url);
          }
        }
      }
      setValidImageUrls(validUrls);
    };

    fetchValidUrls();
  }, [configDetailsState]);

  useEffect(() => {
    setHeaderHeight(document.querySelector("#HeaderWrapper")?.clientHeight ?? 130)
    setSliderImageHeight(document.body.clientHeight - headerHeight - topImageMinHeight)
  }, [trigger, headerHeight, sliderImageHeight, isMobile])

  return (
    <MainLayout blackTheme>
      {openToaster && <Toaster />}
      <Loader open={loading} />
      <Stack id="RegistrationPage">
        <Stack className="LeftPart">
          <Box className="StickyWrapper" sx={{ top: !isMobile ? headerHeight : null }}>
            <Stack className="ContentWrapper" sx={{ backgroundImage: `url(${configDetailsState?.Registrationpage_Top_Leftside_pic?.value})`, minHeight: !isMobile ? topImageMinHeight : null }}>
              <Box dangerouslySetInnerHTML={{
                __html: configDetailsState?.Registrationpage_Top_Leftside_pic_Text?.value
              }}></Box>
            </Stack>
            <Box className="SliderWrapper">
              <Box className="SwiperContainer CircleSwiperPaginationWhite">
                <Swiper {...config}>
                  {validImageUrls.map((url) => {
                    return (
                      <SwiperSlide>
                        <Box className="ImageWrapper">
                          <img src={url} alt="Registration featured image" style={{ height: !isMobile ? sliderImageHeight : null }} />
                        </Box>
                      </SwiperSlide>
                    )
                  })}
                </Swiper>
              </Box>
            </Box>
          </Box>
        </Stack>
        <Box className="RightPart">
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Box className="Header">
              <Typography className="Title" variant="h4" component="p">{configDetailsState?.Registrationpage_Title?.value}</Typography>
              <Typography className="Description" variant="body2">{configDetailsState?.Registrationpage_Subtitle?.value}</Typography>
            </Box>
            <Stack className="AllFields">
              <Stack className="Column">
                <RenderFields
                  register={register}
                  error={errors.FirstName}
                  name="FirstName"
                  placeholder="First Name"
                  control={control}
                  variant="outlined"
                  margin="none"
                  fullWidth
                />
                <RenderFields
                  register={register}
                  error={errors.LastName}
                  name="LastName"
                  placeholder="Last Name"
                  control={control}
                  variant="outlined"
                  margin="none"
                  fullWidth
                />
              </Stack>
              <Stack className="Column">
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
                />
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
                />
              </Stack>
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
                register={register}
                error={errors.Email}
                name="Email"
                placeholder="E-mail"
                control={control}
                variant="outlined"
                margin="none"
                fullWidth
              />
              <Box className="OTPWrapper">
                <Stack className="Column">
                  <Box className="PhoneNumber">
                    <RenderFields
                      register={register}
                      type="phoneInput"
                      control={control}
                      setValue={setValue}
                      name="PhoneNumber"
                      error={errors.PhoneNumber}
                      value={phoneNumberValue.value}
                      setPhoneNumberValue={setPhoneNumberValue}
                      className="ContactSelect"
                      variant="outlined"
                      margin="none"
                      fullWidth
                    />
                    <Button variant="contained" onClick={getOtpHandler} disabled={!!errors.PhoneNumber || !phoneNumberValue.value}>GET OTP</Button>
                  </Box>
                  {showOTPField && <RenderFields
                    register={register}
                    error={errors.OTP}
                    name="OTP"
                    placeholder="OTP"
                    control={control}
                    variant="outlined"
                    margin="none"
                    className="OTPField"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton onClick={verifyOtpHandler}>
                          <SmallRightIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                    fullWidth
                  />}
                </Stack>
                {showOTPField && <Stack className="ResendOTP">
                  <Typography className="Message">Didn't received OTP? <Typography color="primary.main" variant="inherit" component="span">
                    00:{timer < 10 ? `0${timer}` : timer}
                  </Typography></Typography>
                  <Button onClick={handleResendClick} disabled={isButtonDisabled}>Resend OTP</Button>
                </Stack>}
              </Box>
              <GoogleMaps setParsedAddress={setGoogleAddressComponents} />
              <RenderFields
                register={register}
                error={errors.Address1}
                name="Address1"
                placeholder="Address line 1"
                control={control}
                variant="outlined"
                margin="none"
                fullWidth
              />
              <RenderFields
                register={register}
                error={errors.Address2}
                name="Address2"
                placeholder="Address line 2"
                control={control}
                variant="outlined"
                margin="none"
                fullWidth
              />
              <Stack className="Column">
                {countryList?.length > 0 &&
                  <RenderFields
                    register={register}
                    type="select"
                    control={control}
                    clearErrors={clearErrors}
                    error={errors.Country}
                    name="Country"
                    getValues={getValues}
                    variant="outlined"
                    margin="none"
                    value={countryValue}
                    setValue={setValue}
                    onChange={OnChange}
                    fullWidth
                  >
                    <MenuItem value="none">Select Country</MenuItem>
                    {countryList.map((country: StateOrCountry) => (
                      <MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>
                    ))}
                  </RenderFields>}
                <Box className="InputRow">
                  <Autocomplete
                    disablePortal
                    options={stateList}
                    getOptionLabel={option => {
                      if (typeof option === "string") {
                        return option;
                      }
                      return option.name;
                    }}
                    renderInput={(params) => <TextField placeholder="Select State" {...params} error={errors.State as boolean | undefined} />}
                    onChange={(_, value) => {
                      if (!value) {
                        return;
                      }

                      if (typeof value === "string") {
                        setValue("State", value);
                      }
                      else {
                        setValue("State", value.name);
                      }
                    }}
                    inputValue={stateValue ?? ""}
                    onInputChange={(event, newInputValue) => {
                      setValue("State", newInputValue);
                      setstateValue(newInputValue)
                      if (newInputValue !== "") {
                        clearErrors("State")
                      }
                      else {
                        setError("State", {
                          type: "manual",
                          message: "State is a required field"
                        });
                      }
                    }}
                    freeSolo
                    fullWidth
                  />
                  {!!errors["State"] && (
                    <FormHelperText className={classNames({ "Mui-error": !!errors["State"] })}>
                      {errors.State.message}
                    </FormHelperText>
                  )}
                </Box>
              </Stack>
              <Stack className="Column">
                <RenderFields
                  register={register}
                  error={errors.City}
                  name="City"
                  placeholder="Town / City"
                  control={control}
                  variant="outlined"
                  margin="none"
                  fullWidth
                />
                <RenderFields
                  type="number"
                  register={register}
                  error={errors.Code}
                  name="Code"
                  placeholder="Post Code"
                  control={control}
                  variant="outlined"
                  margin="none"
                  fullWidth
                />
              </Stack>
              <Box className="UserType">
                <RadioGroup
                  defaultValue="agent"
                  name="UserType"
                  value={radioButtonInput}
                  onChange={(e) => {
                    setRadioButtonInput(e.target.value)
                    if (e.target.value === "agent") {
                      setIncludeAgentCode(true)
                    }
                    else {
                      setIncludeAgentCode(false)
                    }
                  }}
                  row
                >
                  <FormControlLabel value="agent" control={<Radio />} label="Agent" />
                  <FormControlLabel value="dailyPriceAlert" control={<Radio />} label="Daily Price Alert" />
                  <FormControlLabel value="newsletter" control={<Radio />} label="Newsletter" />
                </RadioGroup>
                {radioButtonInput == "agent" && <RenderFields
                  register={register}
                  error={errors.AgentCode}
                  name="AgentCode"
                  placeholder="Agent Code"
                  control={control}
                  className="AgentCode"
                  variant="outlined"
                  margin="none"
                  fullWidth
                />}
              </Box>
              <Box className="AgreementWrapper">
                <RenderFields
                  type="checkbox"
                  register={register}
                  name="PrivacyPolicy"
                  label={
                    <Typography>I Have Read And Agree The <Link to="#">Privacy Policy</Link></Typography>
                  }
                  margin="none"
                />
                <RenderFields
                  type="checkbox"
                  register={register}
                  name="TermsCondition"
                  label={
                    <Typography>I Have Read And Agree The <Link to="#">Terms & Condition</Link></Typography>
                  }
                  margin="none"
                />
              </Box>
            </Stack>
            <Stack className="ActionWrapper">
              <Button type="submit" variant="contained" size="large" fullWidth disabled={loading || !privacyPolicy || !termsAndCondition}>
                Agree And Create Account
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </MainLayout>
  )
}

export default Registration