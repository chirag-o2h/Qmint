import { IPopUpDetails } from "@/apis/services/ConfigServices";
import { navigate } from "gatsby";

export const stockUpdate: any = {
  availableStock: 'We only have few items left for some products as listed below. Kindly adjust your cart quantity(s) accordingly.',
  validationHeader: 'Your order is not placed due to some reason mentioned below.'
}

export const deliveryMethodMessage = {
  noShippingAtAddress: 'This product is currently not being shipped to Canada.',
  noSecureShipping: 'This product is not available for Secured Shipping.'
}

export const stockStatus: any = {
  profit: 'profit',
  loss: 'loss',
}

export function formatDate(dateString: any) {
  const options: any = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
}
// function formatDate(timestamp) {
//   const date = new Date(timestamp);
//   const day = date.getDate().toString().padStart(2, '0');
//   const month = (date.getMonth() + 1).toString().padStart(2, '0');
//   const year = date.getFullYear();

//   return `${day}/${month}/${year}`;
// }
export function progressBarLogic({ currentprice, min, max }: any) {
  return ((currentprice - min) / (max - min)) * 100
}

export function valueChangeForPrice({ currentprice, yesterdayprice }: { currentprice: number, yesterdayprice: number }) {
  return (((currentprice - yesterdayprice) / yesterdayprice) * 100).toFixed(2)
}
export function roundOfThePrice(price: any) {
  if (price == null || isNaN(Number(price))) {
    return '...';
  }
  const roundedPrice = Number(price).toFixed(2);
  return roundedPrice;
}

export const shipmentTypeToEnum: any = {
  'LocalShipping': 3,
  'SecureShipping': 2,
  'VaultStorage': 1
}
export const shipmentNameEnum: any = {
  'LocalShipping': 'Local Pick Up',
  'SecureShipping': 'Secure Shipping',
  'VaultStorage': 'Vault storage'
}
export const isBrowser = typeof window !== "undefined"
export function localStorageGetItem(key: any) {
  return isBrowser && key ? (localStorage?.getItem(key) === 'undefined' ? undefined : localStorage?.getItem(key)) : undefined
}

export function localStorageSetItem(key: any, value: any) {
  isBrowser && localStorage?.setItem(key, typeof value !== 'string' ? JSON.stringify(value) : value)
}
export function sessionStorageGetItem(key: any) {
  if (isBrowser && sessionStorage) {
    const value: any = sessionStorage.getItem(key);
    return value
  }
  return undefined;
}
export function sessionStorageSetItem(key: any, value: any) {
  if (isBrowser && sessionStorage) {
    sessionStorage.setItem(key, typeof value !== 'string' ? JSON.stringify(value) : value);
  }
}
export function hasFulfilled(dataType: string): boolean {
  return dataType.includes('/fulfilled');
}

// Function to store the last page in session storage
export const storeLastPage = (pageUrl: string) => {
  if (!pageUrl.includes("login")) {
    sessionStorage.setItem('lastPage', pageUrl);
  }
};

// Function to retrieve the last page from session storage
export const getLastPage = () => {
  return sessionStorage.getItem('lastPage');
};

export const PriceFacturationEnum: { [key: string]: "error" | "success" } = {
  "0": "success",
  "1": "success",
  "2": "error"
}
export const bodyForGetShoppingCartData = {
  "search": "",
  "pageNo": 0,
  "pageSize": -1,
  "sortBy": "",
  "sortOrder": "",
  "filters": {}
}

export function getDefaultOption(enabledOptions: any[], defaultOption: string | number) {
  const enabledValues = enabledOptions.filter(option => option.enabled).map(option => option.value);
  return enabledValues.length > 0 ? enabledValues[0] : defaultOption;
}
export const paymentMethodType: any = {
  "CreditCard": 'Credit Card',
  "BankTransfer": 'Bank Transfer',
  "Cash": 'Cash',
}
// Debounce function
export const debounceFunction = (func: any, delay: any) => {
  let timeoutId: any;
  return function (...args: any) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this as any, args);
    }, delay);
  };
};
// Function to capitalize the first character
export const capitalizeFirstChar = (str: any) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// color for metals
export const metalColors: any = {
  "gold": "#FFCC00",
  "silver": "#CCCCCC",
  "platinum": "#99CCFF",
  "palladium": "#CC99CC"
}
// function to convert minutes to milliseconds
export const convertMinutesToMilliseconds = (minutes: number | string): number => {
  // Convert minutes to milliseconds
  const milliseconds = Number(minutes) * 60 * 1000;
  return milliseconds;
};

