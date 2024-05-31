import React, { useState, useEffect, useRef } from "react"
import { useScrollTrigger, Stack, Container, Box, IconButton, AppBar } from "@mui/material"
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
    <Box id="MobileSecondaryMenu" className={classNames({ "BmkMobileSecondaryMenu": THEME_TYPE === "1" }, { "BmkWhiteToolbar": trigger && THEME_TYPE === "1" })}>
      <AppBar
        position="static"
        component="div"
        sx={{ top: headerHeight }}
      >
        <Container>
          <Stack className="Wrapper">
            <ClickTooltip
              open={openSearch}
              className="PopoverSearchField"
              placement="bottom"
              onClose={toggleOpenSearch}
              onClickAway={handleClickAway}
              renderComponent={
                configDetailsState?.enablesearch?.value &&
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
            {configDetailsState?.enablephone?.value !== false && <IconButton color="secondary" title='Call us' className={classNames("MenuButton", { "Active": false })} href={"tel:" + configDetailsState?.["australia.phonenumber"]?.value}><Call /></IconButton>}
            {configDetailsState?.enablechart?.value && (configDetailsState.chartenableforguests.value || isLoggedIn) ?
              <ChartMenu />
              : null}
            {configDetailsState?.enablecart?.value ?
              <CartMenu onClick={handleCartMenu} />
              : null}
            <ActionMenu />
          </Stack>
        </Container>
        {THEME_TYPE !== "1" && (<ConstantApiLoader />)}
      </AppBar>
    </Box >
  )
}

export default MobileSecondaryMenu