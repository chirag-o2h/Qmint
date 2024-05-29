import { Box, Container } from '@mui/material'
import React from 'react'

function ThreePicsRow() {
  return (
    <Box id="OneBigPicSlider" component="section">
      <Box className="ck-content">
        <Box dangerouslySetInnerHTML={{
          __html: "add api content here"
        }}>
        </Box>
      </Box>
    </Box>)
}

export default ThreePicsRow