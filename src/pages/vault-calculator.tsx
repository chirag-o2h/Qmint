import React, { useEffect } from 'react'
import Seo from "../components/common/Seo"
import { Box, Container, Stack, Typography } from "@mui/material"
import Layout from "@/components/common/Layout";

import { PageTitle } from "@/components/common/Utils"

import MetalForm from '@/components/partials/calculator/MetalForm';
import CalculatorCards from '@/components/partials/calculator/CalculatorCards';
// import TotalPageFooter from '@/components/partials/calculator/TotalPageFooter';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { saveCalculatorsData } from '@/redux/reducers/calculatorsReducer';
import { ENDPOINTS } from '@/utils/constants';

function Calculator() {
    const dispatch = useAppDispatch();
    const calculators = useAppSelector(state => state.calculators.calculators)
    const vaultStorage = useAppSelector(state => state.calculators.vaultStorage)

    useEffect(() => {
        dispatch(saveCalculatorsData({
            url: ENDPOINTS.saveCalculators,
            body: {
                CalculatorType: 1,
                CalculatorData: calculators
            }
        }) as any);
    }, [])

    return (
        <Layout>
            <Seo
                keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
                title="Home"
                lang="en"
            />
            <Box id="Calculator" className='Calculator' component="section">
                <Box className="TitleWrapper">
                    <PageTitle title="Vault" />
                </Box>
                <Container>
                    <Box className='CalculatorPageContent'>
                        <MetalForm CalculatorType={1} />
                        <CalculatorCards />
                        <Box className="TotalWrapper TotalValueWrapper">
                            <Stack
                                className='DataValueWrapper TotalValueNestedWrapper'>
                                <Typography variant="body1" className="">Total Vault Storage</Typography>
                                <Typography variant="subtitle1" className="">${vaultStorage}</Typography>
                            </Stack>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Layout>
    )
}

export default Calculator