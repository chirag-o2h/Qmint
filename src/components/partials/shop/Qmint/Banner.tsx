import React, { Suspense, lazy, useEffect, useState } from "react"
import { Box, Typography, useMediaQuery, Theme, Skeleton } from "@mui/material"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay, Pagination, A11y } from 'swiper/modules'

// Utils
// const SwiperNavigation = lazy(() => import('../../common/Utils').then((module) => ({ default: module.SwiperNavigation })))
import useApiRequest from "@/hooks/useAPIRequest"
import { Url } from "url"
import { ENDPOINTS } from "@/utils/constants"
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"
import { SwiperNavigation } from "@/components/common/Utils"
import { navigate } from "gatsby"
import { openNewTab } from "@/utils/common"

export interface IbannerData {
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

function Banner() {
  const { data }: any = useApiRequest(ENDPOINTS.getSlider.replace('typeEnum', '1'));
  const isLargeScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'))
  const [tempImgHide, setTempImgHide] = useState(true)
  const config = {
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
      nextEl: ".BannerNext",
      prevEl: ".BannerPrev",
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
  useEffect(() => {
    const x = setTimeout(() => {
      setTempImgHide(false)
    }, 2000);
    return () => {
      clearTimeout(x)
    }
  }, [])

  return (
    <Box id="Banner" component="section" key={'banner'}>
      <Typography variant="h2" className="BannerTitle">Top articles</Typography>
      <Box className="SwiperContainer">
        {data?.data?.length > 0 ?
          <Swiper {...config} >
            {
              data?.data?.map((item: IbannerData, index: number) => {
                return (
                  <SwiperSlide key={`BannerSlider-${index}`}>
                    <Box className="Wrapper" sx={{ position: 'relative', width: '100%', height: '100%' }}>
                      {<>
                        {/* <StaticImage
                          rel="prefetch"
                          loading="lazy"
                          src={'../../../assets/images/loading.gif'}
                          // src={isLargeScreen ? item.cdnUrlLarge : item.cdnUrlSmall}
                          alt="background"
                          style={{visibility: tempImgHide ?'visible' :'hidden', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'fill' }}
                        />   */}
                        <img
                          className="BannerImage"
                          rel="prefetch"
                          loading="lazy"
                          src={isLargeScreen ? item.cdnUrlLarge : item.cdnUrlSmall}
                          alt="background"
                          style={{ visibility: !tempImgHide ? 'visible' : 'hidden' }}
                          onClick={() => {
                            if (item.isImgUrl) {
                              openNewTab(item.url)
                            }
                          }}
                        /></>}
                    </Box>
                  </SwiperSlide>
                )
              })
            }
          </Swiper>
          :
          <>
            {/* {!isMobile ? <Skeleton animation="wave" height="75vh" width="100%" style={{ transform: "none", margin: "auto", borderRadius: "0px" }} /> : <Skeleton animation="wave" height="300px" width="100%" style={{ transform: "none", margin: "auto", borderRadius: "0px" }} />} */}
          </>
        }
        {<SwiperNavigation classNameNext="BannerNext" classNamePrev="BannerPrev" />}
      </Box>
    </Box >
  )
}

export default React.memo(Banner)