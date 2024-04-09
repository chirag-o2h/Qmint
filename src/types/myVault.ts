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
}

// REWARD POINTS HISTORY
export interface rewardPointsHistoryData {
    extraProperty: any | null;
    count: number;
    page: number;
    pageSize: number;
    items: rewardPointsHistoryDataItems[];
    additionalField: any | null;
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

// ADDRESSES
