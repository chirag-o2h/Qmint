import React, { useMemo, lazy, useState, useEffect } from "react"
import { useMediaQuery, Container, Stack, Button, Link as LinkM, IconButton, Typography, Box } from "@mui/material"
import classNames from "classnames"
import { useLocation } from '@reach/router';


// Components
import SearchField from "./SearchField"

// Assets
import { Call, SignInIcon, SignOutIcon, HamburgerIcon, CrossIcon, BullionmarkSignInIcon } from "../../assets/icons/index"
import { useAppDispatch, useAppSelector } from "@/hooks"

// Utils
import { ENDPOINTS } from "../../utils/constants"
import { Link, navigate } from "gatsby"
import { CategoriesListDetails, LogOutUserAPI } from "@/redux/reducers/homepageReducer"
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { STORE_CODE } from "@/axiosfolder";
const Navigation = lazy(() => import('./Navigation'))

function FrontMain(props: any) {
    const dispatch = useAppDispatch()
    const { openMobileMenu, toggleMobileMenu, trigger } = (props)
    const mobile = useMediaQuery((theme: any) => theme.breakpoints.down('md'))
    const { configDetails: configDetailsState, isLoggedIn } = useAppSelector((state) => state.homePage)
    const handleAuth = () => {
        if (!isLoggedIn) {
            navigate('/login')
        } else {
            dispatch(LogOutUserAPI() as any)
            navigate('/')
        }
    }
    const [params] = useState({ page: 0 })
    useAPIoneTime({ service: CategoriesListDetails, endPoint: ENDPOINTS.topCategoriesListWithSubCategories, params })

    const location = useLocation();
    const [isBullionmarkHomePage, setIsBullionmarkHomePage] = useState<boolean>(false)
    useEffect(() => {
        console.log(location.pathname);

        if (STORE_CODE === "7") {
            setIsBullionmarkHomePage(true)
        }
    }, [])
    return (
        <Box className="HeaderContainerWrapper">
            <Container className="MainHeader">
                <Stack className="MainHeader__Wrapper">
                    <Stack className="Left">
                        <Link className="Logo" to="/"><img src={configDetailsState?.["Homepage_HeaderLogo_URL"]?.value} width={mobile ? 190 : 246} height={mobile ? 30 : 40} alt="QMint white logo" loading="eager" /></Link>
                    </Stack>
                    <Stack className="Center">
                        <Navigation frontPage={true} showNavigation={true} />
                    </Stack>
                    <Stack className="Right">
                        {/* <Link to={ENDPOINTS.login}> */}
                        <Button name='signIn' aria-label='signIn' onClick={handleAuth} className={classNames("SignInButton ActionButton")} variant="outlined" startIcon={!isLoggedIn ? (isBullionmarkHomePage ? <BullionmarkSignInIcon /> : <SignInIcon />) : <SignOutIcon />}><Typography variant="inherit">{!isLoggedIn ? 'Sign In' : 'Sign Out'}</Typography></Button>
                        {/* <Button name='Contact us' aria-label='Contact us' onClick={() => { 
                            navigate('/contactus')
                        }} variant="outlined" className="ActionButton">Contact Us</Button> */}
                        {/* </Link> */}
                        <IconButton color="secondary" area-label="HamburgerMenuButton" className="HamburgerButton MenuButton" onClick={toggleMobileMenu}>{!openMobileMenu ? <HamburgerIcon className="HamburgerIcon" /> : <CrossIcon className="CrossIcon" />}</IconButton>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    )
}

export default React.memo(FrontMain)