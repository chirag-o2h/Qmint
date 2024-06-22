import React, { Fragment, useState } from "react";
import { List, ListItemButton, ListItemText, Collapse } from "@mui/material";

// Assets
import { ArrowDown, ArrowUp } from "../../assets/icons/index";

// Utils
import { navigate } from "gatsby";
import { formatCategoryUrl } from "@/utils/common";

function MobileRecursiveMenu(props: any) {
  const {
    hasRecursivecategory,
    recursiveCategory,
    toggleMobileMenu,
    isFrontPage,
    openMenu,
  } = props;
  const [openRecursiveMenu, setOpenRecursiveMenu] = useState<any>({});
  const handleNavigate = (pathTo: any) => {
    navigate(pathTo);
    toggleMobileMenu();
  };
  const handleDropDownToggle = (recursiveMenuId: any) => {
    setOpenRecursiveMenu((prevOpenRecursiveMenus: any) => ({
      [recursiveMenuId]: !prevOpenRecursiveMenus[recursiveMenuId],
    }));
  };
  return (
    <>
      {hasRecursivecategory ? (
        <Collapse
          key={`Collapse_${recursiveCategory.categoryId}`}
          in={openMenu[recursiveCategory.categoryId]}
        >
          <List component="div">
            {recursiveCategory.subCategories.map((menu: any) => {
              const menuHasSubCategory = menu?.subCategories?.length > 0;
              return (
                <Fragment key={menu.categoryId}>
                  <ListItemButton
                    key={`SubMenu_${menu.categoryId}-${menu.name}`}
                    selected={false}
                    onClick={() => handleDropDownToggle(menu.categoryId)}
                    sx={{ pl: 4 }}
                  >
                    <ListItemText
                      primary={menu.name}
                      primaryTypographyProps={{ variant: "body2" }}
                      onClick={() =>
                        handleNavigate(
                          !isFrontPage
                            ? `/category${formatCategoryUrl(menu?.searchEngineFriendlyPageName)}`
                            : `${formatCategoryUrl(menu?.searchEngineFriendlyPageName)}`
                        )
                      }
                    />
                    {menuHasSubCategory ? (
                      openRecursiveMenu[menu.categoryId] ? (
                        <ArrowUp />
                      ) : (
                        <ArrowDown />
                      )
                    ) : null}
                  </ListItemButton>
                  <MobileRecursiveMenu
                    hasRecursivecategory={menuHasSubCategory}
                    recursiveCategory={menu}
                    toggleMobileMenu={toggleMobileMenu}
                    isFrontPage={isFrontPage}
                    openMenu={openRecursiveMenu}
                  />
                </Fragment>
              );
            })}
          </List>
        </Collapse>
      ) : null}
    </>
  );
}

export default MobileRecursiveMenu;
