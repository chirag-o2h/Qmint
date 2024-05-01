import RenderFields from '@/components/common/RenderFields'
import React, { useEffect, useState } from 'react'
import { Box, Button, MenuItem, Stack } from '@mui/material'
import { set, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
// import DateRangePicker from "./DateRangePicker"
import { CalendarDate, parseDate } from '@internationalized/date'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { getBuyBackOrderHistory, getOrderHistory } from '@/redux/reducers/myVaultReducer'
import { ENDPOINTS } from '@/utils/constants'
import { requestBodyOrderHistory } from '@/pages/my-vault/buy-back-order-history'
import useShowToaster from '@/hooks/useShowToaster'
import { Provider, lightTheme } from "@adobe/react-spectrum";
import { DateRangePicker } from '@adobe/react-spectrum'
import { FieldError, FieldErrors, UseFormRegister } from "react-hook-form";
export interface OrderDateInputs {
    OrderStatus: string,
    DateRange: {
        start: CalendarDate,
        end: CalendarDate
    } | undefined
}

const schema = yup.object().shape({
    OrderStatus: yup.string().trim().notOneOf(["none"], "Order Status is required field"),
    DateRange: yup.object().shape({
        start: yup.object().required("Start Date is required field"),
        end: yup.object().required("End Date is required field")
    }).required("Date Range is required field")
});

const OrderDateStatusSelector = ({ orderHistoryType }: { orderHistoryType: "buy-back" | "normal" }) => {
    const dispatch = useAppDispatch();
    const [dateRangeValue, setDateRangeValue] = useState<{
        start: CalendarDate,
        end: CalendarDate
    } | null>(null);
    const configDropdowns = useAppSelector(state => state.myVault.configDropdowns)
    const { showToaster } = useShowToaster()
    // const [dateRangeError, setDateRangeError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        clearErrors,
        setError,
        control,
        setValue,
        formState: { errors },
    } = useForm<OrderDateInputs>({
        resolver: yupResolver(schema)
    })

    const onSubmit = async (data: any) => {
        // console.log("Qmint", dateRangeValue)
        // if (dateRangeValue === null) {
        //     setDateRangeError("Date Range is required field")
        //     return
        // }
        const service = orderHistoryType === "buy-back" ? getBuyBackOrderHistory : getOrderHistory;
        const endPoint = orderHistoryType === "buy-back" ? ENDPOINTS.getBuyBackOrderHistory : ENDPOINTS.getOrderHistory

        await dispatch(service({
            url: endPoint, body: {
                ...requestBodyOrderHistory, filters: {
                    fromDate: dateRangeValue?.start.toString(),
                    toDate: dateRangeValue?.end.toString(),
                    orderStatusId: data.OrderStatus
                }
            }
        }))
    }

    const clearFiltersHandler = async () => {
        const service = orderHistoryType === "buy-back" ? getBuyBackOrderHistory : getOrderHistory;
        const endPoint = orderHistoryType === "buy-back" ? ENDPOINTS.getBuyBackOrderHistory : ENDPOINTS.getOrderHistory

        await dispatch(service({ url: endPoint, body: requestBodyOrderHistory }));
        setValue("OrderStatus", "none")
        setDateRangeValue(null)
        setValue("DateRange", undefined)
        clearErrors("DateRange")
        clearErrors("OrderStatus")
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} id="OrderDateStatusSelector" className='OrderDateStatusSelector'>
            <Stack className='OrderDateStatusSelectorWrapper'>
                <Stack className='OrderDateStatusWrapper'>
                    <Box className="DateCalenderWrapper">
                        {/* <DateRangePicker dateRangeValue={dateRangeValue} setDateRangeValue={setDateRangeValue} register={register} errors={errors} /> */}
                        <Box className="DateRangePickerWrapper">
                            <Provider theme={lightTheme} height="100%" colorScheme="light">
                                <RenderFields
                                    type="dateRange"
                                    name="DateRange"
                                    register={register}
                                    setValue={setValue}
                                    dateRangeValue={dateRangeValue}
                                    error={errors.DateRange && {
                                        type: "required",
                                        message: "Date Range is required field"
                                    }}
                                    clearErrors={clearErrors}
                                    setDateRangeValue={setDateRangeValue}
                                    margin="none"
                                />
                            </Provider>
                        </Box>
                    </Box>
                    <Box className="SelectStatusWrapper">
                        <RenderFields
                            type="select"
                            clearErrors={clearErrors}
                            register={register}
                            error={errors.OrderStatus}
                            name="OrderStatus"
                            control={control}
                            placeholder="Select Order Status"
                            variant='outlined'
                            value="none"
                            setValue={setValue}
                            getValues={getValues}
                            margin='none'
                            // required
                            className='SelectOrderStatus'
                        >
                            <MenuItem value="none">Select Order Status</MenuItem>
                            {orderHistoryType === "buy-back" ? (configDropdowns?.buybackOrderStatusList.map(status => <MenuItem key={status.id} value={status.id}>{status.name}</MenuItem>)) : (configDropdowns?.orderStatusList.map(status => <MenuItem key={status.id} value={status.id}>{status.name}</MenuItem>))}
                        </RenderFields>
                    </Box>
                </Stack>
                <Stack className="ButtonsWrapper">
                    <Button variant="contained" type="submit" size="large" color='primary' className="SearchButton">Search</Button>
                    <Button variant="contained" size="large" color='info' onClick={clearFiltersHandler} disabled={!dateRangeValue && getValues("OrderStatus") === "none"}>Clear</Button>
                </Stack>
            </Stack>
        </form>
    )
}

export default OrderDateStatusSelector
