import { useAppSelector } from '@/hooks'
import { Box, Container } from '@mui/material'
import React from 'react'

function ThreePicsRow() {
  const bmkShopSections = useAppSelector(state => state.homePage.bmkShopPageSections)

  return (
    bmkShopSections && <Box id="ThreePicsRow" component="section">
      <Container>
        <Box className="ck-content">
          <Box dangerouslySetInnerHTML={{
            __html: bmkShopSections["shopHomepage_Section_3_Three_pics_in_a_rows"]
          }}>
          </Box>
        </Box>
      </Container>
    </Box>)
}

export default ThreePicsRow