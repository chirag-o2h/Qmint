import { BullionmarkSectionHeading } from '@/components/common/Utils'
import { Box, Button, Container, Typography } from '@mui/material'
import { Autoplay, Pagination, A11y } from 'swiper/modules'

import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import { navigate } from "gatsby";

// Hooks
import { useAppSelector } from "@/hooks"

function TravelInspiration(props: any) {
    const { bullionMarkPage } = useAppSelector((state) => state.homePage)
    const config = {
        slidesPerView: 3,
        centeredSlides: false,
        spaceBetween: 52,
        loop: true,
        speed: 300,
        initialSlide: 1,
        pagination: false,
        modules: [Autoplay, Pagination, A11y],
        scrollbar: {
            draggable: true
        },
        grabCursor: true,
        autoplay: {
            delay: 8000,
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 30,
                centeredSlides: false,
            },
            600: {
                slidesPerView: 2,
                spaceBetween: 30,
                centeredSlides: false,
            },
            900: {
                slidesPerView: 3,
                spaceBetween: 52,
                centeredSlides: true,
            },
        }
    };
    const travelInspiration = bullionMarkPage?.homepage_Section_6_Three_posts_in_wavy_layout
    return (
        (travelInspiration && travelInspiration.length > 0) ? <Box id="TravelInspiration" component="section">
            <Container>
                <Box className="TravelInspirationTitle">
                    <BullionmarkSectionHeading title={props.title} />
                </Box>
                <Box className="TravelInspirationSliderWrapper">
                    {(
                        <Box className="SwiperContainer">
                            <Swiper {...config}>
                                {[...(travelInspiration?.length > 3 ? travelInspiration : [...travelInspiration, ...travelInspiration])].map((item) => {
                                    return (
                                        <SwiperSlide key={item.id}>
                                            <Box className="TravelInspirationSlideWrapper">
                                                <Box className="TravelInspirationSlideImageWrapper">
                                                    <img src={item.imageUrl} alt={item.friendlyName + " Image"} />
                                                    <Typography className="TravelInspirationSlideTitle">{item.title}</Typography>
                                                </Box>
                                                <Box className="TravelInspirationSlideBottomContent">
                                                    <BullionmarkSectionHeading description={item.overview} />
                                                    <Button variant="contained" onClick={() => { navigate(`${item.friendlyName}`) }}>Read More</Button>
                                                </Box>
                                            </Box>
                                        </SwiperSlide>
                                    )
                                })}
                            </Swiper>
                        </Box>
                    )}
                </Box>
            </Container>
        </Box> : null
    )
}

export default TravelInspiration