import React, { useCallback, useDeferredValue, useEffect, useMemo, useState } from "react"
import { Typography, Button, Divider, Stack, Box } from "@mui/material"

// Hooks
import { useAppDispatch, useAppSelector, useToggle } from "@/hooks"

// Componenets
import StepWrapper from "./StepWrapper"

// Data
import { productImages } from "@/utils/data"
import { CartCardAbstract } from "@/components/common/Card"
import { OutlinedCheckIcon } from "@/assets/icons"
import OTPConfirmation from "./OTPConfirmation"
import { calculatePrice, checkThePopUpDetails, hasFulfilled, paymentMethodType, roundOfThePrice, shipmentNameEnum, shipmentTypeToEnum } from "@/utils/common"
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { checkValidationOnConfirmOrder, disableOTP, getCraditCardCharges, getInsuranceAndTaxDetailsCalculation, placeOrder, setCheckoutItemWarning } from "@/redux/reducers/checkoutReducer"
import { ENDPOINTS } from "@/utils/constants"
import useDeviceDetails from "@/hooks/useDeviceDetails"
import { navigate } from "gatsby"
import { setCartItemWarning, updateShoppingCartData } from "@/redux/reducers/shoppingCartReducer"
import useShowToaster from "@/hooks/useShowToaster"
import { IPopUpDetails } from "@/apis/services/ConfigServices"
import { getPopUpDetailsAPI } from "@/redux/reducers/homepageReducer"
import SessionExpiredDialog from "@/components/header/SessionExpiredDialog"

export interface PlaceOrderBody {
  OrderCustomerID: number;
  BillingAddressId: number;
  ShippingAddressId: number;
  OrderItems: OrderItem[];
  PaymentMethod: number;
  ShippingMethod: number;
  IsDifferentShippingMethod: boolean;
  IsUsedRewardPoints: boolean;
  AgentId: string | null;
  Location: string;
  Device: string;
  Browser: string;
  IsInstantBuy: boolean;
}

interface OrderItem {
  ShoppingCartId: number;
  ProductId: number;
  ParentProductId: number;
  Quantity: number;
  ShippingMethod: number;
}


interface Product {
  productId: number;
  qty: number;
  price: number;
  shippingMethod: number;
  LivePriceDetails?: any;
}

// enum PaymentMethod{
//   CreditCard = 3,
//   BankTransfer = 2,
//   Cash = 1
// }

const paymentMethodEnum: { [key: string]: number } = {
  "CreditCard": 3,
  "BankTransfer": 2,
  "Cash": 1
}

interface Body {
  products: Product[];
  Postcode: string;
  CountryId: number;
}

