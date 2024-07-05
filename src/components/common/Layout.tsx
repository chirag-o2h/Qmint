import React, { Suspense, lazy, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Skeleton, Stack, useMediaQuery } from "@mui/material";

// Utils
import {  THEME_TYPE } from "@/axiosfolder"

// Components
import LazyHeader from "../header/index"
const  BullionmarkHeader = lazy(()=>import("../header/BullionmarkHeader")) 
import { bodyForGetShoppingCartData, convertMinutesToMilliseconds, storeLastPage } from "@/utils/common";
import { configDetails, getFooterLinks, getLiveDashboardChartData } from "@/redux/reducers/homepageReducer";
import { ENDPOINTS } from "@/utils/constants";
import useAPIoneTime from "@/hooks/useAPIoneTime";
import { useAppDispatch, useAppSelector, useToggle } from "@/hooks";
import useInactiveLogout from "@/hooks/useInactiveLogout";
const SessionExpiredDialog = lazy(() => import("../header/SessionExpiredDialog"));
import { getShoppingCartData } from "@/redux/reducers/shoppingCartReducer";
import useUnloadMinHeight from "@/hooks/useUnloadMinHeight";
import RenderOnViewportEntry from "./RenderOnViewportEntry";
const LazyFooter = lazy(() => import('../footer/index'));
const LazyBullionmarkFooter = lazy(() => import('../footer/BullionmarkFooter'));
function Layout(props: any) {
  const  { children, isItMainPage=false} = props
  const removeMinHeight =useUnloadMinHeight()
  const { configDetails: configDetailsState, isLoggedIn } = useAppSelector((state) => state.homePage)
  const [openSessionExpireDialog, toggleSessionExpireDialog] = useToggle(false)
  useInactiveLogout(isLoggedIn ? convertMinutesToMilliseconds(configDetailsState?.SessionTimeoutMins_LoggedInUsers?.value) : convertMinutesToMilliseconds(configDetailsState?.SessionTimeoutMins_Guest?.value), toggleSessionExpireDialog);
  useAPIoneTime({ service: configDetails, endPoint: ENDPOINTS.getConfigStore, conditionalCall: !isItMainPage})
  // useInactiveLogout(2000, toggleSessionExpireDialog);
  // const [loading, setLoading] = useState(true);
  const [wait, setWait] = useState(false)
  const dispatch = useAppDispatch()
  // Call the custom hook to handle user inactivity and logout
  useEffect(() => {
    const x = setTimeout(() => {
      setWait(true)
      // setLoading(false);
    }, 2000);
    storeLastPage(window.location.pathname)
    return () => {
      clearTimeout(x);
    }
  }, [])
  useEffect(() => {
    setTimeout(() => {
      dispatch(getShoppingCartData({ url: ENDPOINTS.getShoppingCartData, body: bodyForGetShoppingCartData }))
    }, 0);
  }, [isLoggedIn])
  // useAPIoneTime({ service: getFooterLinks, endPoint: ENDPOINTS.getFooterLink })
  // const { data }: { data: { data: FooterSection[] } } = useApiRequest(ENDPOINTS.getFooterLink);
  if (configDetailsState?.Store_FaviconURL?.value) {
    const faviconUrl = configDetailsState?.Store_FaviconURL?.value; // Assuming API response contains favicon URL
    // Update favicon dynamically
    const link: any = document.querySelector("link[rel='icon']") || document.createElement('link');
    link.rel = 'icon';
    link.href = faviconUrl;
    document.head.appendChild(link);
  }
  const [laodFooter, setLoadFooter] = useState<Boolean>(false)
  useEffect(() => {
    setTimeout(() => {
      setLoadFooter(true)
    }, 3000);
  }, [])
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

  return (
    <Stack id="PageLayout">
      {/* <Suspense fallback={<Box id="HeaderWrapper"></Box>}> */}
      {/* {THEME_TYPE === "1" ?<Suspense fallback={<Skeleton height={isMobile ? "20vh" : "260px"} style={{marginTop: isMobile ? "-40px" : "-60px"}}/>}> 
      <BullionmarkHeader />
      </Suspense> : <LazyHeader />} */}
      <RenderOnViewportEntry rootMargin="200px" threshold={0.25} minHeight={isMobile ? "20vh" : 260}>
      {THEME_TYPE === "1" ? <BullionmarkHeader /> : <LazyHeader />}
      </RenderOnViewportEntry>
      {/* </Suspense> */}
      <main style={removeMinHeight ? {minHeight: '100vh'} : {}}>
        {/* <Suspense fallback={<Box></Box>}> */}
        {children}
        {/* </Suspense> */}
      </main>
      {/* {laodFooter && <Suspense fallback={
        <Skeleton height='30vh'></Skeleton>
      }>
        {THEME_TYPE === "1" ? <LazyBullionmarkFooter /> : <LazyFooter />}
      </Suspense>} */}
                    <RenderOnViewportEntry rootMargin="200px" threshold={0.25} minHeight={800}>
                    {THEME_TYPE === "1" ? <LazyBullionmarkFooter /> : <LazyFooter />}
                    </RenderOnViewportEntry>
      {openSessionExpireDialog && <Suspense fallback={<></>}><SessionExpiredDialog
        open={openSessionExpireDialog}
        onClose={toggleSessionExpireDialog}
      /></Suspense>}
    </Stack>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  isItMainPage: PropTypes.bool
}

export default Layout