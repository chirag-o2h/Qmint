import React from "react"
import { Box, Container } from "@mui/material"
import Layout from "../../components/common/Layout"
import { PageTitle } from "@/components/common/Utils"
import Seo from "@/components/common/Seo"
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { ENDPOINTS } from "@/utils/constants"
import { getTopicDetails } from "@/redux/reducers/topicReducer"
import { useAppSelector } from "@/hooks"
import Loader from "@/components/common/Loader"
function Topics(paramsData: any) {
  const { topicDetails, loading } = useAppSelector(state => state.topic)
  useAPIoneTime({
    service: getTopicDetails,
    endPoint: ENDPOINTS.topicDetail?.replace('{{topic-name}}',
      paramsData?.params?.['topic-name']),
    params: paramsData?.params?.['topic-name']
  })
  console.log("🚀 ~ Topics ~ paramsData?.params?.['topic-name']:", paramsData?.params?.['topic-name'])
  return (
    <>
      <Loader open={loading} />
      {
        !loading && <Layout>
          <Seo
            keywords={[`QMint Topics`]}
            title="Topics"
            lang="en"
          />
          <PageTitle title={topicDetails?.systemName} />
          <Container id="PageTopics">
            {/* @ts-ignore */}
            <Box className="Content" dangerouslySetInnerHTML={{
              __html: topicDetails?.body
            }} >
            </Box>
          </Container>
        </Layout>
      }
    </>
  )
}

export default Topics