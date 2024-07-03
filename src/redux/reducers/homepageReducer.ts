import { createSlice } from '@reduxjs/toolkit'

// Types
import { appCreateAsyncThunk } from '../middleware/thunkMiddleware'
import ConfigServices, { IPopUpDetails, ISavePopUpDetails, IloginUserBody, IupgradPlan } from '@/apis/services/ConfigServices'
import { isBrowser, localStorageGetItem, localStorageSetItem, sessionStorageGetItem, sessionStorageSetItem } from '@/utils/common'
import { FooterLink } from '@/components/footer';

// Services
interface IPopupDetails {
  id: number;
  name: string;
  htmlCode: string;
  reason: string;
  displayPage: string;
  displayCount: number;
  startDate: string;
  endDate: string;
  active: boolean;
  store: string;
  positiveAnswer: any; // You may want to replace 'any' with a more specific type
  negativeAnswer: any; // You may want to replace 'any' with a more specific type
  updatedDate: string | null;
  negativeAnswerUrl: string | null;
  popupQueryId: number;
  totalCustomer: number;
  negativeRedirect: string | null;
  issession: boolean;
  classification: number;
}
interface Item {
  title: string;
  overview: string;
  imageUrl: string;
  friendlyName: string;
  mediaType: string | null;
}

interface IMainHomePage {
  homepage_Section_1_Four_posts_in_a_row: Item[]; // You can replace 'any' with a more specific type if needed
  homepage_Section_2_One_big_post: Item[]; // You can replace 'any' with a more specific type if needed
  homepage_Section_3_Video_showcase: Item[]; // You can replace 'any' with a more specific type if needed
  homepage_Section_4_Four_posts_in_wavy_layout: Item[]; // You can replace 'any' with a more specific type if needed
  homepage_Section_5_Three_posts_in_collage_view: Item[]; // You can replace 'any' with a more specific type if needed
  homepage_Section_6_Picture_Gallery: Item[]; // You can replace 'any' with a more specific type if needed
  homepage_Section_7_Three_posts_in_a_row: Item[];
  homepage_Section_8_Two_posts_in_two_rows_each: Item[]; // You can replace 'any' with a more specific type if needed
  homepage_Section_9_Footer_Quick_Links: {
    name: string,
    linkType: number,
    linkUrl: string,
    displayOrder: number
  }[]
}

export interface BullionMarkItem {
  id: number
  friendlyName: string
  imageUrl: string
  mediaType: string | null
  overview: any
  sectionType: number
  title: string
}

interface IBullionMarkPage {
  homepage_Section_1_Picture_and_content: BullionMarkItem[]; // You can replace 'any' with a more specific type if needed
  homepage_Section_2_Four_posts_in_a_row: BullionMarkItem[]; // You can replace 'any' with a more specific type if needed
  homepage_Section_3_Three_posts_in_a_row: BullionMarkItem[]; // You can replace 'any' with a more specific type if needed
  homepage_Section_4_Two_pics_and_content: BullionMarkItem[]; // You can replace 'any' with a more specific type if needed
  homepage_Section_5_One_big_pic_and_content: BullionMarkItem[]; // You can replace 'any' with a more specific type if needed
  homepage_Section_6_Three_posts_in_wavy_layout: BullionMarkItem[]; // You can replace 'any' with a more specific type if needed
  homepage_Section_7_Two_posts_in_a_row: BullionMarkItem[];
  homepage_Section_8_Footer_background_pic: BullionMarkItem[]; // You can replace 'any' with a more specific type if needed
  homepage_Section_9_Footer_Quick_Links: {
    name: string,
    linkType: number,
    linkUrl: string,
    displayOrder: number
  }[]
}

