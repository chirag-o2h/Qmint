import axiosInstance from "@/axiosfolder"
import { AxiosError } from "axios"

export const pxToRem = (size: any) => {
  if (typeof size === 'number') {
    return `${size / 16}rem`
  }
  if (typeof size === 'string' && /^\d+(?:\.\d+)?px$/.test(size)) {
    const pxValue = parseFloat(size.replace('px', ''))
    return `${pxValue / 16}rem`
  }
  throw new Error(`Invalid argument for pxToRem: ${size}`)
}

export async function apicall(url: string, method: 'get' | 'post' = 'get', requestData: any) {
  try {
    let response;
    if (method === 'get') {
      response = await axiosInstance.get(url);
    } else if (method === 'post') {
      response = await axiosInstance.post(url, requestData);
    }
  } catch (error: any | Error | AxiosError) {
    // console.error('error', error)
  } finally {
  }
}

export const trimAllSpaceFromString = (text: string) => (
  text.replace(/ /g, '')
)

export const prefixZeroIfOneDigitNumber = (number: number) => {
  if (number < 10) {
    return '0' + number
  } else {
    return number
  }
}