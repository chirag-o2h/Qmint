import React, { useMemo, useState } from "react";
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
} from "@mui/material";

import TabPanel from "@/components/common/TabPanel";

// Components
import MainLayout from "@/components/common/MainLayout";
import PostCard from "@/components/common/PostCard";
import RecordNotFound from "@/components/common/RecordNotFound";

// Utils
import { Breadcrumb } from "@/components/common/Utils";

// CSS Variable
import * as variable from "../../scss/settings/variables.module.scss";

// Assets
import { SearchButtonIcon } from "../../assets/icons/index";
import { useAppSelector } from "@/hooks";
import useAPIoneTime from "@/hooks/useAPIoneTime";
import { NewsList } from "@/redux/reducers/newsReducer";
import { ENDPOINTS } from "@/utils/constants";
import useDebounce from "@/hooks/useDebounce";
import { navigate } from "gatsby";
import Loader from "@/components/common/Loader";
import axiosInstance from "@/axiosfolder";
import Seo from "@/components/common/Seo";
import useSetConfigAndFavicon from "@/hooks/useSetConfigAndFavicon";

export const bodyData = {
  "search": "",
  "pageNo": 0,
  "pageSize": -1,
  "sortBy": "",
  "sortOrder": "",
  "filters": {
    "keyword": null
  }
}

function News({ serverData }: any) {
  const checkLoadingStatus = useAppSelector(state => state.newsPage.loading);
  // const { configDetails: configDetailsState } = useAppSelector((state) => state.homePage)
  const { newsList: newsListFromTheRedux, topThree: topThreeFromTheRedux }: any = useAppSelector((state) => state.newsPage)
  const [value, setValue] = React.useState<any>('all');
  const [searchValue, setSearchValue] = useState<string>('')

  const [body, setbody] = useState<any>()
  const debounce = useDebounce(body, 500)

  let newsList = serverData?.newsList
  let topThree = serverData?.newsList?.items?.slice(0, 3)
  newsList = Object.keys(body ?? {}).length > 0 ? newsListFromTheRedux : newsList
  topThree = Object.keys(body ?? {}).length > 0 && topThreeFromTheRedux?.length ? topThreeFromTheRedux : topThree
  const conditionalCall = useMemo(() => {
    return Object.keys(debounce ?? {}).length > 0
  }, [debounce])
  useAPIoneTime({
    service: NewsList, endPoint: ENDPOINTS.NewsList, body: debounce, conditionalCall: conditionalCall,
    needLoadingorNot: false
  })

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue as any)
    setbody((prev: any) => ({
      ...prev, "filters": {
        "keyword": (((newValue as any) === 'all') ? null : newValue)
      }
    }))
  };
  useSetConfigAndFavicon(serverData)
  return (
    <>
    <Seo keywords={[`News`, ...(serverData?.keywords || [])]} lang="en" configDetailsState={serverData?.configDetails} />
    <MainLayout blackTheme>
      {checkLoadingStatus && <Loader open={checkLoadingStatus} />}
      <Box className="BlogPage">
        <Box className="HeroSection">
          <Container>
            <Typography variant="h2" component="h2">
              {serverData?.configDetails?.["AllNews_Title"]?.value}
            </Typography>
            <Typography
              variant="body1"
              sx={{ mt: 1, color: variable.greyRegent }}
            >
              {serverData?.configDetails?.["AllNews_Subtitle"]?.value}
            </Typography>
            {topThree.length !== 0 ? <Box className="PostWrapper">
              <Stack className="LeftPostWrapper">
                <PostCard isNews={true} details={topThree?.[0]} navigate={() => navigate(`/news/${topThree?.[0]?.friendlyName}`)} />
              </Stack>
              <Stack className="RightPostWrapper">
                {topThree?.[1] ? <PostCard isNews={true} details={topThree?.[1]} navigate={() => navigate(`/news/${topThree?.[1]?.friendlyName}`)} /> : null}
                {topThree?.[2] ? <PostCard isNews={true} details={topThree?.[2]} navigate={() => navigate(`/news/${topThree?.[2]?.friendlyName}`)} /> : null}
              </Stack>
            </Box> : <Box className="PostWrapper" sx={{ justifyContent: "center" }}><RecordNotFound message="No news to show" isTextAlignCenter={true} /></Box>
            }
          </Container>
        </Box>
        <Box className="DiscoverPost">
          <Container>
            <Box className="DiscoverPost__title">
              <Typography variant="h2" component="h2">
                {serverData?.configDetails?.["AllNews_Featured_Title"]?.value}
              </Typography>
              <Typography
                variant="body1"
                sx={{ mt: 1, color: variable.greyRegent }}
              >
                {serverData?.configDetails?.["AllNews_Featured_Subtitle"]?.value}
              </Typography>
            </Box>
            <Box className="SearchWrapper">
              <TextField
                type="search"
                id="Search-News"
                placeholder="Search News"
                variant="outlined"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value)
                  setbody((prev: any) => ({ ...prev, "search": e.target.value, }))
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
              {/* <Tabs
                value={value}
                onChange={handleChange}
                aria-label="News Category list"
                textColor="secondary"
              // variant="scrollable"
              // allowScrollButtonsMobile
              >
                <Tab label="All Blog" value={'all'} />
                <Tab label="News" value={'news'} />
                <Tab label="Insights" value={'insights'} />
                <Tab label="Gold" value={'gold'} />
                <Tab label="Silver" value={'silver'} />
                <Tab label="Platinum" value={'platinum'} />
                <Tab label="Community" value={'community'} />
                <Tab label="Resources" value={'resources'} />
              </Tabs> */}

              <TabPanel index={value as any} value={value}>
                {newsList?.items?.length > 0 && (
                  <Grid
                    container
                    rowSpacing={{ md: 6.25, xs: 4 }}
                    columnSpacing={{ md: 3.75, xs: 2 }}
                  >
                    {newsList?.items?.map((item: any) => {
                      return (
                        <Grid item xs={12} md={4} sm={6} key={item?.id}>
                          <PostCard isNews={true} details={item} navigate={() => navigate(`/news/${item?.friendlyName}`)} />
                        </Grid>
                      );
                    })}
                  </Grid>
                )}
                {newsList?.items?.length === 0 && <RecordNotFound message="No news to show" isTextAlignCenter={true} />}
              </TabPanel>
            </Box>
          </Container>
        </Box>
      </Box>
    </MainLayout>
    </>
  );
}

export default News;
export async function getServerData(context: any) {
  try {
    console.log("before fatching ", Date.now())
    const [
      configDetailsResponse,
      newsListResponse,
    ] = await Promise.all([
      axiosInstance.get(ENDPOINTS.getConfigStore),
      axiosInstance.post(ENDPOINTS.NewsList, bodyData),
    ]);
    console.log("after fatching ", Date.now())
    const configDetails = configDetailsResponse?.data?.data;
    const newsList = newsListResponse?.data?.data;
    console.log("🚀 ~ getServerData ~ blogList:", newsListResponse)

    return {
      props: {
        configDetails: configDetails?.reduce((acc: any, curr: any) => {
          acc[curr.key] = curr
          return acc
        }, {}),
        configDetailsForRedux: configDetails,
        newsList,
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