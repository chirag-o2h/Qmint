import { Box, Container, Typography } from '@mui/material'
import React from 'react'

const PageNotFoundText = ({ showMoreTextQuestion }: { showMoreTextQuestion: boolean }) => {
    return (
        <Box className="ErrorPage">
            <Container>
                <Box className="ErrorPageWrapper">
                    <Typography className="ErrorTitle" variant="h6" component="h2">We're sorry,</Typography>
                    <Typography className="ErrorTitleSubTitle" variant="h6" component="h2">It looks like the page that you are looking for doesn't exist. Please check the URL and try again.</Typography>
                    {showMoreTextQuestion && <Typography className="ErrorDescription" component="p" variant="subtitle1">Can’t find what you were looking for?</Typography>}
                </Box>
            </Container>
        </Box>
    )
}

export default PageNotFoundText