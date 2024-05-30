import React, { useCallback } from 'react'
import { Box, Container, Typography, IconButton } from '@mui/material'
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay, Pagination, A11y, EffectCoverflow } from 'swiper/modules'
import { SwiperNavigation } from "@/components/common/Utils"

// Utills
import { SectionHeading } from "../../../common/Utils"
import { PlayIcon } from "../../../../assets/icons/index"
import { useAppSelector } from '@/hooks'
import noImage from '@/assets/images/noImage.png'
import { navigate } from 'gatsby'

function Experience() {
    const { mainHomePageData, configDetails } = useAppSelector((state) => state.homePage)
    const handleSlideChange = useCallback(() => {
        requestAnimationFrame(() => {
            const iframes = document.querySelectorAll('iframe');
            iframes.forEach(iframe => {
                // Reload the iframe to stop video playback
                iframe.src = iframe.src;
            });
        });
    }, []);

    return (
        (mainHomePageData && mainHomePageData?.homepage_Section_3_Video_showcase?.length > 0) ?
            <Box id="Experience">
                <Container maxWidth="lg">
                    <Box className="ExperienceWrapper">
                        <SectionHeading title={configDetails?.["Homepage_Section_3_Video_showcase_Title"]?.value} description={configDetails?.["Homepage_Section_3_Video_showcase_Subtitle"]?.value} />
                        <Box className="ExperienceSlideWrapper" component="section" key={'Experience'}>
                            <Box className="SwiperContainer">
                                <Swiper
                                    effect={'coverflow'}
                                    grabCursor={true}
                                    centeredSlides={true}
                                    slidesPerView={'auto'}
                                    initialSlide={2}
                                    coverflowEffect={{
                                        rotate: 40,
                                        stretch: 0,
                                        depth: 970,
                                        modifier: 1,
                                        slideShadows: false,
                                    }}

                                    navigation={{
                                        nextEl: ".SwiperButtonNext",
                                        prevEl: ".SwiperButtonPrev",
                                        disabledClass: "SwiperButtonDisabled"
                                    }}
                                    pagination={false}
                                    modules={[EffectCoverflow, Navigation]}
                                    breakpoints={{

                                        260: {
                                            slidesPerView: 1.4,
                                        },
                                        1024: {
                                            slidesPerView: "auto"
                                        },
                                    }}
                                    loop={true}
                                // onSlideChange={handleSlideChange}
                                >
                                    {<SwiperNavigation handleSlideChange={handleSlideChange} />}
                                    {(mainHomePageData && mainHomePageData?.homepage_Section_3_Video_showcase?.length > 0) ?
                                        [...mainHomePageData?.homepage_Section_3_Video_showcase, ...mainHomePageData?.homepage_Section_3_Video_showcase]?.map((item) => {
                                            return (
                                                <SwiperSlide
                                                // onClick={() => {
                                                //     navigate('/blog/' + item.friendlyName)
                                                // }}
                                                >
                                                    <Box className="ExperienceSlide">
                                                        {item?.mediaType == '0' ?
                                                            <>
                                                                {/* <IconButton className="PlayIcon">
                                                                    <PlayIcon />
                                                                </IconButton> */}
                                                                <iframe width="100%" height="484"
                                                                    // src="https://www.youtube.com/embed/KcNAfplWuJw?si=LVtD_lAYMXTrbnMJ" 
                                                                    src={item.imageUrl}
                                                                    title="YouTube video player"
                                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                                />
                                                            </>
                                                            :
                                                            <>
                                                                <img loading='lazy' src={item.imageUrl ?? noImage} alt={item.title} />
                                                            </>
                                                        }

                                                    </Box>
                                                </SwiperSlide>
                                            )
                                        })
                                        : null}
                                    {/* <SwiperSlide>
                                        <Box className="ExperienceSlide">
                                            <img src="https://picsum.photos/1276/600" alt="https://picsum.photos/1276/600" />
                                            <IconButton className="PlayIcon">
                                                <PlayIcon />
                                            </IconButton>
                                        </Box>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <Box className="ExperienceSlide">
                                            <img src="https://picsum.photos/1276/600" alt="https://picsum.photos/1276/600" />
                                            <IconButton className="PlayIcon">
                                                <PlayIcon />
                                            </IconButton>
                                        </Box>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <Box className="ExperienceSlide">
                                            <img src="https://picsum.photos/1276/600" alt="https://picsum.photos/1276/600" />
                                            <IconButton className="PlayIcon">
                                                <PlayIcon />
                                            </IconButton>
                                        </Box>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <Box className="ExperienceSlide">
                                            <img src="https://picsum.photos/1276/600" alt="https://picsum.photos/1276/600" />
                                            <IconButton className="PlayIcon">
                                                <PlayIcon />
                                            </IconButton>
                                        </Box>
                                    </SwiperSlide> */}
                                </Swiper>
                            </Box>
                        </Box>
                    </Box>
                </Container >
            </Box > : null
    )
}

export default Experience