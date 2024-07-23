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
import { getConfigData, IconfigDataFromServer } from "@/utils/getConfigData"

function Topics({ serverData, params }: { serverData: IconfigDataFromServer, params: any }) {
  const { topicDetails, loading } = useAppSelector(state => state.topic)
  const checkLoadingStatus = useAppSelector(state => state.topic.loading);
  useAPIoneTime({ service: getTopicDetails, endPoint: ENDPOINTS.topicDetail?.replace('{{topic-name}}', params?.['topic-name']) })
  return (
    <>
      <Seo
        lang="en"
        keywords={[`sell-to-us`, ...serverData?.keywords]}
        configDetailsState={serverData?.configDetails}
      />
      {checkLoadingStatus && <Loader open={checkLoadingStatus} />}
      {!loading && <Layout>
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
export const getServerData = async (context: any) => {
  return await getConfigData();
};
export default Topics