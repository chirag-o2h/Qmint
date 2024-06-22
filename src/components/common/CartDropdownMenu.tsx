import { useAppDispatch, useAppSelector } from '@/hooks';
import useApiRequest from '@/hooks/useAPIRequest';
import { CartItem } from '@/types/shoppingCart';
import { ENDPOINTS } from '@/utils/constants';
import { Box, Button, Divider, Stack, Typography } from '@mui/material'
import { navigate, Link } from 'gatsby'
import React, { useEffect, useState } from 'react'
import { CartItemsWithLivePriceDetails } from '../partials/shopping-cart/CartDetails';
import useShowToaster from '@/hooks/useShowToaster';
import { resetSubTotal, setCartItemWarning, updateShoppingCartData, updateSubTotal } from '@/redux/reducers/shoppingCartReducer';
import { calculatePrice, hasFulfilled } from '@/utils/common';

function CartDropdownMenu({ cartItemsWithLivePrice, howManyProductToShow }: any) {
    const dispatch = useAppDispatch()
    const { showToaster } = useShowToaster();
    const { cartItems } = useAppSelector((state) => state.shoppingCart)
    const itemCount = cartItems?.length ?? 0;
    const itemWord = itemCount === 1 ? 'item' : 'items';
    const itemCountWithWord = `${itemCount} ${itemWord}`;
    const handleProccedToCheckout = async () => {
        let quantities: any = {}
        cartItems?.forEach((item: CartItem) => {
            quantities[item.id] = item.quantity
        })
        let subTotal = 0;
        const itemsWithQuantity = cartItemsWithLivePrice.map((item: CartItemsWithLivePriceDetails) => {
            subTotal += (calculatePrice(item?.LivePriceDetails,quantities[item.id]) * quantities[item.id]);
            return {
                id: item.id,
                quantity: quantities[item.id]
            }
        })
        dispatch(resetSubTotal());
        dispatch(updateSubTotal(subTotal))

        const response = await dispatch(updateShoppingCartData({ url: ENDPOINTS.updateShoppingCartData, body: itemsWithQuantity }) as any);

        if (hasFulfilled(response.type)) {
            if (!response?.payload?.data?.data || response?.payload?.data?.data?.length === 0) {
                // showToaster({ message: "Cart updated and redirecting to checkout", severity: 'success' })
                navigate('/checkout')
            }
            else {
                dispatch(setCartItemWarning({ warnings: response?.payload?.data?.data, quantities }));
                showToaster({ message: "Cannot Checkout as Some items have warnings", severity: 'warning' })
            }
        }
        else {
            showToaster({ message: "Update cart failed", severity: 'error' })
        }
    }
    const isThereItems = cartItemsWithLivePrice && cartItemsWithLivePrice?.length > 0
    return (
        <>
            <Box className="CartDropdownMenuWrapper">
                <Box className="CartDropdownMenuHeader">
                    <Typography variant="titleLarge">There are <Link area-label="shopping-cart-link" to="/shopping-cart">{itemCountWithWord}</Link> in cart
                    </Typography>
                </Box>
                {isThereItems && <Divider />}
                {isThereItems && <Box className="CartDropdownMenuBody">
                    {(isThereItems) ?
                        cartItemsWithLivePrice?.slice(0,howManyProductToShow)?.map((item: { imageUrl: string | undefined; friendlypagename: string; productName: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; LivePriceDetails: { price: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }; }) => {
                            return (
                                <Stack className='ProductWrapper'>
                                    <Box className="ProductImagewrapper">
                                        <img src={item.imageUrl} alt="product-img" />
                                    </Box>
                                    <Box className="ProductInfowrapper">
                                        <Typography component='h3' className="ProductName" onClick={() => {
                                            navigate('/product-details/' + item?.friendlypagename)
                                        }}>{item?.productName}</Typography>
                                        <Typography variant='overline' className="ProductPrice">${item?.LivePriceDetails?.price}</Typography>
                                    </Box>
                                </Stack>
                            )
                        })
                        : null}
                </Box>}
                {isThereItems && <Divider />}
                {(cartItems && cartItems?.length > 0) ? <Stack className="CartDropdownMenuFooter">
                    <Button variant="outlined" size="medium" onClick={() => navigate("/shopping-cart")}>Go to cart</Button>
                    <Button variant="contained" size="medium" color="success" onClick={() => {
                        handleProccedToCheckout()
                    }}>Checkout</Button>
                </Stack> : null}
            </Box>
        </>)
}

export default React.memo(CartDropdownMenu)