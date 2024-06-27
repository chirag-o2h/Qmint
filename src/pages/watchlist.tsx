import React, { useState } from "react";
import { Container } from "@mui/material";
import Layout from "@/components/common/Layout";
import Seo from "@/components/common/Seo";
import { PageTitle } from "@/components/common/Utils";
import EmailFriend from "@/components/partials/wishlist/EmailFriend";
import useAPIoneTime from "@/hooks/useAPIoneTime";
import { ENDPOINTS } from "@/utils/constants";
import { getWishListData } from "@/redux/reducers/wishListReducer";
import WishListDetails from "@/components/partials/wishlist/WishListDetails";
import Loader from "@/components/common/Loader";

const WISHLIST_URL = "http://queenslandmint.com/wishlist/5b455134-e44c-492a-a79b-33487860ff00"
import Toaster from "@/components/common/Toaster";
import { useAppSelector, useToggle } from "@/hooks";

function Wishlist() {
  const [openEmailFriend, toggleEmailFriend] = useToggle(false);
  const openToaster = useAppSelector(state => state.homePage.openToaster);
  // const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar
  const [showCopyIcon, setShowCopyIcon] = useState(false);
  const checkloadingstatus = useAppSelector(state => state.wishList.loading);
  const [body] = useState({
    "search": "",
    "pageNo": 0,
    "pageSize": -1,
    "sortBy": "",
    "sortOrder": "",
    "filters": {}
  })
  useAPIoneTime({
    service: getWishListData,
    endPoint: ENDPOINTS.getWishListData,
    body
  });

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(WISHLIST_URL);
    setShowCopyIcon(true);
    setTimeout(() => {
      setShowCopyIcon(false);
    }, 3000);
  };

  return (
    <Layout>
      {checkloadingstatus && <Loader open={checkloadingstatus} />}
      {openToaster && <Toaster />}
      <Seo
        keywords={["QMint Watchlist"]}
        lang="en"
      />
      <PageTitle title="Watchlist" maxWidth="lg" />
      <Container id="Pagewishlist" maxWidth="lg">
        <WishListDetails toggleEmailFriend={toggleEmailFriend} />
        {/* FOR URL OF WATCHLIST */}
        {/* <Box className="WishlistLink">
          <Typography>Your Watchlist URL for sharing</Typography>
          <Stack className="Wrapper">
            <Button>{WISHLIST_URL}</Button>
            {!showCopyIcon && <IconButton size="small" color="secondary" onClick={handleCopyUrl}>
              <ClipboardIcon fontSize="inherit" />
            </IconButton>}
            {showCopyIcon &&
              // Note:- correct the icon size and color
              <IconButton size="small" color="secondary" disabled={true}>
                <CorrectIcon />
              </IconButton>}
          </Stack>
        </Box> */}
        <EmailFriend open={openEmailFriend} onClose={toggleEmailFriend} />
      </Container>
    </Layout>
  );
}

export default Wishlist;
