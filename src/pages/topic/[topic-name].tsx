import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import Layout from "../../components/common/Layout";
import { PageTitle } from "@/components/common/Utils";
import Seo from "@/components/common/Seo";
import useAPIoneTime from "@/hooks/useAPIoneTime";
import { ENDPOINTS } from "@/utils/constants";
import { getTopicDetails } from "@/redux/reducers/topicReducer";
import { useAppSelector } from "@/hooks";
import Loader from "@/components/common/Loader";
import MainLayout from "@/components/common/MainLayout";
function Topics(paramsData: any) {
  const { configDetails: configDetailsState } = useAppSelector((state) => state.homePage)
  const { topicDetails, loading } = useAppSelector((state) => state.topic);
  useAPIoneTime({
    service: getTopicDetails,
    endPoint: ENDPOINTS.topicDetail?.replace(
      "{{topic-name}}",
      paramsData?.params?.["topic-name"]
    ),
    params: paramsData?.params?.["topic-name"],
  });

  const [topicDetailBody, setTopicDetailBody] = useState(topicDetails?.body)
  useEffect(() => {
    if(topicDetails?.body.includes("<h1>&nbsp;</h1>")){
      setTopicDetailBody(topicDetails?.body.replace("<h1>&nbsp;</h1>", ""))
    }
  }, [topicDetails])

  return (
    <>
      {loading &&  <Loader open={loading} />}
      {!loading && (
        <MainLayout blackTheme>
          <Seo
            keywords={[
              `topics`,
              "Travel",
              "Qmit",
              "gold",
              "metal",
              topicDetails?.metaKeywords
            ]}
            title={(topicDetails?.metaTitle ?? '')}
            lang="en"
            description={configDetailsState?.Store_Meta_Description?.value + '|' + topicDetails?.metaDescription ?? ''}
          />
          <PageTitle title={topicDetails?.systemName} />
          <Container id="PageTopics">
            {/* @ts-ignore */}
            <Box
              className="Content"
              dangerouslySetInnerHTML={{
                __html: topicDetailBody,
              }}
            ></Box>
          </Container>
        </MainLayout>
      )}
    </>
  );
}

export default Topics;
