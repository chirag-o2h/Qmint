
import React, { useEffect, useRef, useState } from "react"
import { Autocomplete, MenuItem, Button, Stack, TextField, Box, FormHelperText } from "@mui/material"
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// Hooks
import { useAppDispatch, useAppSelector } from "@/hooks"

// Componenets
import StyledDialog from "@/components/common/StyledDialog"
import RenderFields from "@/components/common/RenderFields"
import GoogleMaps from "@/components/common/GoogleMaps"
import { StateOrCountry, addAddress as addAddressForCheckout, addOrEditAddress as addOrEditAddressForCheckout } from "@/redux/reducers/checkoutReducer";
import { containsForbiddenKeyword, ENDPOINTS, forbiddenKeywords, messageForForbiddenKeyword } from "@/utils/constants";
import {  hasFulfilled } from "@/utils/common"
import useShowToaster from "@/hooks/useShowToaster"
import { AddressComponents } from "@/utils/parseAddressComponents"
import { AddressType } from "@/types/enums"
import { addOrEditAddresses as addOrEditAddressForMyVault, addAddress as addAddressForMyVault, getAddresses } from "@/redux/reducers/myVaultReducer"
import { isValidPhoneNumber } from "@/components/common/Utils"
import { CountryCode } from "libphonenumber-js"
import { CountryData } from "react-phone-input-2"
import classNames from "classnames"

interface AddAddress {
    open: boolean
    dialogTitle: string
    onClose: () => void
    addressTypeId?: number
    handleAddressUpdate?: (addressData: any, isbilling: any) => any
}

interface Inputs {
    FirstName: string,
    LastName: string,
    Company: string,
    Contact: string,
    Email: string,
    Address1: string,
    Address2: string,
    City: string,
    Country: string,
    State: string,
    Code: number,
}
// export const addressSchema = yup.object().shape({
//     FirstName: yup.string().trim().required('First name is a required field'),
//     LastName: yup.string().trim().required('Last name is a required field'),
//     Company: yup.string().trim(),
//     Contact: yup.string().trim(),
//     Email: yup.string().email().required(),
//     Address1: yup.string().trim().required("Address 1 in required field"),
//     Address2: yup.string().trim(),
//     City: yup.string().required().trim(),
//     State: yup.string().required(),
//     Country: yup.string().notOneOf(["none"], "Country is required field"),
//     Code: yup.string().required('Zip / Postal code is required').trim(),
// })