export const AccountTypeEnumReverse: { [key: string]: string } = {
  "1": "Individual",
  "2": "Joint",
  "3": "Business",
  "4": "Superfund",
  "5": "Trust",
  "6": "Wholesaler"
}
export const AccountTypeEnum: { [key: string]: string } = {
  "Individual": "1",
  "Joint": "2",
  "Business": "3",
  "Superfund": "4",
  "Trust": "5",
  "Wholesaler": "6"
}

export const checkThePopUpDetails = async (paramsObj: IPopUpDetails, openPopup: any, dispatch: any, service: any) => {
  // const res = await ConfigServices.getPopUpDetails(paramsObj)
  const res = await dispatch(service(paramsObj))
  if (res?.payload?.data?.data?.htmlCode) {
    openPopup(true)
    return true
  }

  return false
}
// export const calculationOfThePremiumAndDiscount = (premium: string | number, premiumDiscount: string | number) => {
//   const numbre = Math.round((Number(premiumDiscount) / Number(premium)) * 100)
//   return "SAVE " + numbre + "%"
// }
export const calculationOfThePremiumAndDiscount = (premium: string | number, premiumDiscount: string | number): string | null => {
  const parsedPremium = Number(premium);
  const parsedDiscount = Number(premiumDiscount);

  // Check if parsedPremium and parsedDiscount are valid numbers
  if (isNaN(parsedPremium) || isNaN(parsedDiscount) || parsedPremium === 0) {
    return null;
  }

  const percentage = Math.round((parsedDiscount / parsedPremium) * 100);

  if (isNaN(percentage)) {
    return null;
  }

  return `${percentage}% Off on premium`;
}
export const getlastPartOfPath = (path: any) => {
  const parts = path.split('/').filter((part: string) => part !== '');

  // Get the last part of the path
  const lastPartOfPath = parts[parts.length - 1];
  return lastPartOfPath
}
export const getLengthOfThePaths = (path: any) => {
  const parts = path.split('/').filter((part: string) => part !== '');

  return parts
}
export const openNewTab = (url: any) => {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    // Open a new tab for external URLs
    window.open(url, '_blank');
  } else {
    // For internal URLs, use Gatsby's navigate function
    navigate(url);
  }
};
export const formatCategoryUrl = (pageName: any) => {
  // Check if pageName starts with '/' and adjust URL accordingly
  const formattedPageName = pageName.startsWith('/') ? pageName : `/${pageName}`;
  return formattedPageName;
};
export const pagesOnWhichNeedToCallTopCategoriesAPi = ['login', 'registration', 'password-recovery', 'blog', 'news', 'forgot-password', "topic", "confirmation", "activate-account", "contactus", "email-confirmation", "404","newpage"]
export const isItNewsOrBlogPage = ['login', 'registration', 'password-recovery', 'blog', 'news', 'forgot-password', "topic", "confirmation", "activate-account", "contactus", "email-confirmation", "404"]
export const joinWithPipe = (parts: any[]) => {
  return parts.filter(part => part != null && part !== '').join(' | ');
};
export function calculatePrice(product:any, qty:any) {
  // Destructure the product object to get the necessary properties
  const { price, tierPriceList } = product;

  // If there is no tierPriceList or it's empty, return the base price
  if (!tierPriceList || tierPriceList.length === 0) {
    return price;
  }

  // Find the tier price that matches the given quantity
  const tier = tierPriceList.find((tier:any) => qty >= tier.fromQty && qty <= tier.toQty);

  // If a matching tier price is found, return the tier price, otherwise return the base price
  return tier ? tier.price : price;
}