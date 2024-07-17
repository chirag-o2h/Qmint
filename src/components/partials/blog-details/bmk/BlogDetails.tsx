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
import { BlogDetailsAPI, BlogList } from "@/redux/reducers/blogReducer";
import { setLoadingFalse, setLoadingTrue } from "@/redux/reducers/homepageReducer";

// Components
import MainLayout from "@/components/common/MainLayout";
import Loader from "@/components/common/Loader";
import { Breadcrumb } from "@/components/common/Utils";
import { BmkPostCard } from "@/components/common/Card";
import { navigate } from "gatsby";
import useAPIoneTime from "@/hooks/useAPIoneTime";
import { ENDPOINTS } from "@/utils/constants";
import { bodyData } from "@/pages/blog";
import Seo from "@/components/common/Seo";
import { useLocation } from "@reach/router";
import axiosInstance from "@/axiosfolder";
interface IserverData{
    configDetails:any
    configDetailsForRedux: any,
    blogDetailsData: any,
    blogList: any
}
function BmkBlogDetails({serverData,params}:{serverData:IserverData,params:any}) {
  console.log("🚀 ~ BmkBlogDetails ~ serverData:", serverData)
  const location = useLocation()
  const checkLoadingStatus = useAppSelector(state => state.blogPage.loading);
  // const dispatch = useAppDispatch()
  useAppSelector((state) => state.homePage)
  // const { blogDetailsData, blogList }: any = useAppSelector((state) => state.blogPage);
  useSubscription();
  // useEffect(() => {
  //   const apiCall = async () => {
  //     dispatch(setLoadingTrue())
  //     await dispatch(BlogDetailsAPI({ params: { pathName: params?.["blog-details-friendly-name"] } }))
  //     setTimeout(() => {
  //       dispatch(setLoadingFalse())
  //     }, 1500);
  //   }
  //   apiCall()
  // }, [params?.params?.["blog-details-friendly-name"]])
  // useAPIoneTime({
  //   service: BlogList,
  //   endPoint: ENDPOINTS.BlogList,
  //   body: bodyData,
  //   // if ssr then uncommit this below line
  //   conditionalCall:false
  // });

  useEffect(() => {
    if(!serverData?.blogDetailsData){
      navigate(`/404`)
    }
  }, [serverData?.blogDetailsData])

  return (
    <MainLayout blackTheme>
      {checkLoadingStatus && <Loader open={checkLoadingStatus} />}
      <Seo
        keywords={['Travel', 'Qmit', 'gold', 'metal']}
        title={serverData?.blogDetailsData?.metaTitle}
        lang="en"
        description={serverData?.configDetails?.Store_Meta_Description?.value}
      />
      <Box className="BmkPostDetailPage">
        <Breadcrumb arr={[{ navigate: '/blog', name: 'Blog' }]} />
        <Container className="PostContainer">
          <Box className="PostDetail">
            <Stack className="Header">
              <Typography variant="subtitle1" className="PostSubtitle">
                {serverData?.blogDetailsData?.bodyOverview}
              </Typography>
              <Typography variant="h2" component="h2" className="PostTitle">
                {serverData?.blogDetailsData?.title}
              </Typography>
            </Stack>
            <Box className="PostThumbnail">
              <img
                src={serverData?.blogDetailsData?.imageUrl}
                alt={noImage}
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
                      {serverData?.blogDetailsData?.createdBy}
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
                      {formatDate(serverData?.blogDetailsData?.createdOnUtc)}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
              <Stack className="SocialMedia">
                <Typography className="Title">Share this post</Typography>
                <Stack className="SocialIconWrapper">
                  <WhatsappShareButton url={location.href} title="Bullionmark blog">
                    <IconButton className="CircleButton SocialIcon" aria-label="Whatsapp Icon">
                      <WhatsappIcon />
                    </IconButton>
                  </WhatsappShareButton>
                  <FacebookShareButton url={location.href} hashtag="bmk" title="Bullionmark blog">
                    <IconButton className="CircleButton SocialIcon" aria-label="Facebook Icon" >
                      <FacebookIcon />
                    </IconButton>
                  </FacebookShareButton>
                  <TwitterShareButton url={location.href} title="Bullionmark blog" hashtags={["bmk", "blog"]}>
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
                  dangerouslySetInnerHTML={{ __html: serverData?.blogDetailsData?.body }}
                ></Typography>
              </Box>
            </Box>
          </Box>
          {serverData?.blogList?.items?.length > 0 ? (
            <Box className="RecentPost">
              <Box className="RecentPost-Header">
                <Typography variant="h2" component="h2">
                  {serverData?.configDetails?.BlogItem_RelatedPost_Title?.value}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{ mt: 1.875, color: variable.greyRegent }}
                  >
                    {serverData?.configDetails?.BlogItem_RelatedPost_Subtitle?.value}
                  </Typography>
              </Box>
              <Box className="PostsWrapper">
                {serverData?.blogList?.items?.slice(0, 2).map((item: any) => {
                  return (
                    <BmkPostCard details={item} navigate={() => {
                      navigate(`/blog/${item?.friendlyName}`, { replace: true })
                    }
                    } />
                  );
                })}
              </Box>
            </Box>
          ) : null}
        </Container>
      </Box>
    </MainLayout>
  );
}
BmkBlogDetails.getServerData = async (context: any) => {
  try {
    const { params } = context;
    const productFriendlyName = params['blog-details-friendly-name'];
    console.log("before fatching ", Date.now())
    const [
      configDetailsResponse,
      blogDetailsDataResponse,
      blogListDataResponse
    ] = await Promise.all([
      axiosInstance.get(ENDPOINTS.getConfigStore),
      axiosInstance.get(ENDPOINTS.BlogDetails + '/' + productFriendlyName),
      axiosInstance.post(ENDPOINTS.BlogList, bodyData),
    ]);
    const configDetails = configDetailsResponse.data.data;
    const blogDetailsData = blogDetailsDataResponse.data.data;
    const blogList = blogListDataResponse.data.data;
    console.log("🚀 ~ getServerData ~ productDetailsData:", blogDetailsData)

    return {
      props: {
        configDetails:configDetails?.reduce((acc: any, curr: any) => {
          acc[curr.key] = curr
          return acc
        }, {}),
        configDetailsForRedux: configDetails,
        blogDetailsData: blogDetailsData,
        blogList
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
export default BmkBlogDetails;