function AddAddress(props: AddAddress) {
    const { open, dialogTitle, onClose, addressTypeId, handleAddressUpdate } = props
    const dispatch = useAppDispatch();
    const countryList = useAppSelector(state => state.checkoutPage.countryList);
    const stateListall = useAppSelector(state => state.checkoutPage.stateList);
    const [stateList, setStateList] = useState<{ id: number, name: string }[]>([])
    // const [stateId, setStateId] = useState<number | null>(null);
    const { showToaster } = useShowToaster();
    const loading = useAppSelector(state => state.checkoutPage.loading);
    const [googleAddressComponents, setGoogleAddressComponents] = useState<AddressComponents & { postalCode?: string } | null>(null);
    const [countryValue, setcountryValue] = useState<any>('none')
    const [isAddressGoogleVerified, setIsAddressGoogleVerified] = useState<boolean>(false)
    // console.log("🚀 ~ AddAddress ~ isAddressGoogleVerified:", isAddressGoogleVerified)
    const [stateValue, setstateValue] = useState<any>(undefined)
    const [phoneNumberValue, setPhoneNumberValue] = useState<{ value: string, country: any }>({
        value: "",
        country: {}
    })
    const firstTimeRender = useRef(true);

    const addressSchema = yup.object().shape({
        FirstName: yup.string().trim().required('First name is a required field'),
        LastName: yup.string().trim().required('Last name is a required field'),
        Company: yup.string().trim(),
        Contact: yup.string().trim().test('valid-phone-number', 'Please enter a valid phone number',
            function (value) {
                if (value) return isValidPhoneNumber(value, phoneNumberValue?.country?.countryCode);
                else return false;
            }),
        Email: yup.string().email().required(),
        // Address1: yup.string().trim().required("Address 1 in required field"),
        // Address2: yup.string().trim(),
        Address1: yup.string().trim()
            .required("Address 1 is a required field")
            .test("forbidden-keyword", `in Address 1 ${messageForForbiddenKeyword}`, function (value) {
                return !containsForbiddenKeyword(value, forbiddenKeywords);
            }),
        Address2: yup.string().trim()
            .test("forbidden-keyword", `in Address 2 ${messageForForbiddenKeyword}`, function (value) {
                return !containsForbiddenKeyword(value, forbiddenKeywords);
            }),
        City: yup.string().required().trim(),
        State: yup.string().required().trim(),
        Country: yup.string().notOneOf(["none"], "Country is required field"),
        Code: yup.string().required('Zip / Postal code is required').trim(),
    })
    const {
        register,
        reset,
        clearErrors,
        handleSubmit,
        control,
        setValue,
        setError,
        getValues,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: yupResolver(addressSchema)
    })

    useEffect(() => {
        if (firstTimeRender.current) {
            firstTimeRender.current = false;
            return;
        }
        if (!isValidPhoneNumber(phoneNumberValue.value, phoneNumberValue?.country?.countryCode)) {
            setError("Contact", {
                type: "manual",
                message: "Please enter a valid phone number"
            });
        }
        else {
            clearErrors("Contact")
        }
    }, [phoneNumberValue])

    useEffect(() => {
        setValue("Country", "none");
    }, [])

    const onAddressFormSubmitHandler = async (data: any) => {
        // set is verified false if different from google account address not matches with current address
        let isAddressVerified = isAddressGoogleVerified;
        if (googleAddressComponents && (data.Address1.trim() !== googleAddressComponents?.address.trim() || data.Address2.trim() !== googleAddressComponents?.address2.trim() || data.City.trim() !== googleAddressComponents?.city.trim() || data.State.trim() !== googleAddressComponents?.state.trim() || (googleAddressComponents?.postalCode && data.Code.trim() !== googleAddressComponents?.postalCode?.trim()))) {
            isAddressVerified = false
        }

        const stateId = stateList.find((state) => state.name === data.State)?.id;

        const addressQuery = {
            addressTypeId,
            firstName: data.FirstName,
            lastName: data.LastName,
            company: data.Company,
            phoneNumber: data.Contact,
            email: data.Email,
            isVerified: isAddressVerified,
            addressLine1: data.Address1,
            addressLine2: data.Address2,
            city: data.City,
            stateId: stateId || 0,
            stateName: data.State,
            postcode: data.Code,
            countryId: data.Country,
        }
        if (!isValidPhoneNumber(phoneNumberValue.value, phoneNumberValue?.country?.countryCode)) {
            return;
        }
        // to show whether it is coming from my-vault or checkout
        if (!addressTypeId) {
            addressQuery["addressTypeId"] = undefined;

            const response = await dispatch(addOrEditAddressForMyVault(
                {
                    url: ENDPOINTS.addOrEditAddressesInMyVault,
                    body: { ...addressQuery, "IsOrder": false }
                }
            ))

            if (hasFulfilled(response.type)) {
                onClose()
                reset()
                showToaster({ message: "Address saved successfully", severity: "success" })
                await dispatch(getAddresses({ url: ENDPOINTS.getAddresses }) as any);
            } else {
                showToaster({ message: "Failed to save address. Please check the input fields", severity: "error" })
            }
        }
        else {
            const response = await dispatch(addOrEditAddressForCheckout({
                url: ENDPOINTS.addOrEditAddress,
                body: {
                    ...addressQuery, "IsOrder": true
                }
            }))
            let addressId;
            if (hasFulfilled(response?.type)) {
                addressId = (response?.payload as any)?.data?.data;
            }

            const needToadd = {
                ...addressQuery,
                addressId: addressId,
                addressType: addressTypeId,
                customerId: null,
                state: addressQuery.stateId,
                country: addressQuery.countryId,
                phone1: addressQuery.phoneNumber,
                isSource: null,
                "countryName": "Australia"
            }
            if (hasFulfilled(response.type)) {
                dispatch(addAddressForCheckout(needToadd))
                handleAddressUpdate!(needToadd, addressTypeId == AddressType.Billing)
                onClose()
                reset()
                showToaster({ message: "Address saved successfully", severity: "success" })
            } else {
                showToaster({ message: "Failed to save address. Please check the input fields", severity: "error" })
            }
        }
    }

    useEffect(() => {
        return () => {
            reset()
            setcountryValue("none")
            setstateValue('')
            setPhoneNumberValue({
                value: "",
                country: {}
            })
            firstTimeRender.current = true;
            setIsAddressGoogleVerified(false)
        }
    }, [open]);

    useEffect(() => {
        if (googleAddressComponents) {
            setValue('Address1', googleAddressComponents.address)
            countryList.forEach((country: StateOrCountry) => {
                if (country.name === googleAddressComponents.country.trim()) {
                    setValue('Country', country.id.toString())
                    setcountryValue(country.id.toString())
                }
            })
            setValue('State', googleAddressComponents.state)
            setstateValue(googleAddressComponents.state)
            setValue('City', googleAddressComponents?.city)
            setValue('Address2', googleAddressComponents.address2)
            if (googleAddressComponents?.postalCode) {
                setValue("Code", Number(googleAddressComponents?.postalCode));
            }
            setIsAddressGoogleVerified(true);
            clearErrors('Country')
            clearErrors('State')
            clearErrors('City')
            clearErrors('Address1')
            clearErrors('Code')
        }
    }, [googleAddressComponents])


    useEffect(() => {
        const data: any = stateListall?.filter((state) => {
            return state.enumValue == countryValue
        })
        setStateList(data)
    }, [countryValue])

    const OnChange = (value: any) => {
        setcountryValue(value)
        setValue('Country', value)
        setstateValue("");
        setValue("State","")
        setIsAddressGoogleVerified(false)
    }

    return (
        <StyledDialog
            id="UpdateAddress"
            open={open}
            dialogTitle={dialogTitle}
            onClose={onClose}
            primaryActionText="Save"
            maxWidth="sm"
        >
            <form onSubmit={handleSubmit(onAddressFormSubmitHandler)}
            >
                <Stack className="AllFields" >
                    <Stack className="Column">
                        <RenderFields
                            register={register}
                            error={errors.FirstName}
                            name="FirstName"
                            placeholder="Enter first name*"
                            control={control}
                            // setValue={setValue}
                            variant='outlined'
                            margin='none'
                        />
                        <RenderFields
                            register={register}
                            error={errors.LastName}
                            name="LastName"
                            placeholder="Enter last name*"
                            control={control}
                            variant='outlined'
                            margin='none'
                        />

                    </Stack>
                    <RenderFields
                        register={register}
                        error={errors.Company}
                        name="Company"
                        placeholder="Enter company"
                        control={control}
                        variant='outlined'
                        margin='none'
                    />
                    <Stack className="Column">
                        {/* <Box className="ContactField"> */}
                        <RenderFields
                            register={register}
                            type="phoneInput"
                            control={control}
                            setValue={setValue}
                            value={phoneNumberValue.value}
                            setPhoneNumberValue={setPhoneNumberValue}
                            name="Contact"
                            variant="outlined"
                            margin="none"
                            className="ContactSelect"
                            error={errors.Contact}
                        ></RenderFields>
                        {/* </Box> */}
                        <RenderFields
                            register={register}
                            error={errors.Email}
                            name="Email"
                            placeholder="Enter email id*"
                            control={control}
                            variant='outlined'
                            margin='none'
                        />
                    </Stack>
                    <GoogleMaps setParsedAddress={setGoogleAddressComponents} />
                    <RenderFields
                        register={register}
                        error={errors.Address1}
                        name="Address1"
                        placeholder="Enter address line 1*"
                        control={control}
                        variant='outlined'
                        margin='none'
                    />
                    <RenderFields
                        register={register}
                        error={errors.Address2}
                        name="Address2"
                        placeholder="Enter address line 2"
                        control={control}
                        variant='outlined'
                        margin='none'
                    />
                    <Stack className="Column">
                        <RenderFields
                            register={register}
                            error={errors.City}
                            name="City"
                            placeholder="Enter city*"
                            control={control}
                            variant='outlined'
                            margin='none'
                        />
                        {countryList?.length > 0 && <RenderFields
                            register={register}
                            type="select"
                            control={control}
                            clearErrors={clearErrors}
                            error={errors.Country}
                            name="Country"
                            getValues={getValues}
                            variant='outlined'
                            margin='none'
                            value={countryValue}
                            setValue={setValue}
                            onChange={OnChange}

                        // onChange={OnChange}
                        >
                            <MenuItem value="none">Select country *</MenuItem>
                            {countryList.map((country: StateOrCountry) => (
                                <MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>
                            ))}
                        </RenderFields>}
                    </Stack>
                    <Stack className="Column">
                        {/* <RenderFields
                            type="autocomplete"
                            register={register}
                            error={errors.State}
                            name="State"
                            placeholder="Enter state *"
                            control={control}
                            getValues={getValues}
                            variant='outlined'
                            clearErrors={clearErrors}
                            setError={setError}
                            value={stateValue}
                            setValue={setValue}
                            margin='none'
                            setAutoCompleteValue={setstateValue}
                            autocompleteOptions={stateList}
                        /> */}
                        <Box className='InputRow'>
                            <Autocomplete
                                disablePortal
                                options={stateList}
                                getOptionLabel={option => {
                                    if (typeof option === 'string') {
                                        return option;
                                    }
                                    return option.name;
                                }}
                                renderInput={(params) => <TextField placeholder="Enter state *" {...params} error={errors.State as boolean | undefined} />}
                                fullWidth
                                onChange={(_, value) => {
                                    if (!value) {
                                        return;
                                    }

                                    if (typeof value === 'string') {
                                        setValue('State', value);
                                    }
                                    else {
                                        setValue('State', value.name);
                                        // setStateId(value.id);
                                    }
                                }}
                                inputValue={stateValue ?? ""}
                                onInputChange={(event, newInputValue) => {
                                    if (event.type !== "click" && stateList.length > 0) {
                                        return
                                    }
                                    setValue('State', newInputValue); // Update the form value with the manually typed input
                                    setstateValue(newInputValue)
                                    if (newInputValue !== "") {
                                        clearErrors("State")
                                    }
                                    else {
                                        setError("State", {
                                            type: "manual",
                                            message: "State is a required field"
                                        });
                                    }
                                }}
                                freeSolo
                            />
                            {!!errors["State"] && (
                                <FormHelperText className={classNames({ "Mui-error": !!errors["State"] })}>
                                    {errors.State.message}
                                </FormHelperText>
                            )}
                        </Box>
                        <RenderFields
                            type="number"
                            register={register}
                            error={errors.Code}
                            name="Code"
                            placeholder="Enter zip / postal code*"
                            control={control}
                            variant='outlined'
                            margin='none'
                        />
                    </Stack>
                    <Stack className="ActionWrapper">
                        <Button variant="outlined" onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="contained" type="submit" disabled={loading}>
                            Submit
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </StyledDialog >
    )
}

export default AddAddress