import MainLayout from '@/components/common/MainLayout'
import PageNotFoundText from '@/components/partials/PageNotFoundText'
import { Box } from '@mui/material'
import React from 'react'

const FourZeroFour = () => {
    return (
        <MainLayout>
            <Box className="ErrorTextBox">
                <PageNotFoundText showMoreTextQuestion={false} />
            </Box>
        </MainLayout>
    )
}

export default FourZeroFour