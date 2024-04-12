import { Box, IconButton, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { MinusIcon, PlusIcon } from '@/assets/icons'

interface QuantityInputsProps {
    quantityLabel: string
    onQuantityChange: (quantity: number) => void
}

export default function QuantityInputs(props: QuantityInputsProps) {
    const { quantityLabel, onQuantityChange } = props
    const [quantity, setQuantity] = useState<number>(1)

    const increaseQuantity = () => {
        const newQuantity = quantity + 1
        setQuantity(newQuantity)
        // onQuantityChange(newQuantity)
    }

    const decrementQuantity = () => {
        const newQuantity = quantity > 1 ? quantity - 1 : 1
        setQuantity(newQuantity)
        // onQuantityChange(newQuantity)
    }
    return (
        <Box className="QuantityInputs">
            <Typography variant="body2" className='QuantityLabel'>{quantityLabel}</Typography>
            <Stack className="Quantity">
                <IconButton className="Minus" onClick={decrementQuantity}><MinusIcon /></IconButton>
                <TextField value={quantity} disabled />
                <IconButton className="Plus" onClick={increaseQuantity}><PlusIcon /></IconButton>
            </Stack>
        </Box>
    )
}

