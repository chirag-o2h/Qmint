import React from "react";
import { Box, Container, Divider } from "@mui/material";
import { PageTitle } from "@/components/common/Utils";
import OrderDateStatusSelector from "@/components/partials/my-vault/OrderDateStatusSelector";
import OrderDetailsCard from "@/components/partials/my-vault/OrderDetailsCard";
import Seo from "@/components/common/Seo";
import useAPIoneTime from "@/hooks/useAPIoneTime";
import { ENDPOINTS } from "@/utils/constants";
import { getTopicDetails } from "@/redux/reducers/topicReducer";
import { useAppSelector, useAppDispatch } from "@/hooks";
import Layout from "@/components/common/Layout";
import Loader from "@/components/common/Loader";
import { useEffect } from "react";
import { getConfigDropdowns, getOrderHistory } from "@/redux/reducers/myVaultReducer";
import { requestBodyOrderHistory } from "./buy-back-order-history";
import { navigate } from "gatsby";
import Toaster from "@/components/common/Toaster";
import useRequireLogin from "@/hooks/useRequireLogin";

function OrderHistory() {
  const { loadingForCheckingLogin } = useRequireLogin()
  const openToaster = useAppSelector(state => state.homePage.openToaster)
  const loading = useAppSelector(state => state.myVault.loading)
  const dispatch = useAppDispatch();
  const orderHistoryDetails = useAppSelector((state) => state.myVault.orderHistory);

  useEffect(() => {
    dispatch(
      getOrderHistory({
        url: ENDPOINTS.getOrderHistory,
        body: { ...requestBodyOrderHistory, pageSize: -1 },
      })
    );
  }, []);
  useAPIoneTime({
    service: getConfigDropdowns,
    endPoint: ENDPOINTS.getConfigDropdown
  })
  // useAPIoneTime({service : getOrderHistory , endPoint : ENDPOINTS.getOrderHistory , body :{ ...requestBodyDefault, filters: {} } })
  if (loadingForCheckingLogin) {
    return
  }
  return (
    <>
      {loading &&  <Loader open={loading} />}
      {openToaster && <Toaster/>}
      <Layout>
        <Seo
          keywords={[`QMint OrderHistory`]}
          title="Order History"
          lang="en"
        />
        <PageTitle title="Orders" backToDashboard={true} />
        <Box
          id="OrderHistoryPage"
          className="OrderHistoryPage"
          component="section"
        >
          <Container>
            <Box className="Content OrderHistoryContent">
              <Divider />
              <OrderDateStatusSelector orderHistoryType="normal" />
              <Divider />
              <Box className="OrderDetailsCardsWrapper">
                <OrderDetailsCard orderHistoryDetails={orderHistoryDetails} />
              </Box>
            </Box>
          </Container>
        </Box>
      </Layout>
    </>
  );
}

export default OrderHistory;
