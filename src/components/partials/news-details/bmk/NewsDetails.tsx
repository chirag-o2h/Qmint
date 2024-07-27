import React, { useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  IconButton,
  Avatar,
} from "@mui/material";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";

// Assets
import {
  CalenderIcon,
  FacebookIcon,
  TwitterIcon,
} from "@/assets/icons";
import WhatsappIcon from "@/assets/icons/WhatsappIcon";
import noImage from '../../../../assets/images/noImage.png'
import * as variable from "../../../../scss/settings/variables.module.scss";

// Hooks
import { useAppDispatch, useAppSelector } from "@/hooks";
import useSubscription from "@/hooks/useSubscription";

// Utils
import { formatDate } from "@/utils/common";
import { NewsDetailsAPI, NewsList } from "@/redux/reducers/newsReducer";
import { setLoadingFalse, setLoadingTrue } from "@/redux/reducers/homepageReducer";

// Components
import Loader from "@/components/common/Loader";
import { Breadcrumb } from "@/components/common/Utils";
import { BmkPostCard } from "@/components/common/Card";
import { navigate } from "gatsby";
import useAPIoneTime from "@/hooks/useAPIoneTime";
import { ENDPOINTS } from "@/utils/constants";
import { bodyData } from "@/pages/news";
import MainLayout from "@/components/common/MainLayout";
import Seo from "@/components/common/Seo";
import { useLocation } from "@reach/router";
import axiosInstance from "@/axiosfolder";
interface IserverData{
  configDetails:any
  configDetailsForRedux: any,
  newsDetailsData: any,
  newsList: any,
  keywords:any
}
function NewsDetails({serverData,params}:{serverData:IserverData,params:any}) {
  const location = useLocation()
  // const { configDetails: configDetailsState } = useAppSelector((state) => state.homePage)
  const checkLoadingStatus = useAppSelector(state => state.newsPage.loading);
  // const dispatch = useAppDispatch()
  useAppSelector((state) => state.homePage)
  // const { newsDetailsData, newsList }: any = useAppSelector((state) => state.newsPage);
  useSubscription();
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
  // useAPIoneTime({
  //   service: NewsList,
  //   endPoint: ENDPOINTS.NewsList,
  //   body: bodyData,
  //   // if ssr then uncommit this below line
  //   conditionalCall: Object.keys(debounce ?? {}).length > 0
  // });

  useEffect(() => {
    if(!serverData?.newsDetailsData){
      navigate(`/404`)
    }
  }, [serverData?.newsDetailsData])

  return (
    <>
    <Seo
    keywords={['Travel', 'Qmit', 'gold', 'metal',...(serverData?.newsDetailsData?.metaKeywords?.split(',') || serverData?.keywords || [])]}
    title={serverData?.newsDetailsData?.metaTitle}
    lang="en"
    description={serverData?.newsDetailsData?.metaDescription || serverData?.configDetails?.Store_Meta_Description?.value}
    configDetailsState={serverData?.configDetails}
  />
    <MainLayout blackTheme>
      {checkLoadingStatus && <Loader open={checkLoadingStatus} />}
      <Box className="BmkPostDetailPage">
        <Breadcrumb arr={[{ navigate: '/news', name: 'news' }]} />
        <Container className="PostContainer">
          <Box className="PostDetail">
            <Stack className="Header">
              <Typography variant="subtitle1" className="PostSubtitle">
                {serverData?.newsDetailsData?.shortDescription}
              </Typography>
              <Typography variant="h2" component="h2" className="PostTitle">
                {serverData?.newsDetailsData?.title}
              </Typography>
            </Stack>
            <Box className="PostThumbnail">
              <img
                src={serverData?.newsDetailsData?.imageUrl ?? noImage}
                alt={"no image"}
              />
            </Box>
            <Stack className="AboutWrapper">
              <Stack className="PostUploadInfo">
                <Stack className="InfoWrapper Profile">
                  <Box className="Left"><Avatar /></Box>
                  <Box className="Right">
                    <Typography className="Title" variant="body1">Written by</Typography>
                    <Typography
                      className="Value"
                      variant="titleLarge"
                      component="p"
                    >
                      {serverData?.newsDetailsData?.createdBy}
                    </Typography>
                  </Box>
                </Stack>
                <Stack className="InfoWrapper Publish">
                  <Box className="Left">
                    <IconButton className="CircleButton SocialIcon" aria-label="Calender Icon" >
                      <CalenderIcon />
                    </IconButton>
                  </Box>
                  <Box className="Right">
                    <Typography className="Title" variant="body1">Published on</Typography>
                    <Typography
                      className="Value"
                      variant="titleLarge"
                      component="p"
                    >
                      {formatDate(serverData?.newsDetailsData?.createdDate)}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
              <Stack className="SocialMedia">
                <Typography className="Title">Share this post</Typography>
                <Stack className="SocialIconWrapper">
                  <WhatsappShareButton url={location.href} title="Bullionmark news">
                    <IconButton className="CircleButton SocialIcon" aria-label="Whatsapp Icon">
                      <WhatsappIcon />
                    </IconButton>
                  </WhatsappShareButton>
                  <FacebookShareButton url={location.href} hashtag="bmk" title="Bullionmark news">
                    <IconButton className="CircleButton SocialIcon" aria-label="Facebook Icon" >
                      <FacebookIcon />
                    </IconButton>
                  </FacebookShareButton>
                  <TwitterShareButton url={location.href} title="Bullionmark news" hashtags={["bmk", "news"]}>
                    <IconButton className="CircleButton SocialIcon" aria-label="Twitter Icon">
                      <TwitterIcon />
                    </IconButton>
                  </TwitterShareButton>
                </Stack>
              </Stack>
            </Stack>
            <Box className="ContentWrapper">
              <Box className="ck-content">
                <Typography
                  variant="body1"
                  dangerouslySetInnerHTML={{ __html: serverData?.newsDetailsData?.fullDescription }}
                ></Typography>
              </Box>
            </Box>
          </Box>
          {serverData?.newsList?.items?.length > 0 ? (
            <Box className="RecentPost">
              <Box className="RecentPost-Header">
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
              <Box className="PostsWrapper">
                {serverData?.newsList?.items?.slice(0, 2).map((item: any) => {
                  return (
                    <BmkPostCard details={item} navigate={() => {
                      navigate(`/news/${item?.friendlyName}`, { replace: true })
                    }
                    }
                      isNews={true}
                    />
                  );
                })}
              </Box>
            </Box>
          ) : null}
        </Container>
      </Box>
    </MainLayout>
    </>
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
    const modifiedConfigDetails = configDetails?.reduce((acc:any, curr:any) => {
      acc[curr.key] = curr;
      return acc;
    }, {})
    return {
      props: {
        configDetails:modifiedConfigDetails,
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
