import {
    Link,
    Card,
    CardContent,
    CardActions, Stack,
    Typography,
    Button,
    IconButton,
    Box,
    useMediaQuery
} from '@mui/material'
import React, { useState } from 'react'
import { Link as ProducLink, navigate } from "gatsby"
import { BmkProductStockStatus } from '@/components/common/Utils'
import classNames from 'classnames'
import { AddToCartIcon } from '@/assets/icons'
import noImage from '@/assets/images/noImage.png'
import { IFeaturedProducts } from '../Qmint/FeaturedProducts'
import { useAppDispatch, useAppSelector } from '@/hooks'
import useShowToaster from '@/hooks/useShowToaster'
import { ENDPOINTS } from '@/utils/constants'
import { getShoppingCartData } from '@/redux/reducers/shoppingCartReducer'
import { bodyForGetShoppingCartData } from '@/utils/common'
import useCallAPI from '@/hooks/useCallAPI'
import useUnloadMinHeight from '@/hooks/useUnloadMinHeight'
import LazyImage from '@/hooks/LazyImage'


function BmkProductCard({ product }: { product: IFeaturedProducts }) {
    const removeMinHeight = useUnloadMinHeight()
    const { configDetails: configDetailsState, isLoggedIn } = useAppSelector((state) => state.homePage)
    const dispatch = useAppDispatch()
    const renderStockStatus = isLoggedIn || configDetailsState?.AvailabilityForGuests_Enable?.value
    const { cartItems } = useAppSelector((state) => state.shoppingCart)
    const { showToaster } = useShowToaster();
    const { loading: loadingForAddToCart, error: errorForAddToCart, apiCallFunction } = useCallAPI()
    const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('md'))

    const handleAddToCart = async () => {
        if (cartItems?.length && (cartItems?.length >= configDetailsState?.Shoppingcart_MaxItems?.value)) {
            showToaster({
                message: `Can not add more than ${configDetailsState?.Shoppingcart_MaxItems?.value} items to cart.`,
                severity: 'error'
            })
            return
        }
        const response = await apiCallFunction(ENDPOINTS.addToCartProduct, 'POST', {
            "productId": product.productId,
            "quantity": 1,
            "IsInstantBuy": false
        } as any)
        if (response?.code === 200) {
            dispatch(getShoppingCartData({ url: ENDPOINTS.getShoppingCartData, body: bodyForGetShoppingCartData }))
            if (response.data === true) {
                showToaster({
                    message: response?.message,
                    buttonText: 'cart',
                    redirectButtonUrl: 'shopping-cart',
                    severity: 'success'
                })
            } else {
                showToaster({
                    message: response.message,
                    severity: 'warning'
                })
            }
        }
        else {
            showToaster({
                message: 'Adding to cart failed! Please Try again',
                severity: 'error'
            })
        }
    }

    return (
        <Card className="BmkCommonProductCard">
            <Stack className="ImageWrapper">
                <ProducLink className="ImageLink" to={`/product-details/${product?.friendlypagename}`}>
                    {/* <img style={removeMinHeight ? {minHeight: isMobile ? '': "250px"}  :{ }} src={product?.imageUrl ?? noImage} alt="Product image" fetchPriority='high'/> */}
                    <LazyImage
                                    key={product.imageUrl}
                                    src={product?.imageUrl ?? noImage}
                                    placeholder={noImage}
                                    alt="Product image"
                                    style={removeMinHeight ? {minHeight: isMobile ? '': "250px"}  :{ }}
                                    className="ProductImage"
                                  />
                </ProducLink>
            </Stack>
            <CardContent>
                {(renderStockStatus) && <BmkProductStockStatus availability={product?.availability} />}
                <Link className="ProductName" href={`/product-details/${product?.friendlypagename}`} //friendlypagename
                >
                    <Typography component="h3">{product?.productName}</Typography>
                </Link>
                <Stack className="PriceContentWrapper">
                    <Box className="Top">
                        <Typography variant="overline" className="PriceMessage">{product?.priceWithDetails?.tierPriceList &&
                            product?.priceWithDetails?.tierPriceList?.length > 0
                            ? "As low As"
                            : "Best Price at"}</Typography>
                    </Box>
                    <Stack className="Bottom">
                        <Typography variant="overline" className="DiscountedPrice">${(product?.priceWithDetails?.tierPriceList && product?.priceWithDetails?.tierPriceList?.length > 0) ?
                            (product?.priceWithDetails?.productLowestPrice?.toFixed(2)) : product?.priceWithDetails?.price?.toFixed(2)}</Typography>
                        {(product?.priceWithDetails?.discount && product?.priceWithDetails?.discount !== 0)
                            ?
                            <Typography variant="subtitle1" className="ActualPrice">
                                $
                                {(
                                    product?.priceWithDetails?.price +
                                    product?.priceWithDetails?.discount
                                ).toFixed(2)}
                            </Typography>
                            : null}
                    </Stack>
                </Stack>
                <Typography
                    className={classNames("OfferBadge")}
                    sx={{ backgroundColor: product?.tagColor }}
                >
                    {product?.tagName}
                </Typography>
            </CardContent>
            <CardActions>
                <Button name='learnMore' aria-label='Learn More' variant="contained" className="PrimaryAction" onClick={() => {
                    navigate(`/product-details/${product?.friendlypagename}`) //friendlypagename
                }} fullWidth>Shop Now</Button>
                {product?.availability !== "Sold Out" && <IconButton title="Add to cart" aria-label="AddToCartButton" className="Outlined AddToCart" onClick={handleAddToCart}><AddToCartIcon /></IconButton>}
            </CardActions >
        </Card >
    )
}

export default BmkProductCard