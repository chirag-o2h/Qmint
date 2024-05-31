import { THEME_TYPE } from "@/axiosfolder"
import QmintNewsDetails from "@/components/partials/news/qmint/NewsDetails"
import BmkNewsDetails from "@/components/partials/news/bmk/NewsDetails"

export default (THEME_TYPE == '1' ? BmkNewsDetails : QmintNewsDetails)
