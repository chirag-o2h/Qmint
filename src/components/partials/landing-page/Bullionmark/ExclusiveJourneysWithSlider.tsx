import { Box, Button, Container, IconButton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay, Pagination, A11y } from 'swiper/modules'
// import 'swiper/css/pagination';
import { navigate } from "gatsby";

// Hooks
import { useAppSelector } from "@/hooks"

import { BullionmarkSectionHeading } from '@/components/common/Utils';

import { prefixZeroIfOneDigitNumber } from "../../../../utils/helper"
import { BullionmarkSwiperButtonPrev, BullionmarkSwiperButtonNext, BullionmarkSwiperDash } from '@/assets/icons'


function ExclusiveJourneysWithSlider() {
    const { bullionMarkPage } = useAppSelector((state) => state.homePage)
    const [currentSlide, setCurrentSlide] = useState<number | null>(null)
    const [totalSlide, setTotalSlide] = useState<number | null>(null)
    const config = {
        slidesPerView: 1,
        spaceBetween: 0,
        navigation: {
            nextEl: ".BullionmarkSwiperButtonNext",
            prevEl: ".BullionmarkSwiperButtonPrev",
            disabledClass: "SwiperButtonDisabled",
        },
        pagination: {
            type: 'custom',
            renderCustom: function (swiper: any, current: number, total: number) {
                setCurrentSlide(prefixZeroIfOneDigitNumber(current) as number)
                setTotalSlide(prefixZeroIfOneDigitNumber(total) as number)
                return ""
            },
        },
        loop: true,
        speed: 300,
        modules: [Navigation, Autoplay, Pagination, A11y],
        scrollbar: {
            draggable: true
        },
        grabCursor: true,
        autoplay: {
            delay: 8000,
        },
    }
    const exclusiveJourneysWithSlider = bullionMarkPage?.homepage_Section_5_One_big_pic_and_content
    return (
        <>
            {(exclusiveJourneysWithSlider && exclusiveJourneysWithSlider?.length > 0) && (
                <Box id="ExclusiveJourneysWithSlider" component="section">
                    <Container>
                        <Box className="SwiperContainer">
                            <Swiper
                                {...config}
                            >
                                {exclusiveJourneysWithSlider.map((item) => {
                                    return (
                                        <SwiperSlide key={item.id}>
                                            <Box dangerouslySetInnerHTML={{
                                                __html: exclusiveJourneysWithSlider?.[0]?.overview
                                            }}></Box>
                                        </SwiperSlide>
                                    )
                                })}
                            </Swiper>
                            {exclusiveJourneysWithSlider.length > 1 && (
                                <Stack className="BullionmarkSwiperNavigation">
                                    <IconButton className="BullionmarkSwiperButtonPrev">
                                        <BullionmarkSwiperButtonPrev />
                                    </IconButton>
                                    {currentSlide}
                                    <BullionmarkSwiperDash />
                                    {totalSlide}
                                    <IconButton className="BullionmarkSwiperButtonNext">
                                        <BullionmarkSwiperButtonNext />
                                    </IconButton>
                                </Stack>
                            )}
                        </Box>
                    </Container>
                </Box>
            )}
        </>
    )
}

export default ExclusiveJourneysWithSlider