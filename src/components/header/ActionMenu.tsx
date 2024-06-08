import React, { useState, useRef, Fragment } from "react"
import { Box, IconButton } from "@mui/material"
import classNames from "classnames"

// Components
import { ClickTooltip } from "../common/CustomTooltip"

// Assets
import { MenuIcon } from "../../assets/icons/index"

// Utils
import { isActionRejected, LinkWithIcon } from "../common/Utils"
import { actionMenuItems } from "../../utils/data"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { getAppointmentAPI } from "@/redux/reducers/myVaultReducer"
import Toaster from "../common/Toaster"
import useShowToaster from "@/hooks/useShowToaster"

function ActionMenu() {
  const dispatch = useAppDispatch()
  const { openToaster } = useAppSelector(state => state.homePage)
  const { configDetails: configDetailsState, isLoggedIn } = useAppSelector((state) => state.homePage)
  const [open, setOpen] = useState(false)
  const { showToaster } = useShowToaster();
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
  const callAppointment = async () => {
    const response: any = await dispatch(getAppointmentAPI())

    if (isActionRejected(response.type)) {
      showToaster({
        message: "Something went wrong.",
        severity: 'error'
      })
      return
    }

    if (response?.payload?.data?.data) {
      const url = response.payload.data.data;
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      showToaster({
        message: response?.payload?.data?.message,
        severity: 'error'
      })
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
        {actionMenuItems
          .filter((menu) => {
            if (menu.key === 'AppointmentBooking_Enable') {
              if (configDetailsState?.[menu.key]?.value && isLoggedIn) {
                return true
              }
              return false
            }
            if (configDetailsState?.[menu.key]?.value) {
              return true
            }
            return false
          })
          .map((menu, index) => (
            menu.key === 'AppointmentBooking_Enable' ? (
              <span
                key={menu.key + index + 'box'}
                rel="noopener noreferrer"
                onClick={() => {
                  callAppointment()
                }}
              >
                <LinkWithIcon icon={menu.icon} text={menu.text} />
              </span>
            ) :
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