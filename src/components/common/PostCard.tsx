import React from "react";
import {
  Stack,
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Link,
  IconButton,
  CardMedia,
} from "@mui/material";

// Assets
import { ArrowRight } from "../../assets/icons/index";
import { formatDate } from "@/utils/common";
import noImage from '../../assets/images/noImage.png'
import BmkLogo from "@/assets/logos/bmk-spinning-Logo.svg"


function PostCard({ details, navigate, isNews = false }: any) {
  return (
    <Card className="PostCard">
      <img
        className="PostImage"
        src={details?.imageUrl}
        alt="Product image"
        loading="lazy"
        onClick={() => {
          if (navigate) {
            navigate()
          }
        }}
      />
      <Box className="CardContentWrapper">
        <CardContent>
          <Stack className="PostInfo">
            <Box className="UserInfo">
              <img className="UserImage" src={BmkLogo}  alt={noImage}/>
              <Typography variant="body1">{details?.createdBy}</Typography>
            </Box>
            <Typography variant="body1">{formatDate(isNews ? details?.createdOnUtc : details?.createdOnUtc)}</Typography>
          </Stack>
          <Button
            color="secondary"
            variant="text"
            onClick={() => {
              if (navigate) {
                navigate()
              }
            }}
            sx={{ mt: 1.875 }}
            className="PostTitle"
          >
            <Typography variant="subtitle2">
              {details?.title}
            </Typography>
          </Button>
          <Typography variant="body1" className='PostInfoDescription' sx={{ mt: 1.25 }} dangerouslySetInnerHTML={{
            __html: isNews ? details?.shortDescription : details?.bodyOverview
          }} onClick={() => {
            if (navigate) {
              navigate()
            }
          }}>
          </Typography>
        </CardContent>
        <CardActions sx={{ mt: 1.25, p: 0 }}>
          <Button variant="text" endIcon={<ArrowRight />} onClick={() => {
            if (navigate) {
              navigate()
            }
          }}>
            Discover More
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}

export default PostCard;
