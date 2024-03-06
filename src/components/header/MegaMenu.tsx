import React from "react"
import { Box, Container, Stack, Link, Typography } from "@mui/material"

// Componenets
import SubMenu from "./SubMenu"
import { Icategory } from "./Navigation"

function MegaMenu({ subCategorys, category }: { subCategorys: Icategory[], category: Icategory }) {
  return (
    <Container className="MegaMenu">
      <Stack className="MegaMenu__Wrapper">
        <Stack className="Left">
          {subCategorys.map((item: Icategory) => (
            <SubMenu name={item.name} subcategories={item.subCategories} key={item.categoryId} />
          ))}
        </Stack>
        <Stack className="Right">
          <Box className="DestinationMenu">
            {category?.categoryImages?.length > 0 ? category?.categoryImages?.map((item) => {
              return (
                <Link href={item.redirectUrl} className="DestinationLink" key={item.categoryId}>
                  <Box className="ImageWrapper"><img src={item.imageUrl} /></Box>
                  <Typography variant="overline" component="span">
                    {item.imageText}
                  </Typography></Link>)
            }) : null}
          </Box>
        </Stack>
      </Stack>
    </Container>
  )
}

export default MegaMenu