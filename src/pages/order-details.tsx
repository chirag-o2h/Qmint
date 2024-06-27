import React, { useMemo, useState } from "react";
import Seo from "../components/common/Seo"
import Layout from "@/components/common/Layout";
import {
    Box, Link, Container, Typography, Button, Stack, Icon, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material"
import { AddToCartIcon, CreditCard, CartIcon, GreenConfirmationIcon, PdfIcon, ShieldIcon, PlusIcon } from '@/assets/icons';
import useAPIoneTime from "@/hooks/useAPIoneTime";
import { ENDPOINTS } from "@/utils/constants";
import { downloadOrderInvoice, getOrderDetailsData } from "@/redux/reducers/orderDetailsReducer";
import { useAppDispatch, useAppSelector } from "@/hooks";
import Toaster from "@/components/common/Toaster";
import { formatDate, hasFulfilled, paymentMethodType, roundOfThePrice } from "@/utils/common";
import useShowToaster from "@/hooks/useShowToaster";
import { AxiosError } from "axios";
import Loader from "@/components/common/Loader";
import useDownloadInvoiceHandler from "@/hooks/useDownloadInvoiceHandler";

export function createData(
    Name: string,
    Price: string,
    Quantity: string,
    Total: string,
) {
    return { Name, Price, Quantity, Total };
}

function orderDetails({ location }: { location: any }) {
    const openToaster = useAppSelector(state => state.homePage.openToaster)
    const checkLoadingStatus = useAppSelector(state => state.homePage.loading);
    const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search])
    useAPIoneTime({ service: getOrderDetailsData, endPoint: ENDPOINTS.getOrderDetailsData + searchParams.get("orderNo") ?? "" });
    const orderDetails = useAppSelector(state => state.orderDetails.orderDetailsData)
    const shippingMethods = useAppSelector(state => state.orderDetails.shippingMethods)
    const dispatch = useAppDispatch();
    const loading = useAppSelector(state => state.orderDetails.loading)
    const isOrderFound = useAppSelector(state => state.orderDetails.isOrderFound)
    // const [shippingMethod, setShippingMethod] = useState({
    //     "Local pick up": false,
    //     "Secure shipping": false,
    //     "Vault storage": false
    // });

    const downloadInvoiceHandler = useDownloadInvoiceHandler()
    return (
        <Layout>
            <>
                {checkLoadingStatus && <Loader open={checkLoadingStatus} />}
                <Seo
                    keywords={[`gatsby`, `order-details`, `react`]}
                    title="Order details"
                    lang="en"
                />
                {openToaster && <Toaster />}
                <Box id="OrderDetailsPage" className='OrderDetailsPage' component="section">
                    <Container>
                        <Box className="OrderDetailsContent">
                            {!orderDetails && isOrderFound === false && !loading && <Typography variant="body1" style={{ textAlign: "center" }}>Order not found</Typography>}
                            {orderDetails && <>
                                <Box className="Ribbon" sx={{ backgroundColor: orderDetails?.orderStatusColor ?? "" }}>
                                    Status: {orderDetails?.orderStatus}
                                </Box>
                                <Box className="OrderDetailsWrapper">
                                    <Box className='PDFBtnWrapper'>
                                        <Button sx={{ gap: "12px" }} className='PDFInvoiceBtn' size='large' variant="contained" onClick={() => {
                                            downloadInvoiceHandler(searchParams.get("orderNo") ?? "")
                                        }} disabled={loading}><Icon className='PdfIcon' ><PdfIcon /></Icon>PDF invoice</Button>
                                    </Box>
                                    <Typography variant="subtitle2" className="OrderID">Order : {orderDetails?.customOrderNumber}</Typography>
                                    <Stack className="OrderDetails">
                                        <Box className="OrderDateWrapper">
                                            <Typography variant="body1">Order Date</Typography>
                                            <Typography variant="subtitle1" className="Font16">{orderDetails?.orderDate}</Typography>
                                        </Box>
                                        <Box className="OrderTimeWrapper">
                                            <Typography variant="body1">Order Time</Typography>
                                            <Typography variant="subtitle1" className="Font16">{orderDetails?.orderTime}</Typography>
                                        </Box>
                                        {/* <Box className="OrderNumberWrapper">
                                        <Typography variant="body1">Order Number</Typography>
                                        <Typography variant="subtitle1" className="Font16">{orderDetails?.customOrderNumber}</Typography>
                                    </Box> */}
                                        <Box className="OrderStatusWrapper">
                                            <Typography variant="body1">Order Status</Typography>
                                            <Stack sx={{ gap: "10px" }} className="ButtonsWrapper">
                                                <Button variant="contained" size="small" className="StatusButton" style={{ backgroundColor: orderDetails?.orderStatusColor ?? "" }}>{orderDetails?.orderStatus}</Button>
                                                {orderDetails?.alertStatus &&
                                                    <Button variant="contained" size="small" className="StatusButton" style={{ backgroundColor: orderDetails?.alertStatusColor ?? "" }}>{orderDetails?.alertStatus}</Button>}
                                            </Stack>
                                        </Box>
                                        <Box className="PaymentWrapper">
                                            <Typography variant="body1">Payment</Typography>
                                            <Typography variant="subtitle1" className="Font16">{orderDetails?.paymentMethod}</Typography>
                                        </Box>
                                        <Box className="DeliveryWrapper">
                                            <Typography variant="body1">Shipping Method</Typography>
                                            <Typography variant="subtitle1" className="Font16">{orderDetails?.shippingMethod}</Typography>
                                        </Box>
                                    </Stack>
                                </Box>

                                <Box className="AddressWrapper">
                                    <Box className="BillingWrapper">
                                        <Typography variant="subtitle1" className="AddressTitle">Billing Address</Typography>
                                        {orderDetails?.addresses[0]?.firstName && <Typography variant="subtitle1" className="CommonBottomMargin Font16">{orderDetails?.addresses[0]?.firstName + " " + orderDetails?.addresses[0]?.lastName}</Typography>}
                                        <Stack sx={{ gap: "10px", alignItems: "center" }} className="CommonBottomMargin">
                                            <Typography variant="body1">Email: </Typography><Typography variant="subtitle1" className='Font16'>{orderDetails?.addresses[0]?.email}</Typography>
                                        </Stack>
                                        <Stack sx={{ gap: "10px", alignItems: "center" }} className="CommonBottomMargin">
                                            <Typography variant="body1">Phone </Typography><Typography variant="subtitle1" className='Font16'> : {orderDetails?.addresses[0]?.phoneNumber}</Typography>
                                        </Stack>
                                        <Typography variant="body1" className="CommonBottomMargin">{`${orderDetails?.addresses[0]?.addressLine1}${orderDetails?.addresses[0]?.addressLine2.length > 0 ? (", " + orderDetails?.addresses[0]?.addressLine2) : ""} ${orderDetails?.addresses[0]?.city} - ${orderDetails?.addresses[0]?.postcode}, ${orderDetails?.addresses[0]?.stateName}, ${orderDetails?.addresses[0]?.countryName}`
                                        }</Typography>
                                        {/* <Stack sx={{ gap: "10px", alignItems: "center" }}   >
                                        <Typography variant="body1">Account Type: </Typography><Typography variant="subtitle1" className='Font16'>{orderDetails?.addresses[0]?.}</Typography>
                                    </Stack> */}
                                    </Box>
                                    <Box className="ShippingWrapper">
                                        <Typography variant="subtitle1" className="AddressTitle">Shipping Address</Typography>
                                        <Typography variant="subtitle1" className="CommonBottomMargin Font16">{orderDetails?.addresses[1]?.firstName + " " + orderDetails?.addresses[1]?.lastName}</Typography>
                                        <Stack sx={{ gap: "10px", alignItems: "center" }} className="CommonBottomMargin">
                                            <Typography variant="body1">Email: </Typography><Typography variant="subtitle1" className='Font16'>{orderDetails?.addresses[1]?.email}</Typography>
                                        </Stack>
                                        <Stack sx={{ gap: "10px", alignItems: "center" }} className="CommonBottomMargin">
                                            <Typography variant="body1">Phone </Typography><Typography variant="subtitle1" className='Font16'> : {orderDetails?.addresses[1]?.phoneNumber}</Typography>
                                        </Stack>
                                        <Typography variant="body1" className="CommonBottomMargin">{`${orderDetails?.addresses[1]?.addressLine1}${orderDetails?.addresses[1]?.addressLine2 !== "" ? (", " + orderDetails?.addresses[1]?.addressLine2) + "" : ""}, ${orderDetails?.addresses[1]?.city} - ${orderDetails?.addresses[1]?.postcode}, ${orderDetails?.addresses[1]?.stateName}, ${orderDetails?.addresses[1]?.countryName}`
                                        }</Typography>
                                        {orderDetails?.addresses[1]?.isVerified && <Typography variant="subtitle1" className='Font16 AddressVerified'><GreenConfirmationIcon fontSize="small" /> Address Verified</Typography>}
                                    </Box>
                                </Box>

                                <Box className="TableContainerWrapper">
                                    <TableContainer
                                        className="OrderDetailTableWrapper"
                                        sx={{}}
                                    // component={Paper}
                                    >
                                        <Table className="OrderDetailTable" sx={{ minWidth: 650 }} aria-label="Orders details table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell className="Name">Name</TableCell>
                                                    <TableCell>Shipping Method</TableCell>
                                                    <TableCell>Price</TableCell>
                                                    <TableCell>Quantity</TableCell>
                                                    <TableCell>Total</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {orderDetails?.orderItems?.map((row: any) => (
                                                    <TableRow
                                                        key={row.productId}
                                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {row.productName}
                                                        </TableCell>
                                                        <TableCell>{row.shippingMethod}</TableCell>
                                                        <TableCell>${roundOfThePrice(row.unitPrice)}</TableCell>
                                                        <TableCell>{row.quantity}</TableCell>
                                                        <TableCell>${roundOfThePrice(row.totalPrice)}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>

                                <Stack className='TotalShippingDetailsWrapper'>
                                    <Stack className='SubtotalShippingWrapper' divider={<PlusIcon />}>
                                        <Box className="Subtotal">
                                            <Typography variant="body1" sx={{ marginBottom: "2px" }}>Subtotal</Typography>
                                            <Typography variant="subtitle1"   >${roundOfThePrice(orderDetails?.orderSubtotal)}</Typography>
                                        </Box>
                                        {shippingMethods["Secure Shipping"] && <Box className="SecureShipping">
                                            <Typography variant="body1" sx={{ marginBottom: "2px" }}>Secure Shipping</Typography>
                                            <Typography variant="subtitle1"   >${roundOfThePrice(orderDetails?.orderShippingFee)}</Typography>
                                        </Box>}
                                        {shippingMethods["Local pick up"] && <Box className="SecureShipping">
                                            <Typography variant="body1" sx={{ marginBottom: "2px" }}>Local pick up</Typography>
                                            <Typography variant="subtitle1"   >$0.00</Typography>
                                        </Box>}
                                        {shippingMethods["Vault storage"] && <Box className="SecureShipping">
                                            <Typography variant="body1" sx={{ marginBottom: "2px" }}>Vault Storage</Typography>
                                            <Typography variant="subtitle1"   >${roundOfThePrice(orderDetails?.vaultStorageFee)}</Typography>
                                        </Box>}
                                        {orderDetails?.paymentMethod === paymentMethodType["CreditCard"] && <Box className="SecureShipping">
                                            <Typography variant="body1" sx={{ marginBottom: "2px" }}>Credit Card Fee</Typography>
                                            <Typography variant="subtitle1"   >${roundOfThePrice(orderDetails?.paymentMethodFee)}</Typography>
                                        </Box>}
                                    </Stack>
                                    <Box className="TotalWrapper">
                                        <Typography variant="body1">Total</Typography>
                                        <Typography variant="subtitle2" className="TotalValue">${roundOfThePrice(orderDetails?.orderTotal)}</Typography>
                                        <Stack sx={{ gap: "12px" }}>
                                            <Typography variant="overline">GST Included:</Typography>
                                            <Typography variant="overline">${roundOfThePrice(orderDetails?.orderTax)}</Typography>
                                        </Stack>
                                    </Box>
                                </Stack>
                                <Typography variant="body1" className="KeyPoints" dangerouslySetInnerHTML={{
                                    __html: orderDetails?.congratulationsText ?? ""
                                }} />
                                <Box className="CardsWrapper">
                                    <Box className="Card SecureShippingCard">
                                        <Stack className='IconTitleWrapper'>
                                            <Icon><ShieldIcon /></Icon>
                                            <Typography variant="subtitle2">{orderDetails?.shippingTextP1}</Typography>
                                        </Stack>
                                        <Typography variant="overline" className="lineHeight25" sx={{ fontWeight: "400" }}>{orderDetails?.shippingTextP2}</Typography>
                                        <Typography variant="overline" className="lineHeight25" sx={{ fontWeight: "400" }}>{orderDetails?.shippingTextP3}</Typography>
                                        <Link variant="overline" className="lineHeight25" target="_blank" href={orderDetails?.shippingTextP4 ?? "#"}>{orderDetails?.shippingTextP4}</Link>
                                    </Box>
                                    <Box className="Card PaymentCard">
                                        <Stack className='IconTitleWrapper'>
                                            <Icon><CreditCard /></Icon>
                                            <Typography variant="subtitle2">{orderDetails?.paymentTextP1}</Typography>
                                        </Stack>
                                        <Typography variant="overline" className="lineHeight25" sx={{ fontWeight: "400" }}>{orderDetails?.paymentTextP2}</Typography>
                                        <Typography variant="overline" className="lineHeight25" sx={{ fontWeight: "400" }}>{orderDetails?.paymentTextP3}</Typography>
                                        <Typography variant="overline" className="lineHeight25" sx={{ fontWeight: "400" }}>{orderDetails?.paymentTextP4}</Typography>
                                        <Typography variant="overline" className="lineHeight25" sx={{ fontWeight: "400" }}>{orderDetails?.paymentTextP5}</Typography>
                                        <Typography variant="overline" className="lineHeight25" sx={{ fontWeight: "400" }}>{orderDetails?.paymentTextP6}</Typography>
                                        <Link variant="overline" className="lineHeight25" target="_blank" href={orderDetails?.paymentTextP7 ?? "#"} >{orderDetails?.paymentTextP7}</Link>
                                    </Box>
                                    <Box className="Card SellingCard">
                                        <Stack className='IconTitleWrapper'>
                                            <Icon><CartIcon /></Icon>
                                            <Typography variant="subtitle2">{orderDetails?.sellingTextP1}</Typography>
                                        </Stack>
                                        <Typography variant="overline" className="lineHeight25" sx={{ fontWeight: "400" }}>{orderDetails?.sellingTextP2}</Typography>
                                        <Link variant="overline" className="lineHeight25" target="_blank" href={orderDetails?.sellingTextP3 ?? "#"}>{orderDetails?.sellingTextP3}</Link>
                                    </Box>
                                </Box>
                            </>}
                        </Box>
                    </Container>
                </Box >
            </>
        </Layout >
    )
}

export default orderDetails