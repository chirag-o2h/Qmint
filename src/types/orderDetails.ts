interface Address {
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

interface OrderItem {
    productId: number;
    parentProductId: number;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    productName: string;
    shippingMethod: string;
}

export interface OrderDetails {
    orderId: number;
    customOrderNumber: string;
    billingAddressId: number;
    shippingAddressId: number;
    orderStatusId: number;
    orderStatusColor: string | null;
    alertStatusId: number | null;
    orderStatus: string;
    alertStatus: string | null;
    alertStatusColor: string | null;
    shippingStatusId: number;
    paymentStatusId: number;
    paymentMethodSystemName: string;
    orderCustomerId: number;
    shippingMethod: string;
    paymentMethod: string;
    accountType: string;
    accountName: string;
    createdOnUtc: string;
    orderDate: string;
    orderTime: string;
    orderSubtotal: number;
    orderShippingFee: number;
    vaultStorageFee: number;
    paymentMethodFee: number;
    orderTax: number;
    orderDiscount: number;
    orderTotal: number;
    addresses: Address[];
    orderItems: OrderItem[];
    congratulationsText: string | null;
    shippingTextP1: string | null;
    shippingTextP2: string | null;
    shippingTextP3: string | null;
    shippingTextP4: string | null;
    paymentTextP1: string | null;
    paymentTextP2: string | null;
    paymentTextP3: string | null;
    paymentTextP4: string | null;
    paymentTextP5: string | null;
    paymentTextP6: string | null;
    paymentTextP7: string | null;
    sellingTextP1: string | null;
    sellingTextP2: string | null;
    sellingTextP3: string | null;
    rewardPointsHistoryEntryId: number,
    rewardPointsUsed: number,
    rewardPointsUsedAmount: number,
}

