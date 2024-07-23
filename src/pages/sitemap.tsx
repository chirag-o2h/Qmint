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
import { getConfigData, IconfigDataFromServer } from "@/utils/getConfigData"
const bodyForSiteMap = {
  "search": "",
  "pageNo": 0,
  "pageSize": 50,
  "sortBy": "",
  "sortOrder": "",
  "filters": {}
}
function Sitemap({ serverData }: { serverData: IconfigDataFromServer }) {
  const [state, setState] = useState({ service: getSiteMapData, body: bodyForSiteMap })
  useAPIoneTime(state)
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setState((prev) => ({ ...prev, body: { ...prev.body, pageNo: value - 1 } }))
  }
  return (
    <>
      <Seo
        lang="en"
        keywords={[`sitemap`, ...serverData?.keywords]}
        configDetailsState={serverData?.configDetails}
      />
      <Layout>
        {/* <Loader open={false} /> */}
        <PageTitle title="Sitemap" />
        <Container id="PageSitemap">
          <SitemapList handlePageChange={handlePageChange} />
          {THEME_TYPE !== "1" && < Services />}
        </Container>
      </Layout>
    </>
  )
}
export const getServerData = async (context: any) => {
  return await getConfigData();
};
export default Sitemap 