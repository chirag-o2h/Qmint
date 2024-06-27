import React, { useState } from "react"
import { Container } from "@mui/material"

// Hooks
import { useAppSelector } from '@/hooks'
import useAPIoneTime from '@/hooks/useAPIoneTime'

// Reducers
import { getSiteMapData } from '@/redux/reducers/homepageReducer'

// Componenets
import Layout from "@/components/common/Layout"
import Loader from "@/components/common/Loader"
import Seo from "@/components/common/Seo"
import { PageTitle } from "@/components/common/Utils"
import SitemapList from "@/components/partials/sitemap/SitemapList"
import Services from "@/components/partials/sitemap/Services"
import { THEME_TYPE } from "@/axiosfolder"
const bodyForSiteMap = {
  "search": "",
  "pageNo": 0,
  "pageSize": 50,
  "sortBy": "",
  "sortOrder": "",
  "filters": {}
}
function Sitemap() {
  const [state, setState] = useState({ service: getSiteMapData, body: bodyForSiteMap })
  useAPIoneTime(state)
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setState((prev) => ({ ...prev, body: { ...prev.body, pageNo: value - 1 } }))
  }
  return (
    <Layout>
      {/* <Loader open={false} /> */}
      <Seo
        keywords={[`QMint Sitemap`]}
        title="Sitemap"
        lang="en"
      />
      <PageTitle title="Sitemap" />
      <Container id="PageSitemap">
        <SitemapList handlePageChange={handlePageChange} />
        {THEME_TYPE !== "1" && < Services />}
      </Container>
    </Layout>
  )
}

export default Sitemap 