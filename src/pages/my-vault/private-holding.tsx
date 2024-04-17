import React, { useCallback, useEffect, useState } from "react"
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

function privateHolding(paramsData: any) {
    const { loadingForCheckingLogin } = useRequireLogin()
    const loading = useAppSelector(state => state.myVault.loading)
    const [privateHoldingsData, setPrivateHoldingsData] = useState<(IPrivateHolding & IPrivateHoldingLivePrice)[]>([]);
    const privateHoldingsListLivePrice = useAppSelector(state => state.myVault.privateHoldingsListLivePrice)
    const privateHoldingsList = useAppSelector(state => state.myVault.privateHoldingsList)

    const dispatch = useAppDispatch()
    const fetchPrivateHoldingsList = useCallback(
        async () => {
            await dispatch(getPrivateHoldingsList())},[])
    
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

        const fetchPrivateHoldingsListLivePrice = async () => {
            await dispatch(getPrivateHoldingsListLivePrice({
                url: ENDPOINTS.getPrivateHoldingsListLivePrice, body: {
                    IsStorePrice: false,
                    HoldingIds: privateHoldingsList.map(item => {
                        return item.id;
                    })
                }
            }))
        }
        fetchPrivateHoldingsListLivePrice()
    }, [privateHoldingsList])


    if (loadingForCheckingLogin) {
        return
    }
    return (
        <>
            <Loader open={loading} />
            <Layout>
                <Seo
                    keywords={[`QMint Topics`]}
                    title="Private Holdings"
                    lang="en"
                />
                <PageTitle title="Private Holdings" backToDashboard={true} />
                <Box id="PrivateHoldingPage" className='PrivateHoldingPage' component="section">
                    <Container>
                        <Box className="Content PrivateHoldingContent">
                            <Box sx={{ textAlign: 'right' }}>
                                <Button variant="outlined" startIcon={<PlusIcon />} onClick={() => navigate("/my-vault/private-holding-add")}>Add new</Button>
                            </Box>
                            <Box className="PrivateHoldingCardsWrapper">
                                {(privateHoldingsData && privateHoldingsData.length > 0) ? privateHoldingsData?.map((item) => {
                                    return (
                                        item ?  <PrivateHoldingCards key={item?.id} fetchPrivateHoldingsList={fetchPrivateHoldingsList} item={item} /> : null
                                    )
                                }): null}
                            </Box>
                        </Box>
                    </Container>
                </Box>
            </Layout>
        </>
    )
}

export default privateHolding
