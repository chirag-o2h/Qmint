import { THEME_TYPE } from "@/axiosfolder"
import QmintBlogDetails from "@/components/partials/blog-details/qmint/BlogDetails"
import BmkBlogDetails from "@/components/partials/blog-details/bmk/BlogDetails"

export default (THEME_TYPE == '1' ? BmkBlogDetails : QmintBlogDetails)
