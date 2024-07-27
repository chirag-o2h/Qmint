// import MainLayout from "@/components/common/MainLayout";
// import PageNotFoundText from "@/components/partials/PageNotFoundText";
// import { Box } from "@mui/material";
import Seo from "@/components/common/Seo";
import { getConfigData, IconfigDataFromServer } from "@/utils/getConfigData";
import React from "react";

const FourZeroFour = ({serverData}:{serverData: IconfigDataFromServer}) => {
  return (
    <>
    <Seo
    lang="en"
    keywords={[`Contactus page`, ...(serverData?.keywords || [])]}
    configDetailsState={serverData?.configDetails}
  />
    <div> 404</div>
    </>
    // <MainLayout blackTheme>
    //     <Box className="ErrorTextBox">
    //         <PageNotFoundText showMoreTextQuestion={false} />
    //     </Box>
    // </MainLayout>
  );
};
export const getServerData = async (context: any) => {
  return await getConfigData(context);
};
export default FourZeroFour;
