import axiosInstance from '@/axiosfolder';
import { ENDPOINTS } from '@/utils/constants';

export interface IRegistrationPayload {
    FirstName: string;
    LastName: string;
    Password: string;
    Email: string;
    Phonenumber: string;
    Address1: string;
    Address2: string;
    Country: string;
    State: string;
    StateName: number;
    City: string;
    Pincode: string;
    IsAgentId: boolean;
    AgentCode: string | null;
    DailyPriceAlert: boolean;
    NewsLetter: boolean;
    IAcceptPrivacyPolicy: boolean;
    Termsofservice: boolean;
    ConfirmPassword?: any
}

export interface IGetRegistrationOTPPayload {
    Phonenumber: string;
    CountryCode: number;
    CountryName: string;
}

export interface IVerifyRegistrationOTPPayload {
    ContactNo: string;
    OTP: string;
}
export interface IrecoveryPasswordSave {
    "Password": string,
    "CustomerId": number
}
class AuthServices {
    static async register(url: string, data: IRegistrationPayload) {
        return axiosInstance.post(url, data);
    }
    static async getRegistrationOTP(url: string, data: IGetRegistrationOTPPayload) {
        return axiosInstance.post(url, data);
    }
    static async verifyRegistrationOTP(url: string, data: IVerifyRegistrationOTPPayload) {
        return axiosInstance.post(url, data);
    }
    static async registrationLog(url: string) {
        return axiosInstance.post(url);
    }
    static async passwordRecoveryEmail(url: string) {
        return axiosInstance.post(url);
    }
    static async passwordRecoverySave(url: string, data: IrecoveryPasswordSave) {
        return axiosInstance.post(url,data);
    }
    static async passwordRecoveryTokenVarified(url: string) {
        return await axiosInstance.post(url);
    }
    static async registrationTokenVarified(url: string) {
        return await axiosInstance.post(url);
    }
    static async resendRegstrationEmail(url: string) {
        return await axiosInstance.post(url);
    }
}
export default AuthServices
