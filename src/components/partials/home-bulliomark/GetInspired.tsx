import React from "react"
import { Box, Button, Stack, Typography, } from "@mui/material"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from 'swiper/modules'

// Type
import { SwiperOptions } from "swiper/types";

// Data
import { getInspiredData } from "@/utils/data";

// Components
import { BullionmarkSectionHeading } from "@/components/common/Utils";

function GetInspired() {
  const config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    speed: 500,
    modules: [Autoplay],
    scrollbar: {
      draggable: true
    },
    grabCursor: true,
    autoplay: {
      delay: 3000,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      1170: {
        slidesPerView: 3,
        spaceBetween: 13,
      }
    },
  }
  return (
    <Box id="SectionGetInspired" component="section">
      <Stack className="LayoutWrapper">
        <BullionmarkSectionHeading
          title="Get Inspired"
          description="Browse our example trips and get in contact to start planning your very own adventure."
        />
        <Box className="InspiredCardWrapper">
          <Box className="SwiperContainer">
            <Swiper {...config} >
              {getInspiredData.map((item, index) => {
                return (
                  <SwiperSlide key={`InspiredCard-${index}`}>
                    <Stack className="InspiredCard" sx={{ backgroundImage: `url("${item.placeUrl}")` }}>
                      <Stack className="Head">
                        <img src={item.profileUrl} className="ProfileImage" />
                        <Typography className="Title">{item.country}</Typography>
                      </Stack>
                      <Box className="Content">
                        <Typography className="Title">{item.title}</Typography>
                        <Typography className="Description">{item.description}</Typography>
                        <Button variant="outlined">Discover</Button>
                      </Box>
                    </Stack>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </Box>
        </Box>
      </Stack>
    </Box>
  )
}

export default GetInspired