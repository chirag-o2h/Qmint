import { Box, Button, Card, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import { IOrderHistoryApiResponseData } from '@/types/myVault'
import { useAppSelector } from '@/hooks'
import { Item } from '@adobe/react-spectrum';
import { roundOfThePrice } from '@/utils/common';

function OrderDetailsCard({ orderHistoryDetails }: { orderHistoryDetails: IOrderHistoryApiResponseData | null }) {
    const loading = useAppSelector(state => state.myVault.loading);

    return (
        <>
            {
                (orderHistoryDetails?.items?.length ?? 0) > 0 && orderHistoryDetails?.items?.map(item => {
                    return (
                        <Card className="OrderDetailsCard" key={item.orderId} >
                            <Stack className="TopWrapper">
                                <Typography className='OrderNumber' variant="subtitle2" component="h3">{item.customOrderNumber}</Typography>
                                <Button variant='contained' color='info'>Details</Button>
                            </Stack>
                            <Divider />
                            <Box className="OderDateInfoWrapper">
                                <Typography className='' variant="body1">Order Date</Typography>
                                <Typography className='' variant="body1">{item.createdOnUtc}</Typography>
                            </Box>
                            <Stack className='OrderTotalButtonsWrapper'>
                                <Box className='OrderTotalWrapper'>
                                    <Typography className='' variant="body1">Order Total</Typography>
                                    <Typography className='' variant="body1">${roundOfThePrice(item.orderTotal)}</Typography>
                                </Box>
                                <Stack className='OrderButtonsWrapper'>
                                    <Button variant="contained" size="small" style={{ backgroundColor: item?.orderStatusColor ?? "" }}>{item?.orderStatus}</Button>
                                    {item.alertStatus && <Button variant="contained" size="small" style={{ backgroundColor: item?.alertStatusColor ?? "" }}>{item.alertStatus}</Button>}
                                </Stack>
                            </Stack>
                        </Card>
                    )
                })}
            {orderHistoryDetails && !loading && (orderHistoryDetails?.items?.length ?? 0) === 0 && <Typography variant='body1'>record not found!</Typography>}
        </>
    )
}

export default OrderDetailsCard