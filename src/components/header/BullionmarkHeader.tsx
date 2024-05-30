import React, { Suspense, lazy, useCallback, useEffect, useState } from "react"
import { useMediaQuery, useScrollTrigger, Theme, AppBar, Box, Divider, IconButton } from "@mui/material"

import classNames from "classnames"

// Hooks
import useAPIoneTime from "@/hooks/useAPIoneTime";
import { useAppSelector } from "@/hooks"

// Utils
import { ENDPOINTS } from "@/utils/constants";
import { CategoriesListDetails } from "@/redux/reducers/homepageReducer";

// Components
import { PageLoader } from './Loader'
import FrontMain from "./FrontMain";
import { Call } from "@/assets/icons";
const Pricing = lazy(() => import('./Pricing'))
const Main = lazy(() => import('./Main'))
const MobileSecondaryMenu = lazy(() => import('./MobileSecondaryMenu'));
const Navigation = lazy(() => import('./Navigation'))
const MobileMenu = lazy(() => import('./MobileMenu'))

const frontHeaderList = ["/", "/shop"]

const BullionmarkHeader = () => {
  const [params] = useState({ page: 1 })
  useAPIoneTime({ service: CategoriesListDetails, endPoint: ENDPOINTS.topCategoriesListWithSubCategories, params })
  const { configDetails: configDetailsState } = useAppSelector((state) => state.homePage)
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
  const loading = useAppSelector((state) => state.homePage.loading)
  const [openMobileMenu, setOpenMobileMenu] = useState(false)
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: isMobile ? 68 : 50,
  })
  const toggleMobileMenu = useCallback(() => {
    setOpenMobileMenu(!openMobileMenu)
  }, [openMobileMenu])
  const [isFrontHeader, setIsFrontHeader] = useState(true)

  useEffect(() => {
    if (!frontHeaderList.includes(window.location.pathname)) {
      setIsFrontHeader(false)
    }
  }, [])


  return (
    <>
      <Box id="HeaderWrapper" className={classNames("BullionmarkHeader", { "FrontHeader": isFrontHeader })}>
        {!isMobile && <>
          <Suspense fallback={<></>}>
            <Pricing />
          </Suspense>
          <Divider />
        </>}
        <AppBar position={trigger ? "fixed" : "static"}>
          {loading && <PageLoader />}
          <Suspense fallback={<></>}>
            <FrontMain />
          </Suspense>
          <Divider />
          <Suspense fallback={<></>}><Navigation /></Suspense>
        </AppBar>
        <Suspense fallback={<></>}>
          {isMobile && openMobileMenu && <MobileMenu open={isMobile && openMobileMenu} trigger={trigger} toggleMobileMenu={toggleMobileMenu} />}
        </Suspense >
        {isMobile && <Suspense fallback={<></>}> <MobileSecondaryMenu /></Suspense>}
      </Box >
    </>
  )
}

export default BullionmarkHeader