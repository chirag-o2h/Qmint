import React from 'react'
import { Box, Container, Typography, Button } from '@mui/material'
import noImage from '../../../assets/images/noImage.png'

// Utills
import { SectionHeading } from "../../common/Utils"
import { useAppSelector } from '@/hooks'

function Gallery() {
    const { mainHomePageData, configDetails } = useAppSelector((state) => state.homePage)

    return (
        (mainHomePageData && mainHomePageData?.gallery?.length > 0) ?
            <Box id="Gallery">
                <Container maxWidth="lg">
                    <Box className="GalleryWrapper">
                        <SectionHeading title={configDetails?.["Homepage_Section_6_Picture_Gallery_Title"]?.value} description={configDetails?.["Homepage_Section_6_Picture_Gallery_Subtitle"]?.value} />
                        <Box className="GalleryContentWrapper" component="section" key={'Gallery'}>
                            <Box className="TopImageWrapper">
                                <Box className="Left">
                                    <img loading='lazy' src={mainHomePageData?.gallery?.[0]?.imageUrl ?? noImage} alt={mainHomePageData?.gallery?.[0]?.title} />
                                </Box>
                                <Box className="Right">
                                    <Box className="Top">
                                        <img loading='lazy' src={mainHomePageData?.gallery?.[1]?.imageUrl ?? noImage} alt={mainHomePageData?.gallery?.[1]?.title} />
                                        <img loading='lazy' src={mainHomePageData?.gallery?.[2]?.imageUrl ?? noImage} alt={mainHomePageData?.gallery?.[2]?.title} />
                                    </Box>
                                    <Box className="Bottom">
                                        <img loading='lazy' src={mainHomePageData?.gallery?.[3]?.imageUrl ?? noImage} alt={mainHomePageData?.gallery?.[3]?.title} />
                                    </Box>
                                </Box>
                            </Box>
                            <Box className="BottomImageWrapper">
                                {mainHomePageData?.gallery?.slice(4).map((image, index) => (
                                    <Box key={index} className={index % 2 === 0 ? "Left" : "Right"}>
                                        <img loading='lazy' src={image?.imageUrl ?? noImage} alt={image?.title ?? "Image"} />
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box> : null
    )
}

export default Gallery