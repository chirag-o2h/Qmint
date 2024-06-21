import { FilledUpButton } from '@/assets/icons'
import { Stack, Typography } from '@mui/material'
import React from 'react'

function MetalCardFooter() {
  return (
    /* pass UpTrend, DownTrend, Neutral,NaN  class */
    <Stack className='MetalCardFooter UpTrend'>
      <Typography variant="subtitle1" sx={{ textTransform: "uppercase" }}>UP TREND</Typography>
      {/* <Typography variant="body1"><FilledUpButton />15.12</Typography> */}
      {/* <Typography variant="body1">0.44%</Typography> */}

      {/* <Typography variant="subtitle1" sx={{ textTransform: "uppercase" }}><FilledUpButton />INCREASING</Typography> */}
    </Stack>
  )
}

export default MetalCardFooter