import { createSlice } from '@reduxjs/toolkit'

// Types
import { appCreateAsyncThunk } from '../middleware/thunkMiddleware'
import CheckoutPageServices from '@/apis/services/checkoutCartServices'
import { any } from 'prop-types'
import { isBrowser, localStorageGetItem, localStorageSetItem } from '@/utils/common'
import { navigate } from 'gatsby'
import { AddressType } from '@/types/enums'
import { CartItem } from '@/types/shoppingCart'

export type customerDetails = {
    "customerId": number,
    "email": string,
    "firstName": string,
    "lastName": string,
    "phoneNumber": string,
    "accounttype": string,
    "accountName": string,
    "masterCustomerId": any,
    "membershipid": number,
    "membershipName": any
}
export type shopingCartItem = {
    "id": number,
    "shoppingCartTypeId": number,
    "customerId": number,
    "productId": number,
    "storeCode": number,
    "quantity": number,
    "productName": string,
    "shortDescription": string,
    "friendlypagename": string,
    "imageUrl": string,
    "productPrice": number,
    "premiumDiscount": number,
    "productWeight": number,
    "parentProductId": number,
    "colorClass": string,
    "iconClass": string,
    "availability": string,
    "shippingInfo": string,
    "stock": number,
    "shippingMethod": any[],
    "shippableCountrys": any[]
}
export interface Fees {
    insuranceFee: number;
    shippingFee: number;
    secureShippingFee: number;
    secureShippingTax: number;
    secureShippingFeeIncludingTax: number;
    vaultStorageFee: number;
    vaultStorageTax: number;
    vaultStorageFeeIncludingTax: number;
    insuranceMessage: string | null;
    shippingMessage: string | null;
    storageMessage: string | null;
}

export interface StateOrCountry {
    id: number,
    name: string,
    enumValue: number,
    type: any,
    colorCode: any,
    seqNo: number,
    extraProperty: any
}

interface AddressDetail {
    "addressId": number,
    "addressType": number,
    "customerId": number,
    "firstName": string,
    "lastName": string,
    "addressLine1": string,
    "addressLine2": string,
    "city": string,
    "state": number,
    "postcode": number,
    "country": number,
    "phone1": string,
    "email": string,
    "isSource": string,
    "isVerified": boolean,
    "company": null,
    "isactive": boolean,
    "storeCode": number,
    "stateName": string,
    "countryName": string
}
interface CreditCardCharges {
    creditCardFee: number;
    creditCardTax: number;
    creditCardFeeIncludingTax: number;
}

interface IAgentDetails {
    id: number;
    name: string;
    agentId: string;
    email: string;
    phoneNumber: string;
    address1: string;
    address2: string;
    city: string;
    country: string;
    state: string;
    zipcode: number;
}
interface CheckoutPageState {
    loading: boolean,
    checkoutPageData: {
        "customers": customerDetails[],
        "billingAddressDetails": AddressDetail[],
        "shippingAddressDetails": AddressDetail[],
        "shoppingCartItems": shopingCartItem[],
        "termsConditions": {
            "name": string,
            "value": string
        },
        "storeDetail": {
            "storeCode": number,
            "logoUrl": any,
            "companyName": string,
            "storeCodeName": string,
            "isKiosk": boolean,
            "isActive": boolean,
            "currency": string,
            "isBankTransfer": boolean,
            "isCash": boolean,
            "isCreditCard": boolean,
            "isLocalPickup": boolean,
            "isSecureShipping": boolean,
            "isVaultStorage": boolean,
            "shippingTax": number,
            "vaultstorageTax": number,
            "creadatcardTax": number
        },
        "rewardPointAvaibility": {
            "isApplicableToUseRewardPoints": boolean,
            "availableRewardPoints": number,
            "rewardPointAmount": number
        },
        "customerId": number,
        "termsConditionsOverview": any,
        "termsConditionsTital": any,
        "termsConditionsbody": any,
    } | null,
    subTotal: number,
    isApiCalled: boolean | null,
    finalDataForTheCheckout: any,
    insuranceAndTaxCalculation: Fees | null,
    craditCardCharges: CreditCardCharges | null,
    isOTPEnabled: boolean | null,
    isOTPSent: boolean | null,
    isOTPVerified: boolean | null,
    orderId: number | null,
    stateList: StateOrCountry[],
    countryList: StateOrCountry[]
    message: string | null
    otpverfiedMessage: string | null
    localAgentDetails: IAgentDetails | null
}
const initialState: CheckoutPageState = {
    loading: false,
    isOTPEnabled: null,
    isOTPSent: null,
    isOTPVerified: null,
    isApiCalled: null,
    checkoutPageData: null,
    subTotal: 0,
    finalDataForTheCheckout: {},
    insuranceAndTaxCalculation: null,
    craditCardCharges: null,
    orderId: null,
    stateList: [],
    countryList: [],
    message: null,
    otpverfiedMessage: null,
    localAgentDetails: null
}

