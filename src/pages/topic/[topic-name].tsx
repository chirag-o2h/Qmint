import React, { lazy, Suspense, useEffect, useState, useTransition } from "react";
import { Box, Container, Skeleton, Stack, Typography, useMediaQuery } from "@mui/material";
import Layout from "../../components/common/Layout";
import { PageTitle } from "@/components/common/Utils";
import Seo from "@/components/common/Seo";
import { ENDPOINTS } from "@/utils/constants";
import { useAppDispatch, useAppSelector } from "@/hooks";
import Loader from "@/components/common/Loader";
import MainLayout from "@/components/common/MainLayout";
import axiosInstance from "@/axiosfolder";
import { time } from "console";
import { setConfigDetails } from "@/redux/reducers/homepageReducer";
import FrontHeader from "@/components/header/FrontHeader";
import RenderOnViewportEntry from "@/components/common/RenderOnViewportEntry";
const LazyBullionmarkFooter = lazy(
  () => import("@/components/footer/BullionmarkFooter")
);
interface ServerData {
  configDetails: any;
  configDetailsForRedux: any;
  topicPageData: {
    body: string;
    metaTitle: string;
    metaKeywords: string;
    metaDescription: string;
    systemName: string;
  };
}
function Topics({ serverData }: { serverData: ServerData }) {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));
  const [isRendering, setIsRendering] = useState(true);
  const dispatch = useAppDispatch()
  const configDetailsState = serverData?.configDetails
  const topicDetails = serverData?.topicPageData
  console.log("🚀 ~ Topics ~ serverData:", topicDetails)
  // const { configDetails: configDetailsState } = useAppSelector((state) => state.homePage)
  // const { topicDetails, loading } = useAppSelector((state) => state.topic);
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    startTransition(() => {
      // Simulating initial data fetch
      setTimeout(() => setIsRendering(false), 3500);
    });
  }, [])
  useEffect(() => {
    dispatch(setConfigDetails(serverData?.configDetailsForRedux));

    if (serverData?.configDetails?.Store_FaviconURL?.value) {
      const faviconUrl = serverData?.configDetails?.Store_FaviconURL?.value; // Assuming API response contains favicon URL
      // Update favicon dynamically
      const link: any =
        document.querySelector("link[rel='icon']") ||
        document.createElement("link");
      link.rel = "icon";
      link.href = faviconUrl;
      document.head.appendChild(link);
    }
  }, [serverData]);
  return (
    <>
      {/* {loading &&  <Loader open={loading} />} */}
      {(
        // <MainLayout blackTheme>
        <>
          {isRendering && (
            <>
              <Skeleton
                height={"124px"}
                width={"100%"}
                style={{ marginBottom: !isMobile ? "32px" : "24px", transform: "scale(1)" }}
              />
            </>)}
          {!isRendering && <Suspense fallback={
            <Skeleton
              height={"124px"}
              width={"100%"}
              style={{ marginBottom: !isMobile ? "32px" : "24px", transform: "scale(1)" }}
            />
          }><FrontHeader blackTheme={true} /></Suspense>}
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
            configDetailsState={configDetailsState}
          />
          <Box className="PageTitle">
            <Container>
              <Stack className="AllWrapper" justifyContent="space-between" alignItems="center">
                <Typography variant="h4" component="h2">{topicDetails?.systemName}</Typography>
              </Stack>
            </Container>
          </Box>
          <Container id="PageTopics">
            {/* @ts-ignore */}
            <Box
              className="Content"
              dangerouslySetInnerHTML={{
                __html: topicDetails?.body?.replace("<h1>&nbsp;</h1>", ""),
              }}
            ></Box>
          </Container>
          <RenderOnViewportEntry
            rootMargin="200px"
            threshold={0.25}
            minHeight={800}
          >
            <LazyBullionmarkFooter />
          </RenderOnViewportEntry>
        </>
      )}
    </>
  );
}

export default Topics;

export async function getServerData(context: { params: any; }) {
  try {
    const { params } = context;
    const topicName = params["topic-name"];
    console.log("nefore fatching ", Date.now())
    const [
      configDetailsResponse,
      topicPageDataResponse,
    ] = await Promise.all([
      axiosInstance.get(ENDPOINTS.getConfigStore),
      axiosInstance.post(ENDPOINTS.topicDetail.replace("{{topic-name}}", topicName)),
    ]);
    console.log("after fatching ", Date.now(), configDetailsResponse,
      topicPageDataResponse,)

    const configDetails = configDetailsResponse.data.data;
    const topicPageData = topicPageDataResponse.data;

    return {
      props: {
        configDetails: configDetails?.reduce((acc: any, curr: any) => {
          acc[curr.key] = curr
          return acc
        }, {}),
        configDetailsForRedux: configDetails,
        topicPageData: topicPageData.data,
      },
    };
  } catch (error) {
    console.error("🚀 ~ getServerData ~ error:", error);
    console.log("getServerData -- inside catch block", Date.now());
    return {
      status: 500,
      headers: {},
      props: {},
    };
  }
}
