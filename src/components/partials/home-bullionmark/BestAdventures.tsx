import { BullionmarkSectionHeading, SectionHeading } from '@/components/common/Utils'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { Link } from "gatsby";
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, A11y } from 'swiper/modules'
import Adventures1 from '../../../assets/images/Adventures1.png'
import Adventures2 from '../../../assets/images/Adventures2.png'
import Adventures3 from '../../../assets/images/Adventures3.png'
import Adventures4 from '../../../assets/images/Adventures4.png'
import { Island, NewlLongArrowRight } from '@/assets/icons'

function BestAdventures() {
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
    return (
        <>
            <Box id="BestAdventures" className="BestAdventures" component="section">
                <Container component="section">
                    <BullionmarkSectionHeading
                        title="The Best Of Adventure" />
                    <Box className="SwiperContainer">
                        <Swiper {...config}>
                            <SwiperSlide>
                                <Box className="AdventureCardWrapper">
                                    <img src={Adventures1} alt="AdventureCardImage" loading='lazy' />
                                    <Link to='#' className="AdventureCardLink">
                                        <Stack className="BottomWrapper">
                                            <Stack className="LeftContent">
                                                <Island />
                                                <Typography variant="body2" className='AdventuresTitle'>Bora Bora In island</Typography>
                                            </Stack>
                                            <Box className="RightArrow">
                                                <NewlLongArrowRight />
                                            </Box>
                                        </Stack>
                                    </Link>
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box className="AdventureCardWrapper">
                                    <img src={Adventures2} alt="AdventureCardImage" loading='lazy' />
                                    <Link to='#' className="AdventureCardLink">
                                        <Stack className="BottomWrapper">
                                            <Stack className="LeftContent">
                                                <Island />
                                                <Typography variant="body2" className='AdventuresTitle'>Bora Bora In island</Typography>
                                            </Stack>
                                            <Box className="RightArrow">
                                                <NewlLongArrowRight />
                                            </Box>
                                        </Stack>
                                    </Link>
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box className="AdventureCardWrapper">
                                    <img src={Adventures3} alt="AdventureCardImage" loading='lazy' />
                                    <Link to='#' className="AdventureCardLink">
                                        <Stack className="BottomWrapper">
                                            <Stack className="LeftContent">
                                                <Island />
                                                <Typography variant="body2" className='AdventuresTitle'>Bora Bora In island</Typography>
                                            </Stack>
                                            <Box className="RightArrow">
                                                <NewlLongArrowRight />
                                            </Box>
                                        </Stack>
                                    </Link>
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box className="AdventureCardWrapper">
                                    <img src={Adventures4} alt="AdventureCardImage" loading='lazy' />
                                    <Link to='#' className="AdventureCardLink">
                                        <Stack className="BottomWrapper">
                                            <Stack className="LeftContent">
                                                <Island />
                                                <Typography variant="body2" className='AdventuresTitle'>Bora Bora In island</Typography>
                                            </Stack>
                                            <Box className="RightArrow">
                                                <NewlLongArrowRight />
                                            </Box>
                                        </Stack>
                                    </Link>
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box className="AdventureCardWrapper">
                                    <img src={Adventures2} alt="AdventureCardImage" loading='lazy' />
                                    <Link to='#' className="AdventureCardLink">
                                        <Stack className="BottomWrapper">
                                            <Stack className="LeftContent">
                                                <Island />
                                                <Typography variant="body2" className='AdventuresTitle'>Bora Bora In island</Typography>
                                            </Stack>
                                            <Box className="RightArrow">
                                                <NewlLongArrowRight />
                                            </Box>
                                        </Stack>
                                    </Link>
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box className="AdventureCardWrapper">
                                    <img src={Adventures3} alt="AdventureCardImage" loading='lazy' />
                                    <Link to='#' className="AdventureCardLink">
                                        <Stack className="BottomWrapper">
                                            <Stack className="LeftContent">
                                                <Island />
                                                <Typography variant="body2" className='AdventuresTitle'>Bora Bora In island</Typography>
                                            </Stack>
                                            <Box className="RightArrow">
                                                <NewlLongArrowRight />
                                            </Box>
                                        </Stack>
                                    </Link>
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box className="AdventureCardWrapper">
                                    <img src={Adventures1} alt="AdventureCardImage" loading='lazy' />
                                    <Link to='#' className="AdventureCardLink">
                                        <Stack className="BottomWrapper">
                                            <Stack className="LeftContent">
                                                <Island />
                                                <Typography variant="body2" className='AdventuresTitle'>Bora Bora In island</Typography>
                                            </Stack>
                                            <Box className="RightArrow">
                                                <NewlLongArrowRight />
                                            </Box>
                                        </Stack>
                                    </Link>
                                </Box>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Box className="AdventureCardWrapper">
                                    <img src={Adventures1} alt="AdventureCardImage" loading='lazy' />
                                    <Link to='#' className="AdventureCardLink">
                                        <Stack className="BottomWrapper">
                                            <Stack className="LeftContent">
                                                <Island />
                                                <Typography variant="body2" className='AdventuresTitle'>Bora Bora In island</Typography>
                                            </Stack>
                                            <Box className="RightArrow">
                                                <NewlLongArrowRight />
                                            </Box>
                                        </Stack>
                                    </Link>
                                </Box>
                            </SwiperSlide>
                        </Swiper>
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default BestAdventures