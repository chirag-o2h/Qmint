import { createSlice } from '@reduxjs/toolkit'

// Types
import { appCreateAsyncThunk } from '../middleware/thunkMiddleware'
import { CartItem } from '@/types/shoppingCart'
import ShoppingCartServices from '@/apis/services/shoppingCartServices'
import { localStorageSetItem } from '@/utils/common'

interface ShoppingCartState {
    loading: boolean,
    cartItems: CartItem[],
    subTotal: number
}
const initialState: ShoppingCartState = {
    loading: false,
    cartItems: [],
    subTotal: 0
}

export const getShoppingCartData = appCreateAsyncThunk(
    'getShoppingCart',
    async ({ url, body }: { url: string, body: any }) => {
        return await ShoppingCartServices.getShoppingCartData(url, body)
    }
)

export const updateShoppingCartData = appCreateAsyncThunk(
    'updateShoppingCart',
    async ({ url, body }: { url: string, body: any }) => {
        return await ShoppingCartServices.updateShoppingCartData(url, body)
    }
)

export const deleteShoppingCartData = appCreateAsyncThunk(
    'deleteShoppingCart',
    async ({ url, body }: { url: string, body: any }) => {
        return await ShoppingCartServices.clearShoppingCartData(url, body);
    }
)

export const shoppingCart = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers: {
        setLoadingTrue: (state) => {
            state.loading = true
        },
        setLoadingFalse: (state) => {
            state.loading = false
        },
        resetSubTotal: (state) => {
            state.subTotal = 0
        },
        clearShoppingCart: (state) => {
            state.cartItems = [];
            state.subTotal = 0;
        },
        updateSubTotal: (state, action) => {
            state.subTotal += action.payload;
            state.subTotal = Math.round((state.subTotal + Number.EPSILON) * 100) / 100
        },
        setCartItemWarning: (state, action) => {
            const warnings = action.payload;

            state.cartItems.forEach((item: CartItem) => {
                warnings.forEach((warning: any) => {
                    if (item.productId === warning.productId) {
                        item.warnings = warning.warnings;
                    }
                })
            })

            // localStorageSetItem('cartItems', state.cartItems)
        }
    },

    extraReducers: (builder) => {
        // get shopping cart data
        builder.addCase(getShoppingCartData.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getShoppingCartData.fulfilled, (state, action) => {
            state.cartItems = action.payload.data.data.items;
            console.log("🚀 ~ builder.addCase ~ cartItems:", action.payload.data)
            localStorageSetItem('cartItems', action.payload.data.data.items)
            state.loading = false;
        })
        builder.addCase(getShoppingCartData.rejected, (state, action) => {
            state.loading = false
        })

        // update shopping cart data
        builder.addCase(updateShoppingCartData.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(updateShoppingCartData.fulfilled, (state, action) => {
            state.loading = false;
        })
        builder.addCase(updateShoppingCartData.rejected, (state, action) => {
            state.loading = false
        })

        // delete shopping cart data
        builder.addCase(deleteShoppingCartData.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(deleteShoppingCartData.fulfilled, (state, action) => {
            state.loading = false
        })
        builder.addCase(deleteShoppingCartData.rejected, (state, action) => {
            state.loading = false;
        })
    },
})

export const { setLoadingTrue, setLoadingFalse, updateSubTotal, resetSubTotal, clearShoppingCart, setCartItemWarning } = shoppingCart.actions

export default shoppingCart.reducer
