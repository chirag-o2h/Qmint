import { Box, Button, Container, Stack, Typography } from '@mui/material'
import React from 'react'
import PlanningJourneyImage from '../../../assets/images/PlanningJourney.png'

function PlanningJourney() {
    return (
        <>
            <Box id="PlanningJourney" component="section">
                <Container>
                    <Stack className="PlanningJourneyContent">
                        <Box className="LeftImage">
                            <img src={PlanningJourneyImage} alt="left-image" loading="lazy" />
                        </Box>
                        <Box className="RightContent">
                            <Typography variant="h2" className='RightTitle'>We Help You Planning Your Journey</Typography>
                            <Typography className='RightDescription'>Lorem ipsum dolor sit amet, consectetur adipiicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography>
                            <Typography className='RightDescription'>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</Typography>
                            <Button variant="outlined" sx={{ Color: '#FF681A' }}>Learn More</Button>
                        </Box>
                    </Stack>
                </Container>
            </Box>

        </>
    )
}

export default PlanningJourney