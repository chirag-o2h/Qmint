import React from 'react'
import { Box, Typography, Stack, Button } from "@mui/material"
import { RightArrow } from '@/assets/icons'
import { useAppDispatch, useAppSelector, useToggle } from '@/hooks'
import { navigate } from 'gatsby'
import { resetSubTotal, setCartItemWarning, updateShoppingCartData, updateSubTotal } from '@/redux/reducers/shoppingCartReducer'
import { ENDPOINTS } from '@/utils/constants'
import { calculatePrice, checkThePopUpDetails, hasFulfilled, roundOfThePrice } from '@/utils/common'
import useShowToaster from '@/hooks/useShowToaster'
import { CartItemsWithLivePriceDetails } from './CartDetails'
import { IPopUpDetails } from '@/apis/services/ConfigServices'
import SessionExpiredDialog from '@/components/header/SessionExpiredDialog'
import { getPopUpDetailsAPI } from '@/redux/reducers/homepageReducer'

interface Props {
    cartItemsWithLivePrice: CartItemsWithLivePriceDetails[],
    quantities: { [key: number]: number }
}

// const CartOrderSummary = ({ isShoppingCartUpdated }: { isShoppingCartUpdated: boolean }) => {
const CartOrderSummary = ({ cartItemsWithLivePrice, quantities }: Props) => {
    const dispatch = useAppDispatch();
    const { showToaster } = useShowToaster();
    const shoppingCartItems = useAppSelector(state => state.shoppingCart);
    const { isLoggedIn, userDetails } = useAppSelector((state) => state.homePage)
    const [openSessionExpireDialog, toggleSessionExpireDialog] = useToggle(false)

    const handleProccedToCheckout = async (continueWithoutCheck = false) => {
        if (!continueWithoutCheck) {
            const paramsObj: IPopUpDetails = {
                'HRERYvCbB': isLoggedIn ? userDetails?.customerId! : 0,
                'kRNqk': 0,
                'KhgMNHTfVh9C': 'ProceedtoCheckout'
            }
            const res: boolean = await checkThePopUpDetails(paramsObj, toggleSessionExpireDialog, dispatch, getPopUpDetailsAPI)
            // console.log("🚀 ~ handleProccedToCheckout ~ res:", res)
            if (res) {
                return
            }
        }
        let subTotal = 0;
        let isAnyQuantityZero = false;
        const itemsWithQuantity = cartItemsWithLivePrice.map((item: CartItemsWithLivePriceDetails) => {
            subTotal += (calculatePrice(item?.LivePriceDetails,quantities[item.id]) * quantities[item.id]);
            if (quantities[item.id] === 0) {
                isAnyQuantityZero = true;
            }
            return {
                id: item.id,
                quantity: quantities[item.id]
            }
        })
        if (isAnyQuantityZero) {
            showToaster({ message: "Quantity cannot be zero", severity: 'error' })
            return;
        }
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

    return (
        <Box className="OrderSummaryDetailsWrapper">
            <Box className="OrderSummaryContent">
                <Typography variant="subtitle2" className='OrderSummaryTitle'>Order Summary </Typography>
                <Stack className='SubtotalWrapper'>
                    <Typography variant="subtitle1">Subtotal </Typography>
                    <Typography variant="body1" className='SubtotalValue'>${roundOfThePrice(shoppingCartItems.subTotal)}</Typography>
                </Stack>
                <Stack className='DeliveryWrapper'>
                    <Typography variant="subtitle1">Delivery </Typography>
                    <Typography variant="body1" className='DeliveryValue'>Calculated during checkout </Typography>
                </Stack>
                {/* <Box className="AddCouponWrapper">
                    <Button className='RightArrow' endIcon={<RightArrow />}> Add coupon or gift card</Button>
                </Box> */}
                <Stack className='TotalWrapper'>
                    <Typography variant="subtitle1">Total </Typography>
                    <Typography variant="subtitle1">Calculated during checkout </Typography>
                </Stack>
            </Box>
            <Button className='ProceedtoCheckoutBtn' size='large' variant="contained" onClick={() => { handleProccedToCheckout() }} disabled={shoppingCartItems.loading || shoppingCartItems.cartItems?.length === 0}>Proceed to Checkout</Button>
            {openSessionExpireDialog && <SessionExpiredDialog
                open={openSessionExpireDialog}
                onClose={toggleSessionExpireDialog}
                continueProcess={handleProccedToCheckout}
            />}
        </Box>
    )
}

export default CartOrderSummary