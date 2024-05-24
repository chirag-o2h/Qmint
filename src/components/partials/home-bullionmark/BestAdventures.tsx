import { BullionmarkSectionHeading, SectionHeading } from '@/components/common/Utils'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { Link } from "gatsby";
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, A11y } from 'swiper/modules'
import { Island, NewlLongArrowRight } from '@/assets/icons'

// Hooks
import { useAppSelector } from "@/hooks"

function BestAdventures() {
    const { bullionMarkPage } = useAppSelector((state) => state.homePage)
    
    const config = {
        slidesPerView: 1,
        spaceBetween: 20,
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
            delay: 3000,
        },
        breakpoints: {
            600: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            900: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
        }
    }

    const bestAdventures = bullionMarkPage?.homepage_Section_2_Four_posts_in_a_row
    
    return (
        <>
            <Box id="BestAdventures" className="BestAdventures" component="section">
                <Container component="section">
                    <BullionmarkSectionHeading
                        title="The Best Of Adventure" />
                    {(bestAdventures && bestAdventures.length > 0) && (
                        <Box className="SwiperContainer">
                            <Swiper {...config}>
                                {bestAdventures.map((item) => {
                                    return (
                                        <SwiperSlide key={item.id}>
                                            <Box className="AdventureCardWrapper">
                                                <img src={item.imageUrl} alt="AdventureCardImage" loading='lazy' />
                                                <Link to={item.friendlyName} className="AdventureCardLink">
                                                    <Stack className="BottomWrapper">
                                                        <Stack className="LeftContent">
                                                            <Island />
                                                            <Typography variant="body2" className='AdventuresTitle'>{item.title}</Typography>
                                                        </Stack>
                                                        <Box className="RightArrow">
                                                            <NewlLongArrowRight />
                                                        </Box>
                                                    </Stack>
                                                </Link>
                                            </Box>
                                        </SwiperSlide>
                                    )
                                })}
                            </Swiper>
                        </Box>
                    )}
                </Container>
            </Box>
        </>
    )
}

export default BestAdventures