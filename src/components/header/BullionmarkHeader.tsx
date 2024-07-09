import React, { useCallback, useEffect, useState } from "react";
import {
  useMediaQuery,
  useScrollTrigger,
  Theme,
  AppBar,
  Box,
  Divider,
} from "@mui/material";

import classNames from "classnames";

// Hooks
import { useAppSelector } from "@/hooks";

// Components
import FrontMain from "./FrontMain";
import useImageInView from "@/hooks/useImageInView";
import { THEME_TYPE } from "@/axiosfolder";
import useDebounce from "@/hooks/useDebounce";
import Pricing from "./Pricing";
import MobileSecondaryMenu from "./MobileSecondaryMenu";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";

// const frontHeaderList = ["/shop/"]

const BullionmarkHeader = () => {
  // const [params] = useState({ page: 1 })
  // useAPIoneTime({ service: CategoriesListDetails, endPoint: ENDPOINTS.topCategoriesListWithSubCategories, params })
  const { configDetails: configDetailsState } = useAppSelector(
    (state) => state.homePage
  );
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  // const trigger = useScrollTrigger({
  //   disableHysteresis: true,
  //   threshold: isMobile ? 68 : 50,
  // })
  // const trigger = useImageInView()
  const trigger =
    THEME_TYPE == "1"
      ? useImageInView()
      : useScrollTrigger({
          disableHysteresis: true,
          threshold: isMobile ? 68 : 50,
        });
  const toggleMobileMenu = useCallback(() => {
    setOpenMobileMenu(!openMobileMenu);
  }, [openMobileMenu]);
  const [isFrontHeader, setIsFrontHeader] = useState(false);
  // const [isShopBannerAbsent, setIsShopBannerAbsent] = useState(false)

  useEffect(() => {
    if (
      window.location.pathname == "/" ||
      window.location.pathname.includes("newpage")
    ) {
      setIsFrontHeader(true);
    }
  }, [window.location.pathname]);

  // useEffect(() => {
  //   const BannerElementAbsent = document.querySelector('.TopBannerAbsent');
  //   if (BannerElementAbsent) {
  //     setIsShopBannerAbsent(true);
  //   }
  // }, []);
  const showTransprant = useScrollTrigger({
    disableHysteresis: true,
    threshold: isMobile ? 68 : 50,
  });
  const trigerMemo = useDebounce(trigger, 300);
  return (
    <>
      <Box
        id="HeaderWrapper"
        className={classNames(
          "BullionmarkHeader",
          // isFrontHeader ? "FrontHeader" : "",
          isFrontHeader &&
            (configDetailsState?.Sliders_ShopHomepage_Enable?.value === false ||
            isMobile
              ? ""
              : trigerMemo
                ? showTransprant
                  ? "FrontHeader"
                  : "BmkBlackHeader"
                : "")
        )}
      >
        {!isMobile && (
          <>
            {/* <Suspense fallback={<Skeleton style={{ minHeight: '50px' }} />}> */}
            <Pricing />
            {/* </Suspense> */}
            <Divider />
          </>
        )}

        <AppBar position={showTransprant && !trigger ? "fixed" : "static"}>
          <FrontMain
            toggleMobileMenu={toggleMobileMenu}
            isFrontHeader={isFrontHeader}
          />
          <Divider />
          <Navigation />
        </AppBar>
        {isMobile && openMobileMenu && (
          <MobileMenu
            open={isMobile && openMobileMenu}
            trigger={showTransprant}
            toggleMobileMenu={toggleMobileMenu}
          />
        )}
        {isMobile && <MobileSecondaryMenu />}
      </Box>
    </>
  );
};

export default BullionmarkHeader;
