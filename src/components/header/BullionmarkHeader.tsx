import React, { Suspense, lazy, useCallback, useEffect, useState } from "react"
import { useMediaQuery, useScrollTrigger, Theme, AppBar, Box, Divider, IconButton, Skeleton } from "@mui/material"

import classNames from "classnames"

// Hooks
import { useAppSelector } from "@/hooks"


// Components
import FrontMain from "./FrontMain";
import { Call } from "@/assets/icons";
import useImageInView from "@/hooks/useImageInView";
import { THEME_TYPE } from "@/axiosfolder";
import useDebounce from "@/hooks/useDebounce";
// const Pricing = lazy(() => import('./Pricing'))
import Pricing from "./Pricing";
const MobileSecondaryMenu = lazy(() => import('./MobileSecondaryMenu'));
// const Navigation = lazy(() => import('./Navigation'))
import Navigation from "./Navigation";
const MobileMenu = lazy(() => import('./MobileMenu'))
const PageLoader = lazy(() => import('./Loader').then((module) => ({ default: module.PageLoader })));


// const frontHeaderList = ["/shop/"]

const BullionmarkHeader = () => {
  // const [params] = useState({ page: 1 })
  // useAPIoneTime({ service: CategoriesListDetails, endPoint: ENDPOINTS.topCategoriesListWithSubCategories, params })
  const { configDetails: configDetailsState } = useAppSelector((state) => state.homePage)
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
  const loading = useAppSelector((state) => state.homePage.loading)
  const [openMobileMenu, setOpenMobileMenu] = useState(false)
  // const trigger = useScrollTrigger({
  //   disableHysteresis: true,
  //   threshold: isMobile ? 68 : 50,
  // })
  // const trigger = useImageInView()
  const trigger = THEME_TYPE == "1" ? useImageInView() : useScrollTrigger({
    disableHysteresis: true,
    threshold: isMobile ? 68 : 50,
  })
  const toggleMobileMenu = useCallback(() => {
    setOpenMobileMenu(!openMobileMenu)
  }, [openMobileMenu])
  const [isFrontHeader, setIsFrontHeader] = useState(false)
  // const [isShopBannerAbsent, setIsShopBannerAbsent] = useState(false)

  useEffect(() => {
    if ((window.location.pathname == "/" || window.location.pathname.includes("newpage"))) {
      setIsFrontHeader(true)
    }
  }, [window.location.pathname])

  // useEffect(() => {
  //   const BannerElementAbsent = document.querySelector('.TopBannerAbsent');
  //   if (BannerElementAbsent) {
  //     setIsShopBannerAbsent(true);
  //   }
  // }, []);
  const showTransprant = useScrollTrigger({
    disableHysteresis: true,
    threshold: isMobile ? 68 : 50,
  })
  const trigerMemo = useDebounce(trigger,300)
  return (
    <>
      <Box id="HeaderWrapper" className={classNames("BullionmarkHeader",
        // isFrontHeader ? "FrontHeader" : "",
        isFrontHeader &&
        (configDetailsState?.Sliders_ShopHomepage_Enable?.value === false || isMobile
          ? ""
          : (trigerMemo ? (showTransprant ? "FrontHeader" : "BmkBlackHeader") : "")
        ),
      )}
      >

        {!isMobile && <>
          {/* <Suspense fallback={<Skeleton style={{ minHeight: '50px' }} />}> */}
            <Pricing />
          {/* </Suspense> */}
          <Divider />
        </>}

        <AppBar position={(showTransprant && !trigger) ? "fixed" : "static"}>
          {loading && <Suspense fallback={<></>}><PageLoader /></Suspense>}
          {/* <Suspense fallback={<Skeleton style={{ minHeight: '80px' }} />}> */}
            <FrontMain toggleMobileMenu={toggleMobileMenu} isFrontHeader={isFrontHeader} />
          {/* </Suspense> */}
          <Divider />
          {/* <Suspense fallback={<Skeleton style={{ minHeight: '80px' }} />}> */}
          <Navigation />
          {/* </Suspense> */}
        </AppBar>
        {isMobile && openMobileMenu && <Suspense fallback={<Skeleton style={{ minHeight: '60px' }} />}>
          { <MobileMenu open={isMobile && openMobileMenu} trigger={showTransprant} toggleMobileMenu={toggleMobileMenu} />}
        </Suspense >}
        {isMobile && <Suspense fallback={<Skeleton style={{ minHeight: '60px' }} />}> <MobileSecondaryMenu /></Suspense>}
      </Box >
    </>
  )
}

export default BullionmarkHeader