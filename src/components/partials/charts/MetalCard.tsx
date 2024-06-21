import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import MetalCardHeader from './MetalCardHeader'
import MetalCardBody from './MetalCardBody'

function MetalCard(props: any) {
  return (
    <Box className="MetalCard" color={props.color}>
      <MetalCardHeader />
      <MetalCardBody />
    </Box>
  )
}

export default MetalCard