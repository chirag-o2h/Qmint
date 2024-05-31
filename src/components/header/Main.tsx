import React, { useMemo } from "react"
import { useMediaQuery, Container, Stack, Button, Link as LinkM, IconButton, Typography, Box } from "@mui/material"

// Components
import SearchField from "./SearchField"

// Assets
import { Call, SignInIcon, SignOutIcon, HamburgerIcon, CrossIcon } from "../../assets/icons/index"
import { useAppDispatch, useAppSelector } from "@/hooks"

// Utils
import { ENDPOINTS } from "../../utils/constants"
import { Link, navigate } from "gatsby"
import { LogOutUserAPI } from "@/redux/reducers/homepageReducer"

function Main(props: any) {
  const dispatch = useAppDispatch()
  const { openMobileMenu, toggleMobileMenu } = (props)
  const mobile = useMediaQuery((theme: any) => theme.breakpoints.down('md'))
  const { configDetails: configDetailsState, isLoggedIn } = useAppSelector((state) => state.homePage)
  const handleAuth = () => {
    if (!isLoggedIn) {
      navigate('/login')
      return
    } else {
      dispatch(LogOutUserAPI() as any)
      navigate('/')
      return
    }
  }
  return (
    <Container className="MainHeader">
      <Stack className="MainHeader__Wrapper">
        <Stack className="Left">
          <Link className="Logo" to="/"><img src={mobile ? configDetailsState?.BrandLogoURL_Header?.value : configDetailsState?.BrandLogoURL_Header?.value} width={mobile ? 190 : 246} height={mobile ? 30 : 40} alt="QMint logo" loading="eager" /></Link>
        </Stack>
        <Stack className="Right">
          {!mobile && <Box className="Marketingoffer" dangerouslySetInnerHTML={{ __html: configDetailsState?.["ShopHomepage_Header_Marketing_Image"]?.value }}></Box>}
          {configDetailsState?.Phone_MenuIcon_Enable?.value !== false && <LinkM href={"tel:" + configDetailsState?.["StorePhoneNumber_AU"]?.value} variant="overline" className="PhoneNumber" aria-label="PhoneNumber"><Call />{configDetailsState?.["StorePhoneNumber_AU"]?.value}</LinkM>}
          <SearchField />
          {/* <Link to={ENDPOINTS.login}> */}
          <Button name='signIn' aria-label='signIn' onClick={handleAuth} className="SignInButton" variant="outlined" color="primary" startIcon={!isLoggedIn ? <SignInIcon /> : <SignOutIcon />}><Typography variant="inherit">{!isLoggedIn ? 'Sign In' : 'Sign Out'}</Typography></Button>
          {/* </Link> */}
          <IconButton color="secondary" title="menuButton" area-label="HamburgerMenuButton" className="HamburgerButton MenuButton" onClick={toggleMobileMenu}>{!openMobileMenu ? <HamburgerIcon className="HamburgerIcon" /> : <CrossIcon className="CrossIcon" />}</IconButton>
        </Stack>
      </Stack>
    </Container>
  )
}

export default React.memo(Main)