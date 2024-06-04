import { createSlice } from "@reduxjs/toolkit";
import { appCreateAsyncThunk } from "../middleware/thunkMiddleware";
import AuthServices, { IGetRegistrationOTPPayload, IrecoveryPasswordSave, IRegistrationPayload, IVerifyRegistrationOTPPayload } from "@/apis/services/authServices";
import { ENDPOINTS } from "@/utils/constants";

interface IAuthIntialState {
    loading: boolean;
}

const initialState: IAuthIntialState = {
    loading: false
}

export const registration = appCreateAsyncThunk(
    'registration',
    async ({ url, body }: { url: string, body: IRegistrationPayload }) => {
        return await AuthServices.register(url, body)
    }
)
export const getRegistrationOTP = appCreateAsyncThunk(
    'getRegistrationOTP',
    async ({ url, body }: { url: string, body: IGetRegistrationOTPPayload }) => {
        return await AuthServices.getRegistrationOTP(url, body)
    }
)
export const verifyRegistrationOTP = appCreateAsyncThunk(
    'verifyRegistrationOTP',
    async ({ url, body }: { url: string, body: IVerifyRegistrationOTPPayload }) => {
        return await AuthServices.verifyRegistrationOTP(url, body)
    }
)

export const registrationLog = appCreateAsyncThunk(
    'registrationLog',
    async ({ url }: { url: string }) => {
        return await AuthServices.registrationLog(url)
    }
)

export const passwordRecoveryEmail = appCreateAsyncThunk(
    'passwordRecoveryEmail',
    async ({ url }: { url: string }) => {
        return await AuthServices.passwordRecoveryEmail(url)
    }
)
export const passwordRecoverySave = appCreateAsyncThunk(
    'passwordRecoverySave',
    async ({ url, data }: { url: string ,data: IrecoveryPasswordSave }) => {
        return await AuthServices.passwordRecoverySave(url, data)
    }
)
export const passwordRecoveryTokenVarified = appCreateAsyncThunk(
    'passwordRecoveryTokenVarified',
    async ({ url}: { url: string }) => {
        return await AuthServices.passwordRecoveryTokenVarified(url)
    }
)
export const registrationTokenVarified = appCreateAsyncThunk(
    'registrationTokenVarified',
    async ({ url}: { url: string }) => {
        return await AuthServices.registrationTokenVarified(url)
    }
)
export const resendRegstrationEmail = appCreateAsyncThunk(
    'resendRegstrationEmail',
    async ({ url}: { url: string }) => {
        return await AuthServices.resendRegstrationEmail(url)
    }
)
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(registration.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(registration.fulfilled, (state, action) => {
            state.loading = false
        })
        builder.addCase(registration.rejected, (state, action) => {
            state.loading = false
        })
        builder.addCase(getRegistrationOTP.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getRegistrationOTP.fulfilled, (state, action) => {
            state.loading = false
        })
        builder.addCase(getRegistrationOTP.rejected, (state, action) => {
            state.loading = false
        })
        builder.addCase(verifyRegistrationOTP.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(verifyRegistrationOTP.fulfilled, (state, action) => {
            state.loading = false
        })
        builder.addCase(verifyRegistrationOTP.rejected, (state, action) => {
            state.loading = false
        })
    }
})

export default authSlice.reducer;