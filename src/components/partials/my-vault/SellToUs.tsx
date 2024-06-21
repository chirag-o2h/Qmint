
import React from "react"
import { Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material"
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// Componenets
import StyledDialog from "@/components/common/StyledDialog"
import RenderFields from '@/components/common/RenderFields';
import QuantityInputs from '@/components/partials/my-vault/QuantityInputs';
import noImage from '../../../assets/images/noImage.png'
import { useAppDispatch } from "@/hooks";
import { sendForEnquiry } from "@/redux/reducers/myVaultReducer";
import { IEnquiryData } from "@/types/myVault";
import useShowToaster from "@/hooks/useShowToaster";
import { isActionRejected } from "@/components/common/Utils";

interface SellToUs {
    open: boolean
    onClose: () => void
    valueOfTheSellToUs: any
    setValue: (key: any, value: any) => void
    maxQty: number
    unitPrice: number
    fetchPrivateHoldingsList: () => void
}

interface Inputs {
    // SoldTo: string,
}

const schema = yup.object().shape({
    // SoldTo: yup.string(),
});

function SellToUs(props: SellToUs) {
    const { open, onClose, valueOfTheSellToUs, setValue, maxQty, unitPrice, fetchPrivateHoldingsList } = props
    const dispatch = useAppDispatch()
    const { showToaster } = useShowToaster();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: yupResolver(schema)
    })

    const onSubmit = async (data: any) => {
        const body: IEnquiryData = {
            HoldingId: valueOfTheSellToUs?.holdingId,
            Quantity: valueOfTheSellToUs?.quantity,
            // ProductPrice: valueOfTheSellToUs?.price,
            ProductPrice: unitPrice
        }
        const response = await dispatch(sendForEnquiry(body))
        let error = false
        if (isActionRejected(response?.type)) {
            error = true
        }
        !error ? showToaster({
            message: response?.payload?.data?.message,
            severity: 'success'
        }) : showToaster({
            message: 'something went wrong',
            severity: 'error'
        })
        fetchPrivateHoldingsList()
        onClose()
    }
    const onQuantityChange = (qty: any) => {
        setValue('sellToUs', { ...valueOfTheSellToUs, quantity: qty })
    }
    return (
        <StyledDialog
            id="SellToUs"
            open={open}
            dialogTitle={valueOfTheSellToUs?.producName}
            onClose={() => { onClose() }}
            maxWidth="sm"
            className="PrivateHoldingCommonPopup"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box className="Imagewrapper">
                    <img src={valueOfTheSellToUs?.filepath ?? noImage} alt="Product image" />
                </Box>
                <Stack className="ActionWrapper">
                    <QuantityInputs quantityLabel={unitPrice as any} onQuantityChange={onQuantityChange} qty={valueOfTheSellToUs?.quantity} maxQty={maxQty} />
                    <Stack className="ButtonsWrapper">
                        <Button size="medium" variant="outlined" onClick={() => {
                            onClose()
                        }}>Cancel</Button>
                        <Button type="submit" size="medium" variant="contained">Request Formal Quote</Button>
                    </Stack>
                </Stack>
            </form>
        </StyledDialog>
    )
}

export default React.memo(SellToUs)