import { STORE_CODE } from "@/axiosfolder"
import BullionmarkShop from "@/components/partials/shop/Bullionmark"
import QmintShop from "@/components/partials/shop/Qmint"

export default (STORE_CODE == '7' ? BullionmarkShop : QmintShop)
