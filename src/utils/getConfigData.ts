import axiosInstance from "@/axiosfolder";
import { ENDPOINTS } from "./constants";
export interface IconfigDataFromServer{
  configDetails:any
  configDetailsForRedux: any
  keywords:any[]
  isMobile:boolean
}
import useragent from 'express-useragent';
export async function getConfigData(context:any) {
  try {
    const ua = useragent.parse(context.headers.get('user-agent'));
    const isMobile = ua.isMobile ? true : false;
    console.log("Fetching config data", Date.now());
    const response = await axiosInstance.get(ENDPOINTS.getConfigStore);
    const configDetails = response.data.data;
    const modifiedConfigDetails = configDetails?.reduce((acc:any, curr:any) => {
      acc[curr.key] = curr;
      return acc;
    }, {})
    return {
      props: {
        configDetails: modifiedConfigDetails,
        keywords: modifiedConfigDetails?.Store_ShopPage_Meta_Keywords?.value?.split(",") || [],
        configDetailsForRedux: configDetails,
        isMobile
      },
    };
  } catch (error) {
    console.error("Error fetching config data:", error);
    return {
      status: 500,
      headers: {},
      props: {},
    };
  }
}
