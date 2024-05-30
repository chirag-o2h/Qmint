import { STORE_CODE } from "@/axiosfolder";
import BulliomarkMainHomePage from "@/components/partials/landing-page/Bullionmark";
import QmintMainHomePage from "@/components/partials/landing-page/Qmint";

export default (STORE_CODE == '7' ? BulliomarkMainHomePage : QmintMainHomePage)