export const getCheckoutPageData = appCreateAsyncThunk(
    'getCheckoutPageData',
    async ({ url, params }: { url: string, params: any }) => {
        return await CheckoutPageServices.getCheckoutPageData(url, params)
    }
)

export const getInsuranceAndTaxDetailsCalculation = appCreateAsyncThunk(
    'getInsuranceAndTaxDetailsCalculation',
    async ({ url, body }: { url: string, body: any }) => {
        if (url && Object.keys(body).length) {
            return await CheckoutPageServices.getInsuranceAndTaxInfo(url, body)
        }
    }
)
export const getCraditCardCharges = appCreateAsyncThunk(
    'getCraditCardCharges',
    async ({ url, body }: { url: string, body: any }) => {
        return await CheckoutPageServices.getCraditCardChargesValue(url, body)
    }
)
export const addOrEditAddress = appCreateAsyncThunk(
    "addOrEditAddress",
    async ({ url, body }: { url: string, body: any }) => {
        return await CheckoutPageServices.addOrEditAddress(url, body)
    }
)
export const checkValidationOnConfirmOrder = appCreateAsyncThunk(
    "checkValidationOnConfirmOrder",
    async ({ url, body }: { url: string, body: any }) => {
        return await CheckoutPageServices.checkValidationOnConfirmOrder(url, body)
    }
)

export const orderPlaceOTPSend = appCreateAsyncThunk(
    "orderPlaceOTPSend",
    async ({ url, body }: { url: string, body: any }) => {
        return await CheckoutPageServices.orderPlaceOTPSend(url, body)
    }
)

export const orderPlaceOTPVerify = appCreateAsyncThunk(
    "orderPlaceOTPVerify",
    async ({ url, body }: { url: string, body: any }) => {
        return await CheckoutPageServices.orderPlaceOTPVerify(url, body)
    }
)

export const placeOrder = appCreateAsyncThunk(
    "placeOrder",
    async ({ url, body }: { url: string, body: any }) => {
        return await CheckoutPageServices.placeOrder(url, body)
    }
)

export const getStateAndCountryLists = appCreateAsyncThunk(
    "getStateAndCountryLists",
    async ({ url }: { url: string }) => {
        return await CheckoutPageServices.getStateAndCountryLists(url)
    }
)

export const getLocalAgentDetails = appCreateAsyncThunk(
    "getLocalAgentDetails",
    async ({ url }: { url: string }) => {
        return await CheckoutPageServices.getLocalAgentDetails(url);
    }
)

