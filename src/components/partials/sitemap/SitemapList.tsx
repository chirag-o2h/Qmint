import React from "react"
import { Box, Stack, Typography, Pagination } from "@mui/material"
import { Link } from "gatsby"

function SitemapList() {

  const renderTitleWithList = (title: string, list: any[]) => {
    return (
      <Box className="TitleWithList" key={title}>
        <Typography variant="subtitle2">{title}</Typography>
        <Box className="List">
          {list.map((item) => (
            <Link key={item} to="#">{item}</Link>
          ))}
        </Box>
      </Box>
    )
  }

  return (
    <Box className="SitemapList" component="section">
      <Stack className="ListWrapper">
        {renderTitleWithList("General", ["Home", "Search", "News", "Blog", "Contact", "My account"])}
        {renderTitleWithList("Categories", ["Home", "Search", "News", "Blog", "Contact", "My account"])}
      </Stack>
      <Stack className="Pagination">
        <Pagination count={10} />
      </Stack>
    </Box>
  )
}

export default SitemapList