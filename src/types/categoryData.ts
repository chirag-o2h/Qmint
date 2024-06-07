import { SortingOption } from "./enums"

export interface categoryData {
  loading: boolean,
  items: [] | null,
  count: 0,
  categoryPageMetadata?: any
  categories: [],
  price: {
    minPrice: number,
    maxPrice: number
  } | null,
  specifications: {},
  manufactureres: [],
  productDetailsData: any,
  sortBy: SortingOption | null,
  sortedItems: any[] | null,
  clearFilters: boolean,
  pageSelectedFilters: {
    price: { [key: string]: number[] },
    specification: { [key: string]: { [key: string]: string[] } }
  },
  pageSortOrder: {
    [key: string]: SortingOption
  }
}