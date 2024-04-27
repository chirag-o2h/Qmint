import { Delete1Icon } from '@/assets/icons';
import RenderFields from '@/components/common/RenderFields'
import useDebounce from '@/hooks/useDebounce';
import { Button, Divider, IconButton, Stack, Typography } from '@mui/material'
import React, { useDeferredValue, useEffect, useState } from 'react'

export interface IField {
    [key: string]: { firstName: string, lastName: string }
}

interface IProps {
    fields: IField[],
    setFields: React.Dispatch<React.SetStateAction<IField[]>>
}

const AdditionalFields = ({ fields:tempFields, setFields:setTempFields }: IProps) => {
    const handleAddField = () => {
        const newField = {
            [Math.random().toString(36).substring(7)]: {
                firstName: '',
                lastName: ''
            }
        };
        // additionalFieldSchema
        setTempFields(prevFields => [...prevFields, { ...newField }]);
    };

    const handleDeleteField = (id: string) => {
        setTempFields(prevFields => prevFields.filter(field => Object.keys(field)[0] !== id));
    };

    return (
        <Stack className="Fields JointFields">
            <Stack className="Header">
                <Typography>Additional Beneficiary / Account Holder</Typography>
                <Button variant="contained" color="success" onClick={handleAddField}>Add more</Button>
            </Stack>
            {tempFields.map((field, index) => (
                <Stack
                    key={Object.keys(field)[0]}
                    className="FieldsWrapper"
                    divider={<Divider flexItem />}
                >
                    <Stack className="Column">
                        <RenderFields
                            // register={register}
                            // error={errors.FirstName}
                            name="FirstName"
                            placeholder="Enter first name*"
                            value={field[Object.keys(field)[0]].firstName}
                            onChange={(e) => {
                                const newFields = [...tempFields];
                                newFields[index][Object.keys(field)[0]].firstName = e.target.value;
                                setTempFields(newFields);
                            }}
                            // control={control}
                            variant='outlined'
                            margin='none'
                        />
                        <RenderFields
                            // register={register}
                            // error={errors.LastName}
                            name="LastName"
                            value={field[Object.keys(field)[0]].lastName}
                            placeholder="Enter last name*"
                            onChange={(e) => {
                                const newFields = [...tempFields];
                                newFields[index][Object.keys(field)[0]].lastName = e.target.value;
                                setTempFields(newFields);
                            }}
                            // control={control}
                            variant='outlined'
                            margin='none'
                        />
                        {index !== 0 && <IconButton onClick={() => handleDeleteField(Object.keys(field)[0])} title="Remove field"><Delete1Icon /></IconButton>}
                    </Stack>
                </Stack>
            ))}

        </Stack>
    )
}

export default AdditionalFields