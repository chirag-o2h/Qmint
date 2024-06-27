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

function ShoppingCart() {
    const checkLoadingStatus = useAppSelector(state => state.shoppingCart.loading);
    const [body] = useState({
        "search": "",
        "pageNo": 0,
        "pageSize": -1,
        "sortBy": "",
        "sortOrder": "",
        "filters": {}
    })
    useAPIoneTime({
        service: getShoppingCartData, endPoint: ENDPOINTS.getShoppingCartData, body
    });

    return (
        <Layout>
            <>
                {checkLoadingStatus && <Loader open={checkLoadingStatus} />}
                <Seo
                    keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
                    title="Home"
                    lang="en"
                />
                <Box id="ShoppingCart" component="section" className='ShoppingCartPage'>
                    <Box className="TitleWrapper">
                        <PageTitle title="Shopping cart" />
                    </Box>
                    <Container>
                        <ShoppingCartComponent />
                    </Container>
                </Box>
            </>
        </Layout>
    )
}

export default ShoppingCart
