import React from 'react'
import { Box, Container, Typography, Button } from '@mui/material'
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay, Pagination, A11y, EffectCoverflow } from 'swiper/modules'
import { SwiperNavigation } from "@/components/common/Utils"

// Utills
import { SectionHeading } from "../../common/Utils"
import { PlayIcon } from "../../../assets/icons/index"

function KnowMore() {
    const config = {
        slidesPerView: 4,
        centeredSlides: true,
        spaceBetween: 30,
        loop: true,
        speed: 300,
        initialSlide: 3,
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
        <Box id="KnowMore">
            <Box className="KnowMoreWrapper">
                <SectionHeading title="Know More About Queensland" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry." />
                <Box className="KnowMoreSlideWrapper" component="section" key={'KnowMore'}>
                    <Box className="SwiperContainer">
                        <Swiper {...config}>
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
                            </SwiperSlide>
                        </Swiper>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default KnowMore