import React, { Suspense, lazy, useEffect, useState } from "react"
import { Box, Typography, useMediaQuery, Theme, Skeleton, Button } from "@mui/material"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay, Pagination, A11y } from 'swiper/modules'

// Utils
// const SwiperNavigation = lazy(() => import('../../common/Utils').then((module) => ({ default: module.SwiperNavigation })))
import useApiRequest from "@/hooks/useAPIRequest"
import { Url } from "url"
import { ENDPOINTS } from "@/utils/constants"
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"
import { SwiperNavigation } from "@/components/common/Utils"
import { openNewTab } from "@/utils/common"

interface IbannerData {
    id: number,
    storeCode: number,
    url: Url,
    displayOrder: number,
    sliderTime: number,
    htmlCode: any,
    isImgUrl: boolean,
    cdnUrlLarge: any,
    cdnUrlSmall: any
}
function Banner({bannerData}:any) {
    const { data, loading }: any = useApiRequest(ENDPOINTS.getSlider.replace('typeEnum', '0'));
    bannerData = data?.data
    const isLargeScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
    const config = {
        slidesPerView: 1,
        spaceBetween: 0,
        navigation: {
            nextEl: ".SwiperButtonNext",
            prevEl: ".SwiperButtonPrev",
            disabledClass: "SwiperButtonDisabled"
        },
        pagination: {
            clickable: true,
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
        <Box id="Banner" component="section" key={'banner'} style={loading || bannerData?.length != 0 ? {minHeight:'100vh'} : {}}>
            <Box className="SwiperContainer">
                <Swiper {...config}>
                    {
                        bannerData?.map((item: IbannerData, index: number) => {
                            return (
                                <SwiperSlide>
                                    <Box className="HeroBannerSliderWrapper" style={{ backgroundImage: `url(${isLargeScreen ? item.cdnUrlLarge : item.cdnUrlSmall})` }} onClick={() => {
                                        if (item.isImgUrl) {
                                            openNewTab(item.url)
                                        }
                                    }}>
                                        <Box className="HeroBannerTopWrapper" dangerouslySetInnerHTML={{
                                            __html: item.htmlCode,
                                        }}>
                                            {/* <Typography className="BgText">QUEENSLAND</Typography>
                                            <Typography className="SlideTitle">Explore Queensland</Typography> */}
                                        </Box>
                                        {/* <Typography variant="body1" className="SlideDescription">Sed ut perspiciatis unde omnis iste natus error sit voluptatem</Typography>
                                        <Button sx={{ mt: 3.75 }} variant="contained">Discover More</Button> */}
                                    </Box>
                                </SwiperSlide>
                            )
                        })}
                    {/* <SwiperSlide>
                        <Box className="HeroBannerSliderWrapper" style={{ backgroundImage: 'url("https://fastly.picsum.photos/id/124/3504/2336.jpg?hmac=B1Avp6or9Df8vpnN4kQsGNfD66j8hH3gLtootCoTw4M")' }}>

                            <Box className="HeroBannerTopWrapper">
                                <Typography className="BgText">QUEENSLAND</Typography>
                                <Typography className="SlideTitle">Explore Queensland</Typography>
                            </Box>
                            <Typography variant="body1" className="SlideDescription">Sed ut perspiciatis unde omnis iste natus error sit voluptatem</Typography>
                            <Button sx={{ mt: 3.75 }} variant="contained">Discover More</Button>
                        </Box>
                    </SwiperSlide> */}
                </Swiper>
                {<SwiperNavigation />}
            </Box>
        </Box >
    )
}

export default React.memo(Banner)