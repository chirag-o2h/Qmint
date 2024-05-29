import React, { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { BullionmarkSectionHeading } from '@/components/common/Utils'
import { Box, Card, Skeleton, useMediaQuery, Container } from "@mui/material"

import { Autoplay, Pagination, A11y } from 'swiper/modules'
import BmkProductCard from "./BmkProductCard"
import classNames from "classnames"

function BmkFeaturedProductsSlider() {
    const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('md'))

    const config = {
        slidesPerView: 1,
        spaceBetween: 16,
        pagination: {
            clickable: true,
        },
        loop: true,
        speed: 500,
        modules: [Autoplay, Pagination, A11y],
        scrollbar: {
            draggable: true
        },
        grabCursor: true,
        autoplay: {
            delay: 8000,
        },
        breakpoints: {
            475: {
                slidesPerView: 1,
                spaceBetween: 23,
            },
            600: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            900: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 23,
            },
            1580: {
                slidesPerView: 5,
                spaceBetween: 40,
            },
        },
    }

    return (
        <Box id="BmkFeaturedProductsSlider" component="section">
            <Container>
                <BullionmarkSectionHeading title="Featured Products" />
                <Box className="BmkProductsWrapper">
                    <Box className={classNames("SwiperContainer", [isMobile ? "CircleSwiperPagination" : "LinedSwiperPagination"])}>
                        <Swiper {...config}>
                            <SwiperSlide>
                                <BmkProductCard />
                            </SwiperSlide>
                            <SwiperSlide>
                                <BmkProductCard />
                            </SwiperSlide>
                            <SwiperSlide>
                                <BmkProductCard />
                            </SwiperSlide>
                            <SwiperSlide>
                                <BmkProductCard />
                            </SwiperSlide>
                            <SwiperSlide>
                                <BmkProductCard />
                            </SwiperSlide>
                            <SwiperSlide>
                                <BmkProductCard />
                            </SwiperSlide>
                            <SwiperSlide>
                                <BmkProductCard />
                            </SwiperSlide>
                            <SwiperSlide>
                                <BmkProductCard />
                            </SwiperSlide>
                            <SwiperSlide>
                                <BmkProductCard />
                            </SwiperSlide>
                            <SwiperSlide>
                                <BmkProductCard />
                            </SwiperSlide>
                            <SwiperSlide>
                                <BmkProductCard />
                            </SwiperSlide>
                        </Swiper>
                    </Box>
                </Box>
            </Container >
        </Box >
    )
}

export default BmkFeaturedProductsSlider