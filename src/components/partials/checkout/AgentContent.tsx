import { CrossIconWithOutlineCircle, VerifiedIcon } from '@/assets/icons'
import RenderFields from '@/components/common/RenderFields'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { getLocalAgentDetails } from '@/redux/reducers/checkoutReducer'
import { hasFulfilled } from '@/utils/common'
import { ENDPOINTS } from '@/utils/constants'
import { Box, Checkbox, FormControlLabel, IconButton, Stack, Typography } from '@mui/material'
import React, { useDeferredValue, useEffect, useState } from 'react'

const AgentContent = () => {
    const [isLocalAgent, setisLocalAgent] = useState(false);
    const localAgentDetails = useAppSelector(state => state.checkoutPage.localAgentDetails);
    const [inputAgentId, setInputAgentId] = useState<string | null>(null);
    const dispatch = useAppDispatch();
    const [agentNotFoundMessage, setNotFoundMessage] = useState<string | null>(null)

    const defferedInput = useDeferredValue(inputAgentId);

    useEffect(() => {
        if (defferedInput && defferedInput?.trim().length >= 5) {
            const fetchAgentDetails = async () => {
                const response = await dispatch(getLocalAgentDetails({ url: ENDPOINTS.getLocalAgentDetails + `?AgentId=${inputAgentId}` }))
                if (!hasFulfilled(response.type) && (response.payload as any).response.status === 404) {
                    console.log("🚀 ~ fetchAgentDetails ~ response:", response)
                    setNotFoundMessage((response.payload as any).response.data.message);
                }
            }
            fetchAgentDetails();
        }
    }, [defferedInput])

    return (
        <Box className="FieldWrapper AgentCodeContent">
            <FormControlLabel
                name="SameAddress"
                className="SameAddressCheckbox"
                control={<Checkbox checked={isLocalAgent} onChange={() => {
                    setisLocalAgent(!isLocalAgent)
                }} />}
                label="Are you ordering via local agent?"
            />
            {isLocalAgent && <Stack sx={{ gap: "10px", alignItems: "center" }} className="AgentCodeWrapper">
                <RenderFields
                    name="name"
                    placeholder="Enter your agent code"
                    variant='outlined'
                    onChange={(e: any) => {
                        setInputAgentId(e.target.value);
                    }}
                />
                {(!localAgentDetails || (inputAgentId && inputAgentId?.trim().length < 5)) && <IconButton
                    aria-label="close"
                    className="CloseButton"
                >
                    <CrossIconWithOutlineCircle />
                </IconButton>}
                {localAgentDetails && inputAgentId && inputAgentId?.trim().length >= 5 && <IconButton
                    aria-label="verified"
                    className="verifiedButton"
                >
                    <VerifiedIcon />
                </IconButton>}
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