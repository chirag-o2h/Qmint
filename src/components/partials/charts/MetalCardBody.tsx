import { Box, Slider, Stack, Typography } from "@mui/material";
import React from "react";
import MetalCardFooter from "./MetalCardFooter";
import ChartMenuChart from "@/components/header/ChartMenuChart";

function MetalCardBody(props: any) {
  const {
    currentPrice,
    move,
    percentage,
    lineChartData,
    isStrengh,
    low,
    high,
    isVolatility,
    isDollarSign,
  } = props;
  const value = isDollarSign ? "$" + currentPrice : currentPrice;

  if (low && high) {
    return (
      <Box className="MetalCardBody">
        <Box className="PriceSliderWrapper">
          <Stack className="PriceWrapper">
            <Typography variant="body1">{low}</Typography>
            <Typography variant="body1">{high}</Typography>
          </Stack>
          <Stack className="SliderWrapper">
            <Typography variant="caption">LOW</Typography>
            <Slider
              className="Slider"
              value={currentPrice}
              min={low}
              max={high}
              disabled
            />
            <Typography variant="caption">HIGH</Typography>
          </Stack>
        </Box>
      </Box>
    );
  }

  if (currentPrice) {
    return (
      <Box className="MetalCardBody">
        <Box className="MetalCardContent">
          <Typography variant="h3" component="h3">
            {value}
          </Typography>
        </Box>
        <MetalCardFooter
          currentPrice={currentPrice}
          move={move}
          percentage={percentage}
          isStrengh={isStrengh}
          isVolatility={isVolatility}
        />
      </Box>
    );
  }

  if (lineChartData) {
    let max = Number.MIN_VALUE,
      min = Number.MAX_VALUE;

    lineChartData.forEach((num: number) => {
      max = Math.max(max, num);
      min = Math.min(min, num);
    });
    return (
      <Box className="MetalCardBody">
        <Box className="ChartWrapper">
          <Typography className="Price High" variant="body2">
            {max}
          </Typography>
          <ChartMenuChart
            data={lineChartData}
            color="CurrentColor"
            min={min}
            max={max}
          />
          <Typography className="Price Low" variant="body2">
            {min}
          </Typography>
        </Box>
      </Box>
    );
  }
}

export default MetalCardBody;
