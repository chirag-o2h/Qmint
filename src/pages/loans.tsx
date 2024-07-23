import React from "react"
import { Box, Container } from "@mui/material"
import { PageTitle } from "@/components/common/Utils"
import Seo from "@/components/common/Seo"
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { ENDPOINTS } from "@/utils/constants"
import { getTopicDetails } from "@/redux/reducers/topicReducer"
import { useAppSelector } from "@/hooks"
import Layout from "@/components/common/Layout"
import Loader from "@/components/common/Loader";
import { getConfigData, IconfigDataFromServer } from "@/utils/getConfigData"

function Topics({ params, serverData }: { serverData: IconfigDataFromServer, params: any }) {
  const checkLoadingStatus = useAppSelector(state => state.topic.loading);
  const { topicDetails, loading } = useAppSelector(state => state.topic)
  useAPIoneTime({ service: getTopicDetails, endPoint: ENDPOINTS.topicDetail?.replace('{{topic-name}}', params?.['topic-name']) })
  return (
    <>
      <Seo
        lang="en"
        keywords={[`Loans`, ...serverData?.keywords]}
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