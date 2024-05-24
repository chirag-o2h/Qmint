import { Box, Button, Container, Stack, Typography } from '@mui/material'
import React from 'react'

// Hooks
import { useAppSelector } from "@/hooks"

function ExclusiveJourneys() {
    const { bullionMarkPage } = useAppSelector((state) => state.homePage)
    const exclusiveJourneys = bullionMarkPage?.homepage_Section_4_Two_pics_and_content
    return (
        <>
            {exclusiveJourneys && <Box id="ExclusiveJourneys" component="section">
                <Container>
                    <Box className="ck-content">
                        <Box dangerouslySetInnerHTML={{
                            __html: exclusiveJourneys[0].overview
                        }}>
                        </Box>
                    </Box>
                </Container>
            </Box>}
        </>
    )
}

export default ExclusiveJourneys