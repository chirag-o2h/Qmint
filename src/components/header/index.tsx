import React, { Suspense, lazy, useCallback, useState } from "react"
import { useMediaQuery, useScrollTrigger, AppBar, Box, Divider, Skeleton } from "@mui/material"
const MobileSecondaryMenu = lazy(() => import('./MobileSecondaryMenu'));


// Components
const Pricing = lazy(() => import('./Pricing'))
const Main = lazy(() => import('./Main'))
import { PageLoader } from './Loader'
const Navigation = lazy(() => import('./Navigation'))
import { useAppSelector, useToggle } from "@/hooks"
import SessionExpiredDialog from "./SessionExpiredDialog";
import useAPIoneTime from "@/hooks/useAPIoneTime";
import { CategoriesListDetails } from "@/redux/reducers/homepageReducer";
import { ENDPOINTS } from "@/utils/constants";
import { pagesOnWhichNeedToCallTopCategoriesAPi } from "@/utils/common";
const MobileMenu = lazy(() => import('./MobileMenu'))

const Index = () => {
  const loading = useAppSelector((state) => state.homePage.loading)
  const { configDetails: configDetailsState } = useAppSelector((state) => state.homePage)
  const [openMobileMenu, setOpenMobileMenu] = useState(false)
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('md'))
  // todo when need to conver again from home page to shope page related things
  const [params] = useState({ page: pagesOnWhichNeedToCallTopCategoriesAPi.some((page) => window.location.pathname.includes(page) && window.location.pathname.split('/').filter((item) => item).some((name) => name === page)) ? 0 : 1 })
  // const [params] = useState({ page: window.location.pathname === "/" || pagesOnWhichNeedToCallTopCategoriesAPi.some((page) => window.location.pathname.includes(page)) ? 0 : 1 })
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
        <Suspense fallback={
          <></>
          // <Skeleton style={{ minHeight: '60px' }} />
        }
        >
          <Pricing />
        </Suspense>
        <Divider />
      </>}
      <Box id="HeaderWrapper">
        <AppBar position="static">
          {loading && <PageLoader />}
          <Suspense fallback={
            <></>
            // <Skeleton style={{ minHeight: '80px' }} />
          }>
            <Main toggleMobileMenu={toggleMobileMenu} openMobileMenu={openMobileMenu} />
          </Suspense>
          <Divider />
          <Suspense fallback={
            <></>
            // <Skeleton style={{ minHeight: '53px' }} />
          }>
            <Navigation />
          </Suspense>
        </AppBar>
        <Suspense fallback={<></>}>
          {isMobile && openMobileMenu && <MobileMenu open={isMobile && openMobileMenu} trigger={trigger} toggleMobileMenu={toggleMobileMenu} />}
        </Suspense >
        {isMobile && <Suspense fallback={<></>}> <MobileSecondaryMenu /></Suspense>}
      </Box >
    </>
  )
}

export default Index