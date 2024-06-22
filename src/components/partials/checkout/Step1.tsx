import React, { useState, useRef, useEffect, useCallback, useMemo } from "react"
import { Box, Button, Checkbox, FormControlLabel, Icon, IconButton, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select, Stack, Typography } from "@mui/material"

// Hooks
import { useAppDispatch, useAppSelector, useToggle } from "@/hooks"

// Type
import type { SelectChangeEvent } from "@mui/material"

// Assets
import { ChevronDown, ChevronUp, CrossIconWithOutlineCircle, Map1Icon, Map2Icon, OfferTagIcon, OptionsIcon, PencilIcon, SelectDropdown, VerifiedIcon } from "@/assets/icons"

// Componenets
import { ClickTooltip } from "@/components/common/CustomTooltip"
import StepWrapper from "./StepWrapper"
import UpdateAddress from "./UpdateAddress"
import SelectAddress from "./SelectAddress"
import AlertDialog from "./AlertDialog"
import { navigate } from "gatsby"
import { getStateAndCountryLists, updateFinalDataForTheCheckout } from "@/redux/reducers/checkoutReducer"
import AddAddress from "./AddAddress"
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { ENDPOINTS } from "@/utils/constants"
import { AddressType } from "@/types/enums"
import RenderFields from "@/components/common/RenderFields"
import AgentContent from "./AgentContent"