export const checkoutPage = createSlice({
    name: 'checkoutPage',
    initialState,
    reducers: {
        setLoadingTrue: (state) => {
            state.loading = true
        },
        setLoadingFalse: (state) => {
            state.loading = false
        },
        resetSubTotalCheckoutPage: (state) => {
            state.subTotal = 0
        },
        updateSubTotalCheckoutPage: (state, action) => {
            state.subTotal += action.payload;
            state.subTotal = Math.round((state.subTotal + Number.EPSILON) * 100) / 100
        },
        updateFinalDataForTheCheckout: (state, action) => {
            state.finalDataForTheCheckout = { ...state.finalDataForTheCheckout, ...action.payload }

        },
        disableOTP: (state) => {
            state.isOTPEnabled = null
            state.isOTPVerified = null
            state.message = null
            state.otpverfiedMessage = null
        },
        removeOTPvalidationMessage: (state) => {
            state.otpverfiedMessage = null
        },
        updateAddress: (state, action) => {
            const updatedAddress = action.payload;

            if (updatedAddress.addressType === AddressType.Shipping) {
                const updatedShippingDetails = state.checkoutPageData?.shippingAddressDetails.map((address) => {
                    if (address.addressId === updatedAddress.addressId) {
                        return updatedAddress;
                    }
                    return address;
                });

                state.checkoutPageData!.shippingAddressDetails = updatedShippingDetails as AddressDetail[];
            }
            else if (updatedAddress.addressType === AddressType.Billing) {
                const updatedBillingDetails = state.checkoutPageData?.billingAddressDetails.map((address) => {
                    if (address.addressId === updatedAddress.addressId) {
                        return updatedAddress;
                    }
                    return address;
                });

                state.checkoutPageData!.billingAddressDetails = updatedBillingDetails as AddressDetail[];
            }
        },
        setCheckoutItemWarning: (state, action) => {
            const quantities = action.payload?.quantities;
            const warnings = action.payload?.warnings;

            state?.checkoutPageData?.shoppingCartItems.forEach((item: CartItem) => {
                warnings.forEach((warning: any) => {
                    if (item.productId === warning.productId) {
                        item.warnings = warning.warnings;
                    } else {
                        item.warnings = []
                    }
                })
                item.quantity = quantities[item.productId]
            })
        },
        addAddress: (state, action) => {
            const updatedAddress = action.payload;

            if (updatedAddress.addressType === AddressType.Shipping) {
                const updatedShippingDetails = [updatedAddress, ...state.checkoutPageData!.shippingAddressDetails]

                state.checkoutPageData!.shippingAddressDetails = updatedShippingDetails as AddressDetail[];
            }
            else if (updatedAddress.addressType === AddressType.Billing) {
                const updatedBillingDetails = [updatedAddress, ...state.checkoutPageData!.billingAddressDetails]

                state.checkoutPageData!.billingAddressDetails = updatedBillingDetails as AddressDetail[];
            }
        },
        setLocalAgentDetailsNull: (state) => {
            state.localAgentDetails = null;
        }
    },

    extraReducers: (builder) => {
        // get checkout page data
        builder.addCase(getCheckoutPageData.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getCheckoutPageData.fulfilled, (state, action) => {
            state.checkoutPageData = action?.payload?.data?.data
            state.isApiCalled = true
            state.loading = false;
        })
        builder.addCase(getCheckoutPageData.rejected, (state, action) => {
            state.loading = false
        })
        // get insurance and tax details calculation
        builder.addCase(getInsuranceAndTaxDetailsCalculation.pending, (state, action) => {
            // state.loading = true
        })
        builder.addCase(getInsuranceAndTaxDetailsCalculation.fulfilled, (state, action) => {
            state.insuranceAndTaxCalculation = action?.payload?.data?.data
            // state.loading = false;
        })
        builder.addCase(getInsuranceAndTaxDetailsCalculation.rejected, (state, action) => {
            // state.loading = false
        })
        // get credit card charges
        builder.addCase(getCraditCardCharges.pending, (state, action) => {
            // state.loading = true
        })
        builder.addCase(getCraditCardCharges.fulfilled, (state, action) => {
            state.craditCardCharges = action?.payload?.data?.data
            // state.loading = false;
        })
        builder.addCase(getCraditCardCharges.rejected, (state, action) => {
            // state.loading = false
        })
        // checkValidationOnConfirmOrder
        builder.addCase(checkValidationOnConfirmOrder.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(checkValidationOnConfirmOrder.fulfilled, (state, action) => {
            const responseData = action?.payload?.data?.data;
            state.message = responseData?.message
            state.isOTPEnabled = responseData?.isOTPEnabled;
            // state.isOTPSent = responseData.isOTPSent;
            state.loading = false;
        })
        builder.addCase(checkValidationOnConfirmOrder.rejected, (state, action) => {
            const responseData = action?.payload?.response?.data?.data;
            state.message = responseData.message
            state.isOTPEnabled = responseData.isOTPEnabled;
            state.loading = false
        })

        // orderPlaceOTPSend
        builder.addCase(orderPlaceOTPSend.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(orderPlaceOTPSend.fulfilled, (state, action) => {
            state.isOTPSent = true;
            state.loading = false;
        })
        builder.addCase(orderPlaceOTPSend.rejected, (state, action) => {
            state.loading = false
        })

        // orderPlaceOTPVerify
        builder.addCase(orderPlaceOTPVerify.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(orderPlaceOTPVerify.fulfilled, (state, action) => {
            state.isOTPVerified = true;
            state.loading = false;
            state.otpverfiedMessage = action?.payload?.data?.message
        })
        builder.addCase(orderPlaceOTPVerify.rejected, (state, action) => {
            state.isOTPVerified = action?.payload?.response?.data?.data?.isOTPVerified;
            state.loading = false
            state.otpverfiedMessage = action?.payload?.response?.data?.message
        })

        // placeOrder
        builder.addCase(placeOrder.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(placeOrder.fulfilled, (state, action) => {
            const responseData = action.payload.data.data;
            state.orderId = responseData;
            state.loading = false;
        })
        builder.addCase(placeOrder.rejected, (state, action) => {
            state.loading = false
        })

        // getStateAndCountryLists
        builder.addCase(getStateAndCountryLists.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getStateAndCountryLists.fulfilled, (state, action) => {
            const responseData = action.payload.data.data;
            state.stateList = responseData.stateList;
            state.countryList = responseData.countryList;
            state.loading = false;
        })
        builder.addCase(getStateAndCountryLists.rejected, (state, action) => {
            state.loading = false
        })

        // addOrEditAddress
        builder.addCase(addOrEditAddress.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(addOrEditAddress.fulfilled, (state, action) => {
            state.loading = false;
        })
        builder.addCase(addOrEditAddress.rejected, (state, action) => {
            state.loading = false
        })

        // get local agent details
        builder.addCase(getLocalAgentDetails.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getLocalAgentDetails.fulfilled, (state, action) => {
            const responseData = action.payload.data.data;
            state.localAgentDetails = responseData;
            state.loading = false;
        })
        builder.addCase(getLocalAgentDetails.rejected, (state, action) => {
            state.localAgentDetails = null;
            state.loading = false
        })
    },
})

export const { setLoadingTrue, setLoadingFalse, updateSubTotalCheckoutPage, resetSubTotalCheckoutPage, updateFinalDataForTheCheckout, disableOTP, updateAddress, setCheckoutItemWarning, addAddress, removeOTPvalidationMessage, setLocalAgentDetailsNull } = checkoutPage.actions

export default checkoutPage.reducer
