import React from 'react'
import { Box, Container, Typography, Button } from '@mui/material'
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay, Pagination, A11y, Grid } from 'swiper/modules'
import { SwiperNavigation } from "@/components/common/Utils"

// Utills
import { SectionHeading } from "../../../common/Utils"
import { useAppSelector } from '@/hooks'
import noImage from '@/assets/images/noImage.png'
import { navigate } from 'gatsby'

function Locations() {
    const { mainHomePageData, configDetails } = useAppSelector((state) => state.homePage)
    const config = {
        slidesPerView: 4,
        slidesPerColumn: 2,
        spaceBetween: 30,
        navigation: {
            nextEl: ".LocationNext",
            prevEl: ".LocationPrev",
            disabledClass: "SwiperButtonDisabled"
        },
        pagination: {
            clickable: true,
        },
        loop: true,
        speed: 300,
        modules: [Navigation, Autoplay, A11y, Grid],
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
            900: {
                slidesPerView: 3,
            },
            600: {
                slidesPerView: 2,
            },
            200: {
                slidesPerView: 2,
                slidesPerColumn: 2,
                spaceBetween: 20,
                grid: {
                    rows: 2,
                }
            },
        },
    }
    return (
        (mainHomePageData && mainHomePageData?.homepage_Section_1_Four_posts_in_a_row?.length > 0) ?
            <Box id="Location">
                <Container maxWidth="lg">
                    <Box className="LocationsWrapper">
                        <SectionHeading title={configDetails?.["Homepage_Section_1_Four_posts_in_a_row_Title"]?.value} description={configDetails?.["Homepage_Section_1_Four_posts_in_a_row_Subtitle"]?.value} />
                        <Box component="section" key={'Locations'}>
                            <Box className="SwiperContainer">
                                <Swiper {...config} >
                                    {(mainHomePageData && mainHomePageData?.homepage_Section_1_Four_posts_in_a_row?.length > 0) ?
                                        [...mainHomePageData?.homepage_Section_1_Four_posts_in_a_row, ...mainHomePageData?.homepage_Section_1_Four_posts_in_a_row]?.map((item) => {
                                            return (
                                                <SwiperSlide onClick={() => {
                                                    navigate('/blog/' + item.friendlyName)
                                                }}>
                                                    <Box className="LocationsSlide">
                                                        <img loading='lazy' src={item?.imageUrl ?? noImage} alt={item?.title} />
                                                        <Typography className="SlideDescription" onClick={() => {
                                                            navigate('/blog/' + item.friendlyName)
                                                        }}>{item?.title}</Typography>
                                                    </Box>
                                                </SwiperSlide>
                                            )
                                        })
                                        : null}
                                </Swiper>
                                {<SwiperNavigation classNameNext="LocationNext" classNamePrev="LocationPrev" />}
                            </Box>
                        </Box>
                    </Box >
                </Container>
            </Box> : null
    )
}

export default Locations