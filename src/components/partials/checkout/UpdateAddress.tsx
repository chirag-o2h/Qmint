
import React, { useEffect, useRef, useState } from "react"
import { Autocomplete, MenuItem, Button, Stack, TextField, Box, Typography, FormHelperText } from "@mui/material"
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import classNames from "classnames"

// Hooks
import { useAppDispatch, useAppSelector } from "@/hooks"

// Componenets
import StyledDialog from "@/components/common/StyledDialog"
import RenderFields from "@/components/common/RenderFields"
import GoogleMaps from "@/components/common/GoogleMaps"
import { StateOrCountry, addOrEditAddress as addOrEditAddressForCheckout, updateAddress as updateAddressForCheckout } from "@/redux/reducers/checkoutReducer";
import { ENDPOINTS } from "@/utils/constants";
import {  hasFulfilled } from "@/utils/common"
// import { addressSchema } from "./AddAddress"
import useShowToaster from "@/hooks/useShowToaster"
import { AddressComponents } from "@/utils/parseAddressComponents"
import { addOrEditAddresses as addOrEditAddressForMyVault, getAddresses, updateAddress as updateAddressForMyVault } from "@/redux/reducers/myVaultReducer"
import { isValidPhoneNumber } from "@/components/common/Utils"

interface UpdateAddress {
  open: boolean
  dialogTitle: string
  onClose: () => void
  existingAddress?: any
  isComingFromMyVault?: boolean
}

interface Inputs {
  FirstName: string,
  LastName: string,
  Company: string,
  Contact: string,
  ContactCode: string,
  Email: string,
  Address1: string,
  Address2: string,
  City: string,
  Country: string,
  State: string,
  Code: number,
}

