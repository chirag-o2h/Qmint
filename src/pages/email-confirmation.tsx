import React from "react"
import { Container, Box, Typography, Button } from "@mui/material"
import { Link, navigate } from "gatsby"

// Assets
import { TickIcon } from "@/assets/icons"

// Utils
import { ENDPOINTS } from "@/utils/constants"

// Components
import MainLayout from "@/components/common/MainLayout"
import { useAppSelector } from "@/hooks"
import { getLastPage } from "@/utils/common"

function EmailConfirmation() {
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
    <MainLayout blackTheme>
      <Container id="EmailConfirmation">
        <Box className="Content">
          <TickIcon className="TickIcon" />
          <Typography variant="h4" className="Title" component="p">Confirmation</Typography>
          <Typography className="Description">
            Your email has been successfully verified. Please <Link to={ENDPOINTS.login} className="Link">click here</Link> to login.
          </Typography>
          <Button variant="contained" size="large" className="ActionButton" onClick={() => navigate(ENDPOINTS.login)}>Sign Me In</Button>
        </Box>
      </Container>
    </MainLayout>
  )
}

export default EmailConfirmation