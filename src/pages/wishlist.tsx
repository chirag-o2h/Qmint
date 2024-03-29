import React, { useState } from "react";
import { Box, Button, Container, IconButton, Stack, Typography } from "@mui/material";
import { Snackbar } from "@mui/material"; // Import Snackbar from MUI
import { ClipboardIcon } from "@/assets/icons";
import Layout from "@/components/common/Layout";
import Seo from "@/components/common/Seo";
import { PageTitle } from "@/components/common/Utils";
import EmailFriend from "@/components/partials/wishlist/EmailFriend";
import useAPIoneTime from "@/hooks/useAPIoneTime";
import { ENDPOINTS } from "@/utils/constants";
import { getWishListData } from "@/redux/reducers/wishListReducer";
import WishListDetails from "@/components/partials/wishlist/WishListDetails";
import { useAppSelector, useToggle } from "@/hooks";
import Toaster from "@/components/common/Toaster";

function Wishlist() {
  const [openEmailFriend, toggleEmailFriend] = useToggle(false);
  const openToaster = useAppSelector(state => state.homePage.openToaster);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar

  useAPIoneTime({
    service: getWishListData,
    endPoint: ENDPOINTS.getWishListData,
    body: {
      "search": "",
      "pageNo": 0,
      "pageSize": -1,
      "sortBy": "",
      "sortOrder": "",
      "filters": {}
    }
  });

  const handleCopyUrl = () => {
    navigator.clipboard.writeText("http://queenslandmint.com/wishlist/5b455134-e44c-492a-a79b-33487860ff00");
    setSnackbarOpen(true); // Open Snackbar when URL is copied
  };

  return (
    <Layout>
      {openToaster && <Toaster />}
      <Seo
        keywords={["QMint Wishlist"]}
        title="Wishlist"
        lang="en"
      />
      <PageTitle title="Wishlist" />
      <Container id="Pagewishlist" maxWidth="lg">
        <WishListDetails toggleEmailFriend={toggleEmailFriend} />
        <Box className="WishlistLink">
          <Typography>Your wishlist URL for sharing</Typography>
          <Stack className="Wrapper">
            <Button>http://queenslandmint.com/wishlist/5b455134-e44c-492a-a79b-33487860ff00</Button>
            <IconButton size="small" color="secondary" onClick={handleCopyUrl}>
              <ClipboardIcon fontSize="inherit" />
            </IconButton>
          </Stack>
        </Box>
        <EmailFriend open={openEmailFriend} onClose={toggleEmailFriend} />
      </Container>
      {/* Snackbar for displaying copy success */}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message="URL copied to clipboard!"
      />
    </Layout>
  );
}

export default Wishlist;
