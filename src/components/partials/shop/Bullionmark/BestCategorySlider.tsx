import React from "react"
import { Box, Card, useMediaQuery, Container, Typography, } from "@mui/material"
import { Swiper, SwiperSlide } from "swiper/react"

import { Link } from "gatsby";

import { Navigation, Autoplay, Pagination, A11y } from 'swiper/modules'


import { BullionmarkSectionHeading } from "@/components/common/Utils"
import { useAppSelector } from "@/hooks";


function BestCategorySlider(props: any) {
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
        <Box id="BestCategorySlider" component="section" className={props.PaddingClass}>
            <Container>
                <BullionmarkSectionHeading
                    title="Shop Our Best Category" />
                <Box className="BmkProductsSliderWrapper">
                    <Box className="SwiperContainer CircleSwiperPagination">
                        <Swiper  {...config}>
                            {props?.pageData && props?.pageData?.quickCategoryLinks?.map((category: any) => {
                                return (<SwiperSlide>
                                    <Link to={category.linkUrl} className="BmkProductCardLink">
                                        <Card className="BmkProductCard">
                                            <Box className="ProductImageWrapper">
                                                <img className="ProductImage" src={category.imageUrl} alt={category.name} />
                                            </Box>
                                            <Box className="ProductTitle">
                                                <Typography variant="h4">{category.name}</Typography>
                                            </Box>
                                        </Card>
                                    </Link>
                                </SwiperSlide>)
                            })}
                        </Swiper>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default BestCategorySlider