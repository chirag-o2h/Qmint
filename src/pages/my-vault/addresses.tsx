import React, { useState } from "react"
import { Box, Button, Container, Stack, Typography } from "@mui/material"
import { PageTitle } from "@/components/common/Utils"
import Seo from "@/components/common/Seo"
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { ENDPOINTS } from "@/utils/constants"
import { useAppDispatch, useAppSelector } from "@/hooks"
import Layout from "@/components/common/Layout"
import Loader from "@/components/common/Loader"
import { AddressCard } from "@/components/common/Card"
import UpdateAddress from "@/components/partials/checkout/UpdateAddress"
import { PlusIcon } from "../../assets/icons/index"
import { deleteAddress, getAddresses } from "@/redux/reducers/myVaultReducer"
import { hasFulfilled } from "@/utils/common"
import useShowToaster from "@/hooks/useShowToaster"
import Toaster from "@/components/common/Toaster"
import AddAddress from "@/components/partials/checkout/AddAddress"
import { getStateAndCountryLists } from "@/redux/reducers/checkoutReducer"
import { navigate } from "gatsby"
import useRequireLogin from "@/hooks/useRequireLogin"

function Addresses() {
  const { loadingForCheckingLogin } = useRequireLogin()
  const openToaster = useAppSelector(state => state.homePage.openToaster)
  const loading = useAppSelector(state => state.myVault.loading)
  const dispatch = useAppDispatch()
  const { showToaster } = useShowToaster()
  const addressesData = useAppSelector(state => state.myVault.addresses)
  const [openAddAddress, setOpenAddAddress] = useState<boolean>(false)

  useAPIoneTime({ service: getStateAndCountryLists, endPoint: ENDPOINTS.getStateAndCountryLists });
  useAPIoneTime({
    service: getAddresses,
    endPoint: ENDPOINTS.getAddresses
  })

  const handleAddAddress = () => {
    setOpenAddAddress(true);
  }

  const handleCloseAddAddress = () => {
    setOpenAddAddress(false);
  }

  const handleDeleteAddress = async (id: number) => {
    const response = await dispatch(deleteAddress({ url: ENDPOINTS.deleteAddress + id }) as any)

    if (hasFulfilled(response.type)) {
      if (response.payload?.data?.data === true) {
        showToaster({ message: response?.payload?.data?.message, severity: "success" })
      }
      else {
        showToaster({ message: "Address remove failed! Please Try again", severity: "error" })
      }
    } else {
      showToaster({ message: "Address remove failed! Please Try again", severity: "error" })
    }
  }
  if (loadingForCheckingLogin) {
    return
  }
  const onClickAction = () => {
    handleAddAddress()
  }
  return (
    <>
      {loading &&  <Loader open={loading} />}
      {openToaster && <Toaster />}
      <Layout>
        <Seo
          keywords={[`QMint Topics`]}
          title="Address"
          lang="en"
        />
        <PageTitle title="Addresses" backToDashboard={true} redirectOnClick={onClickAction} />

        <Box className="AddressesPage">
          <Container>
            <Box className="AddressList">
              <Box className="AddressListWrapper">
                {addressesData?.map(address => (
                  <AddressCard
                    key={address.customerId}
                    // accountName={address.accountName}
                    // accountType={address.accountType}
                    id={address.addressId}
                    address={address}
                    firstName={address.firstName}
                    lastName={address.lastName}
                    email={address.email}
                    phoneNumber={address.phoneNumber}
                    showDelete={true}
                    handleDelete={handleDeleteAddress}
                  />
                ))}
              </Box>
            </Box>
            {/* <UpdateAddress dialogTitle="Add new address" open={updateAddress} onClose={handleCloseUpdateAddress} /> */}
            <AddAddress open={openAddAddress} dialogTitle="Add Address" onClose={handleCloseAddAddress} />
          </Container>
        </Box>
      </Layout>
    </>
  )
}

export default Addresses