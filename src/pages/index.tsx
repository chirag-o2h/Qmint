import { THEME_TYPE } from "@/axiosfolder";
import BulliomarkMainHomePage from "@/components/partials/landing-page/Bullionmark";
import QmintMainHomePage from "@/components/partials/landing-page/Qmint";

export default (THEME_TYPE == '1' ? BulliomarkMainHomePage : QmintMainHomePage)
