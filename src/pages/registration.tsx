import React, { useState, useEffect, useRef } from "react"
import { Box, Typography, Button, Stack, MenuItem, Autocomplete, FormHelperText, TextField, IconButton, InputAdornment, FormControlLabel, Radio, RadioGroup } from "@mui/material"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, A11y } from 'swiper/modules'
import classNames from "classnames"
import { SwiperOptions } from "swiper/types"
import { Link } from "gatsby"

// Assets
import { ContainedCheckIcon, ContainedCrossIcon, TickIcon } from "@/assets/icons"

// Hooks
import { useAppDispatch, useAppSelector } from "@/hooks"

// Utils

// Components
import Layout from "@/components/common/Layout"
import GoogleMaps from "@/components/common/GoogleMaps"
import RenderFields from "@/components/common/RenderFields"
import { AddressComponents } from "@/utils/parseAddressComponents"
import { isValidPhoneNumber } from "@/components/common/Utils"
import { StateOrCountry } from "@/redux/reducers/checkoutReducer";

interface Inputs {
  FirstName: string,
  LastName: string,
  Password: string,
  "Confirm password": string,
  Contact: string,
  Email: string,
  PhoneNumber: string,
  OTP: string,
  Address1: string,
  Address2: string,
  City: string,
  Country: string,
  State: string,
  Code: number,
  "Agent code": string
}

function Registration() {
  const dispatch = useAppDispatch();
  const countryList = useAppSelector(state => state.checkoutPage.countryList);
  const stateListall = useAppSelector(state => state.checkoutPage.stateList);
  const [stateList, setStateList] = useState<{ id: number, name: string }[]>([])
  const [googleAddressComponents, setGoogleAddressComponents] = useState<AddressComponents & { postalCode?: string } | null>(null);
  const [countryValue, setcountryValue] = useState<any>("none")
  const [isAddressGoogleVerified, setIsAddressGoogleVerified] = useState<boolean>(false)
  const [stateValue, setstateValue] = useState<any>(undefined)
  const [phoneNumberValue, setPhoneNumberValue] = useState<{ value: string, country: any }>({
    value: "",
    country: {}
  })

  const firstTimeRender = useRef(true);

  const addressSchema = yup.object().shape({
    FirstName: yup.string().trim().required("First name is a required field"),
    LastName: yup.string().trim().required("Last name is a required field"),
    Company: yup.string().trim(),
    Contact: yup.string().trim().test("valid-phone-number", "Please enter a valid phone number",
      function (value) {
        if (value) return isValidPhoneNumber(value, phoneNumberValue?.country?.countryCode);
        else return false;
      }),
    Password: yup.string().trim().required(),
    "Confirm password": yup.string().trim().required(),
    Email: yup.string().email().required(),
    PhoneNumber: yup.string().trim().test('valid-phone-number', 'Please enter a valid phone number',
      function (value) {
        if (value) return isValidPhoneNumber(value, phoneNumberValue?.country?.countryCode);
        else return false;
      }),
    OTP: yup.string().required().trim().required(),
    Address1: yup.string().trim().required("Address 1 in required field"),
    Address2: yup.string().trim(),
    City: yup.string().required().trim(),
    State: yup.string().required(),
    Country: yup.string().notOneOf(["none"], "Country is required field"),
    Code: yup.string().required("Zip / Postal code is required").trim(),
    "Agent code": yup.string().required(),
  })

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
    resolver: yupResolver(addressSchema)
  })

  const handleFormSubmit = (data: any) => {
    console.log("🚀 ~ handleSubmit ~ data:", data)
  }

  const renderPasswordConditionItem = (condition: string, status: boolean) => {
    return (
      <Stack className="PasswordConditionItem">
        {status ? <ContainedCheckIcon /> : <ContainedCrossIcon />}
        <Typography>{condition}</Typography>
      </Stack>
    )
  }

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

  const config: SwiperOptions = {
    slidesPerView: 1.5,
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

  return (
    <Layout>
      <Stack id="RegistrationPage">
        <Stack className="LeftPart">
          <Box className="ContentWrapper" sx={{ backgroundImage: `url("https://picsum.photos/200/300")` }}>
            <Typography className="Title" variant="h1" component="p">Need account for your Business</Typography>
            <Typography className="Subtitle" variant="subtitle2">Superfund or Trust</Typography>
          </Box>
          <Box className="SliderWrapper">
            <Box className="SwiperContainer CircleSwiperPagination">
              <Swiper {...config}>
                {[1, 2, 3].map((item) => {
                  return (
                    <SwiperSlide>
                      {item}
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            </Box>
          </Box>
        </Stack>
        <Box className="RightPart">
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Box className="Header">
              <Typography className="Title" variant="h4" component="p">Personal Info & Address</Typography>
              <Typography className="Description" variant="body2">An Easier way to Get Registered With Us</Typography>
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
                  control={control}
                  variant="outlined"
                  margin="none"
                  fullWidth
                />
                <RenderFields
                  type="password"
                  register={register}
                  error={errors["Confirm password"]}
                  name="ConfirmPassword"
                  placeholder="Confirm Password"
                  control={control}
                  variant="outlined"
                  margin="none"
                  fullWidth
                />
              </Stack>
              <Box className="PasswordCondition">
                <Typography>Your Password Must :</Typography>
                <Stack className="ConditionWrapper">
                  {renderPasswordConditionItem("Be at least 8 character in length", true)}
                  {renderPasswordConditionItem("An uppercase letter ( A - Z )", false)}
                  {renderPasswordConditionItem("An lowercase Letter (a - z )", true)}
                  {renderPasswordConditionItem("A number ( 0 - 9 )", true)}
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
                  <RenderFields
                    register={register}
                    error={errors.OTP}
                    name="OTP"
                    placeholder="OTP"
                    control={control}
                    variant="outlined"
                    margin="none"
                    fullWidth
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                        >
                          <TickIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </Stack>
                <Stack className="ResendOTP">
                  <Typography>Didn't received OTP? <Typography color="primary.main" variant="inherit" component="span">00:20</Typography></Typography>
                  <Button>Resent OTP</Button>
                </Stack>
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
                    onChange={() => {
                      setIsAddressGoogleVerified(false)
                    }}
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
                  row
                >
                  <FormControlLabel value="agent" control={<Radio />} label="Agent" />
                  <FormControlLabel value="dailyPriceAlert" control={<Radio />} label="Daily Price Alert" />
                  <FormControlLabel value="newsletter" control={<Radio />} label="Newsletter" />
                </RadioGroup>
                <RenderFields
                  register={register}
                  error={errors["Agent code"]}
                  name="AgentCode"
                  placeholder="Agent Code"
                  control={control}
                  variant="outlined"
                  margin="none"
                  fullWidth
                />
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
              <Button type="submit" variant="contained" size="large" fullWidth>
                Agree And Create Account
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Layout>
  )
}

export default Registration