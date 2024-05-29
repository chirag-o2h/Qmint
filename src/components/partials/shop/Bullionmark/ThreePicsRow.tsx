import { Box, Container } from '@mui/material'
import React from 'react'

function ThreePicsRow() {
  return (
    <Box id="ThreePicsRow" component="section">
      <Container>
        <Box className="ck-content">
          <Box dangerouslySetInnerHTML={{
            __html: "add api content here"
          }}>
          </Box>
        </Box>
      </Container>
    </Box>)
}

export default ThreePicsRow