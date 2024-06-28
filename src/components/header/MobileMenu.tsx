import React, { Fragment, useEffect, useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Container,
  Divider,
  Collapse,
  Button,
  Typography,
} from "@mui/material";
import classNames from "classnames";
import { useLocation } from "@reach/router";

// Assets
import { ArrowDown, ArrowUp,BullionmarkSignInIcon,SignOutIcon } from "../../assets/icons/index";

// Utils
import { useAppDispatch, useAppSelector } from "@/hooks";
import { navigate } from "gatsby";
import useAPIoneTime from "@/hooks/useAPIoneTime";
import { CategoriesListDetails } from "@/redux/reducers/homepageReducer";
import { ENDPOINTS } from "@/utils/constants";
import { formatCategoryUrl, isItNewsOrBlogPage } from "@/utils/common";
import { THEME_TYPE } from "@/axiosfolder";
import MobileRecursiveMenu from "./MobileRecursiveMenu";
import { LogOutUserAPI } from "@/redux/reducers/homepageReducer"


function FrontMobileMenu(props: any) {
  const { open, toggleMobileMenu, trigger, isFrontPage } = props;
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState<any>({});
  const [isHomePage, setIsHomePage] = useState<boolean>(false);
  const { categoriesList } = useAppSelector((state) => state.homePage);
  const [params] = useState({ page: location.pathname === "/" ? 0 : 1 });

  const dispatch = useAppDispatch()

  const { configDetails: configDetailsState, isLoggedIn } = useAppSelector((state) => state.homePage)
    const handleAuth = () => {
        if (!isLoggedIn) {
            navigate('/login')
        } else {
            dispatch(LogOutUserAPI() as any)
            navigate('/')
        }
    }



  const handleClickMainMenu = (menuId: any) => {
    setOpenMenu((prevOpenMenus: any) => ({
      [menuId]: !prevOpenMenus[menuId],
    }));
  };
  useEffect(() => {
    if (location.pathname === "/newpage/") {
      setIsHomePage(true);
    }
  }, []);

  const handleNavigate = (pathTo: any) => {
    navigate(pathTo);
    toggleMobileMenu();
  };

  return (
    <Drawer
      id="MobileMenu"
      className={classNames({
        ScrollActive: trigger,
        isHomePage: isHomePage,
        FrontPageMenu: isFrontPage,
        BmkCommonMobileClass:THEME_TYPE === "1",
        BmkMobileMenu:
          THEME_TYPE === "1" && isHomePage &&
          trigger &&
          !isItNewsOrBlogPage.some((page) =>
            window.location.pathname.includes(page)
          ),
        BmkMobileMenuWithoutAnygap: THEME_TYPE === "1",
      })}
      open={open}
      variant="temporary"
      onClose={toggleMobileMenu}
      anchor="top"
      disableScrollLock
    >
      <Container className="HeaderContainer">
        <List component="nav">
        {THEME_TYPE === "1" && 
                     <Button name='signIn' aria-label='signIn' className={classNames("SignInButton ActionButton")} onClick={handleAuth} variant="contained" startIcon={!isLoggedIn ? <BullionmarkSignInIcon /> : <SignOutIcon />}><Typography variant="inherit">{!isLoggedIn ? 'Login/Register' : 'Logout'}</Typography></Button>
                    }
          {categoriesList?.items?.length > 0
            ? categoriesList?.items?.map((category: any) => {
                let hasSubcategory = category?.subCategories?.length > 0;
                return (
                  <Fragment key={category.categoryId}>
                    <ListItemButton
                      key={`ListItemButton-${category.categoryId}`}
                      className={classNames([
                        openMenu[category.categoryId]
                          ? "ExpandedMenu"
                          : "CollapsedMenu",
                      ])}
                      selected={category.categoryId === 0}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClickMainMenu(category.categoryId);
                        if (!hasSubcategory) {
                          handleNavigate(
                            !isFrontPage
                              ? `/category${formatCategoryUrl(category.searchEngineFriendlyPageName)}`
                              : `${formatCategoryUrl(category.searchEngineFriendlyPageName)}`
                          );
                        }
                      }}
                    >
                      <ListItemText
                        primary={category.name}
                        primaryTypographyProps={{ variant: "body2" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNavigate(
                            !isFrontPage
                              ? `/category${formatCategoryUrl(category.searchEngineFriendlyPageName)}`
                              : `${formatCategoryUrl(category.searchEngineFriendlyPageName)}`
                          );
                        }}
                      />
                      {hasSubcategory ? (
                        openMenu[category.categoryId] ? (
                          <ArrowUp />
                        ) : (
                          <ArrowDown />
                        )
                      ) : null}
                    </ListItemButton>
                    <MobileRecursiveMenu
                      hasRecursivecategory={hasSubcategory}
                      recursiveCategory={category}
                      toggleMobileMenu={toggleMobileMenu}
                      isFrontPage={isFrontPage}
                      openMenu={openMenu}
                    />
                    <Divider key={`Divider-${category.categoryId}`} />
                  </Fragment>
                );
              })
            : null}
        </List>
      </Container>
    </Drawer>
  );
}

export default FrontMobileMenu;
