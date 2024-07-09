import { STORE_CODE } from "@/axiosfolder";

export const ENDPOINTS = {
  // Registration
  registration: "account/GSEYlTkJeVSWkGhXentuvoUQf2c",
  getRegistrationOTP: "account/mPaSzPrFGIeznbUEAo0H",
  verifyRegistrationOTP: "account/zVciOfK6fmgpnnpfs63okmgd3Gw",

  getConfigStore: "store/duMyjVf3k0KIi7Rq7CmHAA",
  getTicker: "calculator/DMJqdS7VvR2VMk9R",
  getProduct: "product/m9XieCcNOUOxk5ODsP6FXQ/0",
  // slidertype 1 for the main page and 0 for the home page
  getSlider: "home/Y9w8nK5PhEyKFBZQNbV2Ow/?SliderType=typeEnum",
  getFooterLink: "home/N2KdtXS5z0W3EbgvHaDCGw",
  homePageSection: "home/sMwXo8EJm8Pad",
  bullionMarkPage: "home/py3CVkInPwDRX4n1TbvMjQfOmXoJ2",
  getBlog: "Blog/jk9mPhOPvkiq6luNZrwanA",
  postNewsLetter: "home/kQTLjU9dZ0KZSxQFBegdRQ",
  postSubscribeNewsletter: "home/kQTLjU9dZ0KZSxQFBegdRQ",
  topCategoriesListWithSubCategories: "category/xwfjo7TszkKNuYNfIbYrog",
  productPrices: "price/deSo8Uy3q0Cz2LZ4gBy0vQ",
  login: "/login",
  loginUser: "account/JO6SKzu1bEGLAizHldGDcg",
  ImpersonateSignIn: "account/SdcEKDGa6sV",
  BlogList: "Blog/jk9mPhOPvkiq6luNZrwanA",
  BlogDetails: "Blog/71pfOKTeVEupzihE5QeGGQ",
  NewsList: "News/yXO7kEBPR0WMiRINsNssAQ",
  NewsDetails: "News/DoSnNVHaXUqBd12mBffQTA",
  logOutUser: "account/VH7qPWBrFW1lA",
  forgotPasswordLink: "https://register.qmint.com/passwordrecovery",
  createMyAccount: "https://queenslandmint.com/register?returnUrl=",
  membership: "Checkout/rsBDWqaTLMJauU",
  getCategoryData: "category/nRuA1KTPi0q4Outgqr39qw",
  getContactUsConfiguration: "ContactUs/gGu8GSaHhEWKVZICJLtoeg",
  reasonsForContact: "ContactUs/zdT918BBCkKYQBI2D1D0fw",
  saveContactUsDetails: "ContactUs/jn1Gr1IOubQbzQV5S",
  saveCalculators: "calculator/WOGEEHFLeeZisCtFqHdkfpdUrLN",
  productDetails: "product/wb5rqwFBf0ua22kGp0Hlhw/{{product-id}}",
  priceForprogressbar:
    "price/{{product-id}}/jGnpTVO8S0aP1590ehZu3g?hZHxveDw={{timeinterval}}",
  addToCartProduct: "shoppingcart/CxdrQaZ030ekw4jdCgWWKA",
  getShoppingCartData: "shoppingcart/QcKa33GRtUanfuqzmFFM6A",
  updateShoppingCartData: "shoppingcart/OVixigTa9U6RcJbCK7pV2Q",
  deleteShoppingCartData: "shoppingcart/7I7YbS9bX0asi1DVUXT60w",
  recentlyViewdProducts: "product/dS99jwa0akmwbLKOuSs9dA",
  compareProducts: "product/v07u2ZDwV0mGrWHpPYzaKA",
  getWishListData: "wishlist/wCngGbDM3EWvUW9fG7JwdQ",
  updateWishListData: "wishlist/I2HAwstMhkGuGyEsHuHDtg",
  deleteWishListData: "wishlist/PARNGc8fSUerxSmM65X06A",
  addToWishList: "wishlist/rPpCvZNFeEOtE0ESOjGGeQ",
  addWishListToShoppingCart: "Wishlist/nxJzG70390aEbLTm6J0Qsg",
  qmintopenaidata: "MyVault/WqNoMqgI93gqVTfe986gYQ",

  // checkout page
  checkoutDetails: "Checkout/xT3hjqkBFESvUfuMu8T70A",
  checkValidationOnConfirmOrder: "Checkout/NiJ7vYmnQ0CjUVyAoNalJQ",
  addOrEditAddress: "myvault/mIKu7TMRFUW49i97slxpDg",
  getStateAndCountryLists: "utility/MEUpxqzLezhOjhjaN4I4XA",
  calculateInsuranceAndTaxDetails: "calculator/a5n79zVvKUKbIgrXui6tmA",
  calculateCraditCardCharges: "calculator/yGU45H6bwUuxggNPZF8R3g",
  getLocalAgentDetails: "Checkout/P7RS0WEps/", // pass query parameter `AgentId`

  // order place process
  KioskPlaceOrderSendOTP: "orders/SnfaWtozdk6fvNoAMJE5ng/dPLcaeb7i0",
  KioskPlaceOrderVerifyOTP: "orders/SZjOIofpwUakP3eKheaN2w/NRDAW78N8E",
  placeOrder: "Checkout/e3eQr12FQ06Hpan2VxeMYg",

  // order confimation
  orderConfimationDetails: "Checkout/i6GZ9e5bWEOWTnfRwpSIVg/", // dynamic

  // topics
  topicDetail: "topic/DyTigzAfJkuIRqtL9g6MjQ/{{topic-name}}",

  // search
  autoSearch: "home/YGnZN5A9BRgVSeQVOZCQEQ?keyword=",
  search: "home/f0HRWmBuZ3MZQ",

  // live dashboard data
  getLiveDashboardChartData: "calculator/C2hhcnRzCg",

  // order details
  getOrderDetailsData: "myvault/fthBVUKhWUGKKJhSdaFe7w/", // dynamic
  downloadOrderInvoice: "myvault/sSPabQ518EeEccLnRuWg0w/", // dynamic

  //send verification email
  sendVerificationEmail: "account/Posb5zZpZUCS2QQEp6Fvjw/useEmail",

  // my vault > dropdowns
  getConfigDropdown: "myvault/topj10QyQkKhz89du2ssxw",

  // my vault > accounts
  getAccounts: "myvault/oFCrPGc21E6E9cIxEArX4g",
  addOrEditAccount: "myvault/d0axWq2BoUGRiP4GN0qHpg",

  // my vault > addresses
  getAddresses: "myvault/j71euLEXRE6zhEOO9lVyIw",
  addOrEditAddressesInMyVault: "myvault/mIKu7TMRFUW49i97slxpDg",
  deleteAddress: "myvault/wrbG7PIz7U2a5Bx7wEgygQ/", // dynamic

  // my vault -> rewardPointsHistory
  getRewardPointsHistory: "myvault/kSFuIpNrDUuygzsl4bE3Hw",

  // my vault > buy back order history
  getBuyBackOrderHistory: "myvault/oz5pMSV4SUqP92QIId5KmQ",

  // my vault -> orderHistory
  getOrderHistory: "myvault/tBryhxlMq0qgjzuUfbewkA",

  // my vault home page
  getMyVaultHomePageData: "myvault/eOmP5LRTU0O902gE7mO67Q",

  // my vault home page chart data
  getMyVaultHopePageDataChart: "myvault/c2srK54sfd5C4qjS",

  //popup details
  getPopUpDetails: "utility/85WwxAopc7Rn",
  savePopUpData: "utility/CLWL6vMSSrzB",

  //"sitemap"
  siteMapUrl: "utility/fksBMEOGVoLiw",

  // my vault > private holdings
  getPrivateHoldingsList: "myvault/y4vzhfrtjjTnwCFc71pMdI",
  getPrivateHoldingsListLivePrice: "myvault/LlamWfOP1YkWQZEp74U",
  getPrivateHoldingWithId: "myvault/AymK5sLJJtY1Gq/", // dynamic
  getPrivateHoldingAddFormDropdowns: "myvault/PEiK9YP7bHBux2w9fxe",
  addOrEditPrivateHolding: "myvault/nWHfULZySYaaROO",
  // re-orderAPI
  reOrder: "myvault/RxcLCj5Rvlbs4OwCiSkaBg/Orderid",
  // enquiry
  enquiry: "myvault/NKtlZmWzax4PNlIWj",
  // sell qty
  sellQty: "myvault/EZLnvfaBlImG4dOHR",
  // convert to market place
  convertToMarketPlace: "myvault/q9QOiEdTtEkrm6EVOewM2F",
  //delete private holdings
  deletePrivateHoldings: "myvault/puk8elMtXJIwa4NCP/id",
  // new homepage
  mainHomePage: "home/HOb6OH12P5xFHos4DC1L3Q",
  //    upgrade Plan
  upgradPlan: "Checkout/ZQtAuhUHduOX",

  // bullion mark subscription
  subscriptionBullionMark: "ContactUs/WJoEyC3ZHvdaS7DS9Xv3H",
  bullionMarkShopSections: "home/Wcclw6GGBRHcOIlIp74AYgp0wHUOGh9Y",
  registrationTokenVerified: "account/MsnoGd7wRSRyIe03a7m?UQf2c={{token}}",
  // registratino recovery log
  regisrationRecoveryLog: "account/Y369fKy45Ouua7vZrn1t?MGWA={{previousPath}}",
  // password recovery email
  passwordRecoveryEmail: "account/xjLagRE6BnpekIlrg3dED/{{email}}",
  passwordRecoverySave: "account/Y12vw0O2AmFSztz1pMzUy23HX8OoG",
  // verify token of the reset password
  passwordRecoveryTokenVarified: "account/xjLagdr3wcfJ8c?UQf2c={{token}}",
  // resend registration email
  resendRegstrationEmail: "account/PAROuJVRYNTk7p/{{email}}",
  // appointment API
  appointment: "myvault/EcltNnuVgvGSOVkLX6hy5n",
};
export const StoreData = {
  storeCode: 12,
  returnUrl: typeof window !== "undefined" ? window.location.href : null,
};
25;
export const changePasswordURL =
  "https://register.qmint.com/passwordrecovery?id=" + 25;
export const forbiddenKeywords = [
  "post",
  "p . o .",
  "p. o .",
  "p . o.",
  "p .o.",
  "p .o .",
  "p. o. Box",
  "PO Box 2951",
  "P.O. Box",
  "P. O. Box No. 2653",
  "p.o box",
  "p o box",
  "pobox",
  "po box",
  "p.o.box p",
  "o box.post office",
  "postoffiice",
  "locked bag.private bag",
  "lockedbag",
  "secure bag",
  "parcel",
  "parcel locker",
  "locker",
  "post",
];
export const containsForbiddenKeyword = (value: any, keywords: any) => {
  if (!value) return false;
  const lowerCaseValue = value.toLowerCase();
  return keywords.some((keyword: any) =>
    lowerCaseValue.includes(keyword.toLowerCase())
  );
};
export const messageForForbiddenKeyword =
  "PO Box not accepted. Please enter valid street address.";
