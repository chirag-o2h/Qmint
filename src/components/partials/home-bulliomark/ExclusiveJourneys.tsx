import { Box, Button, Container, Stack, Typography } from '@mui/material'
import React from 'react'
import ExclusiveJourneysImage1 from '../../../assets/images/ExclusiveJourneysImage1.png'
import ExclusiveJourneysImage2 from '../../../assets/images/ExclusiveJourneysImage2.png'

function ExclusiveJourneys() {
    return (
        <>

            <Box id="ExclusiveJourneys" component="section">
                <Container>
                    <Stack className="ExclusiveJourneysContent">
                        <Box className="LeftImage">
                            <img src={ExclusiveJourneysImage1} className='ExclusiveJourneysImage1' alt="left-image" loading="lazy" />
                            <img src={ExclusiveJourneysImage2} className='ExclusiveJourneysImage2' alt="left-image" loading="lazy" />
                        </Box>
                        <Box className="RightContent">
                            <Typography variant="h2" className='RightTitle'>Exclusive Journeys and Select Departures to Remote Corners of</Typography>
                            <Box className="DescriptionButtonWrapper">
                                <Typography className='RightDescription'>We specialise in providing curious travellers with access to regions and communities that would otherwise prove challenging.</Typography>
                                <Typography className='RightDescription'>We are committed to offering unique travel opportunities, to unusual destinations, that are mutually beneficial to all involved.</Typography>
                                <Button variant="outlined">Discover</Button>
                            </Box>
                        </Box>
                    </Stack>
                </Container>
            </Box>
        </>
    )
}

export default ExclusiveJourneys