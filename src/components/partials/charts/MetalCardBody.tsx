import { Box, Slider, Stack, Typography } from '@mui/material'
import React from 'react'
import MetalCardFooter from './MetalCardFooter'
import ChartMenuChart from '@/components/header/ChartMenuChart'

function MetalCardBody() {
  return (
    <Box className="MetalCardBody">

      <Box className="MetalCardContent">
        <Typography variant="h3" component="h3">$3507.85</Typography>
      </Box>
      <MetalCardFooter />


      <Box className="ChartWrapper">
        <Typography className="Price High" variant="body2">{3526}</Typography>
        <ChartMenuChart data={[3520.63, 3522.24, 3526, 3525.64, 3503.38, 3505.71, 3507.15, 3504.8, 3505.87, 3508.25, 3508.05, 3507.22, 3509.21, 3508.4, 3508.83, 3507.75, 3511.14, 3510.58, 3514.93, 3514.92, 3517.96, 3517.13, 3514.81, 3508.76, 3505.04, 3499.31, 3501.53, 3501.35, 3495.16, 3493.62, 3489.02, 3490.31, 3499.54, 3504.06, 3495.3, 3497.82, 3497.44, 3496.59, 3500.02, 3502.56, 3502.97, 3503.58, 3501.77, 3500.67, 3500.58, 3501.2, 3498.21, 3497.97, 3498.04, 3497.63, 3497.88, 3496.46, 3496.27, 3497.38, 3495.98, 3493.69, 3494.06, 3494.61, 3491.94, 3495.21, 3499.36, 3496.69, 3489.49, 3492.9, 3489.16, 3490.99, 3491.37, 3490.18, 3492.78, 3487.12, 3486.04, 3492.22, 3493.32, 3494.87, 3491.87, 3491.38, 3491.12, 3490.17, 3490.85, 3490.59, 3493.64, 3490.71, 3490.84, 3489.76, 3496.01, 3503.18, 3499.96, 3498.55, 3498.28, 3508.78, 3513.26, 3516.47, 3513.95, 3507.79, 3500.02, 3500.81, 3500.58]
        } color="CurrentColor" min={3486.04} max={3526} />
        <Typography className="Price Low" variant="body2">{3486.04}</Typography>
      </Box>


      <Box className="PriceSliderWrapper">
        <Stack className='PriceWrapper'>
          <Typography variant="body1">15.12</Typography>
          <Typography variant="body1">765.6</Typography>
        </Stack>
        <Stack className="SliderWrapper">
          <Typography variant="caption">LOW</Typography>
          <Slider
            className="Slider"
            value={Number(5)}
            min={Number(1)}
            max={Number(9)}
            disabled
          />
          <Typography variant="caption">HIGH</Typography>
        </Stack>
      </Box>

    </Box>
  )
}

export default MetalCardBody