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
            {planningJourney && <Box id="PlanningJourney" component="section">
                <Container  dangerouslySetInnerHTML={{
                __html: planningJourney[0].overview
                }}>
                </Container>
            </Box>}

        </>
    )
}

export default PlanningJourney