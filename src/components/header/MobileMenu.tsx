import React, { Fragment, useEffect, useState } from "react"
import { Drawer, List, ListItemButton, ListItemText, Container, Divider, Collapse } from "@mui/material"
import classNames from 'classnames'
import { useLocation } from '@reach/router';

// Assets
import { ArrowDown, ArrowUp } from '../../assets/icons/index'

// Utils
import { useAppSelector } from "@/hooks"
import { navigate } from "gatsby";
import useAPIoneTime from "@/hooks/useAPIoneTime";
import { CategoriesListDetails } from "@/redux/reducers/homepageReducer";
import { ENDPOINTS } from "@/utils/constants";
import { formatCategoryUrl, isItNewsOrBlogPage } from "@/utils/common";
import { THEME_TYPE } from "@/axiosfolder";
function FrontMobileMenu(props: any) {
  const { open, toggleMobileMenu, trigger, isFrontPage } = props
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState<any>({})
  const [openSubMenu, setOpenSubMenu] = useState<any>({})
  const [isHomePage, setIsHomePage] = useState<boolean>(false)
  const { categoriesList } = useAppSelector((state) => state.homePage)
  const [params] = useState({ page: location.pathname === "/" ? 0 : 1 })
  const handleClickMainMenu = (menuId: any) => {
    setOpenMenu((prevOpenMenus: any) => ({
      [menuId]: !prevOpenMenus[menuId]
    }))
  }

  const handleClickSubMenu = (subMenuId: any) => {
    setOpenSubMenu((prevOpenSubMenus: any) => ({
      [subMenuId]: !prevOpenSubMenus[subMenuId]
    }))
  }

  useEffect(() => {
    if (location.pathname === "/") {
      setIsHomePage(true)
    }
  }, [])
  const handleNavigate = (pathTo: any) => {
    navigate(pathTo)
    toggleMobileMenu()
  }
  return (
    <Drawer
      id="MobileMenu"
      className={classNames({ "ScrollActive": trigger, "isHomePage": isHomePage, 'FrontPageMenu': isFrontPage, "BmkMobileMenu": THEME_TYPE === "1" && !trigger && !isItNewsOrBlogPage.some((page) => window.location.pathname.includes(page)), "BmkMobileMenuWithoutAnygap": THEME_TYPE === "1"  })}
      open={open}
      variant="temporary"
      onClose={toggleMobileMenu}
      anchor="top"
      disableScrollLock
    >
      <Container className="HeaderContainer">
        <List component="nav">
          {categoriesList?.items?.length > 0 ?
            categoriesList?.items?.map((category: any) => {
              let hasSubcategory = category?.subCategories?.length > 0
              return (
                <Fragment key={category.categoryId}>
                  <ListItemButton
                    key={`ListItemButton-${category.categoryId}`}
                    className={classNames([openMenu[category.categoryId] ? "ExpandedMenu" : "CollapsedMenu"])}
                    selected={category.categoryId === 0}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleClickMainMenu(category.categoryId);
                      if (!hasSubcategory) {
                        handleNavigate(!isFrontPage ? `/category${formatCategoryUrl(category.searchEngineFriendlyPageName)}` : `${formatCategoryUrl(category.searchEngineFriendlyPageName)}`)
                      }
                    }}
                  >
                    <ListItemText primary={category.name} primaryTypographyProps={{ variant: "body2" }}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleNavigate(!isFrontPage ? `/category${formatCategoryUrl(category.searchEngineFriendlyPageName)}` : `${formatCategoryUrl(category.searchEngineFriendlyPageName)}`)
                      }}
                    />
                    {hasSubcategory ?
                      openMenu[category.categoryId] ? <ArrowUp /> : <ArrowDown />
                      : null
                    }
                  </ListItemButton>
                  {hasSubcategory ?
                    <Collapse key={`Collapse_${category.categoryId}`} in={openMenu[category.categoryId]}>
                      <List component="div">
                        {category.subCategories.map((menu: any, menuIndex: number) => {
                          return (
                            <Fragment key={menu.categoryId}>
                              <ListItemButton key={`SubMenu_${menu.categoryId}-${menu.name}`} selected={false} onClick={() => handleClickSubMenu(menu.categoryId)} sx={{ pl: 4 }}>
                                <ListItemText primary={menu.name} primaryTypographyProps={{ variant: "body2" }} onClick={() => handleNavigate(!isFrontPage ? `/category${formatCategoryUrl(menu?.searchEngineFriendlyPageName)}` : `${formatCategoryUrl(menu?.searchEngineFriendlyPageName)}`)} />
                                {openSubMenu[menu.categoryId] ? <ArrowUp /> : <ArrowDown />}
                              </ListItemButton>
                              <Collapse key={`Collapse_${menu.categoryId}-${menu.name}`} in={openSubMenu[menu.categoryId]} sx={{ pl: 4 }}>
                                <List component="div">
                                  {menu.subCategories.map((subCategory: any) => {
                                    return (
                                      <ListItemButton key={`SubMenu_${subCategory.categoryId}-${subCategory.name}`} selected={false} sx={{ pl: 4 }} onClick={() => {
                                        handleNavigate(!isFrontPage ? `/category${formatCategoryUrl(subCategory.searchEngineFriendlyPageName)}` : `${formatCategoryUrl(subCategory.searchEngineFriendlyPageName)}`)
                                      }}>
                                        <ListItemText primary={subCategory.name} primaryTypographyProps={{ variant: "body2" }} />
                                      </ListItemButton>
                                    )
                                  })}
                                </List>
                              </Collapse>
                            </Fragment>
                          )
                        })}
                      </List>
                    </Collapse> : null
                  }
                  <Divider key={`Divider-${category.categoryId}`} />
                </Fragment>
              )
            }) : null}
        </List>
      </Container>
    </Drawer>
  )
}

export default FrontMobileMenu
