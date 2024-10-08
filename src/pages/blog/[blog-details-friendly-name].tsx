import QmintBlogDetails from "@/components/partials/blog-details/qmint/BlogDetails"
import BmkBlogDetails from "@/components/partials/blog-details/bmk/BlogDetails"

export default (process.env.THEME_TYPE == '1' ? BmkBlogDetails : QmintBlogDetails)

export const getServerData = async (context: any) => {
    return BmkBlogDetails.getServerData(context);
  };