import RenderFields from '@/components/common/RenderFields'
import React, { useEffect, useState } from 'react'
import { Box, Button, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material'
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
import { THEME_TYPE } from '@/axiosfolder'
import { SelectDropdown } from '@/assets/icons'
import { getCheckoutPageData } from '@/redux/reducers/checkoutReducer'
import useAPIoneTime from '@/hooks/useAPIoneTime'
export interface OrderDateInputs {
    OrderStatus: string,
    DateRange: {
        start: CalendarDate,
        end: CalendarDate
    } | undefined
}

const schema = yup.object().shape({
    // Removed mandatory order status field in searching
    // OrderStatus: yup.string().trim().notOneOf(["none"], "Order Status is required field"),
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
    const { checkoutPageData } = useAppSelector((state) => state.checkoutPage)
    const [selectAccount, setSelectAccount] = useState<any>(checkoutPageData?.customers?.[0]!)

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
                    orderStatusId: data.OrderStatus,
                    orderCustomerId: selectAccount?.customerId
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
    const [state, setState] = useState({ service: getCheckoutPageData, endPoint: ENDPOINTS.checkoutDetails, params: { isInstantBuy: false } })
    useAPIoneTime(state)
    useEffect(() => {
        if (checkoutPageData?.customers?.[0]) {
            setSelectAccount(checkoutPageData?.customers?.[0]!)
        }
    }, [checkoutPageData])
    const handleSelectAccount = (value: SelectChangeEvent) => {
        // console.log("🚀 ~ handleSelectAccount ~ event:", value)
        setSelectAccount(value as unknown as string);
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} id="OrderDateStatusSelector" className='OrderDateStatusSelector'>
            <Stack className='OrderDateStatusSelectorWrapper'>
                <Stack className='OrderDateStatusWrapper'>
                    {THEME_TYPE === "1" &&
                        <Box className="SelectAccountWrapper">
                            {checkoutPageData?.customers && checkoutPageData?.customers?.length > 0 && selectAccount && <Select
                                className='AccountSelect'
                                value={selectAccount}
                                onChange={handleSelectAccount}
                                fullWidth
                                variant='outlined'
                            >
                                {checkoutPageData?.customers?.map((customer) => <MenuItem value={customer as any}>{customer.firstName + ' ' + customer.lastName + ' ' + "(" + customer?.accounttype + ")"}</MenuItem>)}
                            </Select>}
                        </Box>
                    }
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
                            // clearErrors={clearErrors}
                            register={register}
                            // error={errors.OrderStatus}
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
