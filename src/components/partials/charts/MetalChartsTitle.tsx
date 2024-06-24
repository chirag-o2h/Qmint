import { Box, Typography } from '@mui/material'
import React from 'react'

function MetalChartsTitle({title} : {title: string}) {
  return (
    <Box className="MetalChartsTitle">
      <Typography variant="h5" component="h5" className="Title">{title.toUpperCase()}<span style={{
        fontSize: "14px",
        color: "#777777",
      }}>live dashboard</span></Typography>
    </Box>)
}

export default MetalChartsTitle