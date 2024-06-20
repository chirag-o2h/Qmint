import { Stack, Typography } from '@mui/material'
import React from 'react'

function MetalCardHeader() {
  return (
    <Stack className='MetalCardHeader'>
      <Typography variant="subtitle1">GOLD</Typography>
      <Typography variant="body1">LIVE SPOT PRICE</Typography>
    </Stack>)
}

export default MetalCardHeader