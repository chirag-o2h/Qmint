import React, { useEffect } from "react";
import {
  Box,
  Grid,
  Container,
  Typography,
  Stack,
  Button,
  IconButton,
  Chip,
} from "@mui/material";


// Components
import MainLayout from "@/components/common/MainLayout";
import PostCard from "@/components/common/PostCard";

// Utils

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
import { BlogDetailsAPI, BlogList } from "@/redux/reducers/blogReducer";
import { useAppDispatch, useAppSelector } from "@/hooks";
import useSubscription from "@/hooks/useSubscription";
import { navigate } from "gatsby";
import { setLoadingFalse, setLoadingTrue } from "@/redux/reducers/homepageReducer";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import WhatsappIcon from "@/assets/icons/WhatsappIcon";
import Loader from "@/components/common/Loader";
import useAPIoneTime from "@/hooks/useAPIoneTime";
import { ENDPOINTS } from "@/utils/constants";
import { bodyData } from "@/pages/blog";
import Seo from "@/components/common/Seo";

function BlogDetails(params: any) {
  const checkLoadingStatus = useAppSelector(state => state.blogPage.loading);
  const dispatch = useAppDispatch()
  const { configDetails: configDetailsState } = useAppSelector((state) => state.homePage)
  const { blogDetailsData, blogList }: any = useAppSelector((state) => state.blogPage);
  // console.log("🚀 ~ BlogDetails ~ blogDetailsData:", blogDetailsData)
  const { email, handleEmailChange, subscribe, loadingForEmailSub } = useSubscription();
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

  useEffect(() => {
    if(!blogDetailsData){
      navigate(`/404`)
    }
  }, [blogDetailsData])

  return (
    <MainLayout blackTheme>
      <Seo
        keywords={['Travel', 'Qmit', 'gold', 'metal']}
        title={blogDetailsData?.metaTitle}
        lang="en"
        description={configDetailsState?.Store_Meta_Description?.value}
      />
      {checkLoadingStatus && <Loader open={checkLoadingStatus} />}
      <Box className="BlogDetailPage">
        <Box className="PostDescription">
          <Container maxWidth="lg">
            <Button
              className="BackButton"
              variant="text"
              startIcon={<ChevronLeft />}
              onClick={() => {
                navigate("/blog");
              }}
            >
              All Posts
            </Button>
            <Typography variant="h2" component="h2" className="BlogTitle">
              {blogDetailsData?.title}
            </Typography>
            <Stack className="PostUploadInfo">
              <Box>
                <Typography variant="body1">Written by</Typography>
                <Typography
                  className="Value"
                  variant="titleLarge"
                  component="p"
                >
                  {blogDetailsData?.createdBy}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1">Published on</Typography>
                <Typography
                  className="Value"
                  variant="titleLarge"
                  component="p"
                >
                  {formatDate(blogDetailsData?.createdOnUtc)}
                </Typography>
              </Box>
            </Stack>
            <Box className="ContentWrapper">
              <Box className="PostThumbnail">
                <img
                  src={blogDetailsData?.imageUrl}
                  alt={noImage}
                />
              </Box>
              <Box className="PostContent">
                <Typography variant="subtitle1">
                  {blogDetailsData?.bodyOverview}
                </Typography>
                <Typography
                  variant="body1"
                  dangerouslySetInnerHTML={{ __html: blogDetailsData?.body }}
                ></Typography>
              </Box>
              <Stack className="FooterContent">
                <Box className="Left">
                  <Typography>Share this post</Typography>
                  <Stack className="SocialIconWrapper">
                    <FacebookShareButton url={window.location.href} hashtag="qmint" title="Qmint blog">
                      <IconButton className="SocialIcon" aria-label="Facebook Icon" >
                        <FacebookIcon />
                      </IconButton>
                    </FacebookShareButton>
                    <TwitterShareButton url={window.location.href} title="Qmint blog" hashtags={["qmint", "blog"]}>
                      <IconButton className="SocialIcon" aria-label="Twitter Icon">
                        <TwitterIcon />
                      </IconButton>
                    </TwitterShareButton>
                    <WhatsappShareButton url={window.location.href} title="Qmint blog">
                      <IconButton className="SocialIcon" aria-label="Whatsapp Icon">
                        <WhatsappIcon />
                      </IconButton>
                    </WhatsappShareButton>
                  </Stack>
                </Box>
                <Box className="Right">
                  {blogDetailsData?.tags
                    ?.split(",")
                    ?.map((tagName: string) => <Chip label={tagName} />)}
                  {/* <Chip label="Tag one" />
                <Chip label="Tag two" />
                <Chip label="Tag three" />
                <Chip label="Tag four" /> */}
                </Box>
              </Stack>
            </Box>
          </Container>
          <Container>
            {blogList?.items?.length > 0 ? (
              <Box className="DiscoverPost">
                <Box className="DiscoverPost__title">
                  <Typography variant="h2" component="h2">
                    {configDetailsState?.BlogItem_RelatedPost_Title?.value}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ mt: 1.875, color: variable.greyRegent }}
                  >
                    {configDetailsState?.BlogItem_RelatedPost_Subtitle?.value}
                  </Typography>
                </Box>
                {/* <Box className="DiscoverPost__title">
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
                    />
                    <Button variant="contained">Subscribe</Button>
                  </Box>
                  <Typography
                    className="TermsCondition"
                    variant="body1"
                    sx={{ mt: 2 }}
                  >
                    By clicking Sign Up you're confirming that you agree with
                    our Terms and Conditions.
                  </Typography>
                </Box> */}
                <Box className="RecentPosts">
                  <Grid
                    container
                    rowSpacing={{ md: 6.25, xs: 4 }}
                    columnSpacing={{ md: 3.75, xs: 2 }}
                  >
                    {blogList?.items?.map((item: any) => {
                      return (
                        <Grid item md={4} sm={6} key={item?.id}>
                          <PostCard
                            details={item}
                            navigate={() =>
                              navigate(`/blog/${item?.friendlyName}`, { replace: true })
                            }
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              </Box>
            ) : null}
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
                <Button
                  variant="contained"
                  onClick={subscribe}
                  disabled={loadingForEmailSub}
                >
                  Subscribe
                </Button>
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
export default React.memo(BlogDetails);
