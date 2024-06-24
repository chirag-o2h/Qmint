import { Stack, Typography } from '@mui/material'
import React from 'react'

function MetalCardHeader(props: any) {
  const {headerTitle1, headerTitle2} = props
  return (
    <Stack className='MetalCardHeader' sx={{ textTransform: "uppercase" }}>
      <Typography variant="subtitle1">{headerTitle1}</Typography>
      <Typography variant="body1">{headerTitle2}</Typography>
    </Stack>)
}

export default MetalCardHeader