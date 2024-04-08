import React, { useMemo } from "react";
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
import { AddToCartIcon, PdfIcon } from '@/assets/icons';
import StatusImage from '../assets/images/StatusImage.png';
import useAPIoneTime from "@/hooks/useAPIoneTime";
import { ENDPOINTS } from "@/utils/constants";
import { downloadOrderInvoice, getOrderDetailsData } from "@/redux/reducers/orderDetailsReducer";
import { useAppDispatch, useAppSelector } from "@/hooks";
import Toaster from "@/components/common/Toaster";
import { hasFulfilled, paymentMethodType, roundOfThePrice } from "@/utils/common";
import useShowToaster from "@/hooks/useShowToaster";
import { AxiosError } from "axios";
import Loader from "@/components/common/Loader";

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
    const dispatch = useAppDispatch();
    const { showToaster } = useShowToaster()
    const loading = useAppSelector(state => state.orderDetails.loading)
    const isOrderFound = useAppSelector(state => state.orderDetails.isOrderFound)
    // console.log("🚀 ~ orderHistoryDetail:", orderDetails)

    const downloadInvoiceHandler = async () => {
        const response = await dispatch(downloadOrderInvoice({ url: ENDPOINTS.downloadOrderInvoice + searchParams.get("orderNo") ?? "" }) as any)

        if (!hasFulfilled(response.type)) {
            showToaster({
                message: ((response?.payload as AxiosError)?.response?.data as { message: string })?.message as string, severity: "error"
            })
        }
        else {
            const pdfData = response.payload?.data;
            // const url = window.URL.createObjectURL(new Blob([pdfData]));
            // const link = document.createElement('a');
            // link.href = url;
            // link.setAttribute('download', 'file.pdf'); //or any other extension
            // document.body.appendChild(link);
            // link.click();
            // console.log("🚀 ~ downloadInvoiceHandler ~ response:", response.payload?.data)
            const blob = new Blob([pdfData], { type: 'application/pdf' });

            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'invoice-qmint.pdf';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    return (
        <Layout>
            <>
                <Loader open={checkLoadingStatus} />
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
                                        <Button sx={{ gap: "12px" }} className='PDFInvoiceBtn' size='large' variant="contained" onClick={downloadInvoiceHandler} disabled={loading}><Icon className='PdfIcon' ><PdfIcon /></Icon>PDF invoice</Button>
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
                                        <Typography variant="body1" className="CommonBottomMargin">{orderDetails?.addresses[0]?.addressLine1 + ", " + orderDetails?.addresses[0]?.addressLine2 + ", " + orderDetails?.addresses[0]?.city + " - " + orderDetails?.addresses[0]?.postcode + ", " + orderDetails?.addresses[0]?.stateName + ", " + orderDetails?.addresses[0]?.countryName}</Typography>
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
                                        <Typography variant="body1" className="CommonBottomMargin">{orderDetails?.addresses[1]?.addressLine1 + ", " + orderDetails?.addresses[1]?.addressLine2 + ", " + orderDetails?.addresses[1]?.city + " - " + orderDetails?.addresses[1]?.postcode + ", " + orderDetails?.addresses[1]?.stateName + ", " + orderDetails?.addresses[1]?.countryName}</Typography>
                                        {orderDetails?.addresses[1]?.isVerified && <Typography variant="subtitle1" className='Font16'>Address Verified</Typography>}
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
                                                    <TableCell sx={{ minWidth: "600px" }}>Name</TableCell>
                                                    <TableCell sx={{ minWidth: "200px" }}>Price</TableCell>
                                                    <TableCell sx={{ minWidth: "156px" }}>Quantity</TableCell>
                                                    <TableCell sx={{ minWidth: "200px" }}>Total</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {orderDetails?.orderItems?.map((row) => (
                                                    <TableRow
                                                        key={row.productId}
                                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {row.productName}
                                                        </TableCell>
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
                                    <Stack className='SubtotalShippingWrapper'>
                                        <Box className="Subtotal">
                                            <Typography variant="body1" sx={{ marginBottom: "2px" }}>Subtotal</Typography>
                                            <Typography variant="subtitle1"   >${roundOfThePrice(orderDetails?.orderSubtotal)}</Typography>
                                        </Box>
                                        <Box className="SecureShipping">
                                            <Typography variant="body1" sx={{ marginBottom: "2px" }}>Secure Shipping</Typography>
                                            <Typography variant="subtitle1"   >${roundOfThePrice(orderDetails?.orderShippingFee)}</Typography>
                                        </Box>
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
                                            <Icon className="AddToCartIcon"><AddToCartIcon /></Icon>
                                            <Typography variant="subtitle2">{orderDetails?.shippingTextP1}</Typography>
                                        </Stack>
                                        <Typography variant="overline" className="lineHeight25" sx={{ fontWeight: "400" }}>{orderDetails?.shippingTextP2}</Typography>
                                        <Typography variant="overline" className="lineHeight25" sx={{ fontWeight: "400" }}>{orderDetails?.shippingTextP3}</Typography>
                                        <Link variant="overline" className="lineHeight25" target="_blank" href={orderDetails?.shippingTextP4 ?? "#"}>{orderDetails?.shippingTextP4}</Link>
                                    </Box>
                                    <Box className="Card PaymentCard">
                                        <Stack className='IconTitleWrapper'>
                                            <Icon><AddToCartIcon /></Icon>
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
                                            <Icon><AddToCartIcon /></Icon>
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