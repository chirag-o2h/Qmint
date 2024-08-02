// import MainLayout from "@/components/common/MainLayout";
// import PageNotFoundText from "@/components/partials/PageNotFoundText";
// import { Box } from "@mui/material";
import MainLayout from "@/components/common/MainLayout";
import Seo from "@/components/common/Seo";
import PageNotFoundText from "@/components/partials/PageNotFoundText";
import { getConfigData, IconfigDataFromServer } from "@/utils/getConfigData";
import { Box } from "@mui/material";
import React from "react";

const FourZeroFour = ({serverData}:{serverData: IconfigDataFromServer}) => {
  return (
    <>
    <Seo
    lang="en"
    keywords={[`Contactus page`, ...(serverData?.keywords || [])]}
    configDetailsState={serverData?.configDetails}
  />
    <MainLayout blackTheme>
        <Box className="ErrorTextBox">
            <PageNotFoundText showMoreTextQuestion={false} isIt404Page={true}/>
        </Box>
    </MainLayout>
    </>

  );
};
export const getServerData = async (context: any) => {
  return await getConfigData(context);
};
export default FourZeroFour;
