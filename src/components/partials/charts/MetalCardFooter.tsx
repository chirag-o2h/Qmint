import { FilledUpButton } from "@/assets/icons";
import { Stack, Typography } from "@mui/material";
import React from "react";
const classToName = {
  Neutral: "Neutral",
  UpTrend: "UP TREND",
  DownTrend: "DOWN TREND",
};
const MetalCardFooter = ({
  currentPrice,
  move,
  percentage,
  isStrengh,
  isVolatility,
}: any) => {
  const getTrendClass = () => {
    if (isStrengh) return "Neutral";
    if (currentPrice > 0 || percentage > 0) return "UpTrend";
    if (currentPrice < 0 || percentage < 0) return "DownTrend";
    return "Neutral";
  };

  const trendClass = getTrendClass();

  return (
    <Stack className={`MetalCardFooter ${trendClass}`}>
      {move && percentage ? (
        <>
          <Typography variant="body1">
            <FilledUpButton />
            {move}
          </Typography>
          <Typography variant="body1">{percentage}%</Typography>
        </>
      ) : isVolatility ? (
        <Typography variant="subtitle1" sx={{ textTransform: "uppercase" }}>
          <FilledUpButton />
          INCREASING
        </Typography>
      ) : (
        <Typography variant="subtitle1" sx={{ textTransform: "uppercase" }}>
          {classToName[trendClass]}
        </Typography>
      )}
    </Stack>
  );
};

export default MetalCardFooter;
