import React from 'react'
import {
  Container,
  Box,
} from "@mui/material"
import { useAppSelector } from '@/hooks'

function LookingFor() {
  const sectionDetails = useAppSelector((state) => state.homePage.sectionDetails)
  return (
    sectionDetails["shopHomepage_Section_3_Three_pics_in_a_rows"] ?
      <Box id="LookingFor" component="section">
        <Box className="ck-content">
          <Container className="Container" dangerouslySetInnerHTML={{ __html: sectionDetails["shopHomepage_Section_3_Three_pics_in_a_rows"] }}>
          </Container>
        </Box>~
      </Box> : null
  )
}
export default React.memo(LookingFor)