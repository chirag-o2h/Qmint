import React, { useState } from "react"
import { Box, Button, Container } from "@mui/material"
import { PageTitle } from "@/components/common/Utils"
import Seo from "@/components/common/Seo"
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { ENDPOINTS } from "@/utils/constants"
import { useAppSelector } from "@/hooks"
import Layout from "@/components/common/Layout"
import { AddressCard } from "@/components/common/Card"

import { PlusIcon } from "../../assets/icons/index"

import AccountType from '../../components/partials/my-vault/accountType'
import Loader from "@/components/common/Loader"
import { getAccounts, getConfigDropdowns } from "@/redux/reducers/myVaultReducer"
import AddAccount from "@/components/partials/my-vault/AddAccount"
import { getStateAndCountryLists } from "@/redux/reducers/checkoutReducer"
import Toaster from "@/components/common/Toaster"
import { navigate } from "gatsby"
import useRequireLogin from "@/hooks/useRequireLogin"

function Accounts() {
    const { loadingForCheckingLogin } = useRequireLogin()
    const openToaster = useAppSelector(state => state.homePage.openToaster)
    const loading = useAppSelector(state => state.myVault.loading)
    const accountsData = useAppSelector(state => state.myVault.accounts)
    const [accountTypeDialog, setAccountTypeDialog] = useState<boolean>(false)
    const [addAccount, setAddAccount] = useState<boolean>(false)
    const [alignment, setAlignment] = useState<string | null>(null);
    useAPIoneTime({
        service: getAccounts,
        endPoint: ENDPOINTS.getAccounts
    })
    useAPIoneTime({
        service: getConfigDropdowns,
        endPoint: ENDPOINTS.getConfigDropdown
    })
    // useAPIoneTime({ service: getStateAndCountryLists, endPoint: ENDPOINTS.getStateAndCountryLists });

    const handleAccountTypeDialog = () => {
        setAccountTypeDialog(true);
    }
    const handleCloseUpdateAddress = () => {
        setAddAccount(false);
    }
    const handleAccountTypeNextButton = () => {
        setAddAccount(true);
        setAccountTypeDialog(false);
    }
    const handleCloseAccountTypeDialog = () => {
        setAccountTypeDialog(false);
    }
    const hadleAddAccountSecondaryAction = () => {
        setAddAccount(false);
        setAccountTypeDialog(true);
    }

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
    };
    if (loadingForCheckingLogin) {
        return
    }

    const onClickAction = () => {
        handleAccountTypeDialog()
    }
    return (
        <>
            {loading &&  <Loader open={loading} />}
            {openToaster && <Toaster />}
            <Layout>
                <Seo
                    keywords={[`QMint Accounts`]}
                    title="Accounts"
                    lang="en"
                />
                <PageTitle title="Accounts" backToDashboard={true} redirectOnClick={onClickAction} />
                <Box className="AddressesPage">
                    <Container>
                        <Box className="AddressList">
                            <Box className="AddressListWrapper" >
                                {accountsData?.map(account => (
                                    <AddressCard
                                        key={account.customerId}
                                        accountName={account.accountName}
                                        accountType={account.accountType}
                                        address={account.address}
                                        firstName={account.firstName}
                                        lastName={account.lastName}
                                        email={account.email}
                                        phoneNumber={account.phoneNumber}
                                        showDelete={false}
                                        accountData={account}
                                    />
                                ))}
                            </Box>
                        </Box>
                        {addAccount && <AddAccount dialogTitle="Add new account" open={addAccount} alignment={alignment} onClose={handleCloseUpdateAddress} hadleSecondaryAction={hadleAddAccountSecondaryAction} />}
                        <AccountType dialogTitle="Add new account" open={accountTypeDialog} alignment={alignment} handleChange={handleChange} onClose={handleCloseAccountTypeDialog} handleAccountTypeNextButton={handleAccountTypeNextButton} />
                    </Container>
                </Box>
            </Layout>
        </>
    )
}

export default Accounts