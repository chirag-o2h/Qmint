import BulliomarkMainHomePage from "@/components/partials/landing-page/Bullionmark";
import QmintMainHomePage from "@/components/partials/landing-page/Qmint";

export default (process.env.GATSBY_THEME_TYPE == '1' ? BulliomarkMainHomePage : QmintMainHomePage)
