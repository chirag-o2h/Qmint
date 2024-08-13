import React from "react"
import { Box, Stack, Typography, Pagination, Link } from "@mui/material"
// import { Link } from "gatsby"
import { useAppSelector } from "@/hooks"
interface SiteMapItem {
  linkUrl: string;
  name: string;
}

interface SiteMapData {
  [groupTitle: string]: SiteMapItem[];
}
function SitemapList(props: any) {
  const { handlePageChange, siteMapDataFromServer } = props
  const { siteMapData : siteMapDataFromRedux} = useAppSelector(state => state.homePage)
  const siteMapData = siteMapDataFromRedux || siteMapDataFromServer
  const renderTitleWithList = (title: string, list: any[]) => {
    return (
      <Box className="TitleWithList" key={title}>
        <Typography variant="subtitle2">{title}</Typography>
        <Box className="List">
          {list.map((item) => (
            <Link key={item.linkUrl} href={item.linkUrl}>{item?.name}</Link>
          ))}
        </Box>
      </Box>
    )
  }

  return (
    <Box className="SitemapList" component="section">
      <Stack className="ListWrapper">
        {
          Object.entries(siteMapData?.items || {}).map(([groupTitle, dataObj]:any) => {
            return (
              <div key={groupTitle}>
                {renderTitleWithList(groupTitle, dataObj)}
              </div>
            );
          })
        }
        {/* {renderTitleWithList("General", ["Home", "Search", "News", "Blog", "Contact", "My account"])}
        {renderTitleWithList("Categories", ["Home", "Search", "News", "Blog", "Contact", "My account"])} */}
      </Stack>
      <Stack className="Pagination">
        <Pagination count={Math.ceil(((siteMapData?.totalCount || 0) / 50))} onChange={handlePageChange} />
      </Stack>
    </Box>
  )
}

export default SitemapList