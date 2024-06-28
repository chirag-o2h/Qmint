import { THEME_TYPE } from "@/axiosfolder"
import BullionmarkShop from "@/components/partials/shop/Bullionmark"
import QmintShop from "@/components/partials/shop/Qmint"

export default (THEME_TYPE == '1' ? BullionmarkShop : QmintShop)
