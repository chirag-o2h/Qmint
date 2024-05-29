import { useAppSelector } from '@/hooks'
import { Box, Container } from '@mui/material'
import React from 'react'

function OneBigPicAndContent() {
  const bmkShopSections = useAppSelector(state => state.homePage.bmkShopPageSections)

  return (
    bmkShopSections && <Box id="OneBigPicSlider" component="section">
      <Box className="ck-content">
        <Box dangerouslySetInnerHTML={{
          __html: bmkShopSections["shopHomepage_Section_4_One_big_pic_and_content"]
        }}>
        </Box>
      </Box>
    </Box>)
}

export default OneBigPicAndContent