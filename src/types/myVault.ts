// CONFIG DROPDOWNS
export interface IDropdownItem {
    id: number;
    name: string;
    enumValue: number;
    type: any;
    colorCode: string | null;
    seqNo: number;
    extraProperty: any;
}

export interface IConfigDropdown {
    accountList: IDropdownItem[];
    accountTypeList: IDropdownItem[];
    buybackOrderStatusList: IDropdownItem[];
    countryList: IDropdownItem[];
    orderStatusList: IDropdownItem[];
    stateList: IDropdownItem[];
    trusteeTypeList: IDropdownItem[];
}

// ACCOUNTS
interface AdditionalBeneficiary {
    customerAdditionalBeneficiaryId: number;
    firstName: string;
    lastName: string;
}

export interface AddressQuery {
    addressId?: number;
    firstName: string;
    lastName: string;
    company: string;
    email: string;
    phoneNumber: string;
    isVerified: boolean;
    addressLine1: string;
    addressLine2: string;
    city: string;
    stateId: number;
    stateName: string;
    postcode: number;
    countryId: number;
    IsOrder?: boolean
}

export interface AccountQuery {
    customerId: number;
    accountTypeId: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    city: string;
    state: number;
    country: number;
    businessName: string;
    superfundName: string;
    trusteeTypeId: number;
    trusteeName: string;
    trustName: string;
    additionalBeneficiary: AdditionalBeneficiary[];
    address: AddressQuery;
}

export interface Address {
    addressId: number;
    addressTypeId: number;
    customerId: number;
    firstName: string;
    lastName: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    stateId: number;
    postcode: number;
    countryId: number;
    phoneNumber: string;
    email: string;
    isSource: string;
    isVerified: boolean;
    stateName: string;
    countryName: string;
    addressType: string;
    orderStatusId: number | null;
}

export interface Account {
    customerId: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    billingAddressId: number | null;
    accountType: string;
    accountName: string;
    accountNumber: number | null;
    masterCustomerId: number | null;
    address: Address;
    additionalBeneficiary: {
        id: number;
        customerId: number;
        firstName: string;
        lastName: string;
    }[]
}

// REWARD POINTS HISTORY
interface PointsHistoryItem {
    id: number;
    customerId: number;
    points: number;
    pointsBalance: number;
    usedAmount: number;
    message: string;
    createdOnUtc: string;
    endDateUtc: string;
    validPoints: number;
}

interface PointsHistories {
    extraProperty: any | null;
    count: number;
    page: number;
    pageSize: number;
    items: PointsHistoryItem[];
    additionalField: any | null;
}

export interface rewardPointsHistoryData {
    pointsHistories: PointsHistories;
    totalPoint: number;
    totalPointAmount: number;
    maxUsePoint: number;
    maxUsePointAmount: number;
}

export interface rewardPointsHistoryDataItems {
    id: number;
    customerId: number;
    storeCode: number;
    points: number;
    pointsBalance: number;
    usedAmount: number;
    message: string;
    createdOnUtc: string;
    endDateUtc: string;
    validPoints: number;
}

// ORDER HISTORY
export interface IOrderHistoryData {
    search: string;
    pageNo: number;
    pageSize: number;
    sortBy: string;
    sortOrder: string;
    filters: IOrderHistoryDataFilters;
}

export interface IOrderHistoryDataFilters {
    fromDate: Date;
    toDate: Date;
    orderStatusId: number;
    orderCustomerId: number;
}

// export interface IOrderHistoryItems {
//     accountName: string;
//     accountType: string;
//     alertOrderStatus: null | string;
//     alertOrderStatusId: number;
//     billingAddressId: number;
//     createdOnUtc: string; // Assuming this is a date string
//     customOrderNumber: string;
//     customerId: number;
//     orderCustomerId: number;
//     orderGuid: string;
//     orderId: number;
//     orderStatus: string;
//     // orderStatusColor : string;
//     orderStatusId: number;
//     paymentMethodSystemName: null | string;
//     paymentStatusId: number;
//     shippingAddressId: number;
//     shippingMethod: string;
//     shippingStatusId: number;
//     storeCode: number;
//   }

