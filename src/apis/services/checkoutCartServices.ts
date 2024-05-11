import axiosInstance from '@/axiosfolder';

class CheckoutPageServices {

    static async getCheckoutPageData(url: string, params?:boolean) {
        if(params){
            return axiosInstance.post(url,{},{params});
        }
    }

    static async addOrEditAddress(url: string, addressQuery: any) {
        return axiosInstance.post(url, addressQuery);
    }

    static async getInsuranceAndTaxInfo(url: string, body: any) {
        return axiosInstance.post(url, body);
    }
    static async getCraditCardChargesValue(url: string, body: any) {
        return axiosInstance.post(url, body);
    }

    static async checkValidationOnConfirmOrder(url: string, body: any) {
        return axiosInstance.post(url, body);
    }
    static async orderPlaceOTPSend(url: string, body: any) {
        return axiosInstance.post(url, body);
    }
    static async orderPlaceOTPVerify(url: string, body: any) {
        return axiosInstance.post(url, body);
    }

    static async placeOrder(url: string, body: any) {
        return axiosInstance.post(url, body);
    }

    static async getStateAndCountryLists(url: string) {
        return axiosInstance.get(url);
    }

    static async getLocalAgentDetails(url: string) {
        return axiosInstance.post(url);
    }
}

export default CheckoutPageServices
