import React from "react"
import { Box, Stack, Button, Container } from "@mui/material"
import { useForm } from "react-hook-form";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

// Assets
import NewsletterBG from "@/assets/images/NewsletterBG.png"

// Components
import RenderFields from "@/components/common/RenderFields";
import { BullionmarkSectionHeading } from "@/components/common/Utils";
import ConfigServices, { IBullionMarkSubscriptionDetails } from "@/apis/services/ConfigServices";
import useShowToaster from "@/hooks/useShowToaster";
import { useAppSelector } from "@/hooks";
import Toaster from "@/components/common/Toaster";


const schema = yup.object().shape({
  FirstName: yup.string().required('First name is required'),
  LastName: yup.string().required('Last name is required'),
  PhoneNumber: yup.string()
    .matches(/^(\+?[0-9]{1,3})?[0-9]{6,15}$/, 'Phone number must be a valid format, optionally with country code')
    .min(6, 'Phone number must be at least 6 digits')
    .max(15, 'Phone number must be at most 15 digits')
    .required('Phone number is required'),
  Email: yup.string().email('Invalid email address').required('Email address is required'),
  AllowEmailSend: yup.boolean(),
});
function Newsletter() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IBullionMarkSubscriptionDetails>({
    resolver: yupResolver(schema)
  })
  const { bullionMarkPage, openToaster } = useAppSelector(state => state.homePage)
  const { showToaster } = useShowToaster();

  const onSubmit = async (data: IBullionMarkSubscriptionDetails) => {
    try {
      const response = await ConfigServices.sendSubscriptionDetailsForTheBullionmarkHomePage({...data} as IBullionMarkSubscriptionDetails)
      showToaster({
        message: response?.data?.message,
        severity: 'success'
      })
      reset()
      console.log("🚀 ~ onSubmit ~ res:", response)
    } catch (error:any) {
      console.log("🚀 ~ onSubmit ~ error:", error)
      showToaster({
        message: error?.response?.data?.message,
        severity: 'error'
      })
    }
    // if(){
    //   showToaster({
    //     message: `Can not add more than  items to cart.`,
    //     severity: 'error'
    //   })
    // }
  }

  const newsletter = bullionMarkPage?.homepage_Section_8_Footer_background_pic

  return (
    <Box id="SectionNewsletter" component="section">
      {openToaster && <Toaster />}
      {/* <img className="NewsletterBG" src={NewsletterBG} alt="" /> */}
      <Box className="NewsletterBG" dangerouslySetInnerHTML={{
          __html: newsletter?.[0]?.overview
      }}></Box>
      <Box className="BackgroundHolder">
        <Container maxWidth="sm">
          <BullionmarkSectionHeading
            title="Receive inspiration in your inbox"
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
              error={errors["PhoneNumber"]}
              name="PhoneNumber"
              placeholder="Phone Number"
              control={control}
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
    </Box>
  )
}

export default Newsletter