import { THEME_TYPE } from "@/axiosfolder"
import QmintNewsDetails from "@/components/partials/news-details/qmint/NewsDetails"
import BmkNewsDetails from "@/components/partials/news-details/bmk/NewsDetails"

export default (process.env.THEME_TYPE == '1' ? BmkNewsDetails : QmintNewsDetails)
// Export getServerData from the component that will be used
export const getServerData = async (context: any) => {
    return BmkNewsDetails.getServerData(context);
  };