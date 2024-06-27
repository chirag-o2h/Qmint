import React, { useEffect, useState } from "react"
import { Container, Box, Typography, Button, Divider } from "@mui/material"
import { navigate } from "gatsby"

// Utils
import { ENDPOINTS } from "@/utils/constants"

// Components
import MainLayout from "@/components/common/MainLayout"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { getLastPage } from "@/utils/common"
import { resendRegstrationEmail } from "@/redux/reducers/authReducer"
import Toaster from "@/components/common/Toaster"
import Loader from "@/components/common/Loader"
import { isActionRejected } from "@/components/common/Utils"
import useShowToaster from "@/hooks/useShowToaster"

function ActivateAccount() {
  const [loading, setLoading] = useState(false)
  const openToaster = useAppSelector(state => state.homePage.openToaster)
  const dispatch = useAppDispatch()
  const { showToaster } = useShowToaster();
  // this page is only visible if user has not logged in
  const callResentAndTryAgainEmail = async () => {
    setLoading(true)
    const response: any = await dispatch(resendRegstrationEmail({ url: ENDPOINTS.resendRegstrationEmail.replace('{{email}}', localStorage.getItem('emailUseForRegrastration') as string) }))
    if (!isActionRejected(response.type)) {
      showToaster({
        message: response?.payload?.data.message,
        severity: "success"
      })
    }else{
      showToaster({
        message: 'Something went wrong.',
        severity: "error"
      })
    }
    setLoading(false)
  }
  const isLoggedIn = useAppSelector(state => state.homePage.isLoggedIn)
  if (isLoggedIn) {
    const lastPage = getLastPage();
    if (lastPage && !lastPage.includes('activate-account')) {
      navigate(lastPage, { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  }
  const [data, setData] = useState(null);
  useEffect(() => {
    const storedValue: any = localStorage.getItem("messageDataForRegistration");
    setData(storedValue);
    return () => {
      localStorage.removeItem("messageDataForRegistration"); // Clear after use
      localStorage.removeItem('emailUseForRegrastration')
    }
  }, []);
  return (
    <MainLayout blackTheme>
      {openToaster && <Toaster />}
      {loading && <Loader open={loading} />}
      <Container id="ActivateAccount">
        <Box className="Content">
          <Typography variant="h4" className="Title" component="p">Activate Account</Typography>
          <Typography className="Description" dangerouslySetInnerHTML={{ __html: data }}>
            {/* An email has been Sent to <Typography variant="inherit" component="span">(info@example.com)</Typography> containing an activation link <br />Please click on the link to activate your account */}
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
    </MainLayout>
  )
}

export default ActivateAccount