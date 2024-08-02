import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import * as  variable from '../../scss/settings/variables.module.scss'

const PageNotFoundText = ({ showMoreTextQuestion,isIt404Page=false }: { showMoreTextQuestion: boolean,isIt404Page?:boolean }) => {
    return (
        <Box className="ErrorPage">
            <Container>
                <Box className="ErrorPageWrapper">
                {isIt404Page && <Typography className="ErrorTitle" variant="h4" component="h1" style={{fontSize: '100px', lineHeight: '100px', textAlign:"center", color:`${variable.pumpkinOrange}`}}>404</Typography>}
                    <Typography className="ErrorTitle" variant="h6" component="h2">We're sorry,</Typography>
                    <Typography className="ErrorTitleSubTitle" variant="h6" component="h2">It looks like the page that you are looking for doesn't exist. Please check the URL and try again.</Typography>
                    {showMoreTextQuestion && <Typography className="ErrorDescription" component="p" variant="subtitle1">Can’t find what you were looking for?</Typography>}
                </Box>
            </Container>
        </Box>
    )
}

export default PageNotFoundText