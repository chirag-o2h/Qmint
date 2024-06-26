import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { BullionmarkSectionHeading } from "@/components/common/Utils";
import {
  Box,
  Card,
  Skeleton,
  useMediaQuery,
  Container,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

import { Autoplay, Pagination, A11y } from "swiper/modules";
import BmkProductCard from "./BmkProductCard";
import classNames from "classnames";
import useGetPopulurProductsData from "@/hooks/useGetPopulurProductsData";

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
    draggable: true,
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
      spaceBetween: 20,
    },
    1580: {
      slidesPerView: 5,
      spaceBetween: 40,
    },
  },
};

function BmkPopularProductSlider(props: any) {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("md"));
  const { data, priceForEachId, productType, setProductType } =
    useGetPopulurProductsData();

  const handleChange = (event: any, newProductType: any) => {
    if (newProductType !== null) {
      setProductType(newProductType);
    }
  };

  return (
    <Box id="BmkPopularProductSlider" component="section">
      <Container>
        <BullionmarkSectionHeading
          title={props?.title}
          description={props?.description}
        />
        <Stack className="ToggleWrapper">
          <ToggleButtonGroup
            color="primary"
            value={productType}
            onChange={handleChange}
            aria-label="Products toggle"
            exclusive
          >
            <ToggleButton key="all" value="all">
              All
            </ToggleButton>
            <ToggleButton key="gold" value="gold">
              Gold
            </ToggleButton>
            <ToggleButton key="silver" value="silver">
              Silver
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        <Box className="BmkProductsWrapper">
          <Box
            className={classNames("SwiperContainer", [
              isMobile ? "CircleSwiperPagination" : "LinedSwiperPagination",
            ])}
          >
            <Swiper {...config}>
              {data?.data?.items?.length > 0
                ? data?.data?.items?.map((product) => {
                  product.priceWithDetails = priceForEachId
                    ? priceForEachId[product?.productId]
                    : null;
                  return (
                    <SwiperSlide key={product.productId}>
                      <BmkProductCard
                        key={product.productId}
                        product={product}
                      />
                    </SwiperSlide>
                  );
                })
                : Array(12)
                  .fill(0)
                  .map((_, index) => {
                    return (
                      <Card className="ProductCard" key={index}>
                        <Skeleton
                          animation="wave"
                          height={500}
                          style={{
                            borderRadius: "10px 10px 0 0",
                            padding: "0px",
                          }}
                        />
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Skeleton
                            key={`skeleton-95-${index}`}
                            animation="wave"
                            height={95}
                            width="95%"
                            style={{ marginBottom: "4px" }}
                          />
                          <Skeleton
                            key={`skeleton-70-${index}`}
                            animation="wave"
                            height={70}
                            width="95%"
                          />
                        </div>
                      </Card>
                    );
                  })}
            </Swiper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default BmkPopularProductSlider;
