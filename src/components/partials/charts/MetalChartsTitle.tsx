import { Box, Typography } from '@mui/material'
import React from 'react'

function MetalChartsTitle(props: any) {
  return (
    <Box className="MetalChartsTitle">
      <Typography variant="h5" component="h5" className="Title">{props.title}<span style={{
        fontSize: "14px",
        color: "#777777",
      }}>live dashboard</span></Typography>
    </Box>)
}

export default MetalChartsTitle