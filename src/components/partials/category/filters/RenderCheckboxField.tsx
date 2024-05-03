import RenderFields from '@/components/common/RenderFields'
import React, { useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAppSelector } from '@/hooks'
import { useMediaQuery } from '@mui/material'

const schema = yup.object().shape({
    Gender: yup.array().required().nullable(),
})

interface props {
    filter: string,
    options: any,
    selectedFilters: { [key: string]: string[] },
    setSelectedFilters: any,
}

const RenderCheckboxField = ({ filter, options, setSelectedFilters, selectedFilters }: props) => {
    const [isPending, startTransition] = useTransition();
    const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('md'))
    const clearFilters = useAppSelector(state => state.category.clearFilters)

    const {
        register,
        getValues,
        setValue,
        reset,
        formState: { errors },
    } = useForm<any>({
        resolver: yupResolver(schema),
        defaultValues: {},
    })

    useEffect(() => {
        // if (isMobile) {
        for (const key in selectedFilters) {
            if (key === filter) {
                const obj: any = {};
                selectedFilters[key]?.length > 0 && selectedFilters[key].forEach((value: string) => {
                    obj[value] = true;
                })
                setValue(filter, obj)
            }
        }
        // }
    }, [selectedFilters])

    useEffect(() => {
        if (clearFilters) {
            reset();
            setSelectedFilters({});
        }
    }, [clearFilters])

    const onCheckboxChange = () => {
        startTransition(() => {
            const currentSpecification: any = getValues();

            const specificationValues: string[] = [];

            for (const key in currentSpecification[filter]) {
                if (currentSpecification[filter][key]) specificationValues.push(key);
            }
            setSelectedFilters((prev: { [key: string]: string[] }) => {
                return ({
                    ...prev, [filter]: specificationValues.length === 0 ? undefined : specificationValues
                })
            })

        });
    }

    return (
        <RenderFields
            type="checkbox"
            // value={}
            register={register}
            name={filter}
            options={options}
            alreadySelectedFilters={selectedFilters[filter]}
            setValue={setValue}
            getValues={getValues}
            onChange={onCheckboxChange}
            margin="none"
        />
    )
};

export default RenderCheckboxField