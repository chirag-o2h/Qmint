import React, { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { BullionmarkSectionHeading } from '@/components/common/Utils'
import { Box, Card, Skeleton, useMediaQuery, Container } from "@mui/material"

import { Autoplay, Pagination, A11y } from 'swiper/modules'
import BmkProductCard from "./BmkProductCard"
import classNames from "classnames"
import useGetFeaturesProductaData from "@/hooks/useGetFeaturedProductaData"

function BmkFeaturedProductsSlider() {
    const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('md'))
    const { data, priceForEachId } = useGetFeaturesProductaData()

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
                            {
                                data?.data?.items?.length > 0 ? data?.data?.items?.map((product) => {
                                    product.priceWithDetails = priceForEachId ? priceForEachId[product?.productId] : null;
                                    return (<SwiperSlide key={product.productId}>
                                        <BmkProductCard product={product}/>
                                    </SwiperSlide>)
                                })
                                    :
                                    <>
                                        {!isMobile ? Array(6).fill(0).map((_, index) => {
                                            return (
                                                <SwiperSlide key={index}>
                                                    <Card className="ProductCard">
                                                        <Skeleton animation="wave" height={500} style={{ padding: "0px" }} />
                                                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                                            <Skeleton animation="wave" height={95} width="100%" style={{ marginBottom: "4px" }} />
                                                            <Skeleton animation="wave" height={70} width="100%" />
                                                        </div>
                                                    </Card>
                                                </SwiperSlide>
                                            );
                                        }) : Array(4).fill(0).map((_, index) => {
                                            return (
                                                <SwiperSlide key={index}>
                                                    <Card className="ProductCard">
                                                        <Skeleton animation="wave" height={320} style={{ padding: "0px" }} />
                                                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                                            <Skeleton animation="wave" height={100} width="100%" style={{ marginBottom: "4px" }} />
                                                            <Skeleton animation="wave" height={70} width="100%" />
                                                        </div>
                                                    </Card>
                                                </SwiperSlide>
                                            );
                                        })}
                                    </>
                            }
                        </Swiper>
                    </Box>
                </Box>
            </Container >
        </Box >
    )
}

export default BmkFeaturedProductsSlider