interface CreateGuidelineState {
  configDetails: any,
  sectionDetails: any,
  loading: boolean,
  bmkShopPageSections: any,
  categoriesList: any,
  userDetails: {
    customerId: number,
    email: string,
    token: string,
    firstName: string,
    lastName: string,
    legalName: string,
    contactNo: string,
    customerGuid: string,
    qrCodeUrl: any,
    ordersCount: number
  } | null,
  isLoggedIn: boolean,
  loadingForSignIn: boolean,
  mebershipPlanDetailsData: any,
  recentlyViewedProducts: any[],
  // toaster
  openToaster: boolean,
  footerSections: FooterSection[] | null,
  buttonText: string,
  redirectButtonUrl: string,
  toasterMessage: string,
  scrollPosition: number,
  severity: 'error' | 'success' | 'info' | 'warning',
  needToShowProgressLoader: false,
  liveDashboardChartData: any,
  popUpdata: IPopupDetails | null,
  siteMapData: { items: IsiteMapData[], totalCount: number } | null;
  mainHomePageData: IMainHomePage | null
  bullionMarkPage: IBullionMarkPage | null
}
interface Settings {
  TwoFactorAuthenticatorAdminlogin: string;
  AdditionalOrderCancellationCharge: string;
  LogRocket_Enable: string;
  LogRocket_AppID: string;
  ImageKitPublicKey: string;
  ImageKitPrivateKey: string;
  ImageKitUrlEndPoint: string;
  LastUpdatedChartData: string;
  xero_bmk_loans_bmk: string | null;
  xero_bmk_loans_qmint: string;
  xero_qmint_loans_bmk: string;
  xero_qmint_loans_qmint: string | null;
  xero_qmint_shipment_charge_ac: string;
  xero_qmint_charge_ac: string;
  xero_secure_ship_charge_itemcode: string;
  xero_secure_ship_charge_description: string;
  xero_credit_card_charge_itemcode: string;
  xero_credit_card_charge_description: string;
  xero_vault_charge_itemcode: string;
  xero_vault_charge_description: string;
  xero_buyback_settelment_itemcode: string;
  xero_buyback_settelment_itemdescription: string;
  Registration_Target: string;
  xero_bmk_charge_ac: string;
  xero_vault_charge_ac: string;
  ProviderId: string;
  SyncInXero: string;
  AusPost_PARCEL_POST_SIGNATURE: string;
  AusPost_EXPRESS_POST_SIGNATURE: string;
  AusPost_EXPRESS_EPARCEL_POST_RETURNS: string;
  AusPost_EPARCEL_POST_ZONAL_RETURNS: string;
  AusPost_EPARCEL_POST_RETURNS: string;
  StarTrack_PREMIUM: string;
  StarTrack_1_3_5KG_FIXED_PRICE_PREMIUM: string;
  shipments_and_Track_Key: string;
  shipments_and_Track_Password: string;
  shipments_and_Track_Authorization_Token: string;
  Aus_Post_Account_Number: string;
  Star_Track_Account_Number: string;
  CheckWeightTolerance: string;
  Aus_Post_api_Host_Url: string;
  Aus_Post_api_Port: string;
  Create_Shipment_Url: string;
  Create_Shipment_Label_Url: string;
  Market_Loss_Owing_is_Overdue_Days: string;
  Order_Not_Paid_Days: string;
  Vault_Storage_Invoice_Not_Paid_Days: string;
  AvailableAgainAfterDays: string;
  bundlediscountkey: string;
  showbundlediscount: string;
  deliverysignofftransfertext: string;
  deliverysignofftransferheder: string;
  Create_Shipment_Order: string;
  Get_Order_Summary: string;
}

interface IsiteMapData {
  storeCode: number;
  settings: Settings;
}

export interface FooterSection {
  mainTitle: string;
  columnOrder: number;
  links: FooterLink[];
}

