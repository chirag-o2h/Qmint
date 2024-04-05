import React, { Fragment, useState } from 'react'
import { Button, Dialog, IconButton, DialogContent, DialogTitle, Stack, DialogActions, Tab, Tabs } from "@mui/material"
import { CrossIcon, FilterIcon } from '@/assets/icons'
import { useAppDispatch, useAppSelector, useToggle } from '@/hooks'
import TabPanel from '@/components/common/TabPanel'
import PriceSlider from './PriceSlider'
import RenderCheckboxField from './RenderCheckboxField'
import { setClearFilters } from '@/redux/reducers/categoryReducer'

interface props {
    renderList: (data: any) => any
    setSelectedFiltersMobile: any,
    setSelectedPriceMobile: any,
    setIsPriceChanged : any
}

const SmallScreenFilters = ({ renderList, setSelectedFiltersMobile, setSelectedPriceMobile ,setIsPriceChanged}: props) => {
    const categoryData = useAppSelector(state => state.category)
    const dispatch = useAppDispatch()
    const [openFilterBy, toggleFilterBy] = useToggle(false)
    const [tabValue, setTabValue] = useState<number>(0)

    const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({});
    const [selectedPrice, setSelectedPrice] = useState<number[] | null>(null);
    // console.log("🚀 ~ SmallScreenFilters ~ selectedPrice:", selectedPrice)

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue)
    }

    const clearFiltersHandler = () => {
        dispatch(setClearFilters(true));
    }

    const applyFilterHandler = async () => {
        setSelectedFiltersMobile(selectedFilters)
        setSelectedPriceMobile(selectedPrice)
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
                    <Button variant="text" onClick={clearFiltersHandler}>Clear Filter</Button>
                    <IconButton className="CloseButton" onClick={toggleFilterBy}><CrossIcon /></IconButton>
                </Stack>
                <DialogContent>
                    <Stack className="TabsWrapper">
                        <Tabs
                            className="FilterTabs"
                            value={tabValue}
                            onChange={handleTabChange}
                            orientation="vertical"
                            aria-label="Filter tabs"
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
                            <PriceSlider minPrice={categoryData?.price?.minPrice} maxPrice={categoryData?.price?.maxPrice} setSelectedPrice={setSelectedPrice} selectedPrice={selectedPrice} setIsPriceChanged={setIsPriceChanged}/>
                        </TabPanel>
                        {Object.keys(categoryData.specifications).map((filter: any, index: number) => (
                            <TabPanel value={tabValue} index={index + 2} key={filter}>
                                <RenderCheckboxField
                                    filter={filter}
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
                                    )}
                                    selectedFilters={selectedFilters}
                                    setSelectedFilters={setSelectedFilters} />
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

export default SmallScreenFilters