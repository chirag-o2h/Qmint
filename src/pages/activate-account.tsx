import React from "react"
import { Container, Box, Typography, Button, Divider } from "@mui/material"
import { navigate } from "gatsby"

// Utils
import { ENDPOINTS } from "@/utils/constants"

// Components
import Layout from "@/components/common/Layout"
import { useAppSelector } from "@/hooks"
import { getLastPage } from "@/utils/common"

function ActivateAccount() {
  // this page is only visible if user has not logged in
  const callResentAndTryAgainEmail = () => {

  }
  const isLoggedIn = useAppSelector(state => state.homePage.isLoggedIn)
  if (isLoggedIn) {
    const lastPage = getLastPage();
    if (lastPage && !lastPage.includes('activate-account')) {
      navigate(lastPage, { replace: true });
    }else{
      navigate('/', { replace: true });
    }
  }
  return (
    <Layout>
      <Container id="ActivateAccount">
        <Box className="Content">
          <Typography variant="h4" className="Title" component="p">Activate Account</Typography>
          <Typography className="Description">
            An email has been Sent to <Typography variant="inherit" component="span">(info@example.com)</Typography> containing an activation link <br />Please click on the link to activate your account
          </Typography>
          <Typography variant="overline" className="HelperText" component="p">Didn't receive an email? Check your span folder!</Typography>
          <Button className="ResendLink" onClick={() => {
            callResentAndTryAgainEmail()
          }}>Resend and try again</Button>
          <Divider />
          <Typography className="NavigateText">If you have already validated your account, click below to login</Typography>
          <Button variant="contained" size="large" className="ActionButton" onClick={() => navigate(ENDPOINTS.login)}>Sign Me In</Button>
        </Box>
      </Container>
    </Layout>
  )
}

export default ActivateAccount