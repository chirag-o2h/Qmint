import axiosInstance from "@/axiosfolder";
import { ENDPOINTS } from "./constants";
export interface IconfigDataFromServer{
  configDetails:any
  configDetailsForRedux: any
  keywords:any[]
}
export async function getConfigData() {
  try {
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
