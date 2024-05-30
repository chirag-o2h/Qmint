import React from "react"
import { STORE_CODE, THEME_TYPE } from "@/axiosfolder"

// Components
import QmintShop from "../../components/partials/shop/QmintShop"
import BullionmarkShop from "../../components/partials/shop/BullionmarkShop"

export default (THEME_TYPE == '1' ? BullionmarkShop : QmintShop)
