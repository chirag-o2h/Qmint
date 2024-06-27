import Layout from "@/components/common/Layout";
import Seo from "@/components/common/Seo";
import CalculatorCard from "@/components/partials/calculator/CalculatorCard";
import { Box, Button, Container } from "@mui/material";
import { navigate } from "gatsby";
import React from "react"
import { PageTitle } from "@/components/common/Utils"
import { useAppSelector } from "@/hooks";
import Loader from "@/components/common/Loader";

const Calculators = () => {
    const checkLoadingStatus = useAppSelector(state => state.calculators.loading);
    return (
        <Layout>
            {checkLoadingStatus && <Loader open = {checkLoadingStatus} />}
            <Seo
                keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
                title="Home"
                lang="en"
            />
            <PageTitle title="Calculators" />
            <Container id="PageCalculators">
                <Box className="AllCalculators">
                    <Button onClick={() => navigate("/vault-calculator")} className="CalculatorLink">
                        <CalculatorCard
                            title="Vault Calculator"
                            calculatorType={1}
                        />
                    </Button>
                    <Button onClick={() => navigate("/shipping-calculator")} className="CalculatorLink">
                        <CalculatorCard
                            title="Shipping Calculator"
                            calculatorType={0}
                        />
                    </Button>
                </Box>
            </Container>
        </Layout>
    )
}

export default Calculators;