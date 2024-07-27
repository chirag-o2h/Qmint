import React, { lazy, Suspense, useEffect } from 'react'
import Seo from "../components/common/Seo"
import { Box, Container, Stack, Typography } from "@mui/material"
import Layout from "@/components/common/Layout";

import { PageTitle } from "@/components/common/Utils"

import MetalForm from '@/components/partials/calculator/MetalForm';
// import CalculatorCards from '@/components/partials/calculator/CalculatorCards';
const CalculatorCards = lazy(()=>import('@/components/partials/calculator/CalculatorCards'))
// import TotalPageFooter from '@/components/partials/calculator/TotalPageFooter';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { resetCalculatorData, saveCalculatorsData } from '@/redux/reducers/calculatorsReducer';
import { ENDPOINTS } from '@/utils/constants';
import Loader from '@/components/common/Loader';
import { roundOfThePrice } from '@/utils/common';
import { getConfigData, IconfigDataFromServer } from '@/utils/getConfigData';

function Calculator({ serverData }: { serverData: IconfigDataFromServer }) {
    const checkLoadingStatus = useAppSelector(state => state.calculators.loading);
    const dispatch = useAppDispatch();
    const calculators = useAppSelector(state => state.calculators)

    useEffect(() => {
        dispatch(saveCalculatorsData({
            url: ENDPOINTS.saveCalculators,
            body: {
                CalculatorType: 0,
                CalculatorData: calculators?.calculators
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
                keywords={[`shipping-calculator`, ...(serverData?.keywords || [])]}
                configDetailsState={serverData?.configDetails}
            />
            <Layout>
                {checkLoadingStatus && <Loader open={checkLoadingStatus} />}
                <Box id="Calculator" className='Calculator' component="section">
                    <Box className="TitleWrapper">
                        <PageTitle title="Shipping Calculator" />
                    </Box>
                    <Container>
                        <Box className='CalculatorPageContent'>
                            <MetalForm CalculatorType={0} />
                            <Suspense fallback={<div>....</div>}><CalculatorCards /></Suspense>
                            {/* <TotalPageFooter /> */}
                            <Box className="TotalWrapper TotalValueWrapper">
                                <Stack
                                    className='DataValueWrapper ValueNestedWrapper' style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
                                    <Typography variant="body1" className="">Shipping</Typography>
                                    <Typography variant="subtitle1" className="">${roundOfThePrice(calculators?.shipping)}</Typography>
                                </Stack>
                                <Stack
                                    className='DataValueWrapper ValueNestedWrapper'>
                                    <Typography variant="body1" className="">Insurance</Typography>
                                    <Typography variant="subtitle1" className="">${roundOfThePrice(calculators?.insurance)}</Typography>
                                </Stack>
                                <Stack
                                    className='DataValueWrapper TotalValueNestedWrapper' style={{ borderTopLeftRadius: "0px", borderTopRightRadius: "0px" }}>
                                    <Typography variant="body1" className="">Total</Typography>
                                    <Typography variant="subtitle1" className="">${roundOfThePrice(calculators?.shipping + calculators?.insurance)}</Typography>
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
    return await getConfigData(context);
  };
export default Calculator