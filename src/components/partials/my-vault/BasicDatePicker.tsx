import React, { useEffect, useState } from 'react';
import { Box, FormHelperText, FormLabel } from '@mui/material';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { UseFormSetValue } from 'react-hook-form';
import { IPrivateHoldingAddInputs } from '@/types/myVault';
import classNames from 'classnames';

// Type
import type { FieldError } from 'react-hook-form/dist/types'

function BasicDatePicker({ setValue, existingDate, name, label, required, error, clearErrors }: { setValue: UseFormSetValue<IPrivateHoldingAddInputs>, existingDate: string | null, name: string, label: string, required?: boolean, error?: FieldError | boolean, clearErrors: any }) {
    const [dateValue, setDateValue] = useState<Dayjs | null>(null);

    useEffect(() => {
        if (!existingDate) return;

        setDateValue(dayjs(existingDate.split("T")[0]));
    }, [existingDate])

    useEffect(() => {
        if (!dateValue) return;
        setValue("Date", dateValue.format('YYYY-MM-DD'))
        clearErrors("Date")
    }, [dateValue])

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box className="InputRow">
                {label && <FormLabel className={classNames({ "Mui-error": !!error })} htmlFor={name}>{label}{required && " *"}</FormLabel>}
                <DatePicker className="DatePicker"
                    name={name}
                    value={dateValue}
                    onChange={(newValue) => setDateValue(newValue)}
                    slotProps={{
                        textField: {
                            required: required,
                            error: !!error,
                            fullWidth: true,
                        },
                        actionBar: {
                            sx: {
                            '&.MuiDialogActions-root':{
                                justifyContent:'end',
                            },
                              '& .MuiButton-root': {
                                padding: '15px 24px', 
                              },
                            },
                          },
                    }}
                    disabled={existingDate ? true : false}
                    format="DD/MM/YYYY"
                />
                {error && typeof error === 'object' && (
                    <FormHelperText className={error && 'Mui-error'}>
                        {error.message}
                    </FormHelperText>
                )}
            </Box>
        </LocalizationProvider>
    )
}

export default BasicDatePicker