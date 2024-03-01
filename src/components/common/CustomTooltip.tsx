import React from "react"
import { ClickAwayListener, Tooltip, Box } from "@mui/material"
import classNames from "classnames"

const ClickTooltip = React.memo((props: any) => {
  const { children, id, open, className, renderComponent, placement, onClose, onClickAway, slotProps, arrow, lightTheme } = props

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <Box className="ClickTooltipWrapper">
        <Tooltip
          id={id}
          open={open}
          title={children}
          onClose={onClose}
          placement={placement}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          PopperProps={{ className: classNames({ "Light": lightTheme }, className), disablePortal: true }}
          slotProps={slotProps}
          arrow={arrow}
        >
          {renderComponent}
        </Tooltip>
      </Box>
    </ClickAwayListener>
  )
})

const HoverTooltip = React.memo((props: any) => {
  const { children, id, className, renderComponent, placement, slotProps, arrow, disablePortal, lightTheme } = props

  return (
    <Tooltip
      id={id}
      title={children}
      placement={placement}
      PopperProps={{ className: classNames("HoverTooltip", { "Light": lightTheme }, className), disablePortal: disablePortal }}
      slotProps={slotProps}
      arrow={arrow}
      enterDelay={400}
    >
      {renderComponent}
    </Tooltip>
  )
})

export { ClickTooltip, HoverTooltip }