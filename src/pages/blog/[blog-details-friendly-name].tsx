import { THEME_TYPE } from "@/axiosfolder"
import QmintBlogDetails from "@/components/partials/blog/qmint/BlogDetails"
import BmkBlogDetails from "@/components/partials/blog/bmk/BlogDetails"

export default (THEME_TYPE == '1' ? BmkBlogDetails : QmintBlogDetails)
