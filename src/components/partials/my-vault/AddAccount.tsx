
import React, { useEffect, useMemo, useRef, useState } from "react"
import { Autocomplete, MenuItem, Button, Stack, TextField, Box, Typography, FormHelperText } from "@mui/material"
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// Hooks
import { useAppDispatch, useAppSelector } from "@/hooks"

// Componenets
import StyledDialog from "@/components/common/StyledDialog"
import RenderFields from "@/components/common/RenderFields"
import GoogleMaps from "@/components/common/GoogleMaps"
import { ENDPOINTS } from "@/utils/constants";
import { hasFulfilled, AccountTypeEnumReverse, AccountTypeEnum } from "@/utils/common"
import useShowToaster from "@/hooks/useShowToaster"
import { AddressComponents } from "@/utils/parseAddressComponents"
import { addOrEditAccount, getAccounts } from "@/redux/reducers/myVaultReducer"
import { BussinessAccountFormSchema, IndividualAccountFormSchema, JointAccountFormSchema, SuperFundAccountFormSchema, TrustAccountFormSchema, commonAccountSchema } from "@/utils/accountFormSchemas.schema"
import { AxiosError } from "axios"
import AdditionalFields, { IField } from "./AdditionalFields"
import { Account } from "@/types/myVault"
import * as yup from 'yup'
import { isValidPhoneNumber } from "@/components/common/Utils"
import classNames from "classnames"

interface AddAccountProps {
  open: boolean
  dialogTitle: string
  alignment: string | null
  onClose: () => void
  addressTypeId?: number
  handleAddressUpdate?: (addressData: any, isbilling: any) => any
  hadleSecondaryAction?: () => void
  existingAccount?: Account
}

interface Inputs {
  BusinessName: string,
  SuperfundName: string,
  TrustName: string,
  TrusteeName: string,
  TrusteeType: string,
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
  AccountName?: string,
}

