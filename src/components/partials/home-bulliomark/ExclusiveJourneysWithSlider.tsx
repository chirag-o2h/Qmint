import { Box, Button, Container, IconButton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay, Pagination, A11y } from 'swiper/modules'
// import 'swiper/css/pagination';

import ExclusiveJourneysSliderImage from '../../../assets/images/ExclusiveJourneysSliderImage.png'
import { BullionmarkSectionHeading } from '@/components/common/Utils';

import { prefixZeroIfOneDigitNumber } from "../../../utils/helper"
import { BullionmarkSwiperButtonPrev, BullionmarkSwiperButtonNext, BullionmarkSwiperDash } from '@/assets/icons'


function ExclusiveJourneysWithSlider() {
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
    return (
        <>

            <Box id="ExclusiveJourneysWithSlider" component="section">
                <Container>
                    <Box className="SwiperContainer">
                        <Swiper
                            {...config}
                        >
                            <SwiperSlide>
                                <Box className="ExclusiveJourneysWrapper">
                                    <img src={ExclusiveJourneysSliderImage} alt="ExclusiveJourneysSliderImage" />
                                    <Box className="ExclusiveJourneysContent">
                                        <BullionmarkSectionHeading title="Exclusive Journeys and Select Departures to Remote Corners of" description="We specialise in providing curious travellers with access to regions and communities that would otherwise prove challenging." />
                                        <Button variant="outlined" className='WhiteButton'>Discover</Button>
                                    </Box>
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box className="ExclusiveJourneysWrapper">
                                    <img src={ExclusiveJourneysSliderImage} alt="ExclusiveJourneysSliderImage" />
                                    <Box className="ExclusiveJourneysContent">
                                        <BullionmarkSectionHeading title="Exclusive Journeys and Select Departures to Remote Corners of" description="We specialise in providing curious travellers with access to regions and communities that would otherwise prove challenging." />
                                        <Button variant="outlined" className='WhiteButton'>Discover</Button>
                                    </Box>
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box className="ExclusiveJourneysWrapper">
                                    <img src={ExclusiveJourneysSliderImage} alt="ExclusiveJourneysSliderImage" />
                                    <Box className="ExclusiveJourneysContent">
                                        <BullionmarkSectionHeading title="Exclusive Journeys and Select Departures to Remote Corners of" description="We specialise in providing curious travellers with access to regions and communities that would otherwise prove challenging." />
                                        <Button variant="outlined" className='WhiteButton'>Discover</Button>
                                    </Box>
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box className="ExclusiveJourneysWrapper">
                                    <img src={ExclusiveJourneysSliderImage} alt="ExclusiveJourneysSliderImage" />
                                    <Box className="ExclusiveJourneysContent">
                                        <BullionmarkSectionHeading title="Exclusive Journeys and Select Departures to Remote Corners of" description="We specialise in providing curious travellers with access to regions and communities that would otherwise prove challenging." />
                                        <Button variant="outlined" className='WhiteButton'>Discover</Button>
                                    </Box>
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box className="ExclusiveJourneysWrapper">
                                    <img src={ExclusiveJourneysSliderImage} alt="ExclusiveJourneysSliderImage" />
                                    <Box className="ExclusiveJourneysContent">
                                        <BullionmarkSectionHeading title="Exclusive Journeys and Select Departures to Remote Corners of" description="We specialise in providing curious travellers with access to regions and communities that would otherwise prove challenging." />
                                        <Button variant="outlined" className='WhiteButton'>Discover</Button>
                                    </Box>
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box className="ExclusiveJourneysWrapper">
                                    <img src={ExclusiveJourneysSliderImage} alt="ExclusiveJourneysSliderImage" />
                                    <Box className="ExclusiveJourneysContent">
                                        <BullionmarkSectionHeading title="Exclusive Journeys and Select Departures to Remote Corners of" description="We specialise in providing curious travellers with access to regions and communities that would otherwise prove challenging." />
                                        <Button variant="outlined" className='WhiteButton'>Discover</Button>
                                    </Box>
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box className="ExclusiveJourneysWrapper">
                                    <img src={ExclusiveJourneysSliderImage} alt="ExclusiveJourneysSliderImage" />
                                    <Box className="ExclusiveJourneysContent">
                                        <BullionmarkSectionHeading title="Exclusive Journeys and Select Departures to Remote Corners of" description="We specialise in providing curious travellers with access to regions and communities that would otherwise prove challenging." />
                                        <Button variant="outlined" className='WhiteButton'>Discover</Button>
                                    </Box>
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box className="ExclusiveJourneysWrapper">
                                    <img src={ExclusiveJourneysSliderImage} alt="ExclusiveJourneysSliderImage" />
                                    <Box className="ExclusiveJourneysContent">
                                        <BullionmarkSectionHeading title="Exclusive Journeys and Select Departures to Remote Corners of" description="We specialise in providing curious travellers with access to regions and communities that would otherwise prove challenging." />
                                        <Button variant="outlined" className='WhiteButton'>Discover</Button>
                                    </Box>
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box className="ExclusiveJourneysWrapper">
                                    <img src={ExclusiveJourneysSliderImage} alt="ExclusiveJourneysSliderImage" />
                                    <Box className="ExclusiveJourneysContent">
                                        <BullionmarkSectionHeading title="Exclusive Journeys and Select Departures to Remote Corners of" description="We specialise in providing curious travellers with access to regions and communities that would otherwise prove challenging." />
                                        <Button variant="outlined" className='WhiteButton'>Discover</Button>
                                    </Box>
                                </Box>
                            </SwiperSlide>
                        </Swiper>
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
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default ExclusiveJourneysWithSlider