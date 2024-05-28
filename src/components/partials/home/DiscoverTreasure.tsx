import React from 'react'
import { Container, Box } from "@mui/material"
import { useAppSelector } from '@/hooks'

function DiscoverTreasure() {
  const sectionDetails = useAppSelector((state) => state.homePage.sectionDetails)
  return (
    sectionDetails["shopHomepage_Section_5_One_pic_and_content"] ?
      <Box id="DiscoverTreasure" component="section">
        <Box className="ck-content">
          <Container className="Container" dangerouslySetInnerHTML={{ __html: sectionDetails["shopHomepage_Section_5_One_pic_and_content"]}}>
          </Container>
        </Box>
      </Box> : null
  )
}

export default React.memo(DiscoverTreasure)