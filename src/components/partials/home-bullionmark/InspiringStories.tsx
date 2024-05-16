import { Box, Container, Stack, Typography, Button } from '@mui/material'
import React from 'react'
import InspiringStoriesLeftImage from '../../../assets/images/InspiringStoriesLeftImage.png'
import InspiringStoriesRightImage from '../../../assets/images/InspiringStoriesRightImage.png'
import { BullionmarkSectionHeading } from '@/components/common/Utils'

function InspiringStories() {
    return (
        <Box id="InspiringStories" component="section">
            <Container>
                <Box className="InspiringStoriesTitle">
                    <BullionmarkSectionHeading title="Inspiring Stories" />
                </Box>
                <Stack className="InspiringStoriesContent">
                    <Box className="LeftContent">
                        <img src={InspiringStoriesLeftImage} alt="left-image" loading="lazy" />
                        <BullionmarkSectionHeading title="Exclusive Journeys and Select Departures to Remote Corners of" description="We specialise in providing curious travellers with access to regions and communities that would otherwise prove challenging. We are committed to offering unique travel opportunities, to unusual destinations, that are mutually beneficial to all involved." />
                        <Typography variant="body2" className='Date'>27 Jan 2024</Typography>
                    </Box>
                    <Box className="RightContent">
                        <img src={InspiringStoriesRightImage} alt="right-image" loading="lazy" />
                        <BullionmarkSectionHeading title="Exclusive Journeys and Select Departures to Remote Corners of" description="We specialise in providing curious travellers with access to regions and communities that would otherwise prove challenging. We are committed to offering unique travel opportunities, to unusual destinations, that are mutually beneficial to all involved." />
                        <Typography variant="body2" className='Date'>27 Jan 2024</Typography>
                    </Box>
                </Stack>
            </Container>
        </Box>
    )
}

export default InspiringStories