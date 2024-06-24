import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import MetalCardHeader from "./MetalCardHeader";
import MetalCardBody from "./MetalCardBody";

function MetalCard(props: any) {
  const {
    headerTitle1,
    headerTitle2,
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
  return (
    <Box className="MetalCard" color={props.color}>
      <MetalCardHeader
        headerTitle1={headerTitle1}
        headerTitle2={headerTitle2}
      />
      <MetalCardBody
        currentPrice={currentPrice}
        move={move}
        percentage={percentage}
        lineChartData={lineChartData}
        isStrengh={isStrengh}
        low={low}
        high={high}
        isVolatility={isVolatility}
        isDollarSign={isDollarSign}
      />
    </Box>
  );
}

export default MetalCard;
