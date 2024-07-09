import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  useMediaQuery,
  Container,
  Typography,
  Skeleton,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";

import { Link } from "gatsby";

import { Navigation, Autoplay, Pagination, A11y } from "swiper/modules";

import { BullionmarkSectionHeading } from "@/components/common/Utils";
import LazyImage from "@/hooks/LazyImage";
import noImage from "../../../../assets/images/noImage.png";
import useUnloadMinHeight from "@/hooks/useUnloadMinHeight";

function BestCategorySlider(props: any) {
  const removeMinHeight = useUnloadMinHeight();
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("md"));
  const config = {
    slidesPerView: 1,
    spaceBetween: 16,
    navigation: false,
    pagination: {
      clickable: true,
    },
    // centeredSlides: isMobile,
    loop: true,
    speed: 500,
    modules: [Navigation, Autoplay, Pagination, A11y],
    scrollbar: {
      draggable: true,
    },
    grabCursor: true,
    autoplay: {
      delay: 8000,
    },
    breakpoints: {
      475: {
        slidesPerView: 1,
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
  };

  return (
    <Box
      id="BestCategorySlider"
      component="section"
      className={props.PaddingClass}
      style={removeMinHeight ? { minHeight: isMobile ? 720 : 650 } : {}}
    >
      <Container>
        <BullionmarkSectionHeading title={props?.title} />
        <Box className="BmkProductsSliderWrapper">
          <Box className="SwiperContainer CircleSwiperPagination">
            {
              <Swiper {...config}>
                {props?.pageData?.quickCategoryLinks?.length > 0 ? (
                  <>
                    {props?.pageData?.quickCategoryLinks?.map(
                      (category: any, index: number) => {
                        return (
                          <SwiperSlide key={category.id || category.name}>
                            <Link
                              to={category.linkUrl}
                              className="BmkProductCardLink"
                            >
                              <Card className="BmkProductCard">
                                <Box
                                  key="productImage"
                                  className="ProductImageWrapper"
                                >
                                  {/* <GatsbyImage
                                  style={removeMinHeight ? { minHeight: isMobile ? '300px' : '270px' } : {}}
                                  loading="eager"
                                  fetchPriority="high"
                                  className="ProductImage"
                                  image={getImage(category.imageUrl)!}
                                  alt="Product Image"
                                /> */}
                                  {/* <img
                                  style={removeMinHeight ? { minHeight: isMobile ? "300px" : "270px" } : {}}
                                  loading="eager"
                                  fetchPriority="high"
                                  className="ProductImage"
                                  src={category.imageUrl}
                                  alt="Product Image"
                                /> */}
                                  <LazyImage
                                    key={category.id}
                                    src={category.imageUrl}
                                    placeholder={noImage}
                                    alt={category.name}
                                    style={{
                                      minHeight: isMobile ? "430px" : "350px",
                                    }}
                                    className="ProductImage"
                                  />
                                </Box>
                                <Box
                                  key="productTitle"
                                  className="ProductTitle"
                                >
                                  <Typography variant="h4">
                                    {category.name}
                                  </Typography>
                                </Box>
                              </Card>
                            </Link>
                          </SwiperSlide>
                        );
                      }
                    )}
                  </>
                ) : !isMobile ? (
                  Array(6)
                    .fill(0)
                    .map((_, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <Skeleton
                            animation="wave"
                            height={500}
                            style={{ padding: "0px" }}
                          />
                        </SwiperSlide>
                      );
                    })
                ) : (
                  Array(4)
                    .fill(0)
                    .map((_, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <Skeleton
                            animation="wave"
                            height={470}
                            style={{ padding: "0px" }}
                          />
                        </SwiperSlide>
                      );
                    })
                )}
              </Swiper>
            }
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default BestCategorySlider;
