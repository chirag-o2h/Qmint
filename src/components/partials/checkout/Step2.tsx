import React, { useEffect, useMemo, useState } from "react"
import { useMediaQuery, Box, Checkbox, FormControlLabel, IconButton, MenuItem, Select, Stack, Typography } from "@mui/material"

// Type
import type { SelectChangeEvent, Theme } from "@mui/material"

// Componenets
import StepWrapper from "./StepWrapper"
import { CartCard } from "@/components/common/Card"
import { InfoIcon, SelectDropdown } from "@/assets/icons"
import { HoverTooltip } from "@/components/common/CustomTooltip"
import { productImages } from "@/utils/data"
import { useAppDispatch, useAppSelector, useToggle } from "@/hooks"
import { resetSubTotalCheckoutPage, shopingCartItem, updateFinalDataForTheCheckout, updateSubTotalCheckoutPage } from "@/redux/reducers/checkoutReducer"
import { ENDPOINTS } from "@/utils/constants"
import useApiRequest from "@/hooks/useAPIRequest"
import { CartItemsWithLivePriceDetails } from "../shopping-cart/CartDetails"
import useDebounce from "@/hooks/useDebounce"
import { deleteShoppingCartData, getShoppingCartData } from "@/redux/reducers/shoppingCartReducer"
import { bodyForGetShoppingCartData, calculatePrice, getDefaultOption, hasFulfilled } from "@/utils/common"
import useShowToaster from "@/hooks/useShowToaster"

