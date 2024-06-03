import { Box, Container } from '@mui/material'
import React from 'react'

function ExclusiveJourneys({ data }: { data: any }) {
    return (
        <>
            {data && <Box id="ExclusiveJourneys" component="section">
                <Container>
                    <Box className="ck-content">
                        <Box dangerouslySetInnerHTML={{
                            __html: data
                        }}>
                        </Box>
                    </Box>
                </Container>
            </Box>}
        </>
    )
}

export default ExclusiveJourneys