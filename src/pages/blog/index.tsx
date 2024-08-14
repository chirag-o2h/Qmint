import React, { lazy, Suspense, useEffect, useMemo, useState, useTransition } from "react";
import {
  Box,
  Grid,
  Container,
  Typography,
  Stack,
  TextField,
  Button,
  Tabs,
  Tab,
  Skeleton,
  useMediaQuery,
} from "@mui/material";

import TabPanel from "@/components/common/TabPanel";

// Components
import PostCard from "@/components/common/PostCard";
import RecordNotFound from "@/components/common/RecordNotFound";

// Utils
import { Breadcrumb } from "@/components/common/Utils";

// CSS Variable
import * as variable from "../../scss/settings/variables.module.scss";
// Assets
import { SearchButtonIcon } from "../../assets/icons/index";
import { useAppDispatch, useAppSelector } from "@/hooks";
import useAPIoneTime from "@/hooks/useAPIoneTime";
import { BlogList } from "@/redux/reducers/blogReducer";
import { ENDPOINTS } from "@/utils/constants";
import useDebounce from "@/hooks/useDebounce";
import { navigate } from "gatsby";
import axiosInstance from "@/axiosfolder";
import BlogServices from "@/apis/services/blogAndNewsServices";
import MainLayout from "@/components/common/MainLayout";
import axios from "axios";
export const bodyData = {
  search: "",
  pageNo: 0,
  pageSize: -1,
  sortBy: "",
  sortOrder: "",
  filters: {
    keyword: null,
  },
}
import Loader from "@/components/common/Loader";
import Seo from "@/components/common/Seo";
import { setConfigDetails } from "@/redux/reducers/homepageReducer";
import FrontHeader from "@/components/header/FrontHeader";
import RenderOnViewportEntry from "@/components/common/RenderOnViewportEntry";
const BullionmarkFrontFooter = lazy(() => import('@/components/footer/BullionmarkFrontFooter'));
const LazyFrontFooter = lazy(() => import('@/components/footer/FrontFooter'));
function Blog({ serverData }: any) {
  const configDetailsState = serverData?.configDetails
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));
  const dispatch = useAppDispatch()
  // ssr uncommit below line
  let blogList = serverData?.blogList
  let topThree = serverData?.blogList?.items.slice(0, 3)
  const { blogList: blogListFromTheRedux, topThree: topThreeFromTheRedux }: any = useAppSelector((state) => state.blogPage);
  const checkLoadingStatus = useAppSelector(state => state.blogPage.loading);
  const [value, setValue] = React.useState<any>("all");
  const [searchValue, setSearchValue] = useState<string>("");
  // if ssr then remove the bodydata form initiatl 
  const [body, setbody] = useState<any>();
  const debounce = useDebounce(body, 500);
  // ssr uncommit below line
  blogList = Object.keys(body ?? {}).length > 0 ? blogListFromTheRedux : blogList
  topThree = Object.keys(body ?? {}).length > 0 && topThreeFromTheRedux?.length ? topThreeFromTheRedux : topThree
  // let blogList = blogListFromTheRedux
  // let topThree = topThreeFromTheRedux
  const conditionalCall = useMemo(() => {
    return Object.keys(debounce ?? {}).length > 0
  }, [debounce])
  useAPIoneTime({
    service: BlogList,
    endPoint: ENDPOINTS.BlogList,
    body: debounce,
    // if ssr then uncommit this below line
    conditionalCall: conditionalCall,
    needLoadingorNot: false
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue as any);
    setbody((prev: any) => ({
      ...bodyData,
      filters: {
        keyword: (newValue as any) === "all" ? null : newValue,
      },
    }));
  };

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
  const [isRendering, setIsRendering] = useState(true);
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    startTransition(() => {
      // Simulating initial data fetch
      setTimeout(() => setIsRendering(false), 3500);
    });
  }, [])
  return (
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
      {checkLoadingStatus && <Loader open={checkLoadingStatus} />}
      <Seo keywords={[`Blog`, ...(serverData?.keywords || [])]} lang="en" configDetailsState={serverData?.configDetails} />

      <Box className="BlogPage">
        <Box className="HeroSection">
          <Container>
            <Typography variant="h2" component="h2">
              {configDetailsState?.["AllBlogs_Title"]?.value}
            </Typography>
            <Typography
              variant="body1"
              sx={{ mt: 1, color: variable.greyRegent }}
            >
              {configDetailsState?.["AllBlogs_Subtitle"]?.value}
            </Typography>
            {topThree?.length !== 0 ?
              <Box className="PostWrapper">
                <Stack className="LeftPostWrapper">
                  <PostCard details={topThree?.[0]} navigate={() =>
                    navigate(`/blog/${topThree?.[0]?.friendlyName}`)
                  } />
                </Stack>
                <Stack className="RightPostWrapper">
                  {topThree?.[1] ? (
                    <PostCard details={topThree?.[1]} navigate={() =>
                      navigate(`/blog/${topThree?.[1]?.friendlyName}`)
                    } />
                  ) : null}
                  {topThree?.[2] ? (
                    <PostCard details={topThree?.[2]} navigate={() =>
                      navigate(`/blog/${topThree?.[2]?.friendlyName}`)
                    } />
                  ) : null}
                </Stack>
              </Box>
              :
              <Box className="PostWrapper" sx={{ justifyContent: "center" }}><RecordNotFound message="No blogs to show" isTextAlignCenter={true} /></Box>
            }

          </Container>
        </Box>
        <Box className="DiscoverPost">
          <Container>
            <Box className="DiscoverPost__title">
              <Typography variant="h2" component="h2">
                {configDetailsState?.["AllBlogs_Featured_Title"]?.value}
              </Typography>
              <Typography
                variant="body1"
                sx={{ mt: 1, color: variable.greyRegent }}
              >
                {configDetailsState?.["AllBlogs_Featured_Subtitle"]?.value}
              </Typography>
            </Box>
            <Box className="SearchWrapper">
              <TextField
                type="search"
                id="Search-Blog"
                placeholder="Search Blog"
                variant="outlined"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  setbody((prev: any) => ({ ...prev, search: e.target.value }));
                }}
              />
              <Button
                variant="contained"
                size="large"
                startIcon={<SearchButtonIcon />}
              >
                Search
              </Button>
            </Box>
            <Box className="PostFilter">
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="Blog Category list"
                textColor="secondary"
              // variant="scrollable"
              // allowScrollButtonsMobile
              >
                <Tab label="All Blog" value={"all"} />
                <Tab label="News" value={"news"} />
                <Tab label="Insights" value={"insights"} />
                <Tab label="Gold" value={"gold"} />
                <Tab label="Silver" value={"silver"} />
                <Tab label="Platinum" value={"platinum"} />
                <Tab label="Community" value={"community"} />
                <Tab label="Resources" value={"resources"} />
              </Tabs>

              <TabPanel index={value as any} value={value}>
                {blogList?.items?.length > 0 && (
                  <Grid
                    container
                    rowSpacing={{ md: 6.25, xs: 4 }}
                    columnSpacing={{ md: 3.75, xs: 2 }}
                  >
                    {blogList?.items?.map((item: any) => {
                      return (
                        <Grid item xs={12} md={4} sm={6} key={item?.id}>
                          <PostCard
                            details={item}
                            navigate={() =>
                              navigate(`/blog/${item?.friendlyName}`)
                            }
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                )}
                {blogList?.items?.length > 0 ? (
                  // <Stack justifyContent="center" sx={{ mt: 7.5, mb: 10 }}>
                  //   <Button variant="contained">Load More</Button>
                  // </Stack>
                  null
                ) : <RecordNotFound message="No blogs to show" isTextAlignCenter={true} />}
              </TabPanel>
            </Box>
          </Container>
        </Box>
      </Box>
      <RenderOnViewportEntry
        rootMargin="200px"
        threshold={0.25}
        minHeight={800}
      >
        {/* <LazyBullionmarkFooter /> */}
        {process.env.GATSBY_THEME_TYPE == "1" ? <BullionmarkFrontFooter /> : <LazyFrontFooter />}
      </RenderOnViewportEntry>
    </>
  );
}

export default Blog;
export async function getServerData(context: any) {
  try {
    console.log("before fatching ", Date.now())
    const [
      configDetailsResponse,
      blogListResponse,
    ] = await Promise.all([
      axiosInstance.get(ENDPOINTS.getConfigStore),
      axiosInstance.post(ENDPOINTS.BlogList, bodyData),
    ]);
    console.log("after fatching ", Date.now())
    const configDetails = configDetailsResponse?.data?.data;
    const blogList = blogListResponse?.data?.data;
    console.log("🚀 ~ getServerData ~ blogList:", blogListResponse)

    return {
      props: {
        configDetails: configDetails?.reduce((acc: any, curr: any) => {
          acc[curr.key] = curr
          return acc
        }, {}),
        configDetailsForRedux: configDetails,
        blogList,
        keywords: configDetails?.reduce((acc: any, curr: any) => {
          acc[curr.key] = curr;
          return acc;
        }, {})?.Store_ShopPage_Meta_Keywords?.value?.split(",") || [],
      },
    };
  } catch (error) {
    console.log("🚀 ~ getServerData ~ error:", error)
    return {
      status: 500,
      headers: {},
      props: {}
    }
  }
}