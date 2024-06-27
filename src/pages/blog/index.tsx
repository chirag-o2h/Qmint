import React, { useState } from "react";
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
function Blog() {
  // ssr uncommit below line
  // let blogList = serverData.data
  // let topThree = serverData.data.items.slice(0, 3)
  const { blogList: blogListFromTheRedux, topThree: topThreeFromTheRedux }: any = useAppSelector((state) => state.blogPage);
  const checkLoadingStatus = useAppSelector(state => state.blogPage.loading);
  const { configDetails: configDetailsState } = useAppSelector((state) => state.homePage)
  const [value, setValue] = React.useState<any>("all");
  const [searchValue, setSearchValue] = useState<string>("");
  // if ssr then remove the bodydata form initiatl 
  const [body, setbody] = useState<any>(bodyData);
  const debounce = useDebounce(body, 500);
  // ssr uncommit below line
  // blogList = Object.keys(body ?? {}).length > 0 ? blogListFromTheRedux : blogList
  // topThree = Object.keys(body ?? {}).length > 0 && topThreeFromTheRedux?.length? topThreeFromTheRedux : topThree
  let blogList = blogListFromTheRedux
  let topThree = topThreeFromTheRedux

  useAPIoneTime({
    service: BlogList,
    endPoint: ENDPOINTS.BlogList,
    body: debounce,
    // if ssr then uncommit this below line
    // conditionalCall: Object.keys(debounce ?? {}).length > 0
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

  return (
    <MainLayout blackTheme>
      {checkLoadingStatus && <Loader open={checkLoadingStatus} />}
      <Seo
        keywords={['blog', 'latest posts', 'articles']}
        title="Blog"
        lang="en"
        meta={[{ name: '', }]}
        description={"Explore our latest blog posts for informative articles on various topics. Stay updated with our insights and analysis."}
      />
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
                ) : <RecordNotFound message="No blogs to show" />}
              </TabPanel>
            </Box>
          </Container>
        </Box>
      </Box>
    </MainLayout>
  );
}

export default Blog;
// export async function getServerData() {
//   try {
//     const res = await axios.post("https://qmapistaging.qmint.com/api/v1/" + ENDPOINTS.BlogList, bodyData, {
//       headers: {
//         "Storecode": 12,
//         "Validkey": "MBXCSv6SGIx8mx1tHvrMw5b0H3R91eMmtid4c2ItRHRKL4Pnzo"
//       }
//     })
//     if (!res.data) {
//       throw new Error(`Response failed`)
//     }

//     return {
//       props: res.data,
//     }
//   } catch (error) {
//     return {
//       status: 500,
//       headers: {},
//       props: {}
//     }
//   }
// }