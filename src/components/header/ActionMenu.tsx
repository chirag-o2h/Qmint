import React, { useState, useRef, Fragment } from "react"
import { Box, IconButton } from "@mui/material"
import classNames from "classnames"

// Components
import { ClickTooltip } from "../common/CustomTooltip"

// Assets
import { MenuIcon } from "../../assets/icons/index"

// Utils
import { LinkWithIcon } from "../common/Utils"
import { actionMenuItems } from "../../utils/data"
import { useAppSelector } from "@/hooks"

function ActionMenu() {
  const { configDetails: configDetailsState } = useAppSelector((state) => state.homePage)
  const [open, setOpen] = useState(false)
  const tooltipRef = useRef(null)
  const handleTooltipClose = (event: any) => {
    setOpen(false)
  }
  const handleTooltipOpen = () => {
    setOpen(!open)
  }
  const handleClickAway = (event: any) => {
    // if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
    if (tooltipRef.current) {
      setOpen(false)
    }
  }
  return (
    <ClickTooltip
      open={open}
      id="ActionMenu"
      className="TooltipOfferTag"
      placement="bottom-end"
      onClose={handleTooltipClose}
      onClickAway={handleClickAway}
      renderComponent={<IconButton ref={tooltipRef} aria-label='MenuButton' className={classNames("MenuButton", { "Active": open })} onClick={handleTooltipOpen}><MenuIcon /></IconButton>}
      lightTheme
      disablePortal={true}
      arrow
    >
      <Box className="Wrapper" key={'Wrapper'}>
        {actionMenuItems.filter((menu) => {
          if (configDetailsState?.[menu.key]?.value) {
            return true
          }
          return false
        }).map((menu, index) => (
          <Fragment key={menu.key}>
            <LinkWithIcon key={menu.key + index + 'box'} href={menu.href} icon={menu.icon} text={menu.text} />
            {/* {index === 3 && (<Box key="DummyBox" className="DummyBox"></Box>)} */}
          </Fragment>
        ))}
      </Box>
    </ClickTooltip>
  )
}

export default React.memo(ActionMenu)