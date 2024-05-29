import React, { Suspense, lazy, useCallback, useState } from "react"
import { useMediaQuery, useScrollTrigger, Theme, AppBar, Box, Divider } from "@mui/material"

// Hooks
import useAPIoneTime from "@/hooks/useAPIoneTime";
import { useAppSelector } from "@/hooks"

// Utils
import { ENDPOINTS } from "@/utils/constants";
import { CategoriesListDetails } from "@/redux/reducers/homepageReducer";

// Components
import { PageLoader } from './Loader'
const Pricing = lazy(() => import('./Pricing'))
const Main = lazy(() => import('./Main'))
const MobileSecondaryMenu = lazy(() => import('./MobileSecondaryMenu'));
const Navigation = lazy(() => import('./Navigation'))
const MobileMenu = lazy(() => import('./MobileMenu'))

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

  return (
    <>
      {!isMobile && configDetailsState?.tickerenable?.value && <>
        <Suspense fallback={<></>}>
          <Pricing />
        </Suspense>
        <Divider />
      </>}
      <Box id="HeaderWrapper">
        <AppBar position="static">
          {loading && <PageLoader />}
          <Suspense fallback={<></>}>
            <Main toggleMobileMenu={toggleMobileMenu} openMobileMenu={openMobileMenu} />
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