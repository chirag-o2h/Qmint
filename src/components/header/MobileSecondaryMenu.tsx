import React, { useState, useEffect, useRef } from "react"
import { useScrollTrigger, Stack, Container, Box, IconButton, AppBar, Divider } from "@mui/material"
import classNames from "classnames"

// Assets
import { Search, Call } from "../../assets/icons/index"

// Components
import { ClickTooltip } from "../common/CustomTooltip"
import { ConstantApiLoader } from './Loader'
import ChartMenu from "./ChartMenu"
import CartMenu from "./CartMenu"
import ActionMenu from "./ActionMenu"
import SearchField from "./SearchField"
import { useAppSelector } from "@/hooks"
import { navigate } from "gatsby"
import { STORE_CODE, THEME_TYPE } from "@/axiosfolder";

function MobileSecondaryMenu() {
  const { configDetails: configDetailsState, isLoggedIn } = useAppSelector((state) => state.homePage)
  const [openSearch, setOpenSearch] = useState<boolean>(false)
  const [headerHeight, setHeaderHeight] = useState<number>(0)
  const searchButtonRef: any = useRef(null)
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: headerHeight,
  })
  const toggleOpenSearch = () => {
    setOpenSearch(!openSearch)
  }
  const handleClickAway = (event: any) => {
    if (searchButtonRef.current && !searchButtonRef.current.contains(event.target)) {
      setOpenSearch(false)
    }
  }

  const handleCartMenu = () => {
    navigate("/shopping-cart")
  }

  useEffect(() => {
    const header = document.querySelector("#HeaderWrapper .MuiAppBar-root")?.clientHeight
    setHeaderHeight(header ?? 0)
  }, [])
  return (
    <Box id="MobileSecondaryMenu" className={classNames({ "BmkMobileSecondaryMenu": THEME_TYPE === "1" }, { "BmkWhiteToolbar": THEME_TYPE === "1" })}>
      <AppBar
        position="static"
        component="div"
        sx={{ top: headerHeight }}
      >
        <Container>
          <Stack className="Wrapper">
            {configDetailsState?.Search_MenuIcon_Enable?.value &&
              <ClickTooltip
                open={openSearch}
                className="PopoverSearchField"
                placement="bottom"
                onClose={toggleOpenSearch}
                onClickAway={handleClickAway}
                renderComponent={
                  <IconButton aria-label='SearchButton' ref={searchButtonRef} className={classNames("MenuButton", { "Active": false })} onClick={toggleOpenSearch}><Search /></IconButton>
                }
                lightTheme
                disablePortal={true}
                arrow
              >
                <Container>
                  <SearchField />
                </Container>
              </ClickTooltip>
            }
            {configDetailsState?.["Phone_MenuIcon_Enable"]?.value !== false && <IconButton color="secondary" title='Call us' className={classNames("MenuButton", { "Active": false })} href={"tel:" + configDetailsState?.["StorePhoneNumber_AU"]?.value}><Call /></IconButton>}
            {configDetailsState?.Chart_MenuIcon_Enable?.value && (configDetailsState.Chart_MenuIcon_Enable_Guests.value || isLoggedIn) ?
              <ChartMenu />
              : null}
            {configDetailsState?.Cart_MenuIcon_Enable?.value ?
              <CartMenu onClick={handleCartMenu} />
              : null}
            <ActionMenu />
          </Stack>
        </Container>
        {THEME_TYPE === "0" && <ConstantApiLoader />}
      </AppBar>
      {THEME_TYPE === "1" && <Divider />}
    </Box >
  )
}

export default MobileSecondaryMenu