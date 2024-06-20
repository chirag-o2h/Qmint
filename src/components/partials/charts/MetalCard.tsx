import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import MetalCardHeader from './MetalCardHeader'
import MetalCardBody from './MetalCardBody'

function MetalCard() {
  return (
    <Box className="MetalCard">
      <MetalCardHeader />
      <MetalCardBody />
    </Box>
  )
}

export default MetalCard