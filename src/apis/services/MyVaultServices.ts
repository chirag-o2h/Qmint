import axiosInstance from "@/axiosfolder";
import { AccountQuery, AddressQuery, rewardPointsHistoryData, IOrderHistoryData, SellData, ConversionData, IEnquiryData, IPrivateHoldingAddorEditQuery } from "@/types/myVault";
import { ENDPOINTS } from "@/utils/constants";

class MyVaultServices {
    // CONFIG DROPDOWNS
    static async getConfigDropdowns(url: string) {
        return axiosInstance.get(url);
    }
    // ACCOUNTS
    static async getAccounts(url: string) {
        return axiosInstance.get(url);
    }

    static async addOrEditAccount(url: string, accountQuery: any) {
        return axiosInstance.post(url, accountQuery);
    }

    // ADDRESSES
    static async getAddresses(url: string) {
        return axiosInstance.get(url);
    }

    static async addOrEditAddresses(url: string, addressQuery: AddressQuery) {
        return axiosInstance.post(url, addressQuery);
    }

    static async deleteAddress(url: string) {
        return axiosInstance.delete(url);
    }

    static async getRewardPointsHistory(url: string, rewardPointsHistoryData: rewardPointsHistoryData) {
        return axiosInstance.post(url, rewardPointsHistoryData);
    }

    // BUY BACK ORDER HISTORY
    static async getBuyBackOrderHostory(url: string, query: IOrderHistoryData) {
        return axiosInstance.post(url, query);
    }

    // ORDER HISTORY
    static async getOrderHistory(url: string, orderHistoryData: IOrderHistoryData) {
        return axiosInstance.post(url, orderHistoryData);
    }
    // GET MY VAULT HOMEPAGE DATA
    static async getMyVaultHomePageData() {
        return axiosInstance.get(ENDPOINTS.getMyVaultHomePageData);
    }
    static async getMyVaultHomePageChartData() {
        return axiosInstance.get(ENDPOINTS.getMyVaultHopePageDataChart);
    }

    // PRIAVTE HOLDINGS 
    static async getPrivateHoldingsList() {
        return axiosInstance.get(ENDPOINTS.getPrivateHoldingsList);
    }
    static async getPrivateHoldingsListLivePrice(url: string, body: {
        HoldingIds: number[],
        IsStorePrice: boolean
    }) {
        return axiosInstance.post(url, body);
    }
    static async getPrivateHoldingWithId(url: string) {
        return axiosInstance.get(url);
    }
    static async getPrivateHoldingFormDropdowns(url: string) {
        return axiosInstance.get(url);
    }
    static async addOrEditPrivateHolding(url: string, body: IPrivateHoldingAddorEditQuery) {
        return axiosInstance.post(url, body);
    }

    // POPUPS
    static async sendForEnquiry(body: IEnquiryData) {
        return axiosInstance.post(ENDPOINTS.enquiry, body);
    }
    static async sellQty(body: SellData) {
        return axiosInstance.post(ENDPOINTS.sellQty, body);
    }
    static async convertToMarketPlace(body: ConversionData) {
        return axiosInstance.post(ENDPOINTS.convertToMarketPlace, body);
    }
    // delete PrivateHoldings
    static async deletePrivateHoldings(id: string) {
        return axiosInstance.delete(ENDPOINTS.deletePrivateHoldings.replace('id', id));
    }
    // ACCOUNTS
    static async getAppointmentAPI() {
        return axiosInstance.get(ENDPOINTS.appointment);
    }

}

export default MyVaultServices;