import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Box, Stack, Typography, Button } from '@mui/material';
import StyledDialog from "@/components/common/StyledDialog"

// Asstes
import { IndividualUserIcon, JointAccountIcon, ShowcaseIcon, TrustIcon, SuperFundIcon } from "../../../assets/icons/index"
import { useAppSelector } from '@/hooks';

const getAccountTypeIcon = (alignment: string) => {
    switch (alignment) {
        case "Individual":
            return IndividualUserIcon
            break;
        case "Joint":
            return JointAccountIcon
            break;
        case "Trust":
            return TrustIcon
            break;
        case "Superfund":
            return SuperFundIcon
            break;
        case "Business":
            return ShowcaseIcon
            break;
        default:
            return IndividualUserIcon
    }
}

interface AccountTypeProps {
    open: boolean
    dialogTitle: string
    alignment: string | null
    onClose: () => void
    handleAccountTypeNextButton: () => void
    handleChange: (event: React.MouseEvent<HTMLElement>, newAlignment: string) => void
}

export default function AccountType(props: AccountTypeProps) {
    const configDropdowns = useAppSelector(state => state.myVault.configDropdowns)
    const { open, dialogTitle, alignment, handleChange, onClose, handleAccountTypeNextButton } = props
    // console.log("🚀 ~ AccountType ~ alignment:", alignment)

    return (
        <>
            <StyledDialog
                id="AccountType"
                open={open}
                dialogTitle={dialogTitle}
                onClose={onClose}
            >
                <Box className="DialogBody">
                    <Typography variant='body1'>Please select account type:</Typography>
                    <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                        aria-label="Platform"
                        className='AccountTypeWrapper'
                    >
                        {configDropdowns?.accountTypeList.map(accountType => {
                            return (
                                <ToggleButton className='AccountType' value={accountType.id} key={accountType.id}>
                                    <Stack className='AccountTypeName'>
                                        {getAccountTypeIcon(accountType?.name)()}
                                        <Typography variant='body1'>{accountType.name}</Typography>
                                    </Stack>
                                    <Typography variant='body2' className="description">{accountType?.extraProperty}</Typography>
                                </ToggleButton>
                            )
                        })}
                    </ToggleButtonGroup>
                </Box>
                <Stack className="DialogFooter">
                    <Button variant="outlined" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="contained" onClick={handleAccountTypeNextButton} disabled={!alignment}>Next</Button>
                </Stack>
            </StyledDialog>
        </>
    );
}