import React, { useEffect, useState } from "react"
import { Box, Stack } from "@mui/material"
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import {
  GlassMagnifier,
} from "react-image-magnifiers";

// Types
import { type Swiper as SwiperTypes } from "swiper"

function ProductImages({ productImages, offerBadge }: any) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperTypes | null>(null)
  const [isClient, setisClient] = useState(false)
  useEffect(() => {
    setisClient(true)
  }, [])

  return (
    <Box className="ProductImages">
      <Box className="SwiperContainer">
        <Swiper
          className="MainThumbnail"
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Thumbs]}
          spaceBetween={10}
          allowTouchMove={false}
        >
          {productImages?.length > 0 ? productImages.map((url: any) => (
            <SwiperSlide key={url}>
              <Stack className="ImageWrapper">
                <Box className="Image">
                  <GlassMagnifier
                    imageSrc={url}
                    imageAlt="Product image"
                    className="Magnifier"
                    magnifierSize="50%"
                    square
                  />
                  {offerBadge}
                </Box>
              </Stack>
            </SwiperSlide>
          )) : null}
        </Swiper>
        {isClient && <Swiper
          className="SupportImages"
          onSwiper={setThumbsSwiper}
          modules={[FreeMode, Navigation, Thumbs]}
          spaceBetween={10}
          slidesPerView={4}
          freeMode
          watchSlidesProgress
          breakpoints={{
            425: {
              slidesPerView: 5,
            },
            500: {
              slidesPerView: 6,
            },
            600: {
              slidesPerView: 7,
            },
            700: {
              slidesPerView: 8,
            },
            800: {
              slidesPerView: 9,
            },
            900: {
              slidesPerView: 5,
            },
            1200: {
              slidesPerView: 7,
            },
            1440: {
              slidesPerView: 8,
            },
          }}
        >
          {productImages?.length > 0 ? productImages?.map((url: any) => (
            <SwiperSlide key={url}>
              <img src={url} />
            </SwiperSlide>
          )) : null}
        </Swiper>}
      </Box>
    </Box >
  )
}

export default ProductImages

