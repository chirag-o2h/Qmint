import React, { useEffect, useState } from "react"
import { Container } from "@mui/material"

// Hooks
import { useAppDispatch, useAppSelector } from '@/hooks'
import useAPIoneTime from '@/hooks/useAPIoneTime'

// Reducers
import { getSiteMapData, setSiteMapData } from '@/redux/reducers/homepageReducer'

// Componenets
import Layout from "@/components/common/Layout"
import Loader from "@/components/common/Loader"
import Seo from "@/components/common/Seo"
import { PageTitle } from "@/components/common/Utils"
import SitemapList from "@/components/partials/sitemap/SitemapList"
import Services from "@/components/partials/sitemap/Services"
import axiosInstance from "@/axiosfolder"
import { getConfigData, IconfigDataFromServer } from "@/utils/getConfigData"
import { ENDPOINTS } from "@/utils/constants"
const bodyForSiteMap = {
  "search": "",
  "pageNo": 0,
  "pageSize": 50,
  "sortBy": "",
  "sortOrder": "",
  "filters": {}
}
function Sitemap({ serverData }: {
  serverData: {
    configDetails: any,
    keywords: any[],
    configDetailsForRedux: any,
    siteMapData: any
  },
}) {
  const dispatch = useAppDispatch()
  const [state, setState] = useState({ service: getSiteMapData, body: bodyForSiteMap, conditionalCall: false })
  useAPIoneTime(state)
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setState((prev) => ({ ...prev, body: { ...prev.body, pageNo: value - 1 }, conditionalCall: true }))
  }
  useEffect(() => {
    dispatch(setSiteMapData(serverData?.siteMapData))
  }, [serverData?.siteMapData])
  return (
    <>
      <Seo
        lang="en"
        keywords={[`sitemap`, ...(serverData?.keywords || [])]}
        configDetailsState={serverData?.configDetails}
      />
      <Layout>
        {/* <Loader open={false} /> */}
        <PageTitle title="Sitemap" />
        <Container id="PageSitemap">
          <SitemapList handlePageChange={handlePageChange} siteMapDataFromServer={serverData?.siteMapData}/>
          {process.env.GATSBY_THEME_TYPE !== "1" && <Services />}
        </Container>
      </Layout>
    </>
  )
}
export const getServerData = async (context: any) => {
  try {
    console.log("Fetching config data", Date.now());

    const [
      configDetailsResponse,
      siteMapDataResponsey,
    ] = await Promise.all([
      axiosInstance.get(ENDPOINTS.getConfigStore),
      axiosInstance.post(ENDPOINTS.siteMapUrl, bodyForSiteMap)
    ]);


    const configDetails = configDetailsResponse.data.data;
    const siteMapData = siteMapDataResponsey.data.data
    const modifiedConfigDetails = configDetails?.reduce((acc: any, curr: any) => {
      acc[curr.key] = curr;
      return acc;
    }, {})
    const groupedData = siteMapData?.items?.reduce((acc: { [x: string]: any[]; }, currentItem: { groupTitle: any; }) => {
      const { groupTitle } = currentItem;
      if (!acc[groupTitle]) {
        acc[groupTitle] = [];
      }
      acc[groupTitle].push(currentItem);
      return acc;
    }, {});
    return {
      props: {
        configDetails: modifiedConfigDetails,
        keywords: modifiedConfigDetails?.Store_ShopPage_Meta_Keywords?.value?.split(",") || [],
        configDetailsForRedux: configDetails,
        siteMapData: { items: groupedData, totalCount: siteMapData?.count }
      },
    };
  } catch (error) {
    console.error("Error fetching config data:", error);
    return {
      status: 500,
      headers: {},
      props: {},
    };
  }
};
export default Sitemap 