function Step1() {
  const dispatch = useAppDispatch()
  const { configDetails: configDetailsState } = useAppSelector((state) => state.homePage)
  const { checkoutPageData } = useAppSelector((state) => state.checkoutPage)
  const [shippingAddress, setShippingAddress] = useState<any>(checkoutPageData?.shippingAddressDetails?.[0])
  const [billingAddress, setBillingAddress] = useState<any>(checkoutPageData?.billingAddressDetails?.[0]);
  const [openShipingAddreddOptions, setOpenShipingAddreddOptions] = useState<boolean>(false)
  const [isBillingAddress, setIsBillingAddress] = useState<boolean>(false)
  const [openBillingAddreddOptions, setOpenBillingAddreddOptions] = useState<boolean>(false)
  const [isBillingAndShipingAddressSame, setisBillingAndShipingAddressSame] = useState<boolean>(false)
  const [selectAccount, setSelectAccount] = useState<any>(checkoutPageData?.customers?.[0]!)
  const [openUpdateAddress, toggleUpdateAddress] = useToggle(false)
  const [openAddAddress, toggleAddAddress] = useToggle(false)
  const [openSelectAddress, toggleSelectAddress] = useToggle(false)
  const [openAlertDialog, toggleAlertDialog] = useToggle(false)
  const tooltipRef: any = useRef(null)
  const shipingtooltipRef: any = useRef(null)
  useAPIoneTime({ service: getStateAndCountryLists, endPoint: ENDPOINTS.getStateAndCountryLists });

  useEffect(() => {
    if (checkoutPageData?.customers?.[0]) {
      setSelectAccount(checkoutPageData?.customers?.[0]!)
      dispatch(updateFinalDataForTheCheckout({ userAccount: checkoutPageData?.customers?.[0] }))
    }
    if (checkoutPageData?.shippingAddressDetails?.[0]) {
      setShippingAddress(checkoutPageData?.shippingAddressDetails?.[0])
      dispatch(updateFinalDataForTheCheckout({ shippingAddress: checkoutPageData?.shippingAddressDetails?.[0] }))
    }
    if (checkoutPageData?.billingAddressDetails?.[0]) {
      setBillingAddress(checkoutPageData?.billingAddressDetails?.[0])
      dispatch(updateFinalDataForTheCheckout({ billingAddress: checkoutPageData?.billingAddressDetails?.[0] }))
    }
  }, [checkoutPageData])

  useMemo(() => {
    if (isBillingAndShipingAddressSame) {
      setShippingAddress(billingAddress)
      dispatch(updateFinalDataForTheCheckout({ shippingAddress: billingAddress }))
    }
  }, [isBillingAndShipingAddressSame, shippingAddress, billingAddress])

  const handleTooltipClose = (event: any) => {
    if (event?.currentTarget?.name === 'shippingAddress') {
      setOpenShipingAddreddOptions(false)
    } else {
      setOpenBillingAddreddOptions(false)
    }
  }
  const handleTooltipOpen = (event: any) => {
    if (event?.currentTarget?.name === 'shippingAddress') {
      setOpenShipingAddreddOptions((prev) => !prev)
      setOpenBillingAddreddOptions(false)
    } else {
      setOpenBillingAddreddOptions((prev) => !prev)
      setOpenShipingAddreddOptions(false)
    }
  }
  const handleClickAway = (event: any) => {
    if ((tooltipRef.current && !tooltipRef.current.contains(event.target))) {
      setOpenBillingAddreddOptions(false)
    } if (shipingtooltipRef.current && !shipingtooltipRef.current.contains(event.target)) {
      setOpenShipingAddreddOptions(false)
    }
  }

  const handleSelectAccount = useCallback((event: SelectChangeEvent) => {
    setSelectAccount(event.target.value as string);
    dispatch(updateFinalDataForTheCheckout({ userAccount: event.target.value }))
  }, [])

  const handleUpdateAddress = useCallback((type: string) => {
    // setAddressTitle(type)
    if (type === "Edit") {
      toggleUpdateAddress()
    }
    else if (type === "Add") {
      toggleAddAddress()
    }
  }, [openUpdateAddress, openAddAddress])

  const handleAddressUpdate = useCallback((addressData: any, isbilling: any) => {
    if (isbilling) {
      setBillingAddress(addressData)
      dispatch(updateFinalDataForTheCheckout({ billingAddress }))
    }
    if (!isbilling) {
      setShippingAddress(addressData)
      dispatch(updateFinalDataForTheCheckout({ shippingAddress }))
    }
  }, [openBillingAddreddOptions, openShipingAddreddOptions])

  return (
    <StepWrapper title="Step 1" className="Step1">
      <Box className="FieldWrapper">
        <Typography className="Label" variant="subtitle1">Select Your Account</Typography>
        <Stack className="Field AccountField" sx={{ borderColor: "primary.main" }}>
          <Box className="MembershipWrapper">
            <Typography className="Label" variant="body2">Current Membership:</Typography>
            <Stack className="Wrapper">
              <Stack className="Badge"><Typography variant="overline">{selectAccount?.membershipName}</Typography></Stack>
              <Button onClick={() => {
                navigate('/memberships')
              }}>Upgrade</Button>
            </Stack>
          </Box>
          {checkoutPageData?.customers && checkoutPageData?.customers?.length > 0 && selectAccount && <Select
            color="secondary"
            className="AccountSelect"
            value={selectAccount}
            onChange={handleSelectAccount}
            IconComponent={SelectDropdown}
            fullWidth
          >
            {checkoutPageData?.customers?.map((customer) => <MenuItem value={customer as any}>{customer.firstName + ' ' + customer.lastName + ' ' + "(" + customer?.accounttype + ")"}</MenuItem>)}
          </Select>}
        </Stack>
      </Box>
      <Box className="FieldWrapper">
        <Typography className="Label" variant="subtitle1">Billing Address</Typography>
        <Stack className="Field" sx={{ borderColor: "primary.main" }}>
          <Box className="Value">
            <Typography className="Name" variant="titleLarge">{billingAddress?.firstName} {billingAddress?.lastName}</Typography>
            <Typography className="Address" variant="body2">{billingAddress?.addressLine1}, {billingAddress?.addressLine2}, {billingAddress?.city}, {billingAddress?.postcode} {billingAddress?.countryName}</Typography>
          </Box>
          <ClickTooltip
            name='billingAddress'
            open={openBillingAddreddOptions}
            className="AddressTooltip"
            placement="bottom-end"
            onClose={handleTooltipClose}
            onClickAway={handleClickAway}
            renderComponent={<IconButton name='billingAddress' ref={tooltipRef} className="OptionButton" onClick={handleTooltipOpen}><OptionsIcon /></IconButton>}
            lightTheme
            disablePortal={true}
            arrow
          >
            <List>
              <ListItem>
                <ListItemButton onClick={() => { setIsBillingAddress(() => true); handleUpdateAddress("Edit"); }}>
                  <ListItemIcon>
                    <PencilIcon />
                  </ListItemIcon>
                  <ListItemText primary="Edit address" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => { toggleSelectAddress(); setIsBillingAddress(() => true); }}>
                  <ListItemIcon>
                    <Map2Icon />
                  </ListItemIcon>
                  <ListItemText primary="Select different address" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => { setIsBillingAddress(() => true); handleUpdateAddress("Add") }}>
                  <ListItemIcon>
                    <Map1Icon />
                  </ListItemIcon>
                  <ListItemText primary="Add address" />
                </ListItemButton>
              </ListItem>
            </List>
          </ClickTooltip>
        </Stack>
      </Box>
      {configDetailsState?.Checkout_SameAddress_Enable?.value && <FormControlLabel
        name="SameAddress"
        className="SameAddressCheckbox"
        control={<Checkbox checked={isBillingAndShipingAddressSame} onChange={() => {
          setisBillingAndShipingAddressSame((prev) => !prev)
        }} />}
        label="My Billing and shipping addresses are same"
      />}
      <Box className="FieldWrapper">
        <Typography className="Label" variant="subtitle1">Shipping address</Typography>
        <Stack className="Field" sx={{ borderColor: "primary.main" }}>
          <Box className="Value">
            <Typography className="Name" variant="titleLarge">{shippingAddress?.firstName} {shippingAddress?.lastName}</Typography>
            <Typography className="Address" variant="body2">{shippingAddress?.addressLine1}, {shippingAddress?.addressLine2}, {shippingAddress?.city}, {shippingAddress?.postcode} {shippingAddress?.countryName}</Typography>
          </Box>
          <ClickTooltip
            name='shippingAddress'
            open={openShipingAddreddOptions}
            className="AddressTooltip"
            placement="bottom-end"
            onClose={handleTooltipClose}
            onClickAway={handleClickAway}
            renderComponent={<IconButton name='shippingAddress' ref={shipingtooltipRef} className="OptionButton" onClick={handleTooltipOpen}><OptionsIcon /></IconButton>}
            lightTheme
            disablePortal={true}
            arrow
          >
            <List>
              <ListItem>
                <ListItemButton onClick={() => { setIsBillingAddress(() => false); handleUpdateAddress("Edit"); }}>
                  <ListItemIcon>
                    <PencilIcon />
                  </ListItemIcon>
                  <ListItemText primary="Edit address" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => { setIsBillingAddress(() => false); toggleSelectAddress(); }}>
                  <ListItemIcon>
                    <Map2Icon />
                  </ListItemIcon>
                  <ListItemText primary="Select different address" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={() => { setIsBillingAddress(() => false); handleUpdateAddress("Add") }}>
                  <ListItemIcon>
                    <Map1Icon />
                  </ListItemIcon>
                  <ListItemText primary="Add address" />
                </ListItemButton>
              </ListItem>
            </List>
          </ClickTooltip>
        </Stack>
      </Box>
      <AgentContent />

      {openUpdateAddress && <UpdateAddress open={openUpdateAddress} dialogTitle="Update Address" onClose={toggleUpdateAddress} existingAddress={isBillingAddress ? {...billingAddress,phoneNumber:billingAddress.phone1} : {...shippingAddress,phoneNumber:shippingAddress.phone1}} />}
      <AddAddress open={openAddAddress} dialogTitle="Add Address" onClose={toggleAddAddress} addressTypeId={isBillingAddress ? AddressType.Billing : AddressType.Shipping} handleAddressUpdate={handleAddressUpdate} />
      <AlertDialog open={openAlertDialog} onClose={toggleAlertDialog} />
      {openSelectAddress && <SelectAddress isbillingAddress={isBillingAddress} open={openSelectAddress} onClose={toggleSelectAddress} listOfAddress={isBillingAddress ? checkoutPageData?.billingAddressDetails : checkoutPageData?.shippingAddressDetails} handleAddressUpdate={handleAddressUpdate} defaultSelectedAddress={isBillingAddress ? billingAddress : shippingAddress} />}
    </StepWrapper>
  )
}

export default Step1