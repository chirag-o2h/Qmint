import { useAppSelector } from '@/hooks'
import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import goldbannerImage from "@/assets/images/goldbannerImage.png"

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
    </Box >
  )
}

export default OneBigPicAndContent