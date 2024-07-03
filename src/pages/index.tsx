import { THEME_TYPE } from "@/axiosfolder";
import BullionmarkShop from "@/components/partials/shop/Bullionmark";
import QmintShop from "@/components/partials/shop/Qmint";
import React from "react";

// Create a wrapper component to handle conditional rendering
const ShopWrapper = (props:any) => {
  if (THEME_TYPE == '1') {
    return <BullionmarkShop {...props} />;
  } else {
    return <QmintShop {...props} />;
  }
};

// Export getServerData from the component that will be used
export const getServerData = async (context:any) => {
  if (THEME_TYPE == '1') {
    return BullionmarkShop.getServerData(context);
  } else {
    return QmintShop.getServerData(context);
  }
};

export default ShopWrapper;
