import React, { useEffect, useState } from 'react'
import { Container, Stack, Box, Button, Skeleton, Card } from "@mui/material"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, A11y } from 'swiper/modules'

// Utils
import { SectionHeading } from "../../../common/Utils"
import { TravelCard } from "../../../common/Card"
import useApiRequest from '@/hooks/useAPIRequest'
import { ENDPOINTS } from '@/utils/constants'
import { navigate } from 'gatsby'

// Components
import RecordNotFound from '@/components/common/RecordNotFound'
import { useAppSelector } from '@/hooks'

const dataforbody = {
  "search": "",
  "pageNo": 0,
  "pageSize": -1,
  "sortBy": "",
  "sortOrder": "",
  "filters": {
  }
}
interface ItravelDestinations {
  id: number
  title: string,
  body: string,
  bodyOverview: string,
  allowComments: boolean,
  includeInSitemap: boolean,
  tags: any,
  startDateUtc: Date,
  endDateUtc: Date,
  metaKeywords: string,
  metaDescription: string,
  metaTitle: string,
  commentCount: number,
  friendlyName: string,
  stores: string,
  isActive: boolean,
  imageUrl: string,
}
interface Idata {
  data: {
    data: {
      items: ItravelDestinations[]
    }
  },
  loading: boolean,
}
function SkeletonCloserLook({ index }: { index: number | string }) {
  return (
    <SwiperSlide key={index}>
      <Card className="ProductCard">
        <Skeleton animation="wave" height={500} style={{ borderRadius: "10px 10px 0 0", padding: "0px" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Skeleton animation="wave" height={95} width="95%" style={{ marginBottom: "4px" }} />
          <Skeleton animation="wave" height={70} width="95%" />
        </div>
      </Card>
    </SwiperSlide>
  )
}
function CloserLookMain() {
  const { configDetails } = useAppSelector((state) => state.homePage)
  const { mainHomePageData } = useAppSelector((state) => state.homePage)
  // console.log("🚀 ~ CloserLook ~ mainHomePageData:", mainHomePageData)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  }, [])
  const config = {
    slidesPerView: 1.4,
    spaceBetween: 20,
    pagination: {
      clickable: true,
    },
    centeredSlides: true,
    loop: true,
    speed: 500,
    modules: [Autoplay, Pagination, A11y],
    scrollbar: {
      draggable: true
    },
    grabCursor: true,
    autoplay: {
      delay: 3000,
    },
    breakpoints: {
      375: {
        slidesPerView: 1.5,
        spaceBetween: 40,
      },
      600: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      900: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    }
  }

  return (
    (mainHomePageData && mainHomePageData?.homepage_Section_7_Three_posts_in_a_row?.length > 0) ?
      <Box id="CloserLook">
        <Container component="section">
          <SectionHeading
            title={configDetails?.["ShopHomepage_Section_6_Three_posts_in_a_row_Title"]?.value ?? "Take a closer look*"}
            description={configDetails?.["ShopHomepage_Section_6_Three_posts_in_a_row_Subtitle"]?.value ?? "description*"}
          />
          <Container className="DestinationWrapper" maxWidth="lg">
            {mainHomePageData?.homepage_Section_7_Three_posts_in_a_row?.length !== 0 ?
              <Box className="SwiperContainer">
                <Swiper {...config} >
                  {
                    !loading ?
                      (mainHomePageData?.homepage_Section_7_Three_posts_in_a_row?.length > 0 ? mainHomePageData?.homepage_Section_7_Three_posts_in_a_row?.map((destination) => (
                        <SwiperSlide key={destination.title}>
                          <TravelCard
                            friendlyName={destination?.friendlyName}
                            place={destination.title}
                            description={destination.overview}
                            imageUrl={destination.imageUrl}
                          />
                        </SwiperSlide>
                      ))
                        : null) :
                      Array(5).fill(0).map((_, index) => {
                        return (
                          <SwiperSlide key={index}>
                            <Card className="ProductCard">
                              <Skeleton animation="wave" height={500} style={{ borderRadius: "10px 10px 0 0", padding: "0px" }} />
                              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                <Skeleton animation="wave" height={95} width="95%" style={{ marginBottom: "4px" }} />
                                <Skeleton animation="wave" height={70} width="95%" />
                              </div>
                            </Card>
                          </SwiperSlide>
                        );
                      })
                  }
                </Swiper>
              </Box>
              : <RecordNotFound message="No destination available" />
            }
          </Container>
          {/* <Stack className="Action" onClick={() => {
          navigate('/blog')
        }}>
        <Button aria-label={'DiscoverMore'} name={'DiscoverMore'} variant="contained">Discover More</Button>
      </Stack> */}
          <Stack className="Action">
            <Button className="DiscoverMore" name='CloserLook' aria-label="CloserLook" variant="contained" onClick={() => {
              navigate('/blog')
            }}>Discover More</Button>
          </Stack>
        </Container>
      </Box> : null
  )
}

export default React.memo(CloserLookMain)