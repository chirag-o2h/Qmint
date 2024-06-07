import { CrossIconWithOutlineCircle, VerifiedIcon } from '@/assets/icons'
import RenderFields from '@/components/common/RenderFields'
import { useAppDispatch, useAppSelector } from '@/hooks'
import useDebounce from '@/hooks/useDebounce'
import { getLocalAgentDetails, setLocalAgentDetailsNull } from '@/redux/reducers/checkoutReducer'
import { hasFulfilled } from '@/utils/common'
import { ENDPOINTS } from '@/utils/constants'
import { Box, Checkbox, FormControlLabel, IconButton, Stack, Typography } from '@mui/material'
import React, { useDeferredValue, useEffect, useState } from 'react'

const AgentContent = () => {
    const { configDetails: configDetailsState } = useAppSelector((state) => state.homePage)
    const [isLocalAgent, setisLocalAgent] = useState(false);
    const localAgentDetails = useAppSelector(state => state.checkoutPage.localAgentDetails);
    const [inputAgentId, setInputAgentId] = useState<string | null>(null);
    const dispatch = useAppDispatch();
    const [agentNotFoundMessage, setNotFoundMessage] = useState<string | null>(null)

    const debouncedInput = useDebounce(inputAgentId, 700);

    useEffect(() => {
        if (debouncedInput && debouncedInput?.trim().length >= 5) {
            const fetchAgentDetails = async () => {
                const response = await dispatch(getLocalAgentDetails({ url: ENDPOINTS.getLocalAgentDetails + `?AgentId=${inputAgentId}` }))
                if (!hasFulfilled(response.type) && (response.payload as any).response.status === 404) {
                    setNotFoundMessage((response.payload as any).response.data.message);
                }
            }
            fetchAgentDetails();
        }
        if(!debouncedInput || !(debouncedInput?.trim()?.length >= 5)){
            dispatch(setLocalAgentDetailsNull())
        }
    }, [debouncedInput])

    return (
        <Box className="FieldWrapper AgentCodeContent">
            {configDetailsState?.Checkout_AgentCode_Enable?.value && <FormControlLabel
                name="SameAddress"
                className="SameAddressCheckbox"
                control={<Checkbox checked={isLocalAgent} onChange={() => {
                    setisLocalAgent(!isLocalAgent)
                }} />}
                label="Are you ordering via local agent?"
            />}
            {(isLocalAgent) && <Stack sx={{ gap: "10px", alignItems: "center" }} className="AgentCodeWrapper">
                <RenderFields
                    name="name"
                    placeholder="Enter your agent code"
                    variant='outlined'
                    onChange={(e: any) => {
                        setInputAgentId(e.target.value);
                    }}
                />
                {(!localAgentDetails || (inputAgentId && inputAgentId?.trim().length < 5)) && <Box
                    className="CloseButton"
                >
                    <CrossIconWithOutlineCircle />
                </Box>}
                {localAgentDetails && inputAgentId && inputAgentId?.trim().length >= 5 && <Box
                    className="verifiedButton"
                >
                    <VerifiedIcon />
                </Box>}
            </Stack>}
            {!localAgentDetails && <Typography className="InvalidData">{agentNotFoundMessage}</Typography>}
            {localAgentDetails && inputAgentId && inputAgentId?.trim().length >= 5 && <Box className="VerifiedData">
                <Typography>{localAgentDetails.name}</Typography>
                <Typography>Email: {localAgentDetails.email}</Typography>
                <Typography>phone: {localAgentDetails.phoneNumber}</Typography>
                <Typography>{localAgentDetails.address1}{localAgentDetails.address2 !== "" ? `, ${localAgentDetails.address2}` : ""}, {localAgentDetails.city}-{localAgentDetails.zipcode}, {localAgentDetails.state}, {localAgentDetails.country}</Typography>
            </Box>}
        </Box>
    )
}

export default AgentContent