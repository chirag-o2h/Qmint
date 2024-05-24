import { Box, Container, Stack, Typography, Button } from '@mui/material'
import React from 'react'
import InspiringStoriesLeftImage from '../../../assets/images/InspiringStoriesLeftImage.png'
import InspiringStoriesRightImage from '../../../assets/images/InspiringStoriesRightImage.png'
import { BullionmarkSectionHeading } from '@/components/common/Utils'
import { navigate } from "gatsby";

// Hooks
import { useAppSelector } from "@/hooks"

function InspiringStories() {
    const { bullionMarkPage } = useAppSelector((state) => state.homePage)
    const inspiringStories = bullionMarkPage?.homepage_Section_7_Two_posts_in_a_row
    return (
        inspiringStories && (<Box id="InspiringStories" component="section">
            <Container>
                <Box className="InspiringStoriesTitle">
                    <BullionmarkSectionHeading title="Inspiring Stories" />
                </Box>
                <Stack className="InspiringStoriesContent">
                    <Box className="LeftContent" onClick={() => { navigate(`${inspiringStories[0].friendlyName}`) }}>
                        <img src={InspiringStoriesLeftImage} alt="left-image" loading="lazy" />
                        <BullionmarkSectionHeading title={inspiringStories[0].title} description={inspiringStories[0].overview} />
                        {/* <Typography variant="body2" className='Date'>27 Jan 2024</Typography> */}
                    </Box>
                    <Box className="RightContent" onClick={() => { navigate(`${inspiringStories[1].friendlyName}`) }}>
                        <img src={InspiringStoriesRightImage} alt="right-image" loading="lazy" />
                        <BullionmarkSectionHeading title={inspiringStories[1]?.title} description={inspiringStories[1].overview} />
                        {/* <Typography variant="body2" className='Date'>27 Jan 2024</Typography> */}
                    </Box>
                </Stack>
            </Container>
        </Box>)
    )
}

export default InspiringStories