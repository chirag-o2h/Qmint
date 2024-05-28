import React, { useEffect, useState } from "react"
import { Box, Card, Skeleton, useMediaQuery, Container, Typography, } from "@mui/material"
import { Swiper, SwiperSlide } from "swiper/react"

import { Link } from "gatsby";

import { Navigation, Autoplay, Pagination, A11y } from 'swiper/modules'


import { BullionmarkSectionHeading, SwiperNavigation } from "@/components/common/Utils"
import { useAppSelector } from "@/hooks";

import BestCategoryImage2 from "../../../../assets/images/BestCategoryImage2.png"

function BestCategorySlider() {
    const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('md'))

    const config = {
        slidesPerView: 1.3,
        spaceBetween: 16,
        navigation: false,
        pagination: {
            clickable: true,
        },
        centeredSlides: isMobile,
        loop: true,
        speed: 500,
        modules: [Navigation, Autoplay, Pagination, A11y],
        scrollbar: {
            draggable: true
        },
        grabCursor: true,
        autoplay: {
            delay: 8000,
        },
        breakpoints: {
            475: {
                slidesPerView: 1.5,
                spaceBetween: 17,
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
                spaceBetween: 20,
            },
            1440: {
                slidesPerView: 5,
                spaceBetween: 17,
            },
        },
    }
    return (
        <Box id="BestCategorySlider" component="section">
            <Container>
                <BullionmarkSectionHeading
                    title="Shop Our Best Category" />
                <Box className="BmkProductsSliderWrapper">
                    <Box className="SwiperContainer BmkSwiperContainer">
                        <Swiper  {...config}>
                            <SwiperSlide>
                                <Link to="#" className="BmkProductCardLink">
                                    <Card className="BmkProductCard">
                                        <Box className="ProductImageWrapper">
                                            <img className="ProductImage" src={BestCategoryImage2} alt="product-image" />
                                        </Box>
                                        <Box className="ProductTitle">
                                            <Typography variant="h4">Popular Gold</Typography>
                                        </Box>
                                    </Card>
                                </Link>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Link to="#" className="BmkProductCardLink">
                                    <Card className="BmkProductCard">
                                        <Box className="ProductImageWrapper">
                                            <img className="ProductImage" src={BestCategoryImage2} alt="product-image" />
                                        </Box>
                                        <Box className="ProductTitle">
                                            <Typography variant="h4">Silver Favorites</Typography>
                                        </Box>
                                    </Card>
                                </Link>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Link to="#" className="BmkProductCardLink">
                                    <Card className="BmkProductCard">
                                        <Box className="ProductImageWrapper">
                                            <img className="ProductImage" src={BestCategoryImage2} alt="product-image" />
                                        </Box>
                                        <Box className="ProductTitle">
                                            <Typography variant="h4">Gold Bars</Typography>
                                        </Box>
                                    </Card>
                                </Link>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Link to="#" className="BmkProductCardLink">
                                    <Card className="BmkProductCard">
                                        <Box className="ProductImageWrapper">
                                            <img className="ProductImage" src={BestCategoryImage2} alt="product-image" />
                                        </Box>
                                        <Box className="ProductTitle">
                                            <Typography variant="h4">Bundle & Save</Typography>
                                        </Box>
                                    </Card>
                                </Link>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Link to="#" className="BmkProductCardLink">
                                    <Card className="BmkProductCard">
                                        <Box className="ProductImageWrapper">
                                            <img className="ProductImage" src={BestCategoryImage2} alt="product-image" />
                                        </Box>
                                        <Box className="ProductTitle">
                                            <Typography variant="h4">Gold Bars</Typography>
                                        </Box>
                                    </Card>
                                </Link>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Link to="#" className="BmkProductCardLink">
                                    <Card className="BmkProductCard">
                                        <Box className="ProductImageWrapper">
                                            <img className="ProductImage" src={BestCategoryImage2} alt="product-image" />
                                        </Box>
                                        <Box className="ProductTitle">
                                            <Typography variant="h4">Gold Bars</Typography>
                                        </Box>
                                    </Card>
                                </Link>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Link to="#" className="BmkProductCardLink">
                                    <Card className="BmkProductCard">
                                        <Box className="ProductImageWrapper">
                                            <img className="ProductImage" src={BestCategoryImage2} alt="product-image" />
                                        </Box>
                                        <Box className="ProductTitle">
                                            <Typography variant="h4">Gold Bars</Typography>
                                        </Box>
                                    </Card>
                                </Link>
                            </SwiperSlide>  <SwiperSlide>
                                <Link to="#" className="BmkProductCardLink">
                                    <Card className="BmkProductCard">
                                        <Box className="ProductImageWrapper">
                                            <img className="ProductImage" src={BestCategoryImage2} alt="product-image" />
                                        </Box>
                                        <Box className="ProductTitle">
                                            <Typography variant="h4">Gold Bars</Typography>
                                        </Box>
                                    </Card>
                                </Link>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Link to="#" className="BmkProductCardLink">
                                    <Card className="BmkProductCard">
                                        <Box className="ProductImageWrapper">
                                            <img className="ProductImage" src={BestCategoryImage2} alt="product-image" />
                                        </Box>
                                        <Box className="ProductTitle">
                                            <Typography variant="h4">Gold Bars</Typography>
                                        </Box>
                                    </Card>
                                </Link>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Link to="#" className="BmkProductCardLink">
                                    <Card className="BmkProductCard">
                                        <Box className="ProductImageWrapper">
                                            <img className="ProductImage" src={BestCategoryImage2} alt="product-image" />
                                        </Box>
                                        <Box className="ProductTitle">
                                            <Typography variant="h4">Gold Bars</Typography>
                                        </Box>
                                    </Card>
                                </Link>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Link to="#" className="BmkProductCardLink">
                                    <Card className="BmkProductCard">
                                        <Box className="ProductImageWrapper">
                                            <img className="ProductImage" src={BestCategoryImage2} alt="product-image" />
                                        </Box>
                                        <Box className="ProductTitle">
                                            <Typography variant="h4">Gold Bars</Typography>
                                        </Box>
                                    </Card>
                                </Link>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Link to="#" className="BmkProductCardLink">
                                    <Card className="BmkProductCard">
                                        <Box className="ProductImageWrapper">
                                            <img className="ProductImage" src={BestCategoryImage2} alt="product-image" />
                                        </Box>
                                        <Box className="ProductTitle">
                                            <Typography variant="h4">Gold Bars</Typography>
                                        </Box>
                                    </Card>
                                </Link>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Link to="#" className="BmkProductCardLink">
                                    <Card className="BmkProductCard">
                                        <Box className="ProductImageWrapper">
                                            <img className="ProductImage" src={BestCategoryImage2} alt="product-image" />
                                        </Box>
                                        <Box className="ProductTitle">
                                            <Typography variant="h4">Gold Bars</Typography>
                                        </Box>
                                    </Card>
                                </Link>
                            </SwiperSlide>

                        </Swiper>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default BestCategorySlider