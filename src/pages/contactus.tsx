import React from 'react'
import Seo from "../components/common/Seo"
import Layout from "@/components/common/Layout";
import { Box, Container, Typography, Stack, Icon, Link } from "@mui/material"
// Utils
import { PageTitle } from "@/components/common/Utils"
import SocialNetwork from "@/components/partials/contactus/SocialNetwork";

// Assets
import { AddressIcon, Calling, Email, } from "../assets/icons/index"
import ContactUsForm from '@/components/partials/contactus/ContactUsForm';
import useAPIoneTime from '@/hooks/useAPIoneTime';
import { getConfiguration, getReasonsForContactUs } from '@/redux/reducers/contactUs';
import { ENDPOINTS } from '@/utils/constants';
import Map from '@/components/partials/contactus/Map';
import { useAppSelector } from '@/hooks';
import Loader from '@/components/common/Loader';
import Toaster from '@/components/common/Toaster';
import MainLayout from '@/components/common/MainLayout';

function ContactUs() {
  const openToaster = useAppSelector(state => state.homePage.openToaster)
  const checkLoadingStatus = useAppSelector(state => state.homePage.loading);
  const configDetails = useAppSelector(state => state.homePage.configDetails)
  // console.log("🚀 ~ ContactUs ~ configDetails:", configDetails)
  useAPIoneTime({ service: getReasonsForContactUs, endPoint: ENDPOINTS.reasonsForContact })
  useAPIoneTime({ service: getConfiguration, endPoint: ENDPOINTS.getContactUsConfiguration })

  return (
    <MainLayout blackTheme>
      {checkLoadingStatus && <Loader open={checkLoadingStatus} />}
      <Seo
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title=""
        lang="en"
      />
      {openToaster && <Toaster />}
      <Box id="ContactUsPage" className='ContactUsPage' component="section">
        <Box className="TitleWrapper">
          <PageTitle title="Contact us" />
        </Box>
        <Container>
          <Stack className="ContactCardsWrapper">
            <Box className="AddressWrapper ContactCard">
              <Box className="IconWrapper" sx={{backgroundColor: "primary.main"}}>
                <Icon className='OriginalIcon'><AddressIcon /></Icon>
              </Box>
              <Typography variant="h4" component="h2" className="Title">Address</Typography>
              <Typography variant="body1" className="AddressDesription">{configDetails?.Store_Address?.value}</Typography>
            </Box>
            <Box className="CallUsWrapper ContactCard">
              <Box className="IconWrapper" sx={{backgroundColor: "primary.main"}}>
                <Icon className='OriginalIcon'><Calling /></Icon>
              </Box>
              <Typography variant="h4" component="h2" className="Title">Call us</Typography>
              <Link href={`tel:${configDetails?.["StorePhoneNumber_International"]?.value}`} variant="body1" className="CallUsNumber">International: {configDetails?.["StorePhoneNumber_International"]?.value}</Link>
              <Link href={`tel:${configDetails?.["StorePhoneNumber_AU"]?.value}`} variant="body1" className="CallUsNumber">Australia: {configDetails?.["StorePhoneNumber_AU"]?.value}</Link>
            </Box>
            {/* <Box className="EmailWrapper ContactCard">
              <Box className="IconWrapper" sx={{backgroundColor: "primary.main"}}>
                <Icon className='OriginalIcon'><Email /></Icon>
              </Box>
              <Typography variant="h4" component="h2" className="Title">Email Id</Typography>
              <Link href={`mailto: ${configDetails?.storecontactemail?.value}`} variant="body1" className="EmailAddress">{configDetails?.storecontactemail?.value}</Link>
            </Box> */}
          </Stack>
          <Box className="GetInTouchWrapper">
            {/* <ContactUsForm /> */}
            <Map />
          </Box>
          <SocialNetwork />
        </Container>
      </Box>

    </MainLayout>)
}

export default ContactUs