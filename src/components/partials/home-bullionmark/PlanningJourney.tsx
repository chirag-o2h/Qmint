import { Box, Button, Container, Stack, Typography } from '@mui/material'
import React from 'react'
import PlanningJourneyImage from '../../../assets/images/PlanningJourney.png'

// Hooks
import { useAppSelector } from "@/hooks"

function PlanningJourney() {
    const { bullionMarkPage } = useAppSelector((state) => state.homePage)
    const planningJourney = bullionMarkPage?.homepage_Section_1_Picture_and_content
    return (
        <>
            {planningJourney && planningJourney?.[0] ? <Box id="PlanningJourney" component="section">
                <Container>
                    <Box className="ck-content">
                        <Box dangerouslySetInnerHTML={{
                            __html: planningJourney?.[0]?.overview
                        }}>
                        </Box>
                    </Box>
                </Container>
            </Box> : null}

        </>
    )
}

export default PlanningJourney