import React, { useEffect, useState } from "react"
import { useMediaQuery, Theme, Box, Button, Container, Drawer, IconButton, Typography, } from "@mui/material"
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// Type
import type { FormControlLabelProps } from '@mui/material'

// Assets
import { CrossIcon, SortbyIcon } from "@/assets/icons/index"

// Utils
import { sortByOptions } from "@/utils/data"

interface UiFormInputs {
  Name: string
  Industry: string
  CompanySize: number
  Gender: string
  Password: string
  Subscribe: string
  Number: string
}

// Hooks
import { useAppDispatch, useAppSelector, useToggle } from "@/hooks"

// Utils
import RenderFields from "@/components/common/RenderFields"
import { SortingOption } from "@/types/enums"
import { setPageSortOrder, setSortedItems } from "@/redux/reducers/categoryReducer"
import { sortByMostPopular, sortByPriceHighToLow, sortByPriceLowToHigh } from "@/utils/itemsSorting"
import { navigate } from "gatsby"
import { getlastPartOfPath } from "@/utils/common"

function SortBy() {
  const isSmallScreen: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
  const [openSortBy, toggleSortBy] = useToggle(false)
  // const [sortBy, setSortBy] = useState<SortingOption | null>(null);
  const dispatch = useAppDispatch();
  const clearFilters = useAppSelector(state => state.category.clearFilters);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<any>({
    // resolver: yupResolver(schema),
    defaultValues: {},
  })

  // useEffect(() => {
  //   dispatch(setPageSortOrder({ key: getlastPartOfPath(location.pathname), value: value }));
  // }, [location.pathname])

  useEffect(() => {
    if (clearFilters) {
      setValue("Sort By", null);
    }
  }, [clearFilters]);

  const handleChange = () => {
    const value: any = Object.values(getValues())[0];
    // dispatch(setSortBy(value));
    // setValue("Sort By", value);
    dispatch(setPageSortOrder({ key: getlastPartOfPath(location.pathname), value: value }));
  }

  const renderSortByFields = (labelPlacement: FormControlLabelProps['labelPlacement']) => {
    return (
      <RenderFields
        type="radio"
        control={control}
        register={register}
        name="Sort By"
        labelPlacement={labelPlacement}
        // error={errors.CompanySize}
        options={sortByOptions}
        margin="none"
        fullWidth
        value={getValues()["Sort By"]}
        setValue={setValue}
        onChange={handleChange}
        getValues={getValues}
      />
    )
  }

  return (
    isSmallScreen ? (
      <>
        <Button
          color="secondary"
          variant="outlined"
          startIcon={<SortbyIcon />}
          onClick={toggleSortBy}
          className="OultinedButton"
        >
          Sort
        </Button>
        {openSortBy && (
          <Drawer
            id="SortByDrawer"
            anchor="bottom"
            open={openSortBy}
            onClose={toggleSortBy}
          >
            <Box className="DrawerHeader">
              <Container className="Wrapper">
                <Typography variant="subtitle2">SORT BY</Typography>
                <IconButton className="CloseButton" onClick={toggleSortBy}><CrossIcon fontSize="inherit" /></IconButton>
              </Container>
            </Box>
            <Box className="DrawerContent">
              <Container>
                {renderSortByFields("start")}
              </Container>
            </Box>
          </Drawer>
        )}
      </>
    ) : (
      renderSortByFields("end")
    )
  )
}

export default SortBy