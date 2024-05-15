import { BullionmarkSectionHeading } from '@/components/common/Utils'
import { Box, Button, Container, Typography } from '@mui/material'
import { Autoplay, Pagination, A11y } from 'swiper/modules'

import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react"

import TravelInspirationSlideImage from '../../../assets/images/TravelInspirationSlideImage.png'
import Travel2 from '../../../assets/images/Travel2.png'
import Travel3 from '../../../assets/images/Travel3.png'


function TravelInspiration() {
    const config = {
        slidesPerView: 3,
        centeredSlides: true,
        spaceBetween: 52,
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
        // autoplay: {
        //     delay: 8000,
        // },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 30,
            },
            600: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            900: {
                slidesPerView: 3,
                spaceBetween: 52,
            },
        }
    };
    return (
        <Box id="TravelInspiration" component="section">
            <Container>
                <Box className="TravelInspirationTitle">
                    <BullionmarkSectionHeading title="Find Travel Inspiration By Style" />
                </Box>
                <Box className="TravelInspirationSliderWrapper">
                    <Box className="SwiperContainer">
                        <Swiper {...config}>
                            <SwiperSlide>
                                <Box className="TravelInspirationSlideWrapper">
                                    <Box className="TravelInspirationSlideImageWrapper">
                                        <img src={TravelInspirationSlideImage} alt="Travel Inspiration Slide Image" />
                                        <Typography className="TravelInspirationSlideTitle">Family Travel</Typography>
                                    </Box>
                                    <Box className="TravelInspirationSlideBottomContent">
                                        <BullionmarkSectionHeading description="Luxury family safaris and inspiring wildlife adventures with a positive impact." />
                                        <Button variant="outlined">Discover More</Button>
                                    </Box>
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box className="TravelInspirationSlideWrapper">
                                    <Box className="TravelInspirationSlideImageWrapper">
                                        <img src={Travel2} alt="Travel Inspiration Slide Image" />
                                        <Typography className="TravelInspirationSlideTitle">Private Travel</Typography>
                                    </Box>
                                    <Box className="TravelInspirationSlideBottomContent">
                                        <BullionmarkSectionHeading description="Luxury family safaris and inspiring wildlife adventures with a positive impact." />
                                        <Button variant="outlined">Discover More</Button>
                                    </Box>
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box className="TravelInspirationSlideWrapper">
                                    <Box className="TravelInspirationSlideImageWrapper">
                                        <img src={Travel3} alt="Travel Inspiration Slide Image" />
                                        <Typography className="TravelInspirationSlideTitle">Family Travel</Typography>
                                    </Box>
                                    <Box className="TravelInspirationSlideBottomContent">
                                        <BullionmarkSectionHeading description="Quality time with family and friends, complete flexibility and exclusive use safari camps." />
                                        <Button variant="outlined">Discover More</Button>
                                    </Box>
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box className="TravelInspirationSlideWrapper">
                                    <Box className="TravelInspirationSlideImageWrapper">
                                        <img src={TravelInspirationSlideImage} alt="Travel Inspiration Slide Image" />
                                        <Typography className="TravelInspirationSlideTitle">Family Travel</Typography>
                                    </Box>
                                    <Box className="TravelInspirationSlideBottomContent">
                                        <BullionmarkSectionHeading description="Luxury family safaris and inspiring wildlife adventures with a positive impact." />
                                        <Button variant="outlined">Discover More</Button>
                                    </Box>
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box className="TravelInspirationSlideWrapper">
                                    <Box className="TravelInspirationSlideImageWrapper">
                                        <img src={TravelInspirationSlideImage} alt="Travel Inspiration Slide Image" />
                                        <Typography className="TravelInspirationSlideTitle">Family Travel</Typography>
                                    </Box>
                                    <Box className="TravelInspirationSlideBottomContent">
                                        <BullionmarkSectionHeading description="Luxury family safaris and inspiring wildlife adventures with a positive impact." />
                                        <Button variant="outlined">Discover More</Button>
                                    </Box>
                                </Box>
                            </SwiperSlide>
                        </Swiper>
                    </Box>
                </Box>

            </Container>
        </Box>
    )
}

export default TravelInspiration