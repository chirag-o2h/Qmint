import React, { Suspense, lazy, useEffect, useState } from "react"
import Seo from "../../components/common/Seo"
import Banner from '../../components/partials/home/Banner'
const MobileSecondaryMenu = lazy(() => import('../../components/header/MobileSecondaryMenu'));
const LookingFor = lazy(() => import("../../components/partials/home/LookingFor"))
const PopularProducts = lazy(() => import("../../components/partials/home/PopularProducts"))
const DiscoverTreasure = lazy(() => import("../../components/partials/home/DiscoverTreasure"))
const CloserLook = lazy(() => import("../../components/partials/home/CloserLook"))
import FeaturedProducts from "../../components/partials/home/FeaturedProducts"
import { ENDPOINTS } from "@/utils/constants"
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { CategoriesListDetails, HomePageSectionDetails, configDetails, serProgressLoaderStatus, setScrollPosition } from "@/redux/reducers/homepageReducer"
import { useAppDispatch, useAppSelector, useToggle } from "@/hooks"
import { useMediaQuery } from "@mui/material";
import Layout from "@/components/common/Layout";
import useUserDetailsFromToken from "@/hooks/useUserDetailsFromToken";
import Toaster from "@/components/common/Toaster";
import Loader from "@/components/common/Loader";
import useAlertPopUp from "@/hooks/useAlertPopUp";
import SessionExpiredDialog from "@/components/header/SessionExpiredDialog";
import ProductsSlider from "@/components/partials/home/ProductsSlider";

function IndexPage() {
  const dispatch = useAppDispatch()
  const { configDetails: configDetailsState, openToaster, scrollPosition, loading } = useAppSelector((state) => state.homePage)
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'))
  const [openSessionExpireDialog, toggleSessionExpireDialog] = useToggle(false)

  const [body] = useState({
    "search": "",
    "pageNo": 0,
    "pageSize": -1,
    "sortBy": "",
    "sortOrder": "",
    "filters": {
      "includeInTopMenu": true
    }
  })

  useEffect(() => {
    return () => {
      dispatch(setScrollPosition(window.scrollY));
    }
  }, [])

  useAPIoneTime({ service: HomePageSectionDetails, endPoint: ENDPOINTS.homePageSection })
  // useAPIoneTime({ service: CategoriesListDetails, endPoint: ENDPOINTS.topCategoriesListWithSubCategories, body })
  useUserDetailsFromToken()
  const [wait1, setWait1] = useState(false)
  const [wait2, setWait2] = useState(false)
  const [wait3, setWait3] = useState(false)
  useEffect(() => {
    dispatch(serProgressLoaderStatus(true))
    const timeout1 = setTimeout(() => {
      setWait1(true);
    }, 400); // Wait for 300ms before rendering the first component
    const timeout2 = setTimeout(() => {
      setWait2(true);
    }, 900);
    const timeout3 = setTimeout(() => {
      setWait3(true)
    }, 1100);
    return () => {
      dispatch(serProgressLoaderStatus(false))
      clearTimeout(timeout1)
      clearTimeout(timeout2)
      clearTimeout(timeout3)
    }
  }, [])
  useAlertPopUp({ pageName: 'Home', openPopup: toggleSessionExpireDialog })
  return (
    <Layout>
      <>
        <Loader open={loading} />
        {openToaster && <Toaster />}
        <Seo
          keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
          title="Home"
          lang="en"
        />
        {/* {isMobile && <Suspense fallback={<></>}> <MobileSecondaryMenu /></Suspense>} */}

        {configDetailsState?.sliderenableinhome?.value === false || isMobile ? null : <Banner />}
        <Suspense fallback={<></>}> <ProductsSlider /></Suspense>
        {configDetailsState?.["home.featuredproductsenable"]?.value !== false && <Suspense fallback={<></>}> <FeaturedProducts /></Suspense>}
        {configDetailsState?.["home.lookingforenable"]?.value !== false && <Suspense fallback={<></>}> <LookingFor /></Suspense>}
        {configDetailsState?.["home.popularproductsenable"]?.value !== false && <Suspense fallback={<></>}><PopularProducts /></Suspense>}
        {configDetailsState?.["home.discovertreasureenable"]?.value !== false && <Suspense fallback={<></>}><DiscoverTreasure /></Suspense>}
        {configDetailsState?.["home.closerlookenable"]?.value !== false && <Suspense fallback={<></>}><CloserLook /></Suspense>}
        {openSessionExpireDialog && <SessionExpiredDialog
          open={openSessionExpireDialog}
          onClose={toggleSessionExpireDialog}
        />}
      </>
    </Layout>
  )
}

export default IndexPage
