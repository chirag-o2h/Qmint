import React, { Suspense, lazy, useCallback, useState } from "react"
import { useMediaQuery, useScrollTrigger, AppBar, Box, Divider, Skeleton } from "@mui/material"
const MobileSecondaryMenu = lazy(() => import('./MobileSecondaryMenu'));
const MobileMenu = lazy(() => import('./MobileMenu'))


// Components
// const Pricing = lazy(() => import('./Pricing'))
import Pricing from './Pricing'
// const Main = lazy(() => import('./Main'))
import Main from './Main'
import { PageLoader } from './Loader'
// const Navigation = lazy(() => import('./Navigation'))
import Navigation from './Navigation'
import { useAppSelector, useToggle } from "@/hooks"
import SessionExpiredDialog from "./SessionExpiredDialog";
import useAPIoneTime from "@/hooks/useAPIoneTime";
import { CategoriesListDetails } from "@/redux/reducers/homepageReducer";
import { ENDPOINTS } from "@/utils/constants";
import { pagesOnWhichNeedToCallTopCategoriesAPi } from "@/utils/common";
import { useLocation } from "@reach/router";

const Index = () => {
  const location = useLocation()
  const loading = useAppSelector((state) => state.homePage.loading)
  const { configDetails: configDetailsState } = useAppSelector((state) => state.homePage)
  const [openMobileMenu, setOpenMobileMenu] = useState(false)
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('md'))
  // todo when need to conver again from home page to shope page related things
  const [params] = useState({ page: pagesOnWhichNeedToCallTopCategoriesAPi.some((page) => location.pathname.includes(page) && location.pathname.split('/').filter((item) => item).some((name) => name === page)) ? 0 : 1 })
  // const [params] = useState({ page: location.pathname === "/" || pagesOnWhichNeedToCallTopCategoriesAPi.some((page) => location.pathname.includes(page)) ? 0 : 1 })
  useAPIoneTime({ service: CategoriesListDetails, endPoint: ENDPOINTS.topCategoriesListWithSubCategories, params })

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: isMobile ? 68 : 50,
  })
  const toggleMobileMenu = useCallback(() => {
    setOpenMobileMenu(!openMobileMenu)
  }, [openMobileMenu])

  return (
    <>
      {!isMobile && configDetailsState?.Store_ShopeHomePage_Ticker_Enable?.value && <>
          <Pricing />
        <Divider />
      </>}
      <Box id="HeaderWrapper">
        <AppBar position="static">
          {loading && <PageLoader />}
            <Main toggleMobileMenu={toggleMobileMenu} openMobileMenu={openMobileMenu} />
          <Divider />
            <Navigation />
        </AppBar>
        <Suspense fallback={<></>}>
          {isMobile && openMobileMenu && <Suspense fallback={<></>}><MobileMenu open={isMobile && openMobileMenu} trigger={trigger} toggleMobileMenu={toggleMobileMenu} /></Suspense>}
        </Suspense >
        {isMobile && <Suspense fallback={<></>}> <MobileSecondaryMenu /></Suspense>}
      </Box >
    </>
  )
}

export default Index