function UpdateAddress(props: UpdateAddress) {
  const { open, dialogTitle, onClose, existingAddress, isComingFromMyVault } = props
  // console.log("🚀 ~ UpdateAddress ~ existingAddress:", existingAddress)
  const loading = useAppSelector(state => state.checkoutPage.loading);
  const countryList = useAppSelector(state => state.checkoutPage.countryList);
  const stateListall = useAppSelector(state => state.checkoutPage.stateList);
  const [stateList, setStateList] = useState([])
  const [stateId, setStateId] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const { showToaster } = useShowToaster();
  const [googleAddressComponents, setGoogleAddressComponents] = useState<AddressComponents & { postalCode?: string } | null>(null);
  const [countryValue, setcountryValue] = useState<any>('')
  const [stateValue, setstateValue] = useState<any>('')
  const [isAddressGoogleVerified, setIsAddressGoogleVerified] = useState<boolean>(false)
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
    Address1: yup.string().trim().required("Address 1 in required field"),
    Address2: yup.string().trim(),
    City: yup.string().required().trim(),
    State: yup.string().required(),
    Country: yup.string().notOneOf(["none"], "Country is required field"),
    Code: yup.string().required('Zip / Postal code is required').trim(),
  })

  const {
    register,
    reset,
    handleSubmit,
    setError,
    control,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(addressSchema)
  })

  const onAddressFormSubmitHandler = async (data: any) => {
    let isAddressVerified = isAddressGoogleVerified;

    const checkingWithGoogleAddress = googleAddressComponents && (data.Address1.trim() !== googleAddressComponents?.address.trim() || data.Address2.trim() !== googleAddressComponents?.address2.trim() || data.City.trim() !== googleAddressComponents?.city.trim() || data.State.trim() !== googleAddressComponents?.state.trim() || (googleAddressComponents?.postalCode && data.Code.trim() !== googleAddressComponents?.postalCode?.trim()))

    // NOTE - need to check with existing also later on
    const checkingWithExistingAddress = !googleAddressComponents && (existingAddress?.addressLine1.trim() !== data.Address1.trim() || existingAddress?.addressLine2.trim() !== data?.Address2.trim() || data.City.trim() !== existingAddress?.city?.trim() || data.State.trim() !== existingAddress?.stateName.trim())

    if (checkingWithGoogleAddress || checkingWithExistingAddress) {
      isAddressVerified = false
    }

    const addressQuery = {
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

    if (isComingFromMyVault === true) {
      const response = await dispatch(addOrEditAddressForMyVault({
        url: ENDPOINTS.addOrEditAddressesInMyVault,
        body: {
          ...addressQuery,
          addressId: existingAddress.addressId
        }
      }))

      if (hasFulfilled(response.type)) {
        onClose()
        reset()
        showToaster({ message: "Address saved successfully", severity: 'success' })
        await dispatch(getAddresses({ url: ENDPOINTS.getAddresses }) as any);
      } else {
        showToaster({ message: "Failed to save address", severity: 'error' })
      }
    }
    else {
      const response = await dispatch(addOrEditAddressForCheckout({
        url: ENDPOINTS.addOrEditAddress,
        body: {
          ...addressQuery,
          addressId: existingAddress.addressId
        }
      }))

      if (hasFulfilled(response.type)) {
        onClose()
        reset()
        showToaster({ message: "Address saved successfully", severity: 'success' })
        dispatch(updateAddressForCheckout({
          ...existingAddress,
          firstName: data.FirstName,
          lastName: data.LastName,
          company: data.Company,
          phone1: data.Contact,
          email: data.Email,
          addressLine1: data.Address1,
          addressLine2: data.Address2,
          city: data.City,
          stateName: data.State,
          postcode: data.Code,
          country: data.Country,
          countryName: countryList.find((country: StateOrCountry) => country.id === data.Country)?.name,
          state: stateId,
        }))
      } else {
        showToaster({ message: "Failed to save address", severity: 'error' })
      }
    }
  }

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
    if (googleAddressComponents) {
      setValue('Address1', googleAddressComponents.address)
      countryList.forEach((country: StateOrCountry) => {
        if (country.name === googleAddressComponents.country) {
          setValue('Country', country.id.toString())
          setcountryValue(country.id.toString())
        }
      })
      setValue('State', googleAddressComponents.state)
      setstateValue(googleAddressComponents.state)
      setStateId(() => null);
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
    setValue('State', existingAddress?.stateName);
    setStateId(existingAddress?.state);
    setValue('Country', existingAddress?.country || existingAddress?.countryId)
    setValue("Contact", existingAddress?.phoneNumber)
    setcountryValue(existingAddress?.country || existingAddress?.countryId)
    setstateValue(existingAddress?.stateName)
    setPhoneNumberValue({
      value: existingAddress?.phoneNumber,
      country: {
        countryCode: "AU"
      }
    })
    setIsAddressGoogleVerified(existingAddress?.isVerified)
    return () => {
      reset()
      setIsAddressGoogleVerified(false)
      setGoogleAddressComponents(null)
      setPhoneNumberValue({
        value: "",
        country: {}
      })
      firstTimeRender.current = true;
    }
  }, [existingAddress])

  useEffect(() => {
    const data: any = stateListall?.filter((state) => {
      return state.enumValue == countryValue || countryValue == "none"
    })
    setStateList(data)
  }, [countryValue])

  const OnChange = (value: any) => {
    setcountryValue(value)
    setValue('Country', value)
    setstateValue("")
    setValue("State", "")
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
      <form onSubmit={handleSubmit(onAddressFormSubmitHandler)}>
        <Stack className="AllFields" >
          <Stack className="Column">
            <RenderFields
              register={register}
              error={errors.FirstName}
              name="FirstName"
              placeholder="Enter first name*"
              control={control}
              // setValue={setValue}
              defaultValue={existingAddress?.firstName}
              variant='outlined'
              margin='none'
            />
            <RenderFields
              register={register}
              error={errors.LastName}
              defaultValue={existingAddress?.lastName}
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
            defaultValue={existingAddress?.company}
            placeholder="Enter company"
            control={control}
            variant='outlined'
            margin='none'
          />
          <Stack className="Column">
            <RenderFields
              register={register}
              type="phoneInput"
              control={control}
              setValue={setValue}
              name="Contact"
              variant="outlined"
              margin="none"
              className="ContactSelect"
              error={errors.Contact}
              value={phoneNumberValue.value}
              setPhoneNumberValue={setPhoneNumberValue}
            ></RenderFields>
            <RenderFields
              register={register}
              error={errors.Email}
              name="Email"
              defaultValue={existingAddress?.email}
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
            defaultValue={existingAddress?.addressLine1}
            placeholder="Enter address line 1*"
            control={control}
            variant='outlined'
            margin='none'
          />
          <RenderFields
            register={register}
            error={errors.Address2}
            name="Address2"
            defaultValue={existingAddress?.addressLine2}
            placeholder="Enter address line 2"
            control={control}
            variant='outlined'
            margin='none'
          />
          <Stack className="Column">
            <RenderFields
              register={register}
              error={errors.City}
              defaultValue={existingAddress?.city}
              name="City"
              placeholder="Enter city*"
              control={control}
              variant='outlined'
              margin='none'
            />
            <RenderFields
              register={register}
              type="select"
              control={control}
              clearErrors={clearErrors}
              error={errors.Country}
              name="Country *"
              defaultValue={existingAddress?.country || existingAddress?.countryId}
              value={countryValue}
              variant='outlined'
              margin='none'
              onChange={OnChange}
              setValue={setValue}
            >
              <MenuItem value="none">Select country</MenuItem>
              {countryList.map((country: StateOrCountry) => (
                <MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>
              ))}
            </RenderFields>
          </Stack>
          <Stack className="Column">
            <Box className='InputRow'>
              <Autocomplete
                disablePortal
                options={stateList}
                defaultValue={existingAddress?.stateName}
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
                    setStateId(value.id);
                  }
                }}
                inputValue={stateValue ?? ""}
                onInputChange={(event, newInputValue) => {
                  if (event?.type !== "click" && stateList?.length > 0) {
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
                  {errors["State"].message}
                </FormHelperText>
              )}
            </Box>
            <RenderFields
              type="number"
              register={register}
              error={errors.Code}
              name="Code"
              defaultValue={existingAddress?.postcode}
              placeholder="Enter pin code*"
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

export default React.memo(UpdateAddress);