import React, { useState } from 'react'
import Seo from "../components/common/Seo"
import Layout from "@/components/common/Layout";
import { Box, Container } from "@mui/material"
import { PageTitle } from "@/components/common/Utils"
import { getShoppingCartData } from '@/redux/reducers/shoppingCartReducer';
import { ENDPOINTS } from '@/utils/constants';
import useAPIoneTime from '@/hooks/useAPIoneTime';
import ShoppingCartComponent from '@/components/partials/shopping-cart/ShoppingCartComponent';
import Loader from '@/components/common/Loader';
import { useAppSelector } from '@/hooks';
import { getConfigData, IconfigDataFromServer } from '@/utils/getConfigData';

function ShoppingCart({ serverData }: { serverData: IconfigDataFromServer }) {
    const checkLoadingStatus = useAppSelector(state => state.shoppingCart.loading);
    const [body] = useState({
        "search": "",
        "pageNo": 0,
        "pageSize": -1,
        "sortBy": "",
        "sortOrder": "",
        "filters": {}
    })
    useAPIoneTime({ service: getShoppingCartData, endPoint: ENDPOINTS.getShoppingCartData, body });

    return (
        <>
            <Seo
                lang="en"
                keywords={[`sitemap`, ...(serverData?.keywords || [])]}
                configDetailsState={serverData?.configDetails}
            />
            <Layout>
                {checkLoadingStatus && <Loader open={checkLoadingStatus} />}
                <Box id="ShoppingCart" component="section" className='ShoppingCartPage'>
                    <Box className="TitleWrapper">
                        <PageTitle title="Shopping cart" />
                    </Box>
                    <Container>
                        <ShoppingCartComponent />
                    </Container>
                </Box>
            </Layout>
        </>
    )
}
export const getServerData = async (context: any) => {
    return await getConfigData(context);
  };
export default ShoppingCart
