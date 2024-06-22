import { LeftArrow } from '@/assets/icons'
import { CartCard } from '@/components/common/Card'
import { useAppDispatch, useAppSelector } from '@/hooks'
import useApiRequest from '@/hooks/useAPIRequest'
import { CartItem } from '@/types/shoppingCart'
import { ENDPOINTS } from '@/utils/constants'
import { Box, Button, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { IproductPrice } from '../shop/Qmint/FeaturedProducts'
import { clearShoppingCart, deleteShoppingCartData, getShoppingCartData, resetCartItemWarning, resetSubTotal, setCartItemWarning, setLoadingFalse, setLoadingTrue, updateShoppingCartData, updateSubTotal } from '@/redux/reducers/shoppingCartReducer'
import { navigate } from 'gatsby'
import useDebounce from '@/hooks/useDebounce'
import { bodyForGetShoppingCartData, calculatePrice, hasFulfilled } from '@/utils/common'
import useShowToaster from '@/hooks/useShowToaster'

interface Props {
    cartItemsWithLivePrice: CartItemsWithLivePriceDetails[],
    setCartItemsWithLivePrice: React.Dispatch<React.SetStateAction<CartItemsWithLivePriceDetails[]>>,
    quantities: { [key: number]: number },
    setQuantities: React.Dispatch<React.SetStateAction<{
        [key: number]: number;
    }>>
}

export type CartItemsWithLivePriceDetails = CartItem & {
    LivePriceDetails: IproductPrice
}

const CartDetails = ({ cartItemsWithLivePrice, setCartItemsWithLivePrice, quantities, setQuantities }: Props) => {
    const loading = useAppSelector(state => state.shoppingCart.loading);
    const cartItems = useAppSelector(state => state.shoppingCart.cartItems);
    const [productIds, setProductIds] = useState({})
    const dispatch = useAppDispatch();
    const { showToaster } = useShowToaster();
    const { data: priceData, loading: priceLoading } = useApiRequest(ENDPOINTS.productPrices, 'post', productIds, 60);
    const changeInQuantities = useDebounce(quantities, 500)

    useEffect(() => {
        updateCartHandler(false)
    }, [changeInQuantities, cartItemsWithLivePrice])
    useEffect(() => {
        if (priceData?.data?.length > 0) {
            const idwithpriceObj: any = {}
            priceData?.data?.forEach((product: any) => idwithpriceObj[product?.productId] = product)

            let subTotal = 0;
            const cartItemsWithLivePrice = cartItems?.map((item: CartItem) => {
                subTotal += (idwithpriceObj?.[item.productId]?.price * item.quantity)
                return {
                    ...item,
                    LivePriceDetails: idwithpriceObj[item.productId]
                }
            })

            dispatch(updateSubTotal(subTotal))

            if (cartItemsWithLivePrice) {
                setCartItemsWithLivePrice(cartItemsWithLivePrice)
            }
        }
    }, [priceData,cartItems])

    useEffect(() => {
        if (cartItems?.length ?? 0 > 0) {
            const productIds = cartItems?.map((item: CartItem) => item.productId);
            setProductIds({ productIds })
        }

        let quantities: any = {}
        cartItems?.forEach((item: CartItem) => {
            quantities[item.id] = item.quantity
        })
        setQuantities(quantities)
    }, [cartItems])

    const increaseQuantity = (id: number) => {
        setQuantities(prevQuantities => ({ ...prevQuantities, [id]: prevQuantities[id] + 1 }));
    }

    const changesInQuantity = (event: any, id: number) => {
        setQuantities(prevQuantities => ({ ...prevQuantities, [id]: Number(event.target.value) }));
    }

    const decreaseQuantity = (id: number) => {
        setQuantities(prevQuantities => ({ ...prevQuantities, [id]: prevQuantities[id] - 1 }));
    }

    const removeItemFromCart = async (id: number) => {
        const response = await dispatch(deleteShoppingCartData({ url: ENDPOINTS.deleteShoppingCartData, body: [id] }) as any);

        if (hasFulfilled(response.type)) {
            dispatch(getShoppingCartData({ url: ENDPOINTS.getShoppingCartData, body: bodyForGetShoppingCartData }))
            setCartItemsWithLivePrice(() => cartItemsWithLivePrice.filter((item: CartItemsWithLivePriceDetails) => item.id !== id));
            showToaster({ message: response?.payload?.data?.message, severity: 'success' })
        }
        else {
            showToaster({ message: "Remove item failed", severity: 'error' })
        }
    }

    const updateCartHandler = async (isapiCallNeeded?: boolean) => {
        let subTotal = 0;
        let isAnyQuantityZero = false;
        const itemsWithQuantity = cartItemsWithLivePrice.map((item: CartItemsWithLivePriceDetails) => {
            subTotal += (calculatePrice(item?.LivePriceDetails, quantities[item.id]) * quantities[item.id]);
            if (quantities[item.id] === 0) {
                isAnyQuantityZero = true;
            }
            return {
                id: item.id,
                quantity: quantities[item.id]
            }
        })
        dispatch(resetSubTotal());
        dispatch(updateSubTotal(subTotal))

        if (isapiCallNeeded) {
            if (isAnyQuantityZero) {
                showToaster({ message: "Quantity cannot be zero", severity: 'error' })
                return;
            }
            const response = await dispatch(updateShoppingCartData({ url: ENDPOINTS.updateShoppingCartData, body: itemsWithQuantity }) as any);

            // NOTE :- Proper response is not coming from backend to show the right toaster so bottom can be a bug for showing right toaster message
            if (hasFulfilled(response.type)) {
                if (!response?.payload?.data?.data || response?.payload?.data?.data?.length === 0) {
                    dispatch(resetCartItemWarning({ quantities }))
                    showToaster({ message: "Cart updated", severity: 'success' })
                }
                else {
                    dispatch(setCartItemWarning({ warnings: response?.payload?.data?.data, quantities }));
                    showToaster({ message: "Some items have warnings", severity: 'warning' })
                }
            }
            else {
                showToaster({ message: "Update cart failed", severity: 'error' })
            }
        }
    }

    const clearCartHandler = async () => {
        const ids: number[] = [];
        for (const id in quantities) {
            ids.push(Number(id));
        }
        const reponse = await dispatch(deleteShoppingCartData({ url: ENDPOINTS.deleteShoppingCartData, body: ids }) as any)
        if (hasFulfilled(reponse.type)) {
            dispatch(clearShoppingCart());
            showToaster({ message: reponse?.payload?.data?.message, severity: 'success' })
        }
        else {
            showToaster({ message: "Clear cart failed", severity: 'error' })
        }
    }

    return (
        <Box className="ShoppingCartDetails">
            <Box className="ShoppingProductsDetailsWrapper">
                {!loading && cartItems && cartItems?.length === 0 && <Typography variant="body1" style={{ textAlign: "center" }}>No items in the cart</Typography>}
                {cartItemsWithLivePrice?.length > 0 && cartItemsWithLivePrice?.map((cartItem) => {
                    return (
                        <CartCard key={cartItem.productId} cartItem={cartItem} hideDeliveryMethod={true} quantity={quantities[cartItem.id]} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeItem={removeItemFromCart} idForQuantity={cartItem.id} changesInQuantity={changesInQuantity} />
                    )
                })}
                {cartItemsWithLivePrice?.length > 0 && <Typography variant="body1"><Typography component="span" className="Note">Note:</Typography> Prices are live prices and will be locked on confirm order. </Typography>}
            </Box>
            <Stack className="BottomCartActionsWrapper">
                <Button className='LeftArrow' startIcon={<LeftArrow />} color='secondary' onClick={() => navigate("/category/shop")} disabled={loading}> Continue Shopping</Button>
                <Stack className='ClearUpdateCartWrapper'>
                    <Button className="ClearShoppingCart" color='secondary' onClick={clearCartHandler} disabled={loading || cartItemsWithLivePrice.length === 0}>Clear Shopping Cart</Button>
                    <Button className='UpdateCartBtn' size='large' variant="contained" onClick={() => updateCartHandler(true)} disabled={loading || cartItemsWithLivePrice.length === 0}>Update Shopping Cart</Button>
                </Stack>
            </Stack>
        </Box>
    )
}

export default React.memo(CartDetails);