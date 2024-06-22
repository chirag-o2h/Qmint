import React from "react"
import { Box, Container, Divider } from "@mui/material"
import { PageTitle } from "@/components/common/Utils"
import Seo from "@/components/common/Seo"
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { ENDPOINTS } from "@/utils/constants"
import { getTopicDetails } from "@/redux/reducers/topicReducer"
import { useAppSelector } from "@/hooks"
import Layout from "@/components/common/Layout"
import Loader from "@/components/common/Loader";
import MetalChartsTitle from "@/components/partials/charts/MetalChartsTitle"
import MetalCard from "@/components/partials/charts/MetalCard"

function Topics(paramsData: any) {
  const checkLoadingStatus = useAppSelector(state => state.topic.loading);
  const { topicDetails, loading } = useAppSelector(state => state.topic)
  useAPIoneTime({ service: getTopicDetails, endPoint: ENDPOINTS.topicDetail?.replace('{{topic-name}}', paramsData?.params?.['topic-name']) })
  return (
    <>
      <Loader open={checkLoadingStatus} />
      {!loading && <Layout>
        <Seo
          keywords={[`BMk Topics`]}
          title="Charts"
          lang="en"
        />
        <PageTitle title={"Charts"} />
        <Container id="PageTopics">
          <Box className="MetalContentWrapper">
            <MetalChartsTitle title="Gold Charts " />
            <Box className="MetalCardsWrapper">
              <MetalCard color="#FF00FF" />
              <MetalCard color="#FF128F" />
              <MetalCard color="#87a878" />
              <MetalCard color="#FF00FF" />
              <MetalCard color="green" />
              <MetalCard color="purple" />
              <MetalCard color="yellow" />
              <MetalCard color="#FF00FF" />
              <MetalCard color="#FF128F" />
            </Box>
            <Divider />
          </Box>
        </Container>
      </Layout>}
    </>
  )
}

export default Topics