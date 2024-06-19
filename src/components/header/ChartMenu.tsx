import React, { useState, useRef, useEffect } from "react"
import { useMediaQuery, Box, Button, IconButton, Stack, Typography } from "@mui/material"
import classNames from "classnames"

// Assets
import { ActivityIcon } from "../../assets/icons/index"

// Components
import { ClickTooltip } from "@/components/common/CustomTooltip"
import ChartMenuChart from "./ChartMenuChart"

// Hooks
import { useAppSelector } from "@/hooks"
import { metalColors } from "@/utils/common"
import { navigate } from "gatsby"
import { THEME_TYPE } from "@/axiosfolder"

const requiredChartKeys = new Set(["gold", "silver", "platinum", "palladium"])

function ChartMenu() {
  const chartData = useAppSelector(state => state.homePage.liveDashboardChartData);
  const isSmallScreen = useMediaQuery((theme: any) => theme.breakpoints.down("md"));
  const [open, setOpen] = useState<boolean>(false)
  const tooltipRef = useRef(null)

  const handleTooltipClose = (event: any) => {
    setOpen(false)
  }
  const handleTooltipOpen = () => {
    setOpen(!open)
  }
  const handleClickAway = (event: any) => {
    if (tooltipRef.current) {
      setOpen(false)
    }
  }
  const renderStokeItem = (key: string, value: any, color: string) => {
    let max = Number.MIN_VALUE, min = Number.MAX_VALUE;

    value?.linechartdata.forEach((num: number) => {
      max = Math.max(max, num);
      min = Math.min(min, num);
    })

    return (
      <Box className="StokeItem" key={key}>
        <Stack className="Header">
          <Typography sx={{ color: color ?? 'CaptionText' }}>{key.toUpperCase()}</Typography>
          <Typography sx={{ color: color ?? 'tomato' }}>{"3 Day Range"}</Typography>
        </Stack>
        <Box className="ChartWrapper">
          <Typography className="Price High" variant="body2">{max}</Typography>
          <ChartMenuChart data={value?.linechartdata} color={color ?? "red"} min={min} max={max} />
          <Typography className="Price Low" variant="body2">{min}</Typography>
        </Box>
      </Box>
    )
  }
  return (
    <ClickTooltip
      open={open}
      id="ChartMenu"
      className="ChartMenuTooltip"
      placement={isSmallScreen ? "bottom" : "bottom-end"}
      onClose={handleTooltipClose}
      onClickAway={handleClickAway}
      renderComponent={<IconButton ref={tooltipRef} aria-label='chartIcon' className={classNames("MenuButton", { "Active": false })} onClick={handleTooltipOpen}><ActivityIcon /></IconButton>}
      lightTheme
      disablePortal={true}
      arrow
    >
      <Stack className="Content">
        {Object.entries(chartData).map(([key, value]) => {
          if (requiredChartKeys.has(key)) {
            return renderStokeItem(key, value, metalColors[key]);
          }
          return null;
        })}
        <Button color={THEME_TYPE === "1" ? "primary" : "secondary"} variant="contained" fullWidth onClick={() => {
          navigate("/chart")
        }}>See More</Button>
      </Stack>

    </ClickTooltip >
  )
}

export default React.memo(ChartMenu)