const initialState: CreateGuidelineState = {
  configDetails: isBrowser && JSON.parse(localStorageGetItem('configDetails') ?? JSON.stringify({})),
  loading: false,
  sectionDetails: isBrowser && JSON.parse(localStorageGetItem('sectionDetails') ?? JSON.stringify({ 1: {}, 2: {} })),
  categoriesList: {},
  footerSections: null,
  userDetails: isBrowser && JSON.parse(sessionStorageGetItem('userDetails') || JSON.stringify({})),
  isLoggedIn: isBrowser && JSON.parse(sessionStorageGetItem('isLoggedIn') || JSON.stringify(false)),
  loadingForSignIn: false,
  mebershipPlanDetailsData: isBrowser && JSON.parse(localStorageGetItem('mebershipPlanDetailsData') ?? JSON.stringify({})),
  // recentlyViewedProducts: isBrowser && JSON.parse(localStorageGetItem('recentlyViewedProducts') ?? JSON.stringify([])),
  recentlyViewedProducts: [],
  openToaster: false,
  buttonText: '',
  redirectButtonUrl: '',
  toasterMessage: '',
  scrollPosition: 0,
  severity: 'info',
  needToShowProgressLoader: false,
  liveDashboardChartData: {},
  popUpdata: null,
  siteMapData: null,
  mainHomePageData: null,
  bullionMarkPage: null,
  bmkShopPageSections: null,
}

export const configDetails = appCreateAsyncThunk(
  'configDetails/status',
  async ({ url }: { url: string }) => {
    return await ConfigServices.details(url)
  }
)
export const HomePageSectionDetails = appCreateAsyncThunk(
  'HomePageSectionDetails/status',
  async ({ url }: { url: string }) => {
    return await ConfigServices.homePageSectiondetails(url)
  }
)
export const CategoriesListDetails = appCreateAsyncThunk(
  'CategoriesListDetails/status',
  async ({ url, params }: { url: string, params: any }) => {
    return await ConfigServices.categoriesList(url, params)
  }
)

export const LoginUserAPI = appCreateAsyncThunk(
  'LoginUserAPI/status',
  async ({ url, body }: { url: string, body: IloginUserBody }) => {
    return await ConfigServices.loginUser(url, body)
  }
)
export const LogOutUserAPI = appCreateAsyncThunk(
  'LogOutUserAPI/status',
  async () => {
    return await ConfigServices.logOutUser()
  }
)
export const ImpersonateSignInAPI = appCreateAsyncThunk(
  'ImpersonateSignInAPI/status',
  async ({ token }: { token: any }) => {
    return await ConfigServices.ImpersonateSignIn(token)
  }
)
export const membershipPlanDetails = appCreateAsyncThunk(
  'membershipPlanDetails/status',
  async ({ url }: { url: string }) => {
    return await ConfigServices.membershipPlanDetails(url)
  }
)

export const getLiveDashboardChartData = appCreateAsyncThunk(
  'getLiveDashboardChartData/status',
  async ({ url }: { url: string }) => {
    return await ConfigServices.getLiveDashboardChartData(url)
  }
)
export const getSiteMapData = appCreateAsyncThunk(
  'getSiteMapData/status',
  async ({ body }: any) => {
    return await ConfigServices.getSiteMapData(body)
  }
)
// export const add = appCreateAsyncThunk(
//   'add/status',
//   async (data: GuidelineTitleParams) => {
//     return await GuidelineService.add(data)
//   }
// )

// export const update = appCreateAsyncThunk(
//   'update/status',
//   async (data: GuidelinelInputs[]) => {
//     return await GuidelineService.update(data)
//   }
// )

// export const deleteGuideline = appCreateAsyncThunk(
//   'deleteGuideline/status',
//   async (data: GuidelineIdParams) => {
//     return await GuidelineService.deleteGuideline(data)
//   }
// )
export const getPopUpDetailsAPI = appCreateAsyncThunk(
  'getPopUpDetailsAPI/status',
  async (params: IPopUpDetails) => {
    return await ConfigServices.getPopUpDetails(params)
  }
)
export const savePopUpDataAPI = appCreateAsyncThunk(
  'savePopUpDataAPI/status',
  async (body: ISavePopUpDetails) => {
    return await ConfigServices.savePoPUpDetails(body)
  }
)
export const getMainHomePageData = appCreateAsyncThunk(
  'getMainHomePageData',
  async () => {
    return await ConfigServices.getMainHomePageAPI()
  }
)

