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

function BlogDetails(params: any) {
  const checkLoadingStatus = useAppSelector(state => state.blogPage.loading);
  const dispatch = useAppDispatch()
  useAppSelector((state) => state.homePage)
  const { blogDetailsData, blogList }: any = useAppSelector((state) => state.blogPage);
  useSubscription();
  useEffect(() => {
    const apiCall = async () => {
      dispatch(setLoadingTrue())
      await dispatch(BlogDetailsAPI({ params: { pathName: params?.["blog-details-friendly-name"] } }))
      setTimeout(() => {
        dispatch(setLoadingFalse())
      }, 1500);
    }
    apiCall()
  }, [params?.params?.["blog-details-friendly-name"]])
  useAPIoneTime({
    service: BlogList,
    endPoint: ENDPOINTS.BlogList,
    body: bodyData,
    // if ssr then uncommit this below line
    // conditionalCall: Object.keys(debounce ?? {}).length > 0
  });

  return (
    <MainLayout blackTheme>
      <Loader open={checkLoadingStatus} />
      <Box className="BmkBlogDetailPage">
        <Breadcrumb arr={[{ navigate: '/blog', name: 'Blog' }]} />
        <Container className="BlogContainer">
          <Box className="BlogDetail">
            <Stack className="Header">
              <Typography variant="subtitle1" className="BlogSubtitle">
                {blogDetailsData?.bodyOverview}
              </Typography>
              <Typography variant="h2" component="h2" className="BlogTitle">
                {blogDetailsData?.title}
              </Typography>
            </Stack>
            <Box className="PostThumbnail">
              <img
                src={blogDetailsData?.imageUrl}
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
                      {blogDetailsData?.createdBy}
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
                      {formatDate(blogDetailsData?.createdOnUtc)}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
              <Stack className="SocialMedia">
                <Typography className="Title">Share this post</Typography>
                <Stack className="SocialIconWrapper">
                  <WhatsappShareButton url={window.location.href} title="Qmint blog">
                    <IconButton className="CircleButton SocialIcon" aria-label="Whatsapp Icon">
                      <WhatsappIcon />
                    </IconButton>
                  </WhatsappShareButton>
                  <FacebookShareButton url={window.location.href} hashtag="qmint" title="Qmint blog">
                    <IconButton className="CircleButton SocialIcon" aria-label="Facebook Icon" >
                      <FacebookIcon />
                    </IconButton>
                  </FacebookShareButton>
                  <TwitterShareButton url={window.location.href} title="Qmint blog" hashtags={["qmint", "blog"]}>
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
                  dangerouslySetInnerHTML={{ __html: blogDetailsData?.body }}
                ></Typography>
              </Box>
            </Box>
          </Box>
          {blogList?.items?.length > 0 ? (
            <Box className="RecentPost">
              <Box className="RecentPost-Header">
                <Typography variant="h2" component="h2">
                  Related posts
                </Typography>
              </Box>
              <Box className="PostsWrapper">
                {blogList?.items?.slice(0, 2).map((item: any) => {
                  console.log("🚀 ~ {blogList?.items?.slice ~ item:", item)
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
export default React.memo(BlogDetails);
