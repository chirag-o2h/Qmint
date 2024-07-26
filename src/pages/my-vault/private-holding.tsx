import React, { useCallback, useEffect, useMemo, useState } from "react"
import { Box, Button, Container, Divider } from "@mui/material"
import { PageTitle } from "@/components/common/Utils"
import Seo from "@/components/common/Seo"
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { ENDPOINTS } from "@/utils/constants"
import { getTopicDetails } from "@/redux/reducers/topicReducer"
import { useAppDispatch, useAppSelector } from "@/hooks"
import Layout from "@/components/common/Layout"
import Loader from "@/components/common/Loader"
import { PlusIcon } from "@/assets/icons"
import PrivateHoldingCards from "@/components/partials/my-vault/PrivateHoldingsCard"
import { getPrivateHoldingsList, getPrivateHoldingsListLivePrice } from "@/redux/reducers/myVaultReducer"
import { navigate } from "gatsby"
import useRequireLogin from "@/hooks/useRequireLogin"
import { IPrivateHolding, IPrivateHoldingLivePrice } from "@/types/myVault"
import useAPIRequestWithService from "@/hooks/useAPIRequestWithService"
import { getConfigData, IconfigDataFromServer } from "@/utils/getConfigData"

function privateHolding({ serverData }: { serverData: IconfigDataFromServer }) {
    const { loadingForCheckingLogin } = useRequireLogin()
    const loading = useAppSelector(state => state.myVault.loading)
    const [privateHoldingsData, setPrivateHoldingsData] = useState<(IPrivateHolding & IPrivateHoldingLivePrice)[]>([]);
    const privateHoldingsListLivePrice = useAppSelector(state => state.myVault.privateHoldingsListLivePrice)
    const privateHoldingsList = useAppSelector(state => state.myVault.privateHoldingsList)
    const [BodyForThePrivateHoldingPriceList, setBodyForThePrivateHoldingPriceList] = useState<any>(null)
    const dispatch = useAppDispatch()
    const fetchPrivateHoldingsList = useCallback(
        async () => {
            await dispatch(getPrivateHoldingsList())
        }, [])

    useEffect(() => {
        fetchPrivateHoldingsList()
    }, [])

    useEffect(() => {
        if (!privateHoldingsListLivePrice || !privateHoldingsList) return;
        const preparePrivateHoldingData: (IPrivateHolding & IPrivateHoldingLivePrice)[] = [];

        privateHoldingsList?.forEach((item) => {
            privateHoldingsListLivePrice.forEach((livePriceItem) => {
                if (item.id === livePriceItem.holdingId) {
                    preparePrivateHoldingData.push({ ...livePriceItem, ...item });
                }
            });
        });
        setPrivateHoldingsData(preparePrivateHoldingData);
    }, [privateHoldingsListLivePrice, privateHoldingsList])

    useEffect(() => {
        if (!privateHoldingsList) return;
        setBodyForThePrivateHoldingPriceList({
            IsStorePrice: false,
            HoldingIds: privateHoldingsList.map(item => {
                return item.id;
            })
        })
    }, [privateHoldingsList])
    const checkCondition = useMemo(() => {
        return BodyForThePrivateHoldingPriceList && Object.keys(BodyForThePrivateHoldingPriceList)?.length > 0 && BodyForThePrivateHoldingPriceList["HoldingIds"]?.length > 0
    }, [BodyForThePrivateHoldingPriceList])
    useAPIRequestWithService({
        service: getPrivateHoldingsListLivePrice, endPoint: ENDPOINTS.getPrivateHoldingsListLivePrice, body: BodyForThePrivateHoldingPriceList, pollInterval: 60, conditionalCall: checkCondition
    })
    if (loadingForCheckingLogin) {
        return(
            <Seo
            keywords={[`Private Holdings`, ...(serverData?.keywords || [])]}
            lang="en"
            configDetailsState={serverData?.configDetails}
        />
        )
    }
    const onClickAction = () => {
        navigate("/my-vault/private-holding-add")
    }
    return (
        <>
            {loading && <Loader open={loading} />}
            <Layout>
                <Seo
                    keywords={[`Private Holdings`, ...(serverData?.keywords || [])]}
                    lang="en"
                    configDetailsState={serverData?.configDetails}
                />
                <PageTitle title="Private Holdings" backToDashboard={true} redirectOnClick={onClickAction} />
                <Box id="PrivateHoldingPage" className='PrivateHoldingPage' component="section">
                    <Container>
                        <Box className="Content PrivateHoldingContent">
                            <Box className="PrivateHoldingCardsWrapper">
                                {(privateHoldingsData && privateHoldingsData.length > 0) ? privateHoldingsData?.map((item) => {
                                    return (
                                        item ? <PrivateHoldingCards key={item?.id} fetchPrivateHoldingsList={fetchPrivateHoldingsList} item={item} /> : null
                                    )
                                }) : null}
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
export default privateHolding
