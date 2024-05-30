import React from 'react'
import { Box, Container, Typography, Button, Stack } from '@mui/material'
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay, Pagination, A11y, EffectCoverflow } from 'swiper/modules'
import { SwiperNavigation } from "@/components/common/Utils"

// Utills
import { SectionHeading } from "../../../common/Utils"
import { ArrowRight } from "../../../../assets/icons/index"
import { useAppSelector } from '@/hooks'
import { navigate } from 'gatsby'
import noImage from '@/assets/images/noImage.png'

function LatestStories() {
    const { mainHomePageData, configDetails } = useAppSelector((state) => state.homePage)
    return (
        (mainHomePageData && mainHomePageData?.homepage_Section_5_Three_posts_in_collage_view?.length > 0) ?
            <Box id="LatestStories">
                <Container maxWidth="lg" className='LatestStoriesContainer'>
                    <Box className="LatestStoriesMainWrapper">
                        <Stack className='SectionHeadingWrapper'>
                            <Box className="SectionHeading">
                                <Typography variant="h2" component="h2" className="Title">{configDetails?.["Homepage_Section_5_Three_posts_in_collage_view_Title"]?.value}</Typography>
                                <Typography className="Description">{configDetails?.["Homepage_Section_5_Three_posts_in_collage_view_Subtitle"]?.value}</Typography>
                            </Box>
                            <Button className='SectionButton' variant="contained" endIcon={<ArrowRight />} onClick={() => {
                                navigate('/blog')
                            }}>Discover More</Button>
                        </Stack>
                        <Box className="LatestStoriesWrapper" component="section" key={'LatestStories'}>
                            <Box className="TopStoriesWrapper">
                                <Box className="TopStoriePost" onClick={() => {
                                    navigate('/blog/' + mainHomePageData?.homepage_Section_5_Three_posts_in_collage_view?.[0]?.friendlyName)
                                }}>
                                    <img src={mainHomePageData?.homepage_Section_5_Three_posts_in_collage_view?.[0]?.imageUrl ?? noImage} alt={mainHomePageData?.homepage_Section_5_Three_posts_in_collage_view?.[0]?.title ?? "Image"} />
                                    <Stack className='StoryContentBox'>
                                        <Typography variant='subtitle2' className='StorieTitle'>Whitsunday Island: Vivid experiences on and under the water</Typography>
                                        <Button variant='text' className='StorieButton' endIcon={<ArrowRight />} onClick={() => {
                                            navigate('/blog/' + mainHomePageData?.homepage_Section_5_Three_posts_in_collage_view?.[0]?.friendlyName)
                                        }}>Read more</Button>
                                    </Stack>
                                </Box>
                                <Box className="TopStoriePost" onClick={() => {
                                    navigate('/blog/' + mainHomePageData?.homepage_Section_5_Three_posts_in_collage_view?.[1]?.friendlyName)
                                }}>
                                    <img src={mainHomePageData?.homepage_Section_5_Three_posts_in_collage_view?.[1]?.imageUrl ?? noImage} alt={mainHomePageData?.homepage_Section_5_Three_posts_in_collage_view?.[0]?.title ?? "Image"} />
                                    <Stack className='StoryContentBox'>
                                        <Typography variant='subtitle2' className='StorieTitle'>Whitsunday Island: Vivid experiences on and under the water</Typography>
                                        <Button variant='text' className='StorieButton' endIcon={<ArrowRight />} onClick={() => {
                                            navigate('/blog/' + mainHomePageData?.homepage_Section_5_Three_posts_in_collage_view?.[1]?.friendlyName)
                                        }}>Read more</Button>
                                    </Stack>
                                </Box>
                            </Box>
                            <Box className="BottomStoriesWrapper">
                                {mainHomePageData?.homepage_Section_5_Three_posts_in_collage_view?.slice(3).map((image, index) => (
                                    <Box key={index} className="BottomStoriePost" onClick={() => {
                                        navigate('/blog/' + image?.friendlyName)
                                    }}>
                                        <img src={image?.imageUrl ?? noImage} alt={image?.title ?? "Image"} />
                                        <Stack className='StoryContentBox'>
                                            <Typography variant='subtitle2' className='StorieTitle'>{image?.title}</Typography>
                                            <Button variant='text' className='StorieButton' endIcon={<ArrowRight />} onClick={() => {
                                                navigate('/blog/' + image?.friendlyName)
                                            }}>Discover More</Button>
                                        </Stack>
                                    </Box>
                                ))}
                                {/* 
                            <Box className="BottomStoriePost">
                                <img src="https://picsum.photos/600/520" alt={mainHomePageData?.homepage_Section_5_Three_posts_in_collage_view?.[0]?.title ?? "Image"} />
                                <Stack className='StoryContentBox'>
                                    <Typography variant='subtitle2' className='StorieTitle'>Surfers Paradise Beach, Queensland</Typography>
                                    <Button variant='text' className='StorieButton' endIcon={<ArrowRight />}>Discover More</Button>
                                </Stack>
                            </Box>
                            <Box className="BottomStoriePost">
                                <img src="https://picsum.photos/600/520" alt={mainHomePageData?.homepage_Section_5_Three_posts_in_collage_view?.[0]?.title ?? "Image"} />
                                <Stack className='StoryContentBox'>
                                    <Typography variant='subtitle2' className='StorieTitle'>Daintree River, Forest Creek Queensland</Typography>
                                    <Button variant='text' className='StorieButton' endIcon={<ArrowRight />}>Discover More</Button>
                                </Stack>
                            </Box> */}
                            </Box>
                        </Box>
                        <Box className="SectionButtonMobile">
                            <Button variant="contained" endIcon={<ArrowRight />} onClick={() => {
                                navigate('/blog')
                            }}>Discover More</Button>
                        </Box>
                    </Box>
                </Container>
            </Box>
            : null
    )
}

export default LatestStories