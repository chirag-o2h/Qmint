import React, { useState, useEffect } from "react";
import {
  useMediaQuery,
  Container,
  Stack,
  Button,
  IconButton,
  Typography,
  Box,
  useScrollTrigger,
} from "@mui/material";
import classNames from "classnames";
import { useLocation } from "@reach/router";

// Assets
import {
  SignInIcon,
  SignOutIcon,
  HamburgerIcon,
  CrossIcon,
  BullionmarkSignInIcon,
} from "../../assets/icons/index";
import { useAppDispatch, useAppSelector } from "@/hooks";

// Utils
import { ENDPOINTS } from "../../utils/constants";
import { Link, navigate } from "gatsby";
import {
  CategoriesListDetails,
  LogOutUserAPI,
} from "@/redux/reducers/homepageReducer";
import useAPIoneTime from "@/hooks/useAPIoneTime";
import { THEME_TYPE } from "@/axiosfolder";
import {
  isItNewsOrBlogPage,
  pagesOnWhichNeedToCallTopCategoriesAPi,
} from "@/utils/common";
import useImageInView from "@/hooks/useImageInView";
import Navigation from "./Navigation";

function FrontMain(props: any) {
  const dispatch = useAppDispatch();
  const mobile = useMediaQuery((theme: any) => theme.breakpoints.down("md"));
  const trigger =
    THEME_TYPE == "1"
      ? useImageInView()
      : useScrollTrigger({
          disableHysteresis: true,
          threshold: mobile ? 68 : 50,
        });
  const { openMobileMenu, toggleMobileMenu, isFrontHeader } = props;
  const { configDetails: configDetailsState, isLoggedIn } = useAppSelector(
    (state) => state.homePage
  );
  const location = useLocation();
  const handleAuth = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      dispatch(LogOutUserAPI() as any);
      navigate("/");
    }
  };
  // const isItHomepage = window.location.pathname === "/" || pagesOnWhichNeedToCallTopCategoriesAPi.some((page) => window.location.pathname.includes(page))
  // todo when need to conver again from home page to shope page related things
  // const isItHomepage = pagesOnWhichNeedToCallTopCategoriesAPi.some((page) => window.location.pathname.includes(page) && window.location.pathname.split('/').filter((item) => item).some((name) => name === page))
  const [params] = useState({
    page: pagesOnWhichNeedToCallTopCategoriesAPi.some(
      (page) =>
        window.location.pathname.includes(page) &&
        window.location.pathname
          .split("/")
          .filter((item) => item)
          .some((name) => name === page)
    )
      ? 0
      : 1,
  });
  useAPIoneTime({
    service: CategoriesListDetails,
    endPoint: ENDPOINTS.topCategoriesListWithSubCategories,
    params,
  });

  const [isBullionmarkHomePage, setIsBullionmarkHomePage] =
    useState<boolean>(false);
  useEffect(() => {
    if (THEME_TYPE === "1") {
      setIsBullionmarkHomePage(true);
    }
  }, []);
  const isItHomeOrShopPage =
    window.location.pathname == "/" ||
    window.location.pathname.includes("newpage"); //BrandLogoURL_Header,Brand_Dark_LogoURL,Homepage_HeaderLogo_URL
  const isItHomePage = window.location.pathname.includes("newpage");
  return (
    <Box className="HeaderContainerWrapper">
      <Container className="MainHeader">
        <Stack className="MainHeader__Wrapper">
          <Stack className="Left">
            <Link className="Logo" to="/">
              <img
                src={
                  configDetailsState?.[
                    isItHomeOrShopPage
                      ? isItHomePage
                        ? trigger
                          ? "BrandLogoURL_Header"
                          : "Brand_Dark_LogoURL"
                        : trigger
                          ? "BrandLogoURL_Header"
                          : "Brand_Dark_LogoURL"
                      : "Brand_Dark_LogoURL"
                  ]?.value
                }
                width={mobile ? 190 : 246}
                height={mobile ? 30 : 40}
                alt="QMint white logo"
                fetchPriority="high"
              />
            </Link>
          </Stack>
          <Stack className="Center">
            {/* // todo when need to conver again from home page to shope page related things */}
            <Navigation
              // frontPage={false}
              frontPage={
                isItNewsOrBlogPage.some((page) =>
                  window.location.pathname.includes(page)
                )
                  ? true
                  : false
              }
              showNavigation={true}
            />
          </Stack>
          <Stack className="Right">
            {/* <Link to={ENDPOINTS.login}> */}
            <Button
              name="signIn"
              aria-label="signIn"
              onClick={handleAuth}
              className={classNames("SignInButton ActionButton")}
              variant={THEME_TYPE === "1" ? "contained" : "outlined"}
              startIcon={
                !isLoggedIn ? (
                  isBullionmarkHomePage ? (
                    <BullionmarkSignInIcon />
                  ) : (
                    <SignInIcon />
                  )
                ) : (
                  <SignOutIcon />
                )
              }
            >
              <Typography variant="inherit">
                {!isLoggedIn ? "Sign In" : "Sign Out"}
              </Typography>
            </Button>
            {/* <Button name='Contact us' aria-label='Contact us' onClick={() => { 
                            navigate('/contactus')
                        }} variant="outlined" className="ActionButton">Contact Us</Button> */}
            {/* </Link> */}
            <IconButton
              color="secondary"
              title="HamburgerButton"
              area-label="HamburgerMenuButton"
              className="HamburgerButton MenuButton"
              onClick={toggleMobileMenu}
            >
              {!openMobileMenu ? (
                <HamburgerIcon className="HamburgerIcon" />
              ) : (
                <CrossIcon className="CrossIcon" />
              )}
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default React.memo(FrontMain);
