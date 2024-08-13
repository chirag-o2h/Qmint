// import { THEME_TYPE } from "@/axiosfolder";
import BullionmarkShop from "@/components/partials/shop/Bullionmark";
import QmintShop from "@/components/partials/shop/Qmint";
import React from "react";

// Create a wrapper component to handle conditional rendering
const ShopWrapper = (props: any) => {
  console.log(process.env.THEME_TYPE == '1' ? "it is 1":"false and it wiill be 0")
  if (process.env.THEME_TYPE == '1') {
    return <BullionmarkShop {...props} />;
  } else {
    return <QmintShop {...props} />;
  }
};

// Export getServerData from the component that will be used
export const getServerData = async (context: any) => {
  return process.env.THEME_TYPE == '1' ? BullionmarkShop.getServerData(context) : QmintShop.getServerData(context)
};
export const Head = () => (
  <>
        <title>Bullion Mark | E-commerse</title>
  </>
)
export default ShopWrapper;
