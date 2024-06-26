import React, { useMemo } from "react"
import { useMediaQuery, Container, Stack, Button, Link as LinkM, IconButton, Typography, Box, useScrollTrigger } from "@mui/material"

// Components
import SearchField from "./SearchField"

// Assets
import { Call, SignInIcon, SignOutIcon, HamburgerIcon, CrossIcon } from "../../assets/icons/index"
import { useAppDispatch, useAppSelector } from "@/hooks"

// Utils
import { ENDPOINTS } from "../../utils/constants"
import { Link, navigate } from "gatsby"
import { LogOutUserAPI } from "@/redux/reducers/homepageReducer"
import { THEME_TYPE } from "@/axiosfolder"
import useImageInView from "@/hooks/useImageInView"

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
  const trigger = THEME_TYPE == "1" ? useImageInView(): useScrollTrigger({
    disableHysteresis: true,
    threshold: mobile ? 68 : 50,
  })
  return (
    <Container className="MainHeader">
      <Stack className="MainHeader__Wrapper">
        <Stack className="Left">
          <Link className="Logo" to="/"><img src={configDetailsState?.[trigger ? "Brand_Dark_LogoURL" : "BrandLogoURL_Header"]?.value} width={mobile ? 190 : 246} height={mobile ? 30 : 40} alt="QMint logo" loading="lazy" /></Link>
        </Stack>
        <Stack className="Right">
          {!mobile && <Box className="Marketingoffer" dangerouslySetInnerHTML={{ __html: configDetailsState?.["ShopHomepage_Header_Marketing_Image"]?.value }}></Box>}
          {configDetailsState?.Phone_MenuIcon_Enable?.value !== false && <LinkM href={"tel:" + configDetailsState?.["StorePhoneNumber_AU"]?.value} variant="overline" className="PhoneNumber" aria-label="PhoneNumber"><Call />{configDetailsState?.["StorePhoneNumber_AU"]?.value}</LinkM>}
          {configDetailsState?.Search_MenuIcon_Enable?.value && <SearchField />}
          {/* <Link to={ENDPOINTS.login}> */}
          <Button name='signIn' aria-label='signIn' onClick={handleAuth} className="SignInButton" variant={THEME_TYPE === "1" ? "contained" : "outlined"} color="primary" startIcon={!isLoggedIn ? <SignInIcon /> : <SignOutIcon />}><Typography variant="inherit">{!isLoggedIn ? 'Sign In' : 'Sign Out'}</Typography></Button>
          {/* </Link> */}
          <IconButton color="secondary" title="menuButton" area-label="HamburgerMenuButton" className="HamburgerButton MenuButton" onClick={toggleMobileMenu}>{!openMobileMenu ? <HamburgerIcon className="HamburgerIcon" /> : <CrossIcon className="CrossIcon" />}</IconButton>
        </Stack>
      </Stack>
    </Container>
  )
}

export default React.memo(Main)