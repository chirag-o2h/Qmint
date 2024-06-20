import { THEME_TYPE } from "@/axiosfolder"
import QmintNewsDetails from "@/components/partials/news-details/qmint/NewsDetails"
import BmkNewsDetails from "@/components/partials/news-details/bmk/NewsDetails"

export default (THEME_TYPE == '1' ? BmkNewsDetails : QmintNewsDetails)
