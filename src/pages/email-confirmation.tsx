import React, { useLayoutEffect, useMemo, useState } from "react"
import { Container, Box, Typography, Button } from "@mui/material"
import { Link, navigate } from "gatsby"

// Assets
import { TickIcon, ContainedCrossIcon } from "@/assets/icons"
// Utils
import { ENDPOINTS } from "@/utils/constants"

// Components
import MainLayout from "@/components/common/MainLayout"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { getLastPage } from "@/utils/common"
import { registrationTokenVarified } from "@/redux/reducers/authReducer"
import { isActionRejected } from "@/components/common/Utils"
import { AxiosError } from "axios"
import classNames from "classnames"

function EmailConfirmation() {
  const searchParams = useMemo(() => new URLSearchParams(window.location.search), [window.location.search]);
  const isLoggedIn = useAppSelector(state => state.homePage.isLoggedIn)
  const [loading, setLoading] = useState<boolean>(false);
  const [isTokenVarified, setIsTokenVarified] = useState<boolean>(false)
  const [message, setMessage] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);

  const dispatch = useAppDispatch()
  useLayoutEffect(() => {
    const verifyToken = async () => {
      setLoading(() => true)
      const response: any = await dispatch(registrationTokenVarified({ url: ENDPOINTS.registrationTokenVerified.replace('{{token}}', searchParams.get("token") as string) }))
      if (isActionRejected(response.type)) {
        setLoginError(((response.payload as AxiosError).response?.data as { message?: string }).message || "Something went wrong")
        setLoading(() => false)
        return
      }
      setIsTokenVarified(true)
      setMessage(() => response?.payload?.data?.message)
      setLoginError(null)
      setLoading(() => false)
    }

    verifyToken()
    return () => {

    };
  }, [])

  if (isLoggedIn) {
    const lastPage = getLastPage();
    if (lastPage && !lastPage.includes('activate-account')) {
      navigate(lastPage, { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  }
  return (
    <MainLayout blackTheme>
      <Container id="EmailConfirmation">
        <Box className={classNames("Content", { "error": loginError })}>
          {loginError ? <ContainedCrossIcon className="TickIcon" /> : <TickIcon className="TickIcon" />}
          <Typography variant="h4" className="Title" component="p">{loginError ? 'Error' : 'Confirmation'}</Typography>
          <Typography className="Description" dangerouslySetInnerHTML={{
            __html: loginError ?? message
          }}>
            {/* Your email has been successfully verified. Please <Link to={ENDPOINTS.login} className="Link">click here</Link> to login. */}
          </Typography>
          <Button variant="contained" size="large" className="ActionButton" onClick={() => navigate(ENDPOINTS.login)}>Sign Me In</Button>
        </Box>
      </Container>
    </MainLayout>
  )
}

export default EmailConfirmation