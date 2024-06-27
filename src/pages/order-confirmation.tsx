import React, { useState } from "react"
import Seo from "../components/common/Seo"
import Layout from "@/components/common/Layout";
import { Box, Stack, Container, Typography, Icon, Button, TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Divider } from "@mui/material"
import GreenConfirmationIcon from "@/assets/icons/GreenConfirmationIcon";
import LogoGoldCoin from "@/assets/logos/LogoGoldCoin.png";
import useAPIoneTime from "@/hooks/useAPIoneTime";
import { getOrderConfirmationDetails } from "@/redux/reducers/orderConfirmationDetailsReducer";
import { ENDPOINTS } from "@/utils/constants";
import { useAppSelector } from "@/hooks";
// import { rows } from "./order-details";
import { navigate } from "gatsby";
import Loader from "@/components/common/Loader";
import { roundOfThePrice } from "@/utils/common";
import noImage from '../assets/images/noImage.png'
import useDownloadInvoiceHandler from "@/hooks/useDownloadInvoiceHandler";

function OrderConfirmation(props: any) {
    const loading = useAppSelector(state => state.orderConfirmationDetails.loading)
    const isOrderFound = useAppSelector(state => state.orderConfirmationDetails.isOrderFound)
    const [loadingForNavigate, setLoadingForNavigate] = useState(false)
    const checkLoadingStatus = useAppSelector(state => state.orderConfirmationDetails.loading);
    // const orderId = props.location?.search?.split('=')[1];
    const orderConfirmationDetailsData = useAppSelector(state => state.orderConfirmationDetails.orderConfirmationDetailsData);
    const shippingMethods = useAppSelector(state => state.orderConfirmationDetails.shippingMethods);
    const isLoggedIn = useAppSelector(state => state.homePage.isLoggedIn)
    useAPIoneTime({
        service: getOrderConfirmationDetails,
        endPoint: ENDPOINTS.orderConfimationDetails + new URLSearchParams(location.search).get("orderNo")
    })

    const renderPricingItem = (title: string, value: string) => {
        return (
            <Stack className="PricingItem">
                <Typography variant="titleLarge">{title}</Typography>
                <Typography>{value}</Typography>
            </Stack>
        )
    }
    const downloadInvoiceHandler = useDownloadInvoiceHandler()
    window.handleLinkClick = async () => {
        setLoadingForNavigate(true)
        await downloadInvoiceHandler(orderConfirmationDetailsData?.orderNumber)
        setLoadingForNavigate(false)
    };

    if(!isLoggedIn){
        navigate('/login')
    }
    return (
        <Layout>
            {checkLoadingStatus || loadingForNavigate && <Loader open={checkLoadingStatus || loadingForNavigate} />}
            <Seo
                keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
                title="Home"
                lang="en"
            />

            <Box id="OrderConfirmation" className="OrderConfirmationPage" component="section">
                {!orderConfirmationDetailsData && isOrderFound === false && !loading && <Typography variant="body1" style={{ textAlign: "center" }}>Order Not Found</Typography>}
                {orderConfirmationDetailsData && <Container>
                    <Stack className="OrderReceivedMessageWrapper">
                        <GreenConfirmationIcon className='GreenConfirmationIcon' />
                        <Typography variant="subtitle2" className="OrderReceivedMessage">Your order has been received.</Typography>
                    </Stack>
                    <Box className="DetailsWrapper">
                        <Box className="ThankyouWrapper">
                            {/* @ts-ignore */}
                            <Typography className="ThankyouText" dangerouslySetInnerHTML={{ __html: orderConfirmationDetailsData?.thankyousection }} />
                            {/* <Typography variant="subtitle2" className="OrderID">Your order id is: {orderConfirmationDetailsData?.orderNumber}</Typography> */}
                            {/* <Typography variant="body1">You will receive an order confirmation email with details of your order and a link to track its progress.</Typography> */}
                        </Box>
                        <Box className="OrderDetailsWrapper">
                            <Stack className="TitleValueWrapper OrderNo">
                                <Typography variant="body1" className="Title">Order No.</Typography>
                                <Button variant="text" onClick={() => navigate(`/order-details/?orderNo=${orderConfirmationDetailsData?.orderNumber}`)}>{orderConfirmationDetailsData?.orderNumber}</Button>
                            </Stack>
                            <Stack className="TitleValueWrapper">
                                <Typography variant="body1" className="Title">Transaction Date and Time</Typography>
                                <Typography variant="subtitle1">{orderConfirmationDetailsData?.orderTime}, {orderConfirmationDetailsData?.orderDate}</Typography>
                            </Stack>
                            <Box className="TitleValueWrapper Orders">
                                <Typography variant="body1" className="Title">Products:-</Typography>
                                {/* <Stack className="LogoWrapper">
                                        <img src={LogoGoldCoin} alt="Logo" />
                                        <Box sx={{ padding: "6px 0" }}>
                                            <Typography variant="subtitle1">2024 1oz Lunar Series III</Typography>
                                            <Typography>$204.22</Typography>
                                        </Box>
                                    </Stack> */}
                                <Box className="TableContainerWrapper">
                                    <TableContainer
                                        className="OrderDetailTableWrapper"
                                        sx={{}}
                                    // component={Paper}
                                    >
                                        <Table className="OrderDetailTable" sx={{ minWidth: 650 }} aria-label="Orders details table">
                                            <TableHead>
                                                <TableRow className="OrderDetailsHeadRow">
                                                    <TableCell className="Name">Name</TableCell>
                                                    <TableCell>Shipping Method</TableCell>
                                                    <TableCell>Price</TableCell>
                                                    <TableCell>Quantity</TableCell>
                                                    <TableCell>Total</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {orderConfirmationDetailsData?.orderItems?.map((row) => (
                                                    <TableRow
                                                        key={row.productId}
                                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            <img className="ProductImage"
                                                                src={row.imageUrl ?? noImage} alt="Product image" loading="lazy"></img>
                                                            {row.productName}
                                                        </TableCell>
                                                        <TableCell>{row.shippingMethod}</TableCell>
                                                        <TableCell>${roundOfThePrice(row.unitPrice)}</TableCell>
                                                        <TableCell>{row.quantity}</TableCell>
                                                        <TableCell>${roundOfThePrice(row.subTotal)}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </Box>
                            <Stack className="TitleValueWrapper PaymentAmountWrapper">
                                <Box className="PricingDetails">
                                    {renderPricingItem("Subtotal", '$' + roundOfThePrice(orderConfirmationDetailsData?.subTotal as number))}

                                    {orderConfirmationDetailsData?.shippingMethod && <>
                                        <Divider />
                                        {shippingMethods["Secure Shipping"] && renderPricingItem("Secure Shipping", `$${roundOfThePrice(Number(orderConfirmationDetailsData?.shippingFee))}`)}
                                        {shippingMethods["Local pick up"] && renderPricingItem("Local pick up", "$0.00")}
                                        {shippingMethods["Vault storage"] && renderPricingItem("Vault storage", `$${roundOfThePrice(Number(orderConfirmationDetailsData?.vaultStorageFee))}`)}
                                    </>}
                                    {orderConfirmationDetailsData?.paymentMethod && <>
                                        <Divider />
                                        {renderPricingItem(orderConfirmationDetailsData?.paymentMethod, `$${roundOfThePrice(Number(orderConfirmationDetailsData?.paymentFee))}`)}
                                    </>}
                                    {orderConfirmationDetailsData?.orderTax !== 0 && <><Divider />
                                        {renderPricingItem("GST Incuded", `$${roundOfThePrice(orderConfirmationDetailsData?.orderTax as number)}`)}
                                    </>}

                                    {orderConfirmationDetailsData?.orderDiscount !== 0 && <><Divider />
                                        {renderPricingItem("Order Discount", `$${roundOfThePrice(orderConfirmationDetailsData?.orderDiscount as number)}`)}
                                    </>}
                                    <Divider />
                                    <Stack className="PricingItem TotalItem">
                                        <Typography variant="subtitle1">Total</Typography>
                                        <Typography variant="subtitle1">${roundOfThePrice(Number(orderConfirmationDetailsData?.orderTotal))}</Typography>
                                    </Stack>
                                </Box>
                            </Stack>
                        </Box>
                        <Box className="BottomContentWrapper">
                            {/* <Typography variant="body1">An email has been sent with your order details and payment instructions.You can also download or view on the following links: <Button variant="text">
                                    Download (download pdf)</Button></Typography>
                                <Typography variant="body1"><Button variant="text">View Online</Button> Copies of historical orders can also be viewed and downloaded from your <Button variant="text">Account History</Button></Typography> */}
                            {/* @ts-ignore */}
                            <Typography className="DownloadMessage" variant="body1" dangerouslySetInnerHTML={{ __html: orderConfirmationDetailsData?.orderdescription }} />
                            {/* <Typography variant="body1"><Button variant="text">View Online</Button> Copies of historical orders can also be viewed and downloaded from your <Button variant="text">Account History</Button></Typography> */}
                        </Box>
                    </Box>
                    <Stack className="ActionWrapper">
                        <Button className='ContinueBtn' size='large' variant="contained" onClick={() => {
                            navigate("/");
                        }}>Continue</Button>
                    </Stack>
                </Container>}
            </Box>
        </Layout>
    )
}

export default OrderConfirmation