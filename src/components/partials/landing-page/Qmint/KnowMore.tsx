import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, A11y } from 'swiper/modules'

// Utills
import { SectionHeading } from "../../../common/Utils"
import { useAppSelector } from '@/hooks'
import { navigate } from 'gatsby'

function KnowMore() {
    const { mainHomePageData, configDetails } = useAppSelector((state) => state.homePage)
    const config = {
        slidesPerView: 4,
        centeredSlides: true,
        spaceBetween: 30,
        loop: true,
        speed: 300,
        initialSlide: 1,
        pagination: {
            clickable: true,
        },
        modules: [Autoplay, Pagination, A11y],
        scrollbar: {
            draggable: true
        },
        grabCursor: true,
        autoplay: {
            delay: 8000,
        },
        breakpoints: {
            1200: {
                slidesPerView: 4,
            },
            600: {
                slidesPerView: 2.5,
                spaceBetween: 20,
            },
            260: {
                slidesPerView: 1.2,
                spaceBetween: 20,
            },
        },
    };

    return (
        (mainHomePageData && mainHomePageData?.homepage_Section_4_Four_posts_in_wavy_layout?.length > 0) ?
            <Box id="KnowMore">
                <Box className="KnowMoreWrapper">
                    <SectionHeading title={configDetails?.["Homepage_Section_4_Four_posts_in_wavy_layout_Title"]?.value} description={configDetails?.["Homepage_Section_4_Four_posts_in_wavy_layout_Subtitle"]?.value} />
                    <Box className="KnowMoreSlideWrapper" component="section" key={'KnowMore'}>
                        <Box className="SwiperContainer">
                            <Swiper {...config}>
                                {(mainHomePageData && mainHomePageData?.homepage_Section_4_Four_posts_in_wavy_layout?.length > 0) ?
                                    [...mainHomePageData?.homepage_Section_4_Four_posts_in_wavy_layout, ...mainHomePageData?.homepage_Section_4_Four_posts_in_wavy_layout]?.map((item) => {
                                        return (
                                            <SwiperSlide onClick={() => {
                                                navigate('/blog/' + item.friendlyName)
                                            }}>
                                                <Box className="KnowMoreSlide">
                                                    <img loading='lazy' src={item?.imageUrl} alt={item?.title} />
                                                    <Box className="KnowMoreSlideContentBox">
                                                        <Typography className="SlideTitle">{item?.title}</Typography>
                                                        <Box className="HiddenContent">
                                                            <Typography className="SlideSubTitle">{item?.overview}</Typography>
                                                            <Button variant='outlined' className="Button" onClick={() => {
                                                                navigate('/blog/' + item?.friendlyName)
                                                            }}>Know More</Button>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </SwiperSlide>
                                        )
                                    })
                                    : null}
                                {/* <SwiperSlide>
                                <Box className="KnowMoreSlide">
                                    <img src="https://picsum.photos/600/520" alt="https://picsum.photos/600/520" />
                                    <Box className="KnowMoreSlideContentBox">
                                        <Typography className="SlideTitle">The Gold Coast</Typography>
                                        <Box className="HiddenContent">
                                            <Typography className="SlideSubTitle">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Typography>
                                            <Button variant='outlined' className="Button">Know More</Button>
                                        </Box>
                                    </Box>
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box className="KnowMoreSlide">
                                    <img src="https://picsum.photos/600/520" alt="https://picsum.photos/600/520" />
                                    <Box className="KnowMoreSlideContentBox">
                                        <Typography className="SlideTitle">The Whitsundays</Typography>
                                        <Box className="HiddenContent">
                                            <Typography className="SlideSubTitle">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Typography>
                                            <Button variant='outlined' className="Button">Know More</Button>
                                        </Box>
                                    </Box>
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box className="KnowMoreSlide">
                                    <img src="https://picsum.photos/600/520" alt="https://picsum.photos/600/520" />
                                    <Box className="KnowMoreSlideContentBox">
                                        <Typography className="SlideTitle">The Gold Coast</Typography>
                                        <Box className="HiddenContent">
                                            <Typography className="SlideSubTitle">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Typography>
                                            <Button variant='outlined' className="Button">Know More</Button>
                                        </Box>
                                    </Box>
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box className="KnowMoreSlide">
                                    <img src="https://picsum.photos/600/520" alt="https://picsum.photos/600/520" />
                                    <Box className="KnowMoreSlideContentBox">
                                        <Typography className="SlideTitle">The Whitsundays</Typography>
                                        <Box className="HiddenContent">
                                            <Typography className="SlideSubTitle">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Typography>
                                            <Button variant='outlined' className="Button">Know More</Button>
                                        </Box>
                                    </Box>
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box className="KnowMoreSlide">
                                    <img src="https://picsum.photos/600/520" alt="https://picsum.photos/600/520" />
                                    <Box className="KnowMoreSlideContentBox">
                                        <Typography className="SlideTitle">The Daintree Rainforest</Typography>
                                        <Box className="HiddenContent">
                                            <Typography className="SlideSubTitle">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Typography>
                                            <Button variant='outlined' className="Button">Know More</Button>
                                        </Box>
                                    </Box>
                                </Box>
                            </SwiperSlide> */}
                            </Swiper>
                        </Box>
                    </Box>
                </Box>
            </Box> : null
    )
}

export default KnowMore