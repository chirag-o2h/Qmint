import RenderFields from '@/components/common/RenderFields'
import React, { useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { useMediaQuery } from '@mui/material'
import { setPageSelectedSpecifications } from '@/redux/reducers/categoryReducer'
import { getlastPartOfPath } from '@/utils/common'

const schema = yup.object().shape({
    Gender: yup.array().required().nullable(),
})

interface props {
    filter: string,
    options: any,
    mobileSelectedFilters?: { [key: string]: string[] },
    setMobileSelectedFilters?: any,
}

const RenderCheckboxField = ({ filter, options, mobileSelectedFilters, setMobileSelectedFilters }: props) => {
    const [isPending, startTransition] = useTransition();
    const dispatch = useAppDispatch()
    const pagesSelectedFilters = useAppSelector(state => state.category.pageSelectedFilters)
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
        const selectedFilters = isMobile ? mobileSelectedFilters : pagesSelectedFilters.specification[getlastPartOfPath(location.pathname)] || {};
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
    }, [pagesSelectedFilters.specification[getlastPartOfPath(location.pathname)]])

    useEffect(() => {
        if (clearFilters) {
            reset();
            dispatch(setPageSelectedSpecifications({ key: getlastPartOfPath(location.pathname), value: undefined }))
        }
    }, [clearFilters])

    const onCheckboxChange = () => {
        startTransition(() => {
            const currentSpecification: any = getValues();

            const specificationValues: string[] = [];

            for (const key in currentSpecification[filter]) {
                if (currentSpecification[filter][key]) specificationValues.push(key);
            }

            if (isMobile) {
                setMobileSelectedFilters({ ...mobileSelectedFilters, [filter]: specificationValues.length > 0 ? specificationValues : undefined })
            }
            else {
                dispatch(setPageSelectedSpecifications({ key: getlastPartOfPath(location.pathname), value: { [filter]: specificationValues.length > 0 ? specificationValues : undefined } }))
            }
        });
    }

    return (
        <RenderFields
            type="checkbox"
            // value={}
            register={register}
            name={filter}
            options={options}
            alreadySelectedFilters={isMobile ? (mobileSelectedFilters ? mobileSelectedFilters[filter] : undefined) : (pagesSelectedFilters.specification[getlastPartOfPath(location.pathname)] ? pagesSelectedFilters.specification[getlastPartOfPath(location.pathname)][filter] : undefined)}
            setValue={setValue}
            getValues={getValues}
            onChange={onCheckboxChange}
            margin="none"
        />
    )
};

export default RenderCheckboxField