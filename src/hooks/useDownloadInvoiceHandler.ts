import React from 'react'
import { useAppDispatch } from '.'
import { downloadOrderInvoice } from '@/redux/reducers/orderDetailsReducer'
import { ENDPOINTS } from '@/utils/constants'
import { hasFulfilled } from '@/utils/common'
import useShowToaster from './useShowToaster'
import { AxiosError } from 'axios'

const useDownloadInvoiceHandler = () => {
    const dispatch = useAppDispatch()
    const { showToaster } = useShowToaster()

    const downloadInvoiceHandler = async (orderNumber:any) => {
        const response = await dispatch(downloadOrderInvoice({ url: ENDPOINTS.downloadOrderInvoice + orderNumber }) as any)
        // console.log("🚀 ~ downloadInvoiceHandler ~ response:", response)

        if (!hasFulfilled(response.type)) {
            showToaster({
                // message: ((response?.payload as AxiosError)?.response?.data as { message: string })?.message as string, severity: "error"
                message: (response?.payload as AxiosError)?.message, severity: "error"
            })
        }
        else {
            const pdfData = response.payload?.data;
            // const url = window.URL.createObjectURL(new Blob([pdfData]));
            // const link = document.createElement('a');
            // link.href = url;
            // link.setAttribute('download', 'file.pdf'); //or any other extension
            // document.body.appendChild(link);
            // link.click();
            // console.log("🚀 ~ downloadInvoiceHandler ~ response:", response.payload?.data)
            const blob = new Blob([pdfData], { type: 'application/pdf' });

            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = `invoice_${orderNumber}.pdf`;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
    return downloadInvoiceHandler
}

export default useDownloadInvoiceHandler