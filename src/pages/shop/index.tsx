import React from "react"
import { STORE_CODE } from "@/axiosfolder"

// Components
import QmintShop from "../../components/partials/shop/QmintShop"
import BullionmarkShop from "../../components/partials/shop/BullionmarkShop"

export default (STORE_CODE == '7' ? BullionmarkShop : QmintShop)