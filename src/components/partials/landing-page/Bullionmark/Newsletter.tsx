import React, { useEffect, useRef, useState } from "react"
import { Box, Stack, Button, Container } from "@mui/material"
import { useForm } from "react-hook-form";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

// Assets
import NewsletterBG from "@/assets/images/NewsletterBG.png"

// Components
import RenderFields from "@/components/common/RenderFields";
import { BullionmarkSectionHeading, isValidPhoneNumber } from "@/components/common/Utils";
import ConfigServices, { IBullionMarkSubscriptionDetails } from "@/apis/services/ConfigServices";
import useShowToaster from "@/hooks/useShowToaster";
import { useAppSelector } from "@/hooks";
import Toaster from "@/components/common/Toaster";



function Newsletter(props: any) {
  const schema = yup.object().shape({
    FirstName: yup.string().required('First name is required'),
    LastName: yup.string().required('Last name is required'),
    PhoneNumber: yup.string().trim().test('valid-phone-number', 'Please enter a valid phone number',
      function (value) {
        if (value) return isValidPhoneNumber(value, phoneNumberValue?.country?.countryCode);
        else return false;
      }),
    Email: yup.string().email('Invalid email address').required('Email address is required'),
    AllowEmailSend: yup.boolean(),
  });
  const firstTimeRender = useRef(true);

  const {
    register,
    handleSubmit,
    control,
    clearErrors,
    setError,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IBullionMarkSubscriptionDetails>({
    resolver: yupResolver(schema)
  })
  const { bullionMarkPage, openToaster } = useAppSelector(state => state.homePage)
  const { showToaster } = useShowToaster();
  const [phoneNumberValue, setPhoneNumberValue] = useState<{ value: string, country: any }>({
    value: "",
    country: {}
  })

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

  const onSubmit = async (data: IBullionMarkSubscriptionDetails) => {
    try {
      const response = await ConfigServices.sendSubscriptionDetailsForTheBullionmarkHomePage({ ...data } as IBullionMarkSubscriptionDetails)
      showToaster({
        message: response?.data?.message,
        severity: 'success'
      })
      reset()
      setPhoneNumberValue({ value: "", country: {} })
      firstTimeRender.current = true;
    } catch (error: any) {
      showToaster({
        message: error?.response?.data?.message,
        severity: 'error'
      })
    }
  }

  const newsletter = bullionMarkPage?.homepage_Section_8_Footer_background_pic

  return (
    newsletter?.[0]?.overview ? <Box id="SectionNewsletter" component="section">
      {openToaster && <Toaster />}
      {/* <img className="NewsletterBG" src={NewsletterBG} alt="" /> */}
      <Box className="NewsletterBG" dangerouslySetInnerHTML={{
        __html: newsletter?.[0]?.overview
      }}></Box>
      <Box className="BackgroundHolder">
        <Container maxWidth="sm">
          <BullionmarkSectionHeading
            title={props.title}
          />
          <form onSubmit={handleSubmit(onSubmit)}>
            <RenderFields
              register={register}
              error={errors["FirstName"]}
              name="FirstName"
              placeholder="First Name"
              control={control}
              variant="outlined"
              fullWidth
            />
            <RenderFields
              register={register}
              error={errors["LastName"]}
              name="LastName"
              placeholder="Last Name"
              control={control}
              variant="outlined"
              fullWidth
            />
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
              fullWidth
            />
            <RenderFields
              register={register}
              error={errors["Email"]}
              name="Email"
              placeholder="Enter Your Email Address"
              control={control}
              variant="outlined"
              fullWidth
            />
            <RenderFields
              type="checkbox"
              name="AllowEmailSend"
              className="Agreement"
              label="I'm happy to receive emails from Bullionmark"
              margin="none"
              register={register}
            />
            <Stack className="ActionWrapper">
              <Button type="submit" size="large" color="primary" variant="contained">Subscribe</Button>
            </Stack>
          </form>
        </Container>
      </Box>
    </Box> : null
  )
}

export default Newsletter