function Step2() {
  const dispatch = useAppDispatch()
  const isSmallScreen: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
  const { configDetails: configDetailsState } = useAppSelector((state) => state.homePage)
  const { checkoutPageData, finalDataForTheCheckout } = useAppSelector((state) => state.checkoutPage)

  const enabledPaymentMethods = useMemo(() => {
    const defaultPaymentType = getDefaultOption([
      { enabled: configDetailsState?.Checkout_DeliveryMethod_SecureShipping_Enable?.value, value: 'SecureShipping' },
      { enabled: configDetailsState?.Checkout_DeliveryMethod_Localpickup_Enable?.value, value: 'LocalShipping' },
      { enabled: configDetailsState?.Checkout_DeliveryMethod_VaultStorage_Enable?.value, value: 'VaultStorage' }
    ], 'SecureShipping');
    return defaultPaymentType
  }, [configDetailsState]);

  const [deliveryMethod, setDeliveryMethod] = useState<'LocalShipping' | 'VaultStorage' | 'SecureShipping'>(enabledPaymentMethods)
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({})
  const [deliveryMethods, setDeliveryMethods] = useState<{ [key: number]: string }>({})
  const [productIds, setProductIds] = useState({})
  const { data: priceData, loading: priceLoading } = useApiRequest(ENDPOINTS.productPrices, 'post', productIds, 60);
  const [cartItemsWithLivePrice, setCartItemsWithLivePrice] = useState<CartItemsWithLivePriceDetails[]>([]);
  const changeInQuantities = useDebounce(quantities, 500)
  const [changeDiffrenceDeliveryMethods, toggleChangeDiffrenceDeliveryMethods] = useToggle(false)
  const { showToaster } = useShowToaster();

  // useEffect(() => {
  //   if (priceData?.data?.length > 0) {
  //     const idwithpriceObj: any = {}
  //     priceData?.data?.forEach((product: any) => idwithpriceObj[product?.productId] = product)

  //     let subTotal = 0;
  //     const cartItemsWithLivePrice = checkoutPageData?.shoppingCartItems.map((item: shopingCartItem) => {
  //       subTotal += (idwithpriceObj?.[item.productId]?.price * item.quantity)
  //       return {
  //         ...item,
  //         LivePriceDetails: idwithpriceObj[item.productId]
  //       }
  //     })
  //     dispatch(resetSubTotalCheckoutPage())
  //     dispatch(updateSubTotalCheckoutPage(subTotal))

  //     setCartItemsWithLivePrice(cartItemsWithLivePrice!)
  //   }
  // }, [priceData, checkoutPageData?.shoppingCartItems])
  useEffect(() => {
    const idwithpriceObj: any = {}

    if (priceData?.data?.length > 0) {
      priceData?.data?.forEach((product: any) => idwithpriceObj[product?.productId] = product)
      const cartItemsWithLivePricez = checkoutPageData?.shoppingCartItems.map((item: shopingCartItem) => {
        return {
          ...item,
          LivePriceDetails: idwithpriceObj[item.productId]
        }
      })
      setCartItemsWithLivePrice(cartItemsWithLivePricez!)
    }
  }, [priceData, checkoutPageData?.shoppingCartItems])

  useEffect(() => {
    let subTotal = 0;
    const idwithpriceObj: any = {}
    if (priceData?.data?.length > 0) {
      priceData?.data?.forEach((product: any) => idwithpriceObj[product?.productId] = product)
    }
    if (cartItemsWithLivePrice?.length > 0) {
      cartItemsWithLivePrice?.map((item: shopingCartItem) => {
        subTotal += (calculatePrice(idwithpriceObj?.[item.productId],changeInQuantities[item.productId]) * changeInQuantities[item.productId])
      })
      dispatch(resetSubTotalCheckoutPage())
      dispatch(updateSubTotalCheckoutPage(subTotal))
    }
    if (cartItemsWithLivePrice?.length === 0) {
      let subTotal = 0;
      dispatch(resetSubTotalCheckoutPage())
      dispatch(updateSubTotalCheckoutPage(subTotal))
    }
  }, [cartItemsWithLivePrice, priceData, changeInQuantities])
  // ===============
  useEffect(() => {
    if (checkoutPageData?.shoppingCartItems?.length! > 0) {
      const productIds = checkoutPageData?.shoppingCartItems.map((item: shopingCartItem) => item.productId);
      setProductIds({ productIds })
    }

    let deliveryMethods: any = {}
    checkoutPageData?.shoppingCartItems?.forEach((item: shopingCartItem) => {
      deliveryMethods[item.productId] = deliveryMethod
    })
    setDeliveryMethods(deliveryMethods)
    dispatch(updateFinalDataForTheCheckout({ deliveryMethodsWithProductId: deliveryMethods, IsDifferentShippingMethod: changeDiffrenceDeliveryMethods }))
  }, [checkoutPageData?.shoppingCartItems, changeDiffrenceDeliveryMethods, deliveryMethod])

  useEffect(() => {
    let quantities: any = {}
    checkoutPageData?.shoppingCartItems?.forEach((item: shopingCartItem) => {
      quantities[item.productId] = item.quantity
    })
    setQuantities(quantities)
    dispatch(updateFinalDataForTheCheckout({ quantitiesWithProductId: quantities }))
  }, [checkoutPageData?.shoppingCartItems])
  // =============================
  useEffect(() => {
    dispatch(updateFinalDataForTheCheckout({ cartItemsWithLivePrice }))
  }, [cartItemsWithLivePrice])

  const handleDeliveryMethod = (event: SelectChangeEvent) => {
    setDeliveryMethod(event.target.value as any);
    const makeObject: any = { parentDeliveryMethod: event.target.value }
    let deliveryMethods: any = {}
    // if (changeDiffrenceDeliveryMethods) {
    checkoutPageData?.shoppingCartItems?.forEach((item: shopingCartItem) => {
      deliveryMethods[item.productId] = event.target.value
    })
    makeObject['deliveryMethodsWithProductId'] = deliveryMethods
    dispatch(updateFinalDataForTheCheckout({ ...makeObject, parentDeliveryMethod: event.target.value }))
  }

  const changesInQuantity = (event: any, productId: number) => {
    const productIdOfId = cartItemsWithLivePrice.find((item) => item.id === productId)
    const updatedQuantities = { ...quantities, [productIdOfId?.productId ?? productId]: Number(event?.target.value) }
    setQuantities(updatedQuantities)
    dispatch(updateFinalDataForTheCheckout({ quantitiesWithProductId: updatedQuantities }))
  }

  const increaseQuantity = (productId: number) => {
    const productIdOfId = cartItemsWithLivePrice.find((item) => item.id === productId)
    const updatedQuantities = { ...quantities, [productIdOfId?.productId ?? productId]: quantities[productIdOfId?.productId ?? productId] + 1 }
    setQuantities(updatedQuantities)
    dispatch(updateFinalDataForTheCheckout({ quantitiesWithProductId: updatedQuantities }))
  }

  const decreaseQuantity = (productId: number) => {
    const productIdOfId = cartItemsWithLivePrice.find((item) => item.id === productId)

    const updatedQuantities = { ...quantities, [productIdOfId?.productId ?? productId]: quantities[productIdOfId?.productId ?? productId] - 1 }
    setQuantities(updatedQuantities)
    dispatch(updateFinalDataForTheCheckout({ quantitiesWithProductId: updatedQuantities }))
  }

  const removeItemFromCart = async (productId: number) => {
    let ids: any[] = [];
    const updatedCartItem = cartItemsWithLivePrice.filter((item: CartItemsWithLivePriceDetails) => {
      if (item.id == productId) {
        ids.push(productId)
      }
      return (item.id !== productId)
    })
    let response;
    if (ids.length) {
      response = await dispatch(deleteShoppingCartData({ url: ENDPOINTS.deleteShoppingCartData, body: ids }) as any);
    }
    if (hasFulfilled(response.type)) {
      dispatch(getShoppingCartData({ url: ENDPOINTS.getShoppingCartData, body: bodyForGetShoppingCartData }))
      setCartItemsWithLivePrice(updatedCartItem);
      dispatch(updateFinalDataForTheCheckout({ cartItemsWithLivePrice: updatedCartItem }))
      showToaster({ message: response?.payload?.data?.message, severity: 'success' })
    } else {
      showToaster({ message: "Remove item failed", severity: 'error' })
    }
  }

  const changeDeliveryMethodOfProduct = (productId: number, method: any) => {
    const updatedDeliverymethod = { ...deliveryMethods, [productId]: method }
    setDeliveryMethods(updatedDeliverymethod)
    dispatch(updateFinalDataForTheCheckout({ deliveryMethodsWithProductId: updatedDeliverymethod }))
  }
  useEffect(() => {
    dispatch(updateFinalDataForTheCheckout({ parentDeliveryMethod: deliveryMethod }))
  }, [deliveryMethod])
  return (
    <StepWrapper title="Step 2" className="Step2">
      <Box className="StepHeader">
        <Stack
          className="HeaderWrapper"
          sx={cartItemsWithLivePrice?.length > 1 ? {} : { mb: 1 }}
        >
          <Typography className="Title" variant="subtitle1">
            Delivery Method
            <HoverTooltip
              placement={isSmallScreen ? "top" : "right"}
              renderComponent={<IconButton className="InfoButton"><InfoIcon /></IconButton>}
              infoTooltip
              arrow
            >
              {configDetailsState?.["Checkout_DeliveryInfoText"]?.value}
            </HoverTooltip>
          </Typography>
          <Select
            color="secondary"
            className="DeliveryMethodSelect"
            value={deliveryMethod}
            onChange={handleDeliveryMethod}
            IconComponent={SelectDropdown}
          >
            {configDetailsState?.Checkout_DeliveryMethod_Localpickup_Enable?.value && <MenuItem value="LocalShipping">Local Pickup</MenuItem>}
            {configDetailsState?.Checkout_DeliveryMethod_SecureShipping_Enable?.value && <MenuItem value="SecureShipping">Secure Shipping</MenuItem>}
            {configDetailsState?.Checkout_DeliveryMethod_VaultStorage_Enable?.value && <MenuItem value="VaultStorage">Vault Storage</MenuItem>}
          </Select>
        </Stack>
        {cartItemsWithLivePrice?.length > 1 && <FormControlLabel
          className="DeliveryCheckbox"
          control={<Checkbox checked={changeDiffrenceDeliveryMethods} onClick={() => {
            toggleChangeDiffrenceDeliveryMethods()
          }} />}
          label="Select different delivery method per product"
        />}
      </Box>
      <Stack className="ProductList">
        {cartItemsWithLivePrice?.length > 0 && cartItemsWithLivePrice?.map((cartItem) => {
          return (
            <CartCard changeDeliveryMethodOfProduct={changeDeliveryMethodOfProduct} isDifferentMethod={changeDiffrenceDeliveryMethods} deliveryMethodOfParent={deliveryMethod} key={cartItem.productId} cartItem={cartItem} hideDeliveryMethod={false} quantity={quantities[cartItem.productId]} deliverMethod={deliveryMethods[cartItem.productId]} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeItem={removeItemFromCart} changesInQuantity={changesInQuantity} idForQuantity={cartItem.productId} />
          )
        })}
      </Stack>
      <Typography className="StepNote">
        {/* <Typography variant="titleLarge">Note:</Typography> */}
        {configDetailsState?.["Checkout_PriceLocking_Text"]?.value}</Typography>
    </StepWrapper>
  )
}

export default Step2