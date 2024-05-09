import React, { Fragment, useState } from 'react'
import { Button, Dialog, IconButton, DialogContent, DialogTitle, Stack, DialogActions, Tab, Tabs } from "@mui/material"
import { CrossIcon, FilterIcon } from '@/assets/icons'
import { useAppDispatch, useAppSelector, useToggle } from '@/hooks'
import TabPanel from '@/components/common/TabPanel'
import PriceSlider from './PriceSlider'
import RenderCheckboxField from './RenderCheckboxField'
import { setClearFilters, setPageSelectedSpecifications, setPageSelectedPrice } from '@/redux/reducers/categoryReducer'
import { getlastPartOfPath } from '@/utils/common'
import { categoryData } from '@/types/categoryData'

interface props {
    renderList: (data: any) => any
    // setSelectedFiltersMobile: any,
    // setSelectedPriceMobile: any,
    setIsPriceChanged: any
    pagesSelectedFilters: any
    categoryData: categoryData
}

const SmallScreenFilters = ({ renderList, setIsPriceChanged, pagesSelectedFilters, categoryData }: props) => {
    // const categoryData = useAppSelector(state => state.category)
    const dispatch = useAppDispatch()
    const [openFilterBy, toggleFilterBy] = useToggle(false)
    const [tabValue, setTabValue] = useState<number>(0)

    const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>(pagesSelectedFilters.specification[getlastPartOfPath(location.pathname)] || {});
    const [selectedPrice, setSelectedPrice] = useState<number[] | null>([pagesSelectedFilters.price[getlastPartOfPath(location.pathname)]?.[0] || categoryData?.price?.minPrice as number, pagesSelectedFilters.price[getlastPartOfPath(location.pathname)]?.[1] || categoryData?.price?.maxPrice as number]);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue)
    }

    const clearFiltersHandler = () => {
        dispatch(setClearFilters(true));
        setSelectedFilters({})
    }

    const applyFilterHandler = async () => {
        // setSelectedFiltersMobile(selectedFilters)
        // setSelectedPriceMobile(selectedPrice)
        dispatch(setPageSelectedSpecifications({
            key: getlastPartOfPath(location.pathname), value: selectedFilters
        }))
        dispatch(setPageSelectedPrice({
            key: getlastPartOfPath(location.pathname), value: selectedPrice
        }))
        toggleFilterBy()
    }

    return (
        <Fragment>
            <Button
                color="secondary"
                variant="outlined"
                startIcon={<FilterIcon />}
                onClick={toggleFilterBy}
                className="OultinedButton"
            >
                Filter
            </Button>
            <Dialog
                id="FilterByDialog"
                open={openFilterBy}
                onClose={toggleFilterBy}
                fullScreen
            >
                <Stack className="DialogHeader">
                    <DialogTitle variant="subtitle2">FILTER BY</DialogTitle>
                    <Button className="ClearFilter" variant="text" onClick={clearFiltersHandler}>Clear Filter</Button>
                    <IconButton className="CloseButton" onClick={toggleFilterBy}><CrossIcon fontSize="small" /></IconButton>
                </Stack>
                <DialogContent>
                    <Stack className="TabsWrapper">
                        <Tabs
                            className="FilterTabs"
                            value={tabValue}
                            onChange={handleTabChange}
                            orientation="vertical"
                            aria-label="Filter tabs"
                            variant="scrollable"
                            scrollButtons={false}
                            visibleScrollbar
                        >
                            {categoryData.categories.length > 0 && <Tab label="Categories" value={0} />}
                            <Tab label="Price Range" value={1} />
                            {Object.keys(categoryData.specifications).map((filter: any, index: number) => (
                                <Tab key={filter} label={filter} value={index + 2} />
                            ))}
                        </Tabs>
                        {categoryData.categories.length > 0 && <TabPanel className="Category" value={tabValue} index={0}>
                            {renderList(categoryData.categories)}
                        </TabPanel>}
                        <TabPanel value={tabValue} index={1}>
                            <PriceSlider minPrice={categoryData?.price?.minPrice as number} maxPrice={categoryData?.price?.maxPrice as number} setIsPriceChanged={setIsPriceChanged} pagesSelectedFilters={pagesSelectedFilters} mobilePriceFilters={selectedPrice ? selectedPrice : undefined} setMobilePriceFilters={setSelectedPrice} />
                        </TabPanel>
                        {Object.keys(categoryData.specifications).map((filter: any, index: number) => (
                            <TabPanel value={tabValue} index={index + 2} key={filter}>
                                <RenderCheckboxField
                                    filter={filter}
                                    mobileSelectedFilters={selectedFilters}
                                    setMobileSelectedFilters={setSelectedFilters}
                                    options={(categoryData.specifications[filter as keyof typeof categoryData.specifications] as any[]).map((item, index) => {
                                        return (
                                            {
                                                id: index,
                                                value: item,
                                                label: item,
                                                disabled: false,
                                            }
                                        )
                                    }
                                    )} />
                            </TabPanel>
                        ))}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button className="ApplyFilter" variant="contained" onClick={applyFilterHandler}>Apply Filter</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default React.memo(SmallScreenFilters);