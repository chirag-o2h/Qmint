import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay, Pagination, A11y } from 'swiper/modules'
import 'swiper/css/navigation';
import 'swiper/css/pagination';



function BannerSlider() {

    const config = {
        slidesPerView: 1,
        spaceBetween: 0,
        navigation: true,
        pagination: false,
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
            <Box id="Banner" className="BullionmarkHomeBanner" component="section" key={'banner'}>
                <Box className="SwiperContainer">
                    <Swiper {...config}>
                        <SwiperSlide>
                            <Box className="HeroBannerSliderWrapper" style={{ backgroundImage: 'url("https://fastly.picsum.photos/id/124/3504/2336.jpg?hmac=B1Avp6or9Df8vpnN4kQsGNfD66j8hH3gLtootCoTw4M")' }}>
                                <Box className="HeroBannerTopWrapper">
                                    <Typography variant="body1" className="SlideDescription">Around The Worldx</Typography>
                                    <Typography className="SlideTitle">Unforgettable travel experiences
                                        with a positive impact</Typography>
                                </Box>
                                <Button variant="contained">Discover More</Button>
                            </Box>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Box className="HeroBannerSliderWrapper" style={{ backgroundImage: 'url("https://fastly.picsum.photos/id/124/3504/2336.jpg?hmac=B1Avp6or9Df8vpnN4kQsGNfD66j8hH3gLtootCoTw4M")' }}>
                                <Box className="HeroBannerTopWrapper">
                                    <Typography variant="body1" className="SlideDescription">Around The Worldx</Typography>
                                    <Typography className="SlideTitle">Unforgettable travel experiences
                                        with a positive impact</Typography>
                                </Box>
                                <Button variant="contained" sx={{ backgroundColor: '#FF681A' }}>Discover More</Button>
                            </Box>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Box className="HeroBannerSliderWrapper" style={{ backgroundImage: 'url("https://fastly.picsum.photos/id/124/3504/2336.jpg?hmac=B1Avp6or9Df8vpnN4kQsGNfD66j8hH3gLtootCoTw4M")' }}>
                                <Box className="HeroBannerTopWrapper">
                                    <Typography variant="body1" className="SlideDescription">Around The Worldx</Typography>
                                    <Typography className="SlideTitle">Unforgettable travel experiences
                                        with a positive impact</Typography>
                                </Box>
                                <Button variant="contained" sx={{ backgroundColor: '#FF681A' }}>Discover More</Button>
                            </Box>
                        </SwiperSlide>
                    </Swiper>
                </Box>
            </Box>
        </>
    )
}

export default BannerSlider