import React from 'react'
import { Box, Container, Typography, Button } from '@mui/material'
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay, Pagination, A11y } from 'swiper/modules'
import { SwiperNavigation } from "@/components/common/Utils"

// Utills
import { SectionHeading } from "../../common/Utils"
import { useAppSelector } from '@/hooks'
import { navigate } from 'gatsby'
import noImage from '../../../assets/images/noImage.png'

function Adventure() {
    const { mainHomePageData, configDetails } = useAppSelector((state) => state.homePage)
    const config = {
        slidesPerView: 1.5,
        centeredSlides: true,
        spaceBetween: 20,
        pagination: {
            clickable: true,
        },
        loop: true,
        speed: 300,
        modules: [Pagination, Autoplay, A11y],
        scrollbar: {
            draggable: true
        },
        grabCursor: true,
        autoplay: {
            delay: 800000,
        },
    };

    return (
        (mainHomePageData && mainHomePageData?.adventure?.length > 0) ?
            <Box id="Adventure">
                <Box className="AdventureWrapper">
                    <SectionHeading
                        title={configDetails?.["Homepage_Section_2_One_big_post_Title"]?.value} description={configDetails?.["Homepage_Section_2_One_big_post_Subtitle"]?.value}
                    />
                    <Box className="AdventureSlideWrapper" component="section" key={'Adventure'}>
                        <Box className="SwiperContainer">
                            <Swiper {...config}>
                                {(mainHomePageData && mainHomePageData?.adventure?.length > 0) ?
                                    mainHomePageData?.adventure?.map((item) => {
                                        return (
                                            <SwiperSlide onClick={() => {
                                                navigate('/blog/' + item.friendlyName)
                                            }}>
                                                <Box className="AdventureSlide">
                                                    <img loading='lazy' src={item?.imageUrl ?? noImage} alt={noImage} />
                                                    <Box className="AdventureSlideContentBox">
                                                        <Typography className="SlideTitle">{item?.title}</Typography>
                                                        <Typography className="SlideSubTitle">{item?.overview}</Typography>
                                                        <Button variant='contained' className="Button" onClick={() => {
                                                            navigate('/blog/' + item.friendlyName)
                                                        }}>Discover More</Button>
                                                    </Box>
                                                </Box>
                                            </SwiperSlide>
                                        )
                                    })
                                    : null}
                                {/* <SwiperSlide>
                                <Box className="AdventureSlide">
                                    <img src="https://picsum.photos/1276/600" alt="https://picsum.photos/1276/600" />
                                    <Box className="AdventureSlideContentBox">
                                        <Typography className="SlideTitle">The best day trips from brisbane</Typography>
                                        <Typography className="SlideSubTitle">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Typography>
                                        <Button variant='contained' className="Button">Discover More</Button>
                                    </Box>
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box className="AdventureSlide">
                                    <img src="https://picsum.photos/1276/600" alt="https://picsum.photos/1276/600" />
                                    <Box className="AdventureSlideContentBox">
                                        <Typography className="SlideTitle">The best day trips from brisbane</Typography>
                                        <Typography className="SlideSubTitle">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Typography>
                                        <Button variant='contained' className="Button">Discover More</Button>
                                    </Box>
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box className="AdventureSlide">
                                    <img src="https://picsum.photos/1276/600" alt="https://picsum.photos/1276/600" />
                                    <Box className="AdventureSlideContentBox">
                                        <Typography className="SlideTitle">The best day trips from brisbane</Typography>
                                        <Typography className="SlideSubTitle">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Typography>
                                        <Button variant='contained' className="Button">Discover More</Button>
                                    </Box>
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box className="AdventureSlide">
                                    <img src="https://picsum.photos/1276/600" alt="https://picsum.photos/1276/600" />
                                    <Box className="AdventureSlideContentBox">
                                        <Typography className="SlideTitle">The best day trips from brisbane</Typography>
                                        <Typography className="SlideSubTitle">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Typography>
                                        <Button variant='contained' className="Button">Discover More</Button>
                                    </Box>
                                </Box>
                            </SwiperSlide> */}
                            </Swiper>
                        </Box>
                    </Box>
                </Box>
            </Box> : null
    )
}

export default Adventure