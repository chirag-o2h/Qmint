import React from "react"
import { Box, Container } from "@mui/material"
import { PageTitle } from "@/components/common/Utils"
import Seo from "@/components/common/Seo"
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { ENDPOINTS } from "@/utils/constants"
import { getTopicDetails } from "@/redux/reducers/topicReducer"
import { useAppSelector } from "@/hooks"
import Layout from "@/components/common/Layout"
import Loader from "@/components/common/Loader"

function Topics(paramsData: any) {
  const { topicDetails, loading } = useAppSelector(state => state.topic)
  const checkLoadingStatus = useAppSelector(state => state.topic.loading);
  useAPIoneTime({ service: getTopicDetails, endPoint: ENDPOINTS.topicDetail?.replace('{{topic-name}}', paramsData?.params?.['topic-name']) })
  return (
    <>
    {checkLoadingStatus && <Loader open = {checkLoadingStatus} />}
   { !loading && <Layout>
      <Seo
        keywords={[`QMint Topics`]}
        title="Sell to us"
        lang="en"
      />
      <PageTitle title={topicDetails?.systemName} />
      <Container id="PageTopics">
        <Box className="Content"> 
        Comming Soon
        </Box>
      </Container>
    </Layout>}
    </>
  )
}

export default Topics