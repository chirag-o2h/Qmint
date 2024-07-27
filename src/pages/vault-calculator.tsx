import React, { lazy, Suspense, useEffect, useState } from 'react'
import Seo from "../components/common/Seo"
import { Box, Container, Stack, Typography } from "@mui/material"
import Layout from "@/components/common/Layout";

import { PageTitle } from "@/components/common/Utils"

import MetalForm from '@/components/partials/calculator/MetalForm';
// import CalculatorCards from '@/components/partials/calculator/CalculatorCards';
const CalculatorCards = lazy(()=>import("@/components/partials/calculator/CalculatorCards"))
// import TotalPageFooter from '@/components/partials/calculator/TotalPageFooter';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { resetCalculatorData, saveCalculatorsData } from '@/redux/reducers/calculatorsReducer';
import { ENDPOINTS } from '@/utils/constants';
import Loader from '@/components/common/Loader';
import { roundOfThePrice } from '@/utils/common';
import { getConfigData, IconfigDataFromServer } from '@/utils/getConfigData';

function Calculator({ serverData }: { serverData: IconfigDataFromServer }) {
    const dispatch = useAppDispatch();
    const calculators = useAppSelector(state => state.calculators.calculators)
    const vaultStorage = useAppSelector(state => state.calculators.vaultStorage)
    const checkLoadingStatus = useAppSelector(state => state.calculators.loading);

    useEffect(() => {
        dispatch(saveCalculatorsData({
            url: ENDPOINTS.saveCalculators,
            body: {
                CalculatorType: 1,
                CalculatorData: calculators
            }
        }) as any);
        return () => {
            dispatch(resetCalculatorData())
        }
    }, [])

    return (
        <>
            <Seo
                lang="en"
                keywords={[`vault Calculator`, ...(serverData?.keywords || [])]}
                configDetailsState={serverData?.configDetails}
            />
            <Layout>
                {checkLoadingStatus && <Loader open={checkLoadingStatus} />}
                <Box id="Calculator" className='Calculator' component="section">
                    <Box className="TitleWrapper">
                        <PageTitle title="Vault" />
                    </Box>
                    <Container>
                        <Box className='CalculatorPageContent'>
                            <MetalForm CalculatorType={1} />
                            <Suspense fallback={<div>....</div>}><CalculatorCards /></Suspense>
                            <Box className="TotalWrapper TotalValueWrapper">
                                <Stack
                                    className='DataValueWrapper TotalValueNestedWrapper'>
                                    <Typography variant="body1">Total Vault Storage</Typography>
                                    <Typography variant="subtitle1">${roundOfThePrice(vaultStorage)}</Typography>
                                </Stack>
                            </Box>
                        </Box>
                    </Container>
                </Box>
            </Layout>
        </>
    )
}
export const getServerData = async (context: any) => {
    return await getConfigData();
};
export default Calculator