import { Delete1Icon } from '@/assets/icons';
import RenderFields from '@/components/common/RenderFields'
import { useAppSelector } from '@/hooks';
import useDebounce from '@/hooks/useDebounce';
import { IPrivateHoldingAddInputs } from '@/types/myVault';
import { IndividualAccountFormSchema } from '@/utils/accountFormSchemas.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, IconButton, MenuItem, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { set, useForm } from 'react-hook-form';

const fixedFields = new Set<string>(["Mint", "Metal", "Type", "Series", "Purity"]);

export interface ISpecificationField {
    [key: string]: { specificationName: string, value: string }
}

const DynamicFields = ({ existingFields, existingCustomFields, setDynamicSpecificationFields, setDynamicCustomSpecificationFields }: {
    existingFields: {
        specificationAttributeId: number;
        specificationAttributeOptionId: number;
        specificationAttributeOptionOther: string | null;
    }[] | null,
    existingCustomFields: {
        key: string;
        value: string;
    }[] | null,
    setDynamicSpecificationFields: React.Dispatch<React.SetStateAction<ISpecificationField[] | null>>,
    setDynamicCustomSpecificationFields: React.Dispatch<React.SetStateAction<ISpecificationField[] | null>>,
}) => {
    const formDropdownsKeys = useAppSelector(state => state.myVault.privateHoldingFormDropdownsKeys);
    const formDropdownsReverseKeys = useAppSelector(state => state.myVault.privateHoldingFormDropdownsReverseKeys);
    const formDropdowns = useAppSelector(state => state.myVault.privateHoldingFormDropdowns);
    const [specificationFields, setSpecificationField] = useState<ISpecificationField[]>([]);
    const [customSpecificationFields, setCustomSpecificationField] = useState<ISpecificationField[]>([]);

    const debouncedSpecficationFields = useDebounce(specificationFields, 500);
    const debouncedCustomSpecficationFields = useDebounce(customSpecificationFields, 1000);

    useEffect(() => {
        setDynamicSpecificationFields(debouncedSpecficationFields);
        setDynamicCustomSpecificationFields(debouncedCustomSpecficationFields);
    }, [debouncedSpecficationFields, debouncedCustomSpecficationFields])

    useEffect(() => {
        if (!existingFields || !formDropdownsKeys || !existingCustomFields) return;

        const currentFields: ISpecificationField[] = [];
        existingFields.forEach((field) => {
            const curField = formDropdownsKeys[field.specificationAttributeId.toString()];
            if (!fixedFields.has(curField)) {
                console.log("🚀 ~ DynamicFields ~ specificationFields:", curField)
                currentFields.push({
                    [field.specificationAttributeId]: {
                        specificationName: field.specificationAttributeId.toString(),
                        value: field.specificationAttributeOptionId.toString()
                    }
                })
            }
        })
        setSpecificationField(currentFields);

        const currentCustomFields: ISpecificationField[] = [];
        existingCustomFields.forEach((field) => {
            currentCustomFields.push({
                [field.key]: {
                    specificationName: field.key,
                    value: field.value
                }
            })
        })
        setCustomSpecificationField(currentCustomFields);
    }, [existingFields, formDropdownsKeys, existingCustomFields])
    console.log("🚀 ~ useEffect ~ existingFields:", existingFields)

    // Just an dummy react hook form
    const {
        register,
        handleSubmit,
        control,
        clearErrors,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<IPrivateHoldingAddInputs>({
        resolver: yupResolver(IndividualAccountFormSchema)
    })

    const handleAddSpecificationField = () => {
        const newField = {
            [Math.random().toString(36).substring(7)]: {
                specificationName: "none",
                value: "none"
            }
        };
        // additionalFieldSchema
        setSpecificationField(prevFields => [...prevFields, { ...newField }]);
    };

    const handleDeleteSpecificationField = (id: string) => {
        setSpecificationField(prevFields => prevFields.filter(field => Object.keys(field)[0] !== id));
    };

    const handleAddCustomSpecificationField = () => {
        const newField = {
            [Math.random().toString(36).substring(7)]: {
                specificationName: "",
                value: ""
            }
        };
        // additionalFieldSchema
        setCustomSpecificationField(prevFields => [...prevFields, { ...newField }]);
    };

    const handleDeleteCustomeSpecificationField = (id: string) => {
        setCustomSpecificationField(prevFields => prevFields.filter(field => Object.keys(field)[0] !== id));
    };

    return (
        <>
            {specificationFields.map((field, index) => <Stack className="RowWrapper SpecificationWrapper" key={Object.keys(field)[0]}>
                <RenderFields
                    type="select"
                    // register={register}
                    // error={errors.Specification}
                    name="Specification"
                    label="Specification"
                    // getValues={getValues}
                    value={field[Object.keys(field)[0]].specificationName}
                    onChange={(value) => {
                        const newFields = [...specificationFields];
                        newFields[index][Object.keys(field)[0]].specificationName = value;
                        // newFields[index][Object.keys(field)[0]].value = "none";
                        setSpecificationField(newFields);
                    }}
                    control={control}
                    variant='outlined'
                    defaultValue="none"
                    margin='none'
                    disabled={existingFields ? true : false}
                    clearErrors={clearErrors}
                    className='SelectSpecification'
                >
                    <MenuItem key='test' value='none'>Select Specfication</MenuItem>
                    {formDropdowns && formDropdownsReverseKeys && Object.keys(formDropdowns).map((option: string) => {
                        return !fixedFields.has(option) ? <MenuItem key={option} value={formDropdownsReverseKeys[option]}>{option}</MenuItem> : null;
                    })}
                </RenderFields>
                <RenderFields
                    type="select"
                    name="Value"
                    value={field[Object.keys(field)[0]].value}
                    onChange={(value) => {
                        const newFields = [...specificationFields];
                        newFields[index][Object.keys(field)[0]].value = value;
                        setSpecificationField(newFields);
                    }}
                    label="Value"
                    disabled={existingFields ? true : false}
                    control={control}
                    clearErrors={clearErrors}
                    variant='outlined'
                    margin='none'
                    className='SelectValue'
                // required
                >
                    {formDropdowns && formDropdownsKeys && formDropdowns[formDropdownsKeys[field[Object.keys(field)[0]]?.specificationName]]?.map((dropdown: any) => {
                        return (<MenuItem value={dropdown.specificationAttributeOptionsId}>{dropdown.specificationOption}</MenuItem>)
                    })}
                </RenderFields>
                <IconButton className="DeleteButton" onClick={() => handleDeleteSpecificationField(Object.keys(field)[0])} disabled={existingFields ? true : false}><Delete1Icon /></IconButton>
            </Stack>)}
            {customSpecificationFields.map((field, index) => <Stack className="RowWrapper CustomSpecificationWrapper" key={Object.keys(customSpecificationFields)[0]}>
                <RenderFields
                    name="CustomSpecification"
                    label="Custom Specification"
                    value={field[Object.keys(field)[0]].specificationName}
                    placeholder='Enter Custom Specification'
                    onChange={(e) => {
                        const newFields = [...customSpecificationFields];
                        newFields[index][Object.keys(field)[0]].specificationName = e.target.value;
                        setCustomSpecificationField(newFields);
                    }}
                    disabled={existingCustomFields ? true : false}
                    variant='outlined'
                    margin='none'
                />
                <RenderFields
                    name="CustomValue"
                    label="Custom Value"
                    value={field[Object.keys(field)[0]].value}
                    placeholder="Enter Custome Specfication Value"
                    onChange={(e) => {
                        const newFields = [...customSpecificationFields];
                        newFields[index][Object.keys(field)[0]].value = e.target.value;
                        setCustomSpecificationField(newFields);
                    }}
                    variant='outlined'
                    margin='none'
                    disabled={existingCustomFields ? true : false}
                />
                <IconButton className="DeleteButton" onClick={() => handleDeleteCustomeSpecificationField(Object.keys(field)[0])} disabled={existingCustomFields ? true : false} ><Delete1Icon /></IconButton>
            </Stack>)}
            <Stack className='RowWrapper ButtonsWrapper'>
                <Button variant="contained" size="large" onClick={handleAddSpecificationField} disabled={existingFields ? true : false}>Add Specification</Button>
                <Button variant="contained" size="large" onClick={handleAddCustomSpecificationField} disabled={existingCustomFields ? true : false}>Add Custom Specification</Button>
            </Stack>
        </>
    )
}

export default DynamicFields