export interface IOrderHistoryItems {
    orderId: number;
    orderGuid: string;
    customOrderNumber: string;
    storeCode: number;
    billingAddressId: number;
    shippingAddressId: number;
    orderStatusId: number;
    alertStatusId: number;
    shippingStatusId: number;
    paymentStatusId: number;
    paymentMethodSystemName: string;
    customerId: number;
    orderCustomerId: number;
    orderTotal: number;
    shippingMethod: string;
    accountType: string;
    accountName: string;
    createdOnUtc: string;
    orderStatus: string;
    orderStatusColor: string;
    alertStatus: string | null;
    alertStatusColor: string | null;
}

export interface IOrderHistoryApiResponseData {
    additionalField: any | null;
    count: number;
    extraProperty: any | null;
    items: IOrderHistoryItems[];
    page: number;
    pageSize: number;
}

// PRIVATE HOLDINGS

export interface IPrivateHolding {
    id: number,
    subCustomerID: number,
    productId: number,
    producName: string,
    quantity: number,
    purchasePrice: number,
    filepath: string
}
export interface IPrivateHoldingLivePrice {
    holdingId: number,
    unitPrice: number,
    price: number,
    move: number,
    percentage: number,
    position: number
}
export interface IPrivateHoldingAddInputs {
    Account: string
    ProductName: string
    MintOrBrand: string
    Metal: string
    Type: string
    Series: string
    Purity: string
    Weight: number
    WeightType: string
    Specification: string
    Value: string
    CustomSpecification: string
    CustomValue: string
    PurchasePrice: string
    Date: string
    PurchaseFrom: string
    Qty: string
    ProvenanceDocuments: string
    ProductPhotos: string
    DocumentType: string
}

export interface IPrivateHoldingAddorEditQuery {
    Id?: number;
    CustomerID?: number;
    SubCustomerID?: number;
    ProductId?: number;
    ProductName?: string;
    PurchaseDate?: string;
    Price?: number;
    Qty?: number;
    RunningQty?: number;
    PurchasedFrom?: string;
    Weight?: number;
    WeightType?: number;
    Attribute?: {
        SpecificationAttributeOptionId: number;
        SpecificationAttributeId: number;
        SpecificationAttributeOptionOther: string;
    }[];
    CustomeAttribute?: any[]; // You might want to replace 'any' with a specific type/interface if you know the structure
    Attachments?: {
        Id?: number;
        FileName?: string;
        Type?: number;
        Filepath?: string | undefined;
        Filebyte?: string | undefined;
        PrivateHoldingsID?: number;
        ProvenanceDocType?: number | undefined;
        ProvenanceOtherDocType?: string;
    }[];
}

export interface ISpecificPrivateHolding {
    id: number;
    customerId: number;
    subCustomerId: number;
    productId: number;
    productName: string;
    purchaseDate: string;
    price: number;
    qty: number;
    runningQty: number;
    purchasedFrom: string;
    weight: number;
    weightType: string;
    productattribute: {
        specificationAttributeId: number;
        specificationAttributeOptionId: number;
        specificationAttributeOptionOther: null | string;
    }[];
    customeAttribute: any[]; // Assuming custom attribute can be of any type
    attachments: {
        id: number;
        fileName: string;
        type: string;
        filepath: string;
        provenanceDocType: string;
        provenanceOtherDocType: null | string;
    }[];
}

export interface IPrivateHoldingFormDropdown {
    // "specificationAttributeId": number,
    // "specificationAttribute": string,
    // "specificationAttributeOptions": {
    //     "specificationAttributeOptionsId": number,
    //     "specificationAttributeId": number,
    //     "specificationOption": string
    // }[]
    [key: string]: {
        "specificationAttributeOptionsId": number,
        "specificationAttributeId": number,
        "specificationOption": string
    }[]
}


// Sell Qty
export interface SellData {
    HoldingId: number;
    SoldQuantity: number;
    SoldTo: string;
}

export interface ConversionData {
    HoldingId: number;
    ConvertQuantity: number;
    StorePrice: number;
    MinimumPrice: number;
}
export interface IEnquiryData {
    HoldingId: number;
    Quantity: number;
    ProductPrice: number;
}
