import React, { Fragment, useEffect, useState } from 'react'
import { Button, Checkbox, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import useApiRequest from '@/hooks/useAPIRequest'
import { CartItemsWithLivePriceDetails } from '../shopping-cart/CartDetails'
import { ENDPOINTS } from '@/utils/constants'
import { CartItem } from '@/types/shoppingCart'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { MinusIcon, PlusIcon } from '@/assets/icons'
import { updateShoppingCartData } from '@/redux/reducers/shoppingCartReducer'
import { addToWishListToShoppingCart, deleteWishListData, removeItemFromWishlist } from '@/redux/reducers/wishListReducer'
import { navigate } from 'gatsby'
import { calculatePrice, hasFulfilled } from '@/utils/common'
import useShowToaster from '@/hooks/useShowToaster'
import { set } from 'react-hook-form'

const WishListDetails = ({ toggleEmailFriend }: { toggleEmailFriend: () => any }) => {
    const wishListstate = useAppSelector(state => state.wishList)
    const dispatch = useAppDispatch();
    const loading = useAppSelector(state => state.wishList.loading)
    const { cartItems } = useAppSelector((state) => state.shoppingCart)
    const { configDetails: configDetailsState } = useAppSelector((state) => state.homePage)
    const [productIds, setProductIds] = useState({})
    const { showToaster } = useShowToaster();
    const { data: priceData, loading: priceLoading } = useApiRequest(ENDPOINTS.productPrices, 'post', productIds, 60);
    const [wishListItemsWithLivePrice, setWishListItemsWithLivePrice] = useState<CartItemsWithLivePriceDetails[]>([]);
    const [quantities, setQuantities] = useState<{ [key: number]: number }>({})
    const [selectedItems, setSelectedItems] = useState<{ [key: number]: boolean }>([])
    // console.log("🚀 ~ WishListDetails ~ selectedItems:", selectedItems)
    const [isWishListUpdated, setIsWishListUpdated] = useState(false)

    useEffect(() => {
        if (priceData?.data?.length > 0) {
            const idwithpriceObj: any = {}
            priceData?.data?.forEach((product: any) => idwithpriceObj[product?.productId] = product)

            const wishListItemsWithLivePrice = wishListstate.wishListItems?.map((item: CartItem) => {
                return {
                    ...item,
                    LivePriceDetails: idwithpriceObj[item.productId]
                }
            })

            if (wishListItemsWithLivePrice) {
                setWishListItemsWithLivePrice(wishListItemsWithLivePrice)
            }
        }
    }, [priceData])

    useEffect(() => {
        if (wishListstate.wishListItems?.length ?? 0 > 0) {
            const productIds = wishListstate.wishListItems?.map((item: CartItem) => item.productId);
            setProductIds({ productIds })
        }

        let quantities: any = {}
        let checkedItems: any = {}
        wishListstate.wishListItems?.forEach((item: CartItem) => {
            checkedItems[item.id] = false
            quantities[item.id] = item.quantity
        })

        setSelectedItems(checkedItems)
        setQuantities(quantities)
    }, [wishListstate.wishListItems])

    const increaseQuantity = (id: number) => {
        setQuantities({ ...quantities, [id]: quantities[id] + 1 })
        setIsWishListUpdated(true)
    }

    const decreaseQuantity = (id: number) => {
        if (quantities[id] !== 1) {
            setQuantities({ ...quantities, [id]: quantities[id] - 1 })
        }
        setIsWishListUpdated(true)
    }

    const updateWishListHandler = async () => {
        let isAnyQuantityZero = false;

        const itemsWithQuantity = Object.keys(quantities).map((item: any) => {
            if (quantities[item] === 0) {
                isAnyQuantityZero = true;
            }
            return {
                id: item,
                quantity: quantities[item]
            }
        })
        if (isAnyQuantityZero) {
            showToaster({ message: "Quantity cannot be zero", severity: 'error' })
            return;
        }
        setIsWishListUpdated(false)
        const response = await dispatch(updateShoppingCartData({ url: ENDPOINTS.updateWishListData, body: itemsWithQuantity }) as any);
        if (hasFulfilled(response.type)) {
            showToaster({ message: "Watchlist items updated successfully", severity: 'success' })
        }
        else {
            showToaster({ message: "Failed to update Watchlist items.", severity: 'error' })
        }
    }

    const removeSelectedItemsHandler = async () => {
        const checkedItems: number[] = [];
        for (const item in selectedItems) {
            if (selectedItems[item]) {
                checkedItems.push(Number(item));
            }
        }

        const response = await dispatch(deleteWishListData({ url: ENDPOINTS.deleteWishListData, body: checkedItems }) as any)
        if (hasFulfilled(response.type)) {
            dispatch(removeItemFromWishlist(checkedItems))
            setWishListItemsWithLivePrice(wishListItemsWithLivePrice.filter((item: CartItemsWithLivePriceDetails) => !checkedItems.includes(item.id)));
            showToaster({ message: response.payload.data.message, severity: 'success' })
        }
        else {
            showToaster({ message: "Failed to delete watchlist items.", severity: 'error' })
        }
    }

    const addToCartSelectedItemsHandler = async () => {
        // await dispatch(deleteWishListData())
        const checkedItemsWithQuantity: { [key: string]: number }[] = [];
        for (const item in selectedItems) {
            if (selectedItems[item]) {
                checkedItemsWithQuantity.push({
                    id: Number(item),
                    quantity: quantities[item]
                })
            }
        }
        if (cartItems?.length && (cartItems?.length + checkedItemsWithQuantity?.length >= configDetailsState?.Shoppingcart_MaxItems?.value)) {
            showToaster({
                message: `Can not add more than ${configDetailsState?.Shoppingcart_MaxItems?.value} items to cart.`,
                severity: 'error'
            })
            return
        }
        const response = await dispatch(addToWishListToShoppingCart({ url: ENDPOINTS.addWishListToShoppingCart, body: checkedItemsWithQuantity }) as any)
        if (hasFulfilled(response.type)) {
            // showToaster({message : "Selected items added to cart", severity: 'success'})
            navigate('/shopping-cart')
        }
        else {
            showToaster({ message: "Failed to add items to cart", severity: 'error' })
        }

    }

    const handleCheckboxChange = (id: number) => {
        setSelectedItems({ ...selectedItems, [id]: !selectedItems[id] })
    }

    return (
        <Fragment>
            <TableContainer>
                {(wishListstate.wishListItems?.length ?? 0) > 0 && <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox"></TableCell>
                            <TableCell colSpan={2}>Products</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Qty.</TableCell>
                            <TableCell>Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {wishListItemsWithLivePrice.map((item) => (
                            <TableRow key={item.productId}>
                                <TableCell padding="checkbox">
                                    <Checkbox checked={selectedItems[item.id]} onChange={() => handleCheckboxChange(item.id)} />
                                </TableCell>
                                <TableCell align="left"><img src={item.imageUrl} width={100} height={100} /></TableCell>
                                <TableCell><Button onClick={() => navigate(`/product-details/${item.friendlypagename}`)} color="secondary">{item.productName}</Button></TableCell>
                                <TableCell>{item?.LivePriceDetails?.price}</TableCell>
                                <TableCell>
                                    <Stack className="Quantity">
                                        <IconButton className="Minus" onClick={() => decreaseQuantity(item.id)} disabled={quantities[item.id] === 1}><MinusIcon /></IconButton>
                                        <TextField type="number" name="Qty" value={quantities[item.id]} onChange={(event) => {
                                            setQuantities({ ...quantities, [item.id]: Number(event.target.value) });
                                            setIsWishListUpdated(true);
                                        }} />
                                        <IconButton className="Plus" onClick={() => increaseQuantity(item.id)}><PlusIcon /></IconButton>
                                    </Stack>
                                </TableCell>
                                {/* round to 2 */}
                                <TableCell>{(quantities[item.id] * calculatePrice(item?.LivePriceDetails,quantities[item.id])).toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>}
                {!loading && wishListstate.wishListItems?.length === 0 && <Typography variant="h6" style={{ textAlign: "center" }}>No items in watchlist</Typography>}
            </TableContainer>
            <Stack className="ActionWrapper">
                <Stack className="Left">
                    <Button color="primary" variant="contained" onClick={updateWishListHandler} disabled={wishListstate.loading || !isWishListUpdated}>Update Watchlist</Button>
                    {/* <Button color="primary" variant="outlined" onClick={toggleEmailFriend}>Email a friend</Button> */}
                </Stack>
                <Stack className="Right">
                    <Button color="primary" variant="outlined" onClick={removeSelectedItemsHandler} disabled={wishListstate.loading || !Object.values(selectedItems).some((value) => value === true)}>Remove</Button>
                    <Button color="primary" variant="contained" onClick={addToCartSelectedItemsHandler} disabled={wishListstate.loading || !Object.values(selectedItems).some((value) => value === true)}>Add to cart</Button>
                </Stack>
            </Stack>
        </Fragment>
    )
}

export default WishListDetails