export const getBullionMarkPageAPI = appCreateAsyncThunk(
  'getBullionMarkPageAPI',
  async () => {
    return await ConfigServices.getBullionMarkPageAPI()
  }
)

export const getBullionMarkShopPageSections = appCreateAsyncThunk(
  'getBullionMarkShopPageSections',
  async () => {
    return await ConfigServices.getBullionMarkShopPageSections()
  }
)


export const getFooterLinks = appCreateAsyncThunk(
  "getFooterLinks",
  async () => {
    return await ConfigServices.getFooterSections();
  }
)
export const upgradePlaneOfMembership = appCreateAsyncThunk(
  "upgradePlaneOfMembership",
  async (params: IupgradPlan) => {
    return await ConfigServices.upgradMemberShipPlan(params);
  }
)
export const createHomepageSlice = createSlice({
  name: 'homepage',
  initialState,
  reducers: {
    resetWholeHomePageData: (state) => {
      state.configDetails = {}
      state.mebershipPlanDetailsData = {}
      localStorageSetItem('configDetails', JSON.stringify(state.configDetails))
      localStorageSetItem('mebershipPlanDetailsData', JSON.stringify(state.mebershipPlanDetailsData))
    },
    setLoadingTrue: (state) => {
      state.loading = true
    },
    setLoadingFalse: (state) => {
      state.loading = false
    },
    setRecentlyViewedProduct: (state, action) => {
      // if (!state.recentlyViewedProducts) return;
      const newProductId = action.payload;
      // Check if the product already exists in the recently viewed list
      const existingIndex = state.recentlyViewedProducts.findIndex(productId => productId === newProductId);
      if (existingIndex === -1) {
        let updatedViewProducts = [newProductId, ...state.recentlyViewedProducts]
        if (updatedViewProducts?.length > 20) {
          updatedViewProducts.splice(0, 20)
        }
        state.recentlyViewedProducts = updatedViewProducts
        localStorageSetItem('recentlyViewedProducts', JSON.stringify(updatedViewProducts))
      } else {
        let updatedViewProducts = [...state.recentlyViewedProducts]
        updatedViewProducts.splice(existingIndex, 1);
        updatedViewProducts.unshift(newProductId);
        state.recentlyViewedProducts = updatedViewProducts
        localStorageSetItem('recentlyViewedProducts', JSON.stringify(updatedViewProducts))
      }
    },
    setToasterState: (state, action) => {
      state.openToaster = action.payload.openToaster
      state.toasterMessage = action.payload.toasterMessage
      state.buttonText = action.payload.buttonText || ''
      state.redirectButtonUrl = action.payload.redirectButtonUrl || ''
      state.severity = action.payload.severity || 'info'
    },
    // setToasterMeaasge: (state, action) => {
    //   state.toasterMessage = action.payload
    // },
    // setButtonText: (state, action) => {
    //   state.buttonText = action.payload
    // },
    // setRedirectUrl: (state, action) => {
    //   state.redirectButtonUrl = action.payload
    // },
    setScrollPosition: (state, action) => {
      state.scrollPosition = action.payload;
    },
    serProgressLoaderStatus: (state, action) => {
      state.needToShowProgressLoader = action.payload
    },
    setPopUpDetails: (state, action) => {
      state.popUpdata = { ...state.popUpdata, htmlCode: action.payload ?? null } as any
    },
    setCategoryListEmpty: (state) => {
      state.categoriesList = {}
    },
    setMainHomePageData: (state, action) => {
      state.mainHomePageData = action.payload
    },
    setConfigDetails: (state, action) => {
      const data = action?.payload?.reduce((acc: any, curr: any) => {
        acc[curr.key] = curr
        return acc
      }, {})
      state.configDetails = data
      state.loading = false
      localStorageSetItem('configDetails', JSON.stringify(data))
    },
    setBmkShopPageSections:(state, action)=>{
      state.bmkShopPageSections = action.payload
    }
  },

  extraReducers: (builder) => {
    // Get Homepage configs
    builder.addCase(configDetails.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(configDetails.fulfilled, (state, action) => {
      const data = action?.payload?.data?.data?.reduce((acc: any, curr: any) => {
        acc[curr.key] = curr
        return acc
      }, {})
      state.configDetails = data
      state.loading = false
      localStorageSetItem('configDetails', JSON.stringify(data))
    })
    builder.addCase(configDetails.rejected, (state, action) => {
      state.loading = false
    })

    // Get membership plan data
    builder.addCase(membershipPlanDetails.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(membershipPlanDetails.fulfilled, (state, action) => {
      const responseData = action?.payload?.data?.data;
      // state.mebershipPlanDetailsData = action?.payload?.data?.data

      //  exclude if some key has null value
      const mebershipPlanDetailsData = Object.keys(responseData).reduce((acc: any, key: any) => {
        if (responseData[key] !== null) {
          acc[key] = responseData[key]
        }
        return acc
      }, {})
      state.mebershipPlanDetailsData = mebershipPlanDetailsData
      localStorageSetItem('mebershipPlanDetailsData', JSON.stringify(membershipPlanDetails))
      state.loading = false
    })
    builder.addCase(membershipPlanDetails.rejected, (state, action) => {
      state.loading = false
    })

    // Get Homepagesection details
    builder.addCase(HomePageSectionDetails.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(HomePageSectionDetails.fulfilled, (state, action) => {
      state.sectionDetails = action?.payload?.data?.data
      state.loading = false
      // localStorageSetItem('sectionDetails', JSON.stringify(data))
    })
    builder.addCase(HomePageSectionDetails.rejected, (state, action) => {
      state.loading = false
    })

    // Get categories list
    builder.addCase(CategoriesListDetails.pending, (state, action) => {
      state.loading = true
      state.categoriesList = {}
    })
    builder.addCase(CategoriesListDetails.fulfilled, (state, action) => {
      const data = { ...action?.payload?.data?.data, items: action?.payload?.data?.data?.sort((a: any, b: any) => a?.categoryId - b?.categoryId) }
      state.categoriesList = data
      state.loading = false
    })
    builder.addCase(CategoriesListDetails.rejected, (state, action) => {
      state.loading = false
    })
    // login User API
    builder.addCase(LoginUserAPI.pending, (state, action) => {
      state.loadingForSignIn = true
    })
    builder.addCase(LoginUserAPI.fulfilled, (state, action) => {
      state.userDetails = action.payload.data.data
      sessionStorageSetItem('userDetails', JSON.stringify(action.payload.data.data))
      state.loadingForSignIn = false
      state.isLoggedIn = true
      sessionStorageSetItem('isLoggedIn', JSON.stringify(true))
    })
    builder.addCase(LoginUserAPI.rejected, (state, action) => {
      state.loadingForSignIn = false
    })
    // LogOutUserAPI
    builder.addCase(LogOutUserAPI.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(LogOutUserAPI.fulfilled, (state, action) => {
      state.userDetails = null
      state.loading = false
      state.isLoggedIn = false
      sessionStorageSetItem('userDetails', '')
      sessionStorageSetItem('isLoggedIn', JSON.stringify(false))
    })
    builder.addCase(LogOutUserAPI.rejected, (state, action: any) => {
      if (action?.payload?.response?.status == 401) {
        state.userDetails = null
        state.isLoggedIn = false
        sessionStorageSetItem('userDetails', '')
        sessionStorageSetItem('isLoggedIn', JSON.stringify(false))
      }
      state.loading = false
    })
    // ImpersonateSignInAPI
    builder.addCase(ImpersonateSignInAPI.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(ImpersonateSignInAPI.fulfilled, (state, action) => {
      state.userDetails = action.payload.data.data
      sessionStorageSetItem('userDetails', JSON.stringify(action.payload.data.data))
      state.loading = false
      state.isLoggedIn = true
      sessionStorageSetItem('isLoggedIn', JSON.stringify(true))
    })
    builder.addCase(ImpersonateSignInAPI.rejected, (state, action) => {
      state.loading = false
    })

    // Live Dashboard Chart Data
    builder.addCase(getLiveDashboardChartData.pending, (state, action) => {
      // state.loading = true
    })
    builder.addCase(getLiveDashboardChartData.fulfilled, (state, action) => {
      const responseData = action.payload.data.data;

      // Object.keys(responseData).map((key: string) => {
      //   state.liveDashboardChartData = {
      //     ...state.liveDashboardChartData,
      //     [key]: responseData[key]["threedayrange"][0]
      //   }
      // });
      state.liveDashboardChartData = responseData
      // state.loading = false
    })
    builder.addCase(getLiveDashboardChartData.rejected, (state, action) => {
      // state.loading = false
    })
    // popup details data
    builder.addCase(getPopUpDetailsAPI.pending, (state, action) => {
      // state.loading = true
    })
    builder.addCase(getPopUpDetailsAPI.fulfilled, (state, action) => {
      const responseData = action.payload.data.data;
      state.popUpdata = responseData
      // state.loading = false
    })
    builder.addCase(getPopUpDetailsAPI.rejected, (state, action) => {
      // state.loading = false
    })
    // sitemap data
    builder.addCase(getSiteMapData.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(getSiteMapData.fulfilled, (state, action) => {
      // Group the data by groupTitle
      const responseData = action.payload.data.data;
      const groupedData = responseData?.items?.reduce((acc: { [x: string]: any[]; }, currentItem: { groupTitle: any; }) => {
        const { groupTitle } = currentItem;
        if (!acc[groupTitle]) {
          acc[groupTitle] = [];
        }
        acc[groupTitle].push(currentItem);
        return acc;
      }, {});
      state.siteMapData = { items: groupedData, totalCount: responseData?.count }
      state.loading = false
    })
    builder.addCase(getSiteMapData.rejected, (state, action) => {
      state.loading = false
    })
    builder.addCase(getMainHomePageData.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(getMainHomePageData.fulfilled, (state, action) => {
      const res = action.payload.data.data
      // console.log("🚀 ~ builder.addCase ~ res:", res)
      state.mainHomePageData = res
      state.loading = false
    })
    builder.addCase(getMainHomePageData.rejected, (state, action) => {
      state.loading = false
    })
    // GET FOOTER SECTIONS
    builder.addCase(getFooterLinks.pending, (state, action) => {
      // state.loading = true
    })
    builder.addCase(getFooterLinks.fulfilled, (state, action) => {
      const resData = action.payload.data.data
      state.footerSections = resData
      state.loading = false
    })
    builder.addCase(getFooterLinks.rejected, (state, action) => {
      state.loading = false
    })
    // Upgrad Membership plan
    builder.addCase(upgradePlaneOfMembership.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(upgradePlaneOfMembership.fulfilled, (state, action) => {
      state.loading = false
    })
    builder.addCase(upgradePlaneOfMembership.rejected, (state, action) => {
      state.loading = false
    })
    // Bullion Mark
    builder.addCase(getBullionMarkPageAPI.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(getBullionMarkPageAPI.fulfilled, (state, action) => {
      const res = action.payload.data.data
      state.bullionMarkPage = res
      state.loading = false
    })
    builder.addCase(getBullionMarkPageAPI.rejected, (state, action) => {
      state.loading = false
    })

    // Bullion Mark
    builder.addCase(getBullionMarkShopPageSections.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(getBullionMarkShopPageSections.fulfilled, (state, action) => {
      const res = action.payload.data.data;
      state.bmkShopPageSections = res;
      state.loading = false
    })
    builder.addCase(getBullionMarkShopPageSections.rejected, (state, action) => {
      state.loading = false
    })
  },
})

export const { setCategoryListEmpty, resetWholeHomePageData, setLoadingTrue, setLoadingFalse, setRecentlyViewedProduct, setToasterState, setScrollPosition, serProgressLoaderStatus, setPopUpDetails, setMainHomePageData, setConfigDetails,setBmkShopPageSections } = createHomepageSlice.actions

export default createHomepageSlice.reducer
