import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import MetalCardFooter from './MetalCardFooter'

function MetalCardBody() {
  return (
    <Box className="MetalCardBody">
      <Box className="MetalCardContent">
        <Typography variant="h3" component="h3">$3507.85</Typography>
      </Box>
      <MetalCardFooter />
    </Box>
  )
}

export default MetalCardBody