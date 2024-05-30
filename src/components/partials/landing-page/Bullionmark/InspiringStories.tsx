import { Box, Container, Stack, Typography, Button } from '@mui/material'
import React from 'react'
import { BullionmarkSectionHeading } from '@/components/common/Utils'
import { navigate } from "gatsby";

// Hooks
import { useAppSelector } from "@/hooks"
import { BullionMarkItem } from '@/redux/reducers/homepageReducer'

function InspiringStories({ data }: { data: BullionMarkItem[] | undefined}) {
    return (
        data && (<Box id="InspiringStories" component="section">
            <Container>
                <Box className="InspiringStoriesTitle">
                    <BullionmarkSectionHeading title="Inspiring Stories" />
                </Box>
                <Stack className="InspiringStoriesContent">
                    <Box className="LeftContent" onClick={() => { navigate(`${data[0].friendlyName}`) }}>
                        <img src={data[0]?.imageUrl} alt="left-image" loading="lazy" />
                        <BullionmarkSectionHeading title={data[0].title} description={data[0].overview} />
                        {/* <Typography variant="body2" className='Date'>27 Jan 2024</Typography> */}
                    </Box>
                    <Box className="RightContent" onClick={() => { navigate(`${data[1].friendlyName}`) }}>
                        <img src={data[1]?.imageUrl} alt="right-image" loading="lazy" />
                        <BullionmarkSectionHeading title={data[1]?.title} description={data[1].overview} />
                        {/* <Typography variant="body2" className='Date'>27 Jan 2024</Typography> */}
                    </Box>
                </Stack>
            </Container>
        </Box>)
    )
}

export default InspiringStories