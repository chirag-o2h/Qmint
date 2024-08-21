import React, { useEffect } from "react";
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
  IconButton,
  Chip,
} from "@mui/material";

import TabPanel from "@/components/common/TabPanel";

// Components
import MainLayout from "@/components/common/MainLayout";
import PostCard from "@/components/common/PostCard";

// Utils
import { Breadcrumb } from "@/components/common/Utils";

// CSS Variable
import * as variable from "../../../../scss/settings/variables.module.scss";
import noImage from '../../../../assets/images/noImage.png'

// Assets
import {
  ChevronLeft,
  FacebookIcon,
  TwitterIcon
} from "@/assets/icons";
import { formatDate } from "@/utils/common";
import { useAppDispatch, useAppSelector } from "@/hooks";
import useSubscription from "@/hooks/useSubscription";
import { navigate } from "gatsby";
import { NewsDetailsAPI } from "@/redux/reducers/newsReducer";
import { setLoadingFalse, setLoadingTrue } from "@/redux/reducers/homepageReducer";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import WhatsappIcon from "@/assets/icons/WhatsappIcon";
import Loader from "@/components/common/Loader";
import Seo from "@/components/common/Seo";
import { useLocation } from "@reach/router";
import axiosInstance from "@/axiosfolder";
import { ENDPOINTS } from "@/utils/constants";
import { bodyData } from "@/pages/news";
interface IserverData {
  configDetails: any
  configDetailsForRedux: any,
  newsDetailsData: any,
  newsList: any,
  keywords: any
}
function NewsDetails({ serverData, params }: { serverData: IserverData, params: any }) {
  const location = useLocation()
  const checkLoadingStatus = useAppSelector(state => state.newsPage.loading);
  // const checkLoadingStatus = useAppSelector(state => state.newsPage.loading);
  // const dispatch = useAppDispatch()
  // const { configDetails: configDetailsState } = useAppSelector((state) => state.homePage)
  // const { newsDetailsData, newsList }: any = useAppSelector((state) => state.newsPage)
  // const { email, handleEmailChange, subscribe, loadingForEmailSub } = useSubscription()
  // useEffect(() => {
  //   const apiCall = async () => {
  //     dispatch(setLoadingTrue())
  //     await dispatch(NewsDetailsAPI({ params: { pathName: params?.["news-details-friendly-name"] } }))
  //     setTimeout(() => {
  //       dispatch(setLoadingFalse())
  //     }, 1500);
  //   }
  //   apiCall()
  // }, [params?.params?.["news-details-friendly-name"]])

  // useEffect(() => {
  //   if(!newsDetailsData){
  //     navigate(`/404`)
  //   }
  // }, [newsDetailsData])
  useEffect(() => {
    if (!serverData?.newsDetailsData) {
      navigate(`/404`)
    }
  }, [serverData?.newsDetailsData])
  return (
    <MainLayout blackTheme>
      {checkLoadingStatus && <Loader open={checkLoadingStatus} />}
      <Seo
        keywords={['Travel', 'Qmit', 'gold', 'metal', ...(serverData?.newsDetailsData?.metaKeywords?.split(',') || serverData?.keywords || [])]}
        title={serverData?.newsDetailsData?.metaTitle}
        lang="en"
        description={serverData?.newsDetailsData?.metaDescription || serverData?.configDetails?.Store_Meta_Description?.value}
        configDetailsState={serverData?.configDetails}
      />
      <Box className="BlogDetailPage">
        <Box className="PostDescription">
          <Container maxWidth="lg">
            <Button
              className="BackButton"
              variant="text"
              startIcon={<ChevronLeft />}
              onClick={() => {
                navigate('/news')
              }}
            >
              All Posts
            </Button>
            <Typography variant="h2" component="h2" className="BlogTitle">
              {serverData?.newsDetailsData?.title}
            </Typography>
            <Stack className="PostUploadInfo">
              <Box>
                <Typography variant="body1">Written by</Typography>
                <Typography
                  className="Value"
                  variant="titleLarge"
                  component="p"
                >
                  {serverData?.newsDetailsData?.createdBy}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1">Published on</Typography>
                <Typography
                  className="Value"
                  variant="titleLarge"
                  component="p"
                >
                  {formatDate(new Date(serverData?.newsDetailsData?.createdDate))}
                </Typography>
              </Box>
            </Stack>
            <Box className="ContentWrapper">
              <Box className="PostThumbnail">
                <img
                  src={serverData?.newsDetailsData?.imageUrl ?? noImage}
                  alt={"no image"}
                />
              </Box>
              <Box className="PostContent">
                <Typography variant="subtitle1">
                  {serverData?.newsDetailsData?.shortDescription}
                </Typography>
                <Typography variant="body1" dangerouslySetInnerHTML={{ __html: serverData?.newsDetailsData?.fullDescription }}>
                </Typography>
              </Box>
              <Stack className="FooterContent">
                <Box className="Left">
                  <Typography>Share this post</Typography>
                  <Stack className="SocialIconWrapper">
                    <FacebookShareButton url={location.href} hashtag="qmint" title="Qmint news">
                      <IconButton className="SocialIcon" aria-label="Facebook Icon" >
                        <FacebookIcon />
                      </IconButton>
                    </FacebookShareButton>
                    <TwitterShareButton url={location.href} title="Qmint news" hashtags={["qmint", "news"]}>
                      <IconButton className="SocialIcon" aria-label="Twitter Icon">
                        <TwitterIcon />
                      </IconButton>
                    </TwitterShareButton>
                    <WhatsappShareButton url={location.href} title="Qmint news">
                      <IconButton className="SocialIcon" aria-label="Whatsapp Icon">
                        <WhatsappIcon />
                      </IconButton>
                    </WhatsappShareButton>
                    {/* <IconButton className="SocialIcon" aria-label="Instagram Icon">
                      <InstagramIcon />
                    </IconButton> */}
                  </Stack>
                </Box>
                <Box className="Right">
                  {serverData?.newsDetailsData?.tags?.split(',')?.map((tagName: string) => <Chip label={tagName} />)}
                  {/* <Chip label="Tag one" />
                  <Chip label="Tag two" />
                  <Chip label="Tag three" />
                  <Chip label="Tag four" /> */}
                </Box>
              </Stack>
            </Box>
          </Container>
          <Container>
            {serverData?.newsList?.items?.length > 0 ? <Box className="DiscoverPost">
              <Box className="DiscoverPost__title">
                <Typography variant="h2" component="h2">
                  {serverData?.configDetails?.NewsItem_RelatedPosts_Title?.value}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mt: 1.875, color: variable.greyRegent }}
                >
                  {serverData?.configDetails?.NewsItem_RelatedPosts_Subtitle?.value}
                </Typography>
              </Box>
              <Box className="RecentPosts">
                <Grid
                  container
                  rowSpacing={{ md: 6.25, xs: 4 }}
                  columnSpacing={{ md: 3.75, xs: 2 }}
                >
                  {serverData?.newsList?.items?.map((item: any) => {
                    return (
                      <Grid item md={4} sm={6} key={item?.id}>
                        <PostCard isNews={true} details={item} navigate={() => navigate(`/news/${item?.friendlyName}`)} />
                      </Grid>
                    )
                  })}
                </Grid>
              </Box>
            </Box> : null}
          </Container>
        </Box>
        {/* <Box className="NewsLetter">
          <Container>
            <Box className="NewsLetterWrapper">
              <Typography variant="h2" component="h2">
                Subscribe to our newsletter
              </Typography>
              <Typography
                variant="body1"
                sx={{ mt: 3, color: variable.greyRegent }}
              >
                Subscribe to learn about new products, new market trends and
                updates.
              </Typography>
              <Box className="NewsLetterBox">
                <TextField
                  id="NewsLetter"
                  placeholder="Your Email Address"
                  variant="outlined"
                  value={email}
                  onChange={handleEmailChange}
                />
                <Button variant="contained" onClick={subscribe} disabled={loadingForEmailSub}>Subscribe</Button>
              </Box>
              <Typography
                className="TermsCondition"
                variant="body1"
                sx={{ mt: 2 }}
              >
                By clicking Sign Up you're confirming that you agree with our
                Terms and Conditions.
              </Typography>
            </Box>
          </Container>
        </Box> */}
      </Box>
    </MainLayout>
  );
}
NewsDetails.getServerData = async (context: any) => {
  try {
    const { params } = context;
    const newsDetailsFriendlyName = params['news-details-friendly-name'];
    console.log("before fatching ", Date.now())
    const [
      configDetailsResponse,
      newsDetailsDataResponse,
      newsListDataResponse
    ] = await Promise.all([
      axiosInstance.get(ENDPOINTS.getConfigStore),
      axiosInstance.get(ENDPOINTS.NewsDetails + '/' + newsDetailsFriendlyName),
      axiosInstance.post(ENDPOINTS.NewsList, bodyData),
    ]);
    const configDetails = configDetailsResponse.data.data;
    const newsDetailsData = newsDetailsDataResponse.data.data;
    const newsList = newsListDataResponse.data.data;
    console.log("🚀 ~ getServerData ~ productDetailsData:", newsDetailsData)
    const modifiedConfigDetails = configDetails?.reduce((acc: any, curr: any) => {
      acc[curr.key] = curr;
      return acc;
    }, {})
    return {
      props: {
        configDetails: modifiedConfigDetails,
        configDetailsForRedux: configDetails,
        newsDetailsData: newsDetailsData,
        newsList,
        keywords: modifiedConfigDetails?.Store_ShopPage_Meta_Keywords?.value?.split(",") || [],
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
};
export default NewsDetails;
