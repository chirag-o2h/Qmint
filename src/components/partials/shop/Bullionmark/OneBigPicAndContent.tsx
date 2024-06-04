import { useAppSelector } from '@/hooks'
import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import goldbannerImage from "@/assets/images/goldbannerImage.png"

function OneBigPicAndContent() {
  const bmkShopSections = useAppSelector(state => state.homePage.bmkShopPageSections)

  return (
    bmkShopSections && <Box id="OneBigPicSlider" component="section"
      sx={{ backgroundImage: `url(${goldbannerImage})` }}
    >
      <Box className="ck-content">
        <Box dangerouslySetInnerHTML={{
          __html: bmkShopSections["shopHomepage_Section_4_One_big_pic_and_content"]
        }}>
        {/* <Box className="BannerWrapper">
          <Typography variant="body2" className="OfferTag">50% OFF ON</Typography>
          <Typography variant="h3" className="BannerTitle">Bullionmark Kangaroo
            Gold Cast Bar</Typography>
          <Typography variant="body2" className="BannerDescription">See our Shipping out off dates</Typography>
          <Button variant="contained">Shop Now</Button>
        </Box> */}
        </Box>
      </Box>
    </Box >
  )
}

export default OneBigPicAndContent