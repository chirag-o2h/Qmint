import { Box, Button, Theme, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay, Pagination, A11y } from 'swiper/modules'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import useApiRequest from '@/hooks/useAPIRequest';
import { ENDPOINTS } from '@/utils/constants';
import { openNewTab } from "@/utils/common"
import { IbannerData } from '../../shop/Qmint/Banner';

function BannerSlider({ isItShopPage = false }: { isItShopPage?: boolean }) {
    const { data }: any = useApiRequest(ENDPOINTS.getSlider.replace('typeEnum', isItShopPage ? '1' : '0'));
    const isLargeScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

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
            <Box id="BmkBanner" className="BullionmarkHomeBanner" component="section" key={'banner'}>
                <Box className="SwiperContainer">
                    {data?.data?.length > 0 &&
                        <Swiper {...config} >
                            {
                                data?.data?.map((item: IbannerData, index: number) => {
                                    return (
                                        <SwiperSlide key={`BannerSlider-${index}`}>
                                            <Box 
                                                className="HeroBannerSliderWrapper"
                                                onClick={() => {
                                                    if (item.isImgUrl) {
                                                        openNewTab(item.url)
                                                    }
                                                }}
                                            //  dangerouslySetInnerHTML={{ __html: item?.htmlCode }}
                                             >
                                                {/* <Box className="HeroBannerTopWrapper" dangerouslySetInnerHTML={{
                  __html: item?.htmlCode
                }}>
                                                    <Typography variant="body1" className="SlideDescription">Around The Worldx</Typography>
                                                    <Typography className="SlideTitle">Unforgettable travel experiences
                                                        with a positive impact</Typography>
                                                </Box>
                                                <Button variant="contained">Discover More</Button> */}
                                                <Box dangerouslySetInnerHTML={{ __html: item?.htmlCode }}></Box>
                                                <img src={isLargeScreen ? item.cdnUrlLarge : item.cdnUrlSmall} alt={isLargeScreen ? item.cdnUrlLarge : item.cdnUrlSmall} />
                                            </Box>
                                        </SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>
                    }
                </Box>
            </Box>
        </>
    )
}

export default BannerSlider