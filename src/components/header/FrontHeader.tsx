import React, { Suspense, lazy, useCallback, useEffect, useState } from "react"
import { useMediaQuery, useScrollTrigger, AppBar, Box, Divider, Skeleton } from "@mui/material"
import classNames from "classnames"

// Components
const FrontPricing = lazy(() => import('./FrontPricing'))
const FrontMain = lazy(() => import('./FrontMain'))
import { PageLoader } from './Loader'
import { useAppSelector } from "@/hooks"
import { STORE_CODE, THEME_TYPE } from "@/axiosfolder"
import useImageInView from "@/hooks/useImageInView"
const MobileMenu = lazy(() => import('./MobileMenu'))

interface FrontHeader {
    blackTheme?: boolean
}

const FrontHeader = (props: FrontHeader) => {
    const { blackTheme } = props
    const loading = useAppSelector((state) => state.homePage.loading)
    const { configDetails: configDetailsState } = useAppSelector((state) => state.homePage)
    const [isFrontPage] = useState(true)
    const [openMobileMenu, setOpenMobileMenu] = useState(false)
    const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('md'))
    // const trigger = useScrollTrigger({
    //     disableHysteresis: true,
    //     threshold: isMobile ? 68 : 50,
    // })
    const trigger = THEME_TYPE == "1" ? useImageInView() :  useScrollTrigger({
            disableHysteresis: true,
            threshold: isMobile ? 68 : 50,
        })
    const toggleMobileMenu = useCallback(() => {
        setOpenMobileMenu(!openMobileMenu)
    }, [openMobileMenu])
    const [isFrontHeader, setIsFrontHeader] = useState(false)
    useEffect(() => {
        if ((window.location.pathname == "/" ||window.location.pathname.includes("newpage") )) {
          setIsFrontHeader(true)
        }
      }, [window.location.pathname])
      const showTransprant = useScrollTrigger({
        disableHysteresis: true,
        threshold: isMobile ? 68 : 50,
      })
    return (
        <Box id="HeaderWrapper" className={classNames("FrontHeader", { "Black": blackTheme }, { "BmkFrontHeader": THEME_TYPE == '1' })}>
            {((!isMobile && configDetailsState?.["Store_HomePage_Ticker_Enable"]?.value) ) && <>
                <Suspense fallback={
                    <></>
                    // <Skeleton style={{ minHeight: '60px' }} />
                }>
                    <FrontPricing />
                </Suspense>
                <Divider sx={{ borderBottom: '1px solid #FFFFFF33' }} />
            </>}
            <AppBar position={(showTransprant && !trigger) ? "fixed" : "static"}>
                {loading && <PageLoader />}
                <Suspense fallback={<></>}>
                    {/* <Skeleton style={{ minHeight: '80px' }} /> */}
                    <FrontMain toggleMobileMenu={toggleMobileMenu} openMobileMenu={openMobileMenu} trigger={trigger} isFrontHeader={isFrontHeader}/>
                </Suspense>
            </AppBar>
            <Suspense fallback={<></>}>
                {isMobile && openMobileMenu && <MobileMenu open={isMobile && openMobileMenu} trigger={trigger} toggleMobileMenu={toggleMobileMenu} isFrontPage={isFrontPage} />}
            </Suspense >
        </Box >
    )
}

export default FrontHeader