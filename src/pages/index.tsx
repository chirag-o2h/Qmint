import { THEME_TYPE } from "@/axiosfolder";
import BullionmarkShop from "@/components/partials/shop/Bullionmark";
import React from "react";

// Create a wrapper component to handle conditional rendering
const ShopWrapper = (props: any) => {
  return <BullionmarkShop {...props} />;
};

// Export getServerData from the component that will be used
export const getServerData = async (context: any) => {
  return BullionmarkShop.getServerData(context);
};

export default ShopWrapper;
