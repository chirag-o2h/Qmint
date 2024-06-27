import React, { useEffect, useState } from "react"
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
import Toaster from "@/components/common/Toaster"
import Loader from "@/components/common/Loader"

function Confirmation(props: any) {
  const [loading, setLoading] = useState(false)
  const openToaster = useAppSelector(state => state.homePage.openToaster)
  const isLoggedIn = useAppSelector(state => state.homePage.isLoggedIn)
  const [data, setData] = useState(null);
  // console.log("🚀 ~ Confirmation ~ props:", props, "--", data)
  useEffect(() => {
    const storedValue: any = localStorage.getItem("messageDataForRegistration");
    setData(storedValue);
    return () => {
      localStorage.removeItem("messageDataForRegistration"); // Clear after use
    }
  }, []);
  if (isLoggedIn) {
    const lastPage = getLastPage();
    if (lastPage && !lastPage.includes('confirmation')) {
      navigate(lastPage, { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  }
  return (
    <MainLayout blackTheme>
      {openToaster && <Toaster />}
      {loading && <Loader open={loading} />}
      <Container id="Confirmation">
        <Box className="Content">
          <TickIcon className="TickIcon" />
          <Typography variant="h4" className="Title" component="p">Confirmation</Typography>
          <Typography className="Description" dangerouslySetInnerHTML={{ __html: data }}>
            {/* Account with this email address is already registered with us on  <Link to="https://bullionmark.com.au" className="Link">https://bullionmark.com.au</Link> Please click below to login using the same */}
          </Typography>
          <Button variant="contained" size="large" className="ActionButton" onClick={() => navigate(ENDPOINTS.login)}>Sign Me In</Button>
        </Box>
      </Container>
    </MainLayout>
  )
}

export default Confirmation