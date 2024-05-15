import React from "react"
import { Box, Stack, Button, Container } from "@mui/material"
import { useForm } from "react-hook-form";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

// Assets
import NewsletterBG from "@/assets/images/NewsletterBG.png"

// Components
import RenderFields from "@/components/common/RenderFields";
import { BullionmarkSectionHeading } from "@/components/common/Utils";

interface FormNewsletter {
  "First name": string,
  "Last name": string,
  "Phone number": string,
  "Email address": string,
  "Agreement": string,
}

const schema = yup.object().shape({
  "First name": yup.string().required(),
  "Last name": yup.string(),
  "Phone number": yup.string(),
  "Email address": yup.string().email().required(),
  "Agreement": yup.string(),
});

function Newsletter() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormNewsletter>({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: any) => {
    console.log("data:", data);
  }

  return (
    <Box id="SectionNewsletter" component="section">
      <img className="NewsletterBG" src={NewsletterBG} alt="" />
      <Box className="BackgroundHolder">
        <Container maxWidth="sm">
          <BullionmarkSectionHeading
            title="Receive inspiration in your inbox"
          />
          <form onSubmit={handleSubmit(onSubmit)}>
            <RenderFields
              register={register}
              error={errors["First name"]}
              name="FirstName"
              placeholder="First Name"
              control={control}
              variant="outlined"
              fullWidth
            />
            <RenderFields
              register={register}
              error={errors["Last name"]}
              name="LastName"
              placeholder="Last Name"
              control={control}
              variant="outlined"
              fullWidth
            />
            <RenderFields
              register={register}
              error={errors["Phone number"]}
              name="PhoneNumber"
              placeholder="Phone Number"
              control={control}
              variant="outlined"
              fullWidth
            />
            <RenderFields
              register={register}
              error={errors["Email address"]}
              name="EmailAddress"
              placeholder="Enter Your Email Address"
              control={control}
              variant="outlined"
              fullWidth
            />
            <RenderFields
              type="checkbox"
              name="Agreement"
              className="Agreement"
              label="I'm happy to receive emails from Bullionmark"
              margin="none"
            />
            <Stack className="ActionWrapper">
              <Button type="submit" size="large" color="primary" variant="contained">Subscribe</Button>
            </Stack>
          </form>
        </Container>
      </Box>
    </Box>
  )
}

export default Newsletter