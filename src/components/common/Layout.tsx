import React, { Suspense, lazy, useEffect, useState, useTransition } from "react";
import PropTypes from "prop-types";
import { Skeleton, Stack, useMediaQuery } from "@mui/material";

// import LazyHeader from "../header/index";
const LazyHeader = lazy(()=>import("../header/index"))
// import BullionmarkHeader from "../header/BullionmarkHeader";
const BullionmarkHeader = lazy(() => import("../header/BullionmarkHeader"))
import {
  bodyForGetShoppingCartData,
  convertMinutesToMilliseconds,
  storeLastPage,
} from "@/utils/common";
import { configDetails } from "@/redux/reducers/homepageReducer";
import { ENDPOINTS } from "@/utils/constants";
import useAPIoneTime from "@/hooks/useAPIoneTime";
import { useAppDispatch, useAppSelector, useToggle } from "@/hooks";
import useInactiveLogout from "@/hooks/useInactiveLogout";
const SessionExpiredDialog = lazy(
  () => import("../header/SessionExpiredDialog")
);
import { getShoppingCartData } from "@/redux/reducers/shoppingCartReducer";
import useUnloadMinHeight from "@/hooks/useUnloadMinHeight";
import RenderOnViewportEntry from "./RenderOnViewportEntry";
import { useLocation } from "@reach/router";
const LazyFooter = lazy(() => import('../footer/index'));
const LazyBullionmarkFooter = lazy(() => import('../footer/BullionmarkFooter'));
function Layout(props: {
  children: any, isItMainPage?: boolean, renderAfterSomeTime?: boolean
}) {
  const { children, isItMainPage = false, renderAfterSomeTime = false } = props
  const location = useLocation()
  const removeMinHeight = useUnloadMinHeight()
  const { configDetails: configDetailsState, isLoggedIn } = useAppSelector((state) => state.homePage)
  const [openSessionExpireDialog, toggleSessionExpireDialog] = useToggle(false)
  useInactiveLogout(isLoggedIn ? convertMinutesToMilliseconds(configDetailsState?.SessionTimeoutMins_LoggedInUsers?.value) : convertMinutesToMilliseconds(configDetailsState?.SessionTimeoutMins_Guest?.value), toggleSessionExpireDialog);
  useAPIoneTime({ service: configDetails, endPoint: ENDPOINTS.getConfigStore, conditionalCall: !isItMainPage })
  // useInactiveLogout(2000, toggleSessionExpireDialog);
  // const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  // Call the custom hook to handle user inactivity and logout
  useEffect(() => {
    storeLastPage(window.location.pathname);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      dispatch(
        getShoppingCartData({
          url: ENDPOINTS.getShoppingCartData,
          body: bodyForGetShoppingCartData,
        })
      );
    }, 0);
  }, [isLoggedIn]);
  // useAPIoneTime({ service: getFooterLinks, endPoint: ENDPOINTS.getFooterLink })
  // const { data }: { data: { data: FooterSection[] } } = useApiRequest(ENDPOINTS.getFooterLink);
  useEffect(() => {
    if (configDetailsState?.Store_FaviconURL?.value) {
      const faviconUrl = configDetailsState?.Store_FaviconURL?.value; // Assuming API response contains favicon URL
      // Update favicon dynamically
      const link: any =
        document.querySelector("link[rel='icon']") ||
        document.createElement("link");
      link.rel = "icon";
      link.href = faviconUrl;
      document.head.appendChild(link);
    }
  }, [configDetailsState])

  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));
  const [isRendering, setIsRendering] = useState(true);
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    startTransition(() => {
      // Simulating initial data fetch
      setTimeout(() => setIsRendering(false), 3500);
    });
  }, [])
  return (
    <Stack id="PageLayout">
      {/* <Suspense fallback={<Box id="HeaderWrapper"></Box>}> */}
      {/* {THEME_TYPE === "1" ?<Suspense fallback={<Skeleton height={isMobile ? "20vh" : "260px"} style={{marginTop: isMobile ? "-40px" : "-60px"}}/>}> 
      <BullionmarkHeader />
      </Suspense> : <LazyHeader />} */}
      {/* <RenderOnViewportEntry
        rootMargin="200px"
        threshold={0.25}
        minHeight={isMobile ? "20vh" : 260}
      >
        {THEME_TYPE === "1" ? <BullionmarkHeader /> : <LazyHeader />}
      </RenderOnViewportEntry> */}
      {!isRendering && <Suspense fallback={
        <Skeleton
          height={"124px"}
          width={"100%"}
          style={{ marginBottom: !isMobile ? "0px" : "0px", transform: "scale(1)", position: "sticky", top: '0px' }}
        />
      }>{process.env.THEME_TYPE === "1" ? <BullionmarkHeader /> : <LazyHeader />}</Suspense>}
      {
        isRendering && <Skeleton
          height={"124px"}
          width={"100%"}
          style={{ marginBottom: !isMobile ? "0px" : "0px", transform: "scale(1)", zIndex: 9999,
            //  background: "gray" 
            }}
        />}
      {/* </Suspense> */}
      <main style={removeMinHeight ? { minHeight: "100vh" } : {}}>
        {/* <Suspense fallback={<Box></Box>}> */}
        {children}
        {/* </Suspense> */}
      </main>
      {/* {laodFooter && <Suspense fallback={
        <Skeleton height='30vh'></Skeleton>
      }>
        {THEME_TYPE === "1" ? <LazyBullionmarkFooter /> : <LazyFooter />}
      </Suspense>} */}
      {renderAfterSomeTime && !isRendering && <RenderOnViewportEntry
        rootMargin="200px"
        threshold={0.25}
        minHeight={850}
      >
        {process.env.THEME_TYPE === "1" ? <LazyBullionmarkFooter />: <LazyFooter />}
      </RenderOnViewportEntry>}
      {!renderAfterSomeTime &&
        <RenderOnViewportEntry
        rootMargin="200px"
        threshold={0.25}
        minHeight={850}
      >
        {process.env.THEME_TYPE === "1" ? <LazyBullionmarkFooter />: <LazyFooter />}
      </RenderOnViewportEntry>
      }
      {openSessionExpireDialog && (
        <Suspense fallback={<></>}>
          <SessionExpiredDialog
            open={openSessionExpireDialog}
            onClose={toggleSessionExpireDialog}
          />
        </Suspense>
      )}
    </Stack>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  isItMainPage: PropTypes.bool,
};

export default Layout;