function OrderSummary() {
  const dispatch = useAppDispatch()
  const { showToaster } = useShowToaster();
  const { deviceInfo, locationInfo }: any = useDeviceDetails()
  const { finalDataForTheCheckout, subTotal, insuranceAndTaxCalculation, craditCardCharges, isOTPEnabled, loading, orderId, message } = useAppSelector((state) => state.checkoutPage)
  const { isLoggedIn, userDetails } = useAppSelector((state) => state.homePage)
  const [body, setBody] = useState<Body | null>(null)
  const [totalValueNeedToPayFromCraditCart, setTotalValueNeedToPayFromCraditCart] = useState<any>({ OrderTotal: 0 })
  const [openOTPConfirmation, toggleOTPConfirmation] = useToggle(false)
  const [openSessionExpireDialog, toggleSessionExpireDialog] = useToggle(false)
  const localAgentDetails = useAppSelector(state => state.checkoutPage.localAgentDetails);

  const needtocalltheTaxDetailscalculation = useMemo(() => {
    return (body?.products?.length ? body?.products?.length > 0 : false)
  }, [body])
  useAPIoneTime({ service: getInsuranceAndTaxDetailsCalculation, endPoint: ENDPOINTS.calculateInsuranceAndTaxDetails, body, conditionalCall: needtocalltheTaxDetailscalculation })
  useEffect(() => {
    setBody({
      Postcode: finalDataForTheCheckout?.shippingAddress?.postcode?.toString(),
      CountryId: finalDataForTheCheckout?.shippingAddress?.country,
      products: finalDataForTheCheckout?.cartItemsWithLivePrice?.map((item: Product) => {
        return ({
          productId: item.productId,
          qty: finalDataForTheCheckout?.quantitiesWithProductId?.[item?.productId],
          price: calculatePrice(item?.LivePriceDetails, finalDataForTheCheckout?.quantitiesWithProductId?.[item?.productId]),
          shippingMethod: shipmentTypeToEnum[finalDataForTheCheckout?.deliveryMethodsWithProductId?.[item?.productId]]
        })
      })
    })
  }, [finalDataForTheCheckout])
  const subTotalDiffer = useDeferredValue(subTotal)
  const finalDataForTheCheckoutDiffer = useDeferredValue(finalDataForTheCheckout)
  const insuranceAndTaxCalculationDiffer = useDeferredValue(insuranceAndTaxCalculation)

  const orderTotal = useMemo(() => {
    const orderTotal = Number(insuranceAndTaxCalculationDiffer?.secureShippingFeeIncludingTax) + Number(insuranceAndTaxCalculationDiffer?.vaultStorageFee) + Number(subTotalDiffer)
    return orderTotal
  }, [subTotalDiffer, insuranceAndTaxCalculationDiffer, finalDataForTheCheckoutDiffer])
  useEffect(() => {
    // if (finalDataForTheCheckout?.paymentType === "CreditCard") {
    if (orderTotal && (orderTotal !== null)) {
      let timeoutid: any;
      timeoutid = setTimeout(() => {
        dispatch(getCraditCardCharges({
          url: ENDPOINTS.calculateCraditCardCharges, body: {
            "OrderTotal": orderTotal
          }
        }))
      }, 1000);
      return () => {
        timeoutid && clearTimeout(timeoutid)
      }
    }
    // }
  }, [orderTotal])

  const searchParams = new URLSearchParams(window.location.search);
  const placeOrderFun = useCallback(async () => {
      // call place order API
      const prepareBodyData: PlaceOrderBody = {
        "OrderCustomerID": finalDataForTheCheckout?.userAccount?.customerId,
        "BillingAddressId": finalDataForTheCheckout?.billingAddress?.addressId,
        "ShippingAddressId": finalDataForTheCheckout?.shippingAddress?.addressId,
        "OrderItems": finalDataForTheCheckout?.cartItemsWithLivePrice?.map((item: any) => {
          return ({
            "ShoppingCartId": item.id,
            "ProductId": item.productId,
            "ParentProductId": item?.parentProductId,
            "Quantity": finalDataForTheCheckout?.quantitiesWithProductId[item.productId],
            "ShippingMethod": shipmentTypeToEnum[finalDataForTheCheckout?.deliveryMethodsWithProductId[item.productId]]
          })
        }),
        "PaymentMethod": paymentMethodEnum[finalDataForTheCheckout?.paymentType],
        "ShippingMethod": shipmentTypeToEnum[finalDataForTheCheckout?.parentDeliveryMethod || 'SecureShipping'],
        "IsDifferentShippingMethod": finalDataForTheCheckout?.IsDifferentShippingMethod,
        "IsUsedRewardPoints": false,
        "AgentId": localAgentDetails?.agentId ?? null,
        "Location": 'lat' + locationInfo?.latitude + ',' + 'long' + locationInfo?.longitude,
        "Device": deviceInfo?.platform!,
        "Browser": deviceInfo?.userAgent,
        "IsInstantBuy": searchParams.has("isInstantBuy") && searchParams.get("isInstantBuy") ? true : false
      }
      const data = await dispatch(placeOrder({ url: ENDPOINTS.placeOrder, body: prepareBodyData }) as any);
      if (hasFulfilled(data?.type)) {
        const id = data?.payload?.data?.data
        navigate(`/order-confirmation/?orderNo=${id}`)
      }
    }, [finalDataForTheCheckout, deviceInfo, locationInfo,localAgentDetails])

  useEffect(() => {
    if (isOTPEnabled || message) {
      toggleOTPConfirmation()
    }
    else if (isOTPEnabled === false) {
      placeOrderFun();
      dispatch(disableOTP())
    }
  }, [isOTPEnabled, message])

  useEffect(() => {
    if (!openOTPConfirmation) {
      dispatch(disableOTP())
    }
  }, [openOTPConfirmation])
  const renderPricingItem = (title: string, value: string) => {
    return (
      <Stack className="PricingItem">
        <Typography variant="titleLarge">{title}</Typography>
        <Typography>{value}</Typography>
      </Stack>
    )
  }

  const onConfirmOrderHandler = async (continueWithoutCheck?: boolean) => {
    continueWithoutCheck = continueWithoutCheck === undefined ? false : continueWithoutCheck;
    if (!continueWithoutCheck) {
      const paramsObj: IPopUpDetails = {
        'HRERYvCbB': isLoggedIn ? userDetails?.customerId! : 0,
        'kRNqk': 0,
        'KhgMNHTfVh9C': 'ProceedtoCheckout'
      }
      const res: boolean = await checkThePopUpDetails(paramsObj, toggleSessionExpireDialog, dispatch, getPopUpDetailsAPI)
      if (res) {
        return
      }
    }
    let isAnyQuantityZero = false;
    const itemsWithQuantity = finalDataForTheCheckout?.cartItemsWithLivePrice?.map((item: any) => {
      // console.log("Qmint", finalDataForTheCheckout?.quantitiesWithProductId[item.productId])
      if (finalDataForTheCheckout?.quantitiesWithProductId[item.productId] === 0) {
        isAnyQuantityZero = true;
      }
      return ({
        id: item.id,
        quantity: finalDataForTheCheckout?.quantitiesWithProductId[item.productId]
      })
    })
    if (isAnyQuantityZero) {
      showToaster({ message: "Quantity cannot be zero", severity: 'error' })
      return;
    }

    const response = await dispatch(updateShoppingCartData({ url: ENDPOINTS.updateShoppingCartData, body: itemsWithQuantity }) as any);

    if (hasFulfilled(response.type)) {
      if (!response?.payload?.data?.data || response?.payload?.data?.data?.length === 0) {
        // showToaster({ message: "Cart updated", severity: 'success' })
        await dispatch(checkValidationOnConfirmOrder({
          url: ENDPOINTS.checkValidationOnConfirmOrder, body: {
            PaymentMethodEnum: paymentMethodEnum[finalDataForTheCheckout?.paymentType],
            OrderTotal: Number(insuranceAndTaxCalculation?.secureShippingFeeIncludingTax) + Number(subTotal) + Number(insuranceAndTaxCalculation?.vaultStorageFeeIncludingTax),
            // static todo
            IsRewardPointUsed: false,
            UsedRewardPoints: 0,
            UsedRewardPointAmount: 0.00
          }
        }))
      }
      else {
        dispatch(setCheckoutItemWarning({ warnings: response?.payload?.data?.data, quantities: finalDataForTheCheckout?.quantitiesWithProductId }));
        showToaster({ message: "Cannot Place order as Some items have warnings", severity: 'warning' })
      }
    }
    else {
      showToaster({ message: "Update cart failed", severity: 'error' })
    }
  }

  return (
    <StepWrapper title="Order Summary" className="OrderSummary">
      <Box className="ProductList">
        {finalDataForTheCheckout?.cartItemsWithLivePrice?.length > 0 && finalDataForTheCheckout?.cartItemsWithLivePrice?.map((product: any) => {
          return (
            <CartCardAbstract product={product} quantity={finalDataForTheCheckout?.quantitiesWithProductId?.[product?.productId]} deliveryMethod={shipmentNameEnum[finalDataForTheCheckout?.deliveryMethodsWithProductId?.[product?.productId]] ?? finalDataForTheCheckout?.deliveryMethodsWithProductId?.[product?.productId]} />
          )
        })}
      </Box>
      <Box className="PricingDetails">
        {renderPricingItem("Subtotal", '$' + roundOfThePrice(subTotal as any) as any)}
        <Divider />
        {renderPricingItem("Secure Shipping", `$${roundOfThePrice(Number(insuranceAndTaxCalculation?.secureShippingFeeIncludingTax))}`)}
        {renderPricingItem("Vault storage", `$${roundOfThePrice(Number(insuranceAndTaxCalculation?.vaultStorageFeeIncludingTax))}`)}
        <Divider />
        {finalDataForTheCheckout?.paymentType === 'CreditCard' && renderPricingItem("Credit Card Fees", `$${roundOfThePrice(Number(craditCardCharges?.creditCardFeeIncludingTax))}`)}
        {finalDataForTheCheckout?.paymentType === 'CreditCard' && < Divider />}
        {renderPricingItem("GST Included", `$${roundOfThePrice(Number(craditCardCharges?.creditCardTax) + Number(insuranceAndTaxCalculation?.secureShippingTax) + Number(insuranceAndTaxCalculation?.vaultStorageTax) + Number(finalDataForTheCheckout?.cartItemsWithLivePrice?.length > 0 ? finalDataForTheCheckout?.cartItemsWithLivePrice?.reduce((total: number, product: {
          LivePriceDetails: { taxPrice: number }
        }) => total + product?.LivePriceDetails?.taxPrice, 0) : 0))}`)}
        <Stack className="PricingItem TotalItem">
          <Typography variant="subtitle1">Total</Typography>
          <Typography variant="subtitle1">${roundOfThePrice(Number(insuranceAndTaxCalculation?.secureShippingFeeIncludingTax) + Number(subTotal) + Number(insuranceAndTaxCalculation?.vaultStorageFeeIncludingTax) + (finalDataForTheCheckout?.paymentType === 'CreditCard' ? Number(craditCardCharges?.creditCardFeeIncludingTax) : 0))}</Typography>
        </Stack>
        <Stack className="PaymentMethod">
          <OutlinedCheckIcon color="primary" />
          <Typography className="Message" variant="titleLarge" component="p">Payment Method: <Typography variant="inherit" component="span">{paymentMethodType[finalDataForTheCheckout?.paymentType] ?? finalDataForTheCheckout?.paymentType}</Typography></Typography>
        </Stack>
        <Divider className="ActionDivider" />
        <Stack className="ActionWrapper">
          <Button color="secondary" onClick={() => navigate("/")}>Continue Shopping</Button>
          {/* <Button variant="contained" onClick={toggleOTPConfirmation} disabled={!finalDataForTheCheckout?.termAndServiceIsRead}>Confirm Order</Button> */}
          <Button variant="contained" onClick={() => { onConfirmOrderHandler() }} disabled={!finalDataForTheCheckout?.termAndServiceIsRead || loading || finalDataForTheCheckout?.cartItemsWithLivePrice?.length < 1}>Confirm Order</Button>
        </Stack>
      </Box>
      {openOTPConfirmation && <OTPConfirmation open={openOTPConfirmation} onClose={toggleOTPConfirmation} message={message} placeOrderFun={placeOrderFun} />}
      {openSessionExpireDialog && <SessionExpiredDialog
        open={openSessionExpireDialog}
        onClose={toggleSessionExpireDialog}
        continueProcess={onConfirmOrderHandler}
      />}
    </StepWrapper>
  )
}

export default OrderSummary