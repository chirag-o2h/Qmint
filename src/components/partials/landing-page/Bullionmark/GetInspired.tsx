import React from "react"
import { Box, Button, Stack, Typography, } from "@mui/material"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from 'swiper/modules'
import { navigate } from "gatsby";

// Type
import { SwiperOptions } from "swiper/types";

// Hooks
import { useAppSelector } from "@/hooks"

// Components
import { BullionmarkSectionHeading } from "@/components/common/Utils";

function GetInspired() {
  const { bullionMarkPage } = useAppSelector((state) => state.homePage)

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

  const getInspired = bullionMarkPage?.homepage_Section_3_Three_posts_in_a_row

  return (
    (getInspired && getInspired.length > 0) ?
      <Box id="SectionGetInspired" component="section">
        <Stack className="LayoutWrapper">
          <BullionmarkSectionHeading
            title="Get Inspired"
            description="Browse our example trips and get in contact to start planning your very own adventure."
          />
          <Box className="InspiredCardWrapper">
            {(
              <Box className="SwiperContainer">
                <Swiper {...config} >
                  {[...getInspired, ...getInspired].map((item, index) => {
                    return (
                      <SwiperSlide key={`InspiredCard-${index}`}>
                        <Stack className="InspiredCard" sx={{ backgroundImage: `url("${item.imageUrl}")` }}>
                          <Stack className="Head">
                            {/* <img src={item.imageUrl} className="ProfileImage" />
                          <Typography className="Title">{item.country}</Typography> */}
                          </Stack>
                          <Box className="Content">
                            <Typography className="Title">{item.title}</Typography>
                            <Typography className="Description">{item.overview}</Typography>
                            <Button variant="outlined" className="WhiteButton" onClick={() => { navigate(`${item.friendlyName}`) }}>Discover</Button>
                          </Box>
                        </Stack>
                      </SwiperSlide>
                    )
                  })}
                </Swiper>
              </Box>
            )}
          </Box>
        </Stack>
      </Box> : null
  )
}

export default GetInspired