function AddAccount(props: AddAccountProps) {
  const { open, dialogTitle, alignment, onClose, hadleSecondaryAction, existingAccount } = props
  const isItUpdateTime = dialogTitle == "Update account"
  // console.log("🚀 ~ alignment:", alignment)
  const accountTypeText = useMemo(() => {
    if (!alignment) return ""
    return existingAccount ? alignment : AccountTypeEnumReverse[alignment];
  }, [existingAccount, AccountTypeEnumReverse, alignment])
  // console.log("🚀 ~ existingAccount:", existingAccount)
  const configDropdowns = useAppSelector(state => state.myVault.configDropdowns)
  const dispatch = useAppDispatch();
  const [stateList, setStateList] = useState<{ id: number, name: string }[]>([])
  const [stateId, setStateId] = useState<number | null>(null);
  const { showToaster } = useShowToaster();
  const loading = useAppSelector(state => state.checkoutPage.loading);
  const [googleAddressComponents, setGoogleAddressComponents] = useState<AddressComponents & { postalCode?: string } | null>(null);
  const [countryValue, setcountryValue] = useState<any>('none')
  const [trusteeTypeValue, setTrusteeTypeValue] = useState("none");
  const [stateValue, setstateValue] = useState<any>('')
  const [additionalFields, setAdditionalFields] = useState<IField[]>([{ [Math.random().toString(36).substring(7)]: { firstName: "", lastName: "" } }]);
  const [isAddressGoogleVerified, setIsAddressGoogleVerified] = useState<boolean>(false)
  const [phoneNumberValue, setPhoneNumberValue] = useState<{ value: string, country: any }>({
    value: "",
    country: {}
  })
  const firstTimeRender = useRef(true);

  useEffect(() => {
    setValue('Country', "none")
    if (accountTypeText === "Trust" || accountTypeText === "Superfund") {
      setValue('TrusteeType', "none")
    }
  }, [])

  useEffect(() => {
    if (!existingAccount) return;
    setValue('State', existingAccount?.address.stateName);
    setStateId(existingAccount?.address.stateId);
    setValue('Country', existingAccount?.address.countryId?.toString())
    // setValue("Contact",  
    setcountryValue(existingAccount?.address.countryId?.toString())
    setstateValue(existingAccount?.address.stateName)
    setPhoneNumberValue({
      value: existingAccount?.phoneNumber,
      country: {
        countryCode: "AU"
      }
    })
    setIsAddressGoogleVerified(true)
    const additionalBeneficiary = existingAccount?.additionalBeneficiary.map((beneficiary) => {
      return {
        [beneficiary.id]: {
          firstName: beneficiary.firstName,
          lastName: beneficiary.lastName
        }
      }
    })
    additionalBeneficiary.splice(1, 1)
    setAdditionalFields(() => additionalBeneficiary)
    return () => {
      reset()
    }
  }, [existingAccount])

  const updatedCommonAccountSchema = { ...commonAccountSchema, ...(isItUpdateTime ? { AccountName: yup.string().required("account name is required.").trim() } : {}) }

  function getSchemaFromAlignment(alignment: string) {
    switch (alignment) {
      case "Individual":
        return yup.object().shape({
          ...updatedCommonAccountSchema,
          Contact: yup.string().trim().test('valid-phone-number', 'Please enter a valid phone number',
            function (value) {
              if (value) return isValidPhoneNumber(value, phoneNumberValue?.country?.countryCode);
              else return false;
            })
        });
      case "Business":
        return yup.object().shape({
          ...updatedCommonAccountSchema,
          ...(isItUpdateTime ? {} : {  BusinessName: yup.string().trim().required("Bussiness Name is required field")}),
          Contact: yup.string().trim().test('valid-phone-number', 'Please enter a valid phone number',
            function (value) {
              if (value) return isValidPhoneNumber(value, phoneNumberValue?.country?.countryCode);
              else return false;
            })
        });
      case "Joint":
        return yup.object().shape({
          ...updatedCommonAccountSchema,
          Contact: yup.string().trim().test('valid-phone-number', 'Please enter a valid phone number',
            function (value) {
              if (value) return isValidPhoneNumber(value, phoneNumberValue?.country?.countryCode);
              else return false;
            })
        });
      case "Superfund":
        return yup.object().shape({
          ...updatedCommonAccountSchema,
          Contact: yup.string().trim().test('valid-phone-number', 'Please enter a valid phone number',
            function (value) {
              if (value) return isValidPhoneNumber(value, phoneNumberValue?.country?.countryCode);
              else return false;
            }),
          ...(isItUpdateTime ? {} : {
            SuperfundName: yup.string().trim().required("Superfund Name is required field"),
            TrusteeType: yup.string().trim().notOneOf(["none"], "Trustee Type is required field"),
            TrusteeName: yup.string().trim().required("Trustee Name is required field")
          })
        });
      case "Trust":
        return yup.object().shape({
          ...updatedCommonAccountSchema,
          Contact: yup.string().trim().test('valid-phone-number', 'Please enter a valid phone number',
            function (value) {
              if (value) return isValidPhoneNumber(value, phoneNumberValue?.country?.countryCode);
              else return false;
            }),
          ...(isItUpdateTime ? {} : {
            TrusteeName: yup.string().trim().required("Trustee Name is required field"),
            TrusteeType: yup.string().trim().notOneOf(["none"], "Trustee Type is required field"),
            TrustName: yup.string().trim().required("Trust Name is required field")
          })
        });
      default:
        return IndividualAccountFormSchema
    }
  }

  const {
    register,
    reset,
    handleSubmit,
    clearErrors,
    control,
    setError,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(getSchemaFromAlignment(accountTypeText))
  })

  const onAddressFormSubmitHandler = async (data: any) => {
    if (!alignment) {
      showToaster({ message: "Can not save address as Selected Account Type is not valid", severity: "warning" })
      return;
    }

    const additionalBeneficiary = additionalFields.filter(field => {
      return field[Object.keys(field)[0]].firstName !== "" || field[Object.keys(field)[0]].lastName !== ""
    }).map((field) => {
      // id static
      return { ...field[Object.keys(field)[0]], customerAdditionalBeneficiaryId: 0 }
    });

    const accountTypeId = existingAccount && alignment ? AccountTypeEnum[alignment] : alignment;

    const checkingWithGoogleAddress = googleAddressComponents && (data.Address1.trim() !== googleAddressComponents?.address.trim() || data.Address2.trim() !== googleAddressComponents?.address2.trim() || data.City.trim() !== googleAddressComponents?.city.trim() || data.State.trim() !== googleAddressComponents?.state.trim() || (googleAddressComponents?.postalCode && data.Code.trim() !== googleAddressComponents?.postalCode?.trim()))

    const checkingWithExistingAddress = !googleAddressComponents && (existingAccount?.address?.addressLine1.trim() !== data.Address1.trim() || existingAccount?.address?.addressLine2.trim() !== data?.Address2.trim() || data.City.trim() !== existingAccount?.address?.city?.trim() || data.State.trim() !== existingAccount?.address?.stateName.trim())


    let isAddressVerified = isAddressGoogleVerified;
    if (checkingWithGoogleAddress || (existingAccount && checkingWithExistingAddress)) {
      isAddressVerified = false
    }

    const commonAddressQueryForPreparation = {
      AccountName: data.AccountName,
      customerId: existingAccount?.customerId || undefined,
      firstName: data.FirstName,
      lastName: data.LastName,
      phoneNumber: data.Contact,
      email: data.Email,
      isVerified: isAddressVerified, // static
      city: data.City,
      state: stateId || 0,
      country: data.Country,
      accountTypeId: accountTypeId,
      additionalBeneficiary: additionalBeneficiary,
      address: {
        addressId: existingAccount?.address.addressId || undefined,
        firstName: data.FirstName,
        lastName: data.LastName,
        phoneNumber: data.Contact,
        email: data.Email,
        isVerified: isAddressVerified, // static
        addressLine1: data.Address1,
        addressLine2: data.Address2,
        city: data.City,
        state: stateId || 0,
        stateName: data.State,
        postcode: data.Code,
        countryId: data.Country,
        accountTypeId: accountTypeId,
      }
    }

    let queryAlignment = alignment;
    if (existingAccount) {
      queryAlignment = AccountTypeEnum[existingAccount.accountType]
    }
    let prepareAddressQuery;
    switch (AccountTypeEnumReverse[queryAlignment!.toString()]) {
      case "Joint":
        prepareAddressQuery = { ...commonAddressQueryForPreparation } // need to change for addtional beneficary
        break;
      case "Business":
        prepareAddressQuery = { ...commonAddressQueryForPreparation, businessName: data.BusinessName }
        break;
      case "Superfund":
        prepareAddressQuery = { ...commonAddressQueryForPreparation, superfundName: data.SuperfundName, trusteeTypeId: data.TrusteeType, trusteeName: data.TrusteeName }
        break;
      case "Trust":
        prepareAddressQuery = { ...commonAddressQueryForPreparation, trusteeName: data.TrusteeName, trustName: data.TrustName, trusteeTypeId: data.TrusteeType }
        break;
      default:
        prepareAddressQuery = { ...commonAddressQueryForPreparation }
        break;
    }

    const response = await dispatch(addOrEditAccount({
      url: ENDPOINTS.addOrEditAccount,
      body: prepareAddressQuery
    }))

    if (hasFulfilled(response.type)) {
      onClose()
      reset()
      showToaster({ message: "Account saved successfully", severity: "success" })
      await dispatch(getAccounts({ url: ENDPOINTS.getAccounts }))
    }
    else {
      showToaster({ message: ((response.payload as AxiosError).response?.data as { message?: string }).message || "Failed to save address! Please try again", severity: "error" })
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
    return () => {
      if (existingAccount) return;
      reset()
      setcountryValue("none")
      setPhoneNumberValue({ value: "", country: {} })
      firstTimeRender.current = true;
      setstateValue('')
    }
  }, [open]);

  useEffect(() => {
    if (googleAddressComponents) {
      setValue('Address1', googleAddressComponents.address)
      configDropdowns?.countryList.forEach((country) => {
        if (country.name === googleAddressComponents.country.trim()) {
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
      setIsAddressGoogleVerified(true)
      clearErrors('Country')
      clearErrors('State')
      clearErrors('City')
      clearErrors('Address1')
      clearErrors('Code')
    }
  }, [googleAddressComponents])

  useEffect(() => {
    const data: any = configDropdowns?.stateList.filter((state: any) => {
      return state.enumValue == countryValue 
    })
    setStateList(data)
  }, [countryValue])

  const OnChange = (value: any) => {
    setcountryValue(value)
    setValue('Country', value)
    setstateValue('')
    setValue('State', '')
    setIsAddressGoogleVerified(false)
  }
  // console.log("🚀 ~ AddAccount ~ additionalFields:" , alignment)
  return (
    <StyledDialog
      id="AddAccountDialog"
      open={open}
      dialogTitle={dialogTitle}
      onClose={onClose}
      primaryActionText="Save"
      maxWidth="sm"
    >
      <form onSubmit={handleSubmit(onAddressFormSubmitHandler)}>
        <Typography className="AccountType">Account Type : <Typography variant="inherit" component="span">{accountTypeText}</Typography></Typography>
        <Stack className="FieldsWrapper">
          {isItUpdateTime && <Stack className="Fields BusinessFields">
            <RenderFields
              register={register}
              error={errors.AccountName}
              name="AccountName"
              placeholder="Enter account name*"
              control={control}
              variant='outlined'
              defaultValue={existingAccount?.accountName}
              margin='none'
            />
          </Stack>}
          {accountTypeText === "Business" && !isItUpdateTime && <Stack className="Fields BusinessFields">
            <RenderFields
              register={register}
              error={errors.BusinessName}
              name="BusinessName"
              placeholder="Enter business name*"
              control={control}
              variant='outlined'
              margin='none'
            />
          </Stack>}
          {accountTypeText === "Superfund" && !isItUpdateTime && <Stack className="Fields SuperfundFields">
            <RenderFields
              register={register}
              error={errors.SuperfundName}
              name="SuperfundName"
              placeholder="Enter superfund name*"
              control={control}
              variant='outlined'
              margin='none'
            />
            <Stack className="Column">
              <RenderFields
                register={register}
                type="select"
                clearErrors={clearErrors}
                control={control}
                error={errors.TrusteeType}
                setValue={setValue}
                getValues={getValues}
                value={trusteeTypeValue}
                name="TrusteeType"
                variant='outlined'
                margin='none'
              >
                <MenuItem value="none">Select trustee type*</MenuItem>
                {configDropdowns && configDropdowns.trusteeTypeList.map((trustee) =>
                  <MenuItem key={trustee.id} value={trustee.id}>{trustee.name}</MenuItem>
                )}
              </RenderFields>
              <RenderFields
                register={register}
                error={errors.TrusteeName}
                name="TrusteeName"
                placeholder="Enter trustee name*"
                control={control}
                variant='outlined'
                margin='none'
              />
            </Stack>
          </Stack>}
          {accountTypeText === "Trust" && !isItUpdateTime && <Stack className="Fields TrustFields">
            <Stack className="Column">
              <RenderFields
                register={register}
                type="select"
                clearErrors={clearErrors}
                control={control}
                error={errors.TrusteeType}
                setValue={setValue}
                value={trusteeTypeValue}
                getValues={getValues}
                name="TrusteeType"
                variant='outlined'
                margin='none'
              >
                <MenuItem value="none" selected>Select trustee type*</MenuItem>
                {configDropdowns && configDropdowns.trusteeTypeList.map((trustee) =>
                  <MenuItem key={trustee.id} value={trustee.id}>{trustee.name}</MenuItem>
                )}
              </RenderFields>
              <RenderFields
                register={register}
                error={errors.TrusteeName}
                name="TrusteeName"
                placeholder="Enter trustee name *"
                control={control}
                variant='outlined'
                margin='none'
              />
            </Stack>
            <RenderFields
              register={register}
              error={errors.TrustName}
              name="TrustName"
              placeholder="Enter trust name *"
              control={control}
              variant='outlined'
              margin='none'
            />
          </Stack>}
          <Stack className="Fields AllFields">
            <Stack className="Column">
              <RenderFields
                register={register}
                error={errors.FirstName}
                name="FirstName"
                defaultValue={existingAccount?.firstName}
                placeholder="Enter first name*"
                control={control}
                variant='outlined'
                margin='none'
              />
              <RenderFields
                register={register}
                error={errors.LastName}
                name="LastName"
                defaultValue={existingAccount?.lastName}
                placeholder="Enter last name*"
                control={control}
                variant='outlined'
                margin='none'
              />
            </Stack>
            <Stack className="Column">
              <Box className="ContactField">
                <RenderFields
                  register={register}
                  type="phoneInput"
                  control={control}
                  // defaultValue={existingAccount?.phoneNumber}
                  setValue={setValue}
                  name="Contact"
                  value={phoneNumberValue.value}
                  setPhoneNumberValue={setPhoneNumberValue}
                  variant="outlined"
                  margin="none"
                  className="ContactSelect"
                  error={errors.Contact}
                ></RenderFields>
              </Box>
              <RenderFields
                register={register}
                error={errors.Email}
                defaultValue={existingAccount?.email}
                name="Email"
                placeholder="Enter email id*"
                control={control}
                variant='outlined'
                margin='none'
              />
            </Stack>
            <GoogleMaps setParsedAddress={setGoogleAddressComponents} />
            <Stack className="Column">
              <RenderFields
                register={register}
                error={errors.Address1}
                defaultValue={existingAccount?.address.addressLine1}
                name="Address1"
                placeholder="Enter address line 1*"
                control={control}
                variant='outlined'
                margin='none'
              />
              <RenderFields
                register={register}
                error={errors.Address2}
                defaultValue={existingAccount?.address.addressLine2}
                name="Address2"
                placeholder="Enter address line 2"
                control={control}
                variant='outlined'
                margin='none'
              />
            </Stack>
            <Stack className="Column">
              <RenderFields
                register={register}
                error={errors.City}
                defaultValue={existingAccount?.address.city}
                name="City"
                placeholder="Enter city*"
                control={control}
                variant='outlined'
                margin='none'
              />
              <Box className='InputRow'>
                <Autocomplete
                  disablePortal
                  options={stateList}
                  defaultValue={existingAccount?.address.stateName}
                  getOptionLabel={(option: any) => {
                    if (typeof option === 'string') {
                      return option;
                    }
                    return option.name;
                  }}
                  renderInput={(params) => <TextField placeholder="Enter state*" {...params} error={errors.State as boolean | undefined} />}
                  onChange={(_, value: any) => {
                    if (!value) {
                      return;
                    }

                    if (typeof value === 'string') {
                      setValue('State', value);
                    } else {
                      setValue('State', value?.name);
                      setStateId(value?.id ? value?.id : null);
                    }
                  }}
                  inputValue={stateValue ?? ""}
                  // defaultValue={getValues('State')}
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
                  freeSolo />
                {!!errors["State"] && (
                  <FormHelperText className={classNames({ "Mui-error": !!errors["State"] })}>
                    {errors["State"].message}
                  </FormHelperText>
                )}
              </Box>
            </Stack>
            <Stack className="Column">
              <RenderFields
                type="number"
                register={register}
                error={errors.Code}
                name="Code"
                defaultValue={existingAccount?.address.postcode?.toString()}
                placeholder="Enter zip / postal code*"
                control={control}
                variant='outlined'
                margin='none'
              />
              <RenderFields
                register={register}
                type="select"
                control={control}
                error={errors.Country}
                defaultValue={existingAccount?.address.countryId ?? "none"}
                name="Country"
                clearErrors={clearErrors}
                variant='outlined'
                margin='none'
                // defaultValue={"-1
                getValues={getValues}
                value={countryValue}
                setValue={setValue}
                onChange={OnChange}
              >
                <MenuItem value="none" selected>Select country*</MenuItem>
                {configDropdowns?.countryList.map((country) => (
                  <MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>
                ))}
              </RenderFields>
            </Stack>
          </Stack>
          {accountTypeText === "Joint" && <AdditionalFields fields={additionalFields} setFields={setAdditionalFields} />}
        </Stack>
        <Stack className="ActionWrapper">
          <Button variant="outlined" onClick={hadleSecondaryAction}>
            Back
          </Button>
          <Button variant="contained" type="submit" disabled={loading}>
            Save
          </Button>
        </Stack>
      </form>
    </StyledDialog >
  )
}

export default AddAccount