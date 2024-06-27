import React, { useEffect, Fragment } from "react";
import Seo from "../components/common/Seo";
import Layout from "@/components/common/Layout";
import {
    Box, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button
} from "@mui/material";
import { Delete1Icon } from '@/assets/icons';

import { PageTitle } from "@/components/common/Utils";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Link } from "gatsby";
import { clearCompareList, compareProducts, getCompareProducts, removeProductFromCompare } from "@/redux/reducers/compareProductsReducer";
import { ENDPOINTS } from "@/utils/constants";
import noImage from '../assets/images/noImage.png'
import useShowToaster from "@/hooks/useShowToaster";
import Toaster from "@/components/common/Toaster";
import Loader from "@/components/common/Loader";

function CompareProducts() {
    const checkLoadingStatus = useAppSelector(state => state.homePage.loading);
    const openToaster = useAppSelector(state => state.homePage.openToaster)
    const { productIds, comparedProducts, specificationKeys } = useAppSelector((state) => state.compareProducts);
    const dispatch = useAppDispatch();
    const { showToaster } = useShowToaster()

    useEffect(() => {
        const fetchCompareProducts = async () => {
            if (productIds.length > 0) {
                await dispatch(getCompareProducts({ url: ENDPOINTS.compareProducts, body: { productIds: productIds } }) as any);
            }
        }
        fetchCompareProducts();
    }, [productIds])

    const removeProduct = (id: any) => {
        dispatch(removeProductFromCompare(id))
        showToaster({ message: "Product removed from compare list", severity: 'success' })
    }
    return (
        <Layout>
            {checkLoadingStatus && <Loader open={checkLoadingStatus} />}
            {openToaster && <Toaster />}
            <Seo
                keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
                title="Home"
                lang="en"
            />
            <Box id="CompareProductsPage" component="section">
                <Box className="TitleWrapper">
                    <PageTitle title="Compare Products" />
                </Box>
                <Container>
                    <Box className="CompareProductsWrapper">
                        {productIds.length > 0 ? (
                            <Fragment>
                                <Button variant="contained" color="primary" className="ClearList" onClick={() => dispatch(clearCompareList())}>Clear List</Button>
                                <TableContainer
                                    className="CompareProductTableWrapper"
                                    component={Paper}
                                    sx={{}}
                                >
                                    <Table className="CompareProductTable" sx={{ minWidth: 650 }} aria-label="CompareProductTable">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className="StickyCell" style={{ minWidth: 200 }}>Name</TableCell>
                                                {comparedProducts.map((product, index) => (
                                                    <TableCell sx={{ minWidth: { lg: "459px", xs: "400px" } }} key={product.productId} align="center">
                                                        <Link to={`/product-details/${product.friendlypagename}`} className="ProductName">{product.productName}</Link>
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {specificationKeys.map((attribute) => (
                                                <TableRow key={attribute}>
                                                    <TableCell className="StickyCell">{attribute}</TableCell>
                                                    {comparedProducts.map((product, index) => (
                                                        <TableCell align="center" key={product.productId} className={attribute === 'ProductName' ? 'ProductName' : ''}>
                                                            {attribute === 'ProductName' ? (
                                                                <Link to={`/product-details/${product.friendlypagename}`} className="productNameLink">{product.productName}</Link>
                                                            ) : attribute === 'Picture' ? (
                                                                <img src={product.imageUrl ?? noImage} className="ProductImage" alt={product.productName} />
                                                            ) : (
                                                                product.specifications[attribute]
                                                            )}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))}
                                            {comparedProducts.length > 0 && <TableRow>
                                                <TableCell className="StickyCell">Delete</TableCell>
                                                {comparedProducts.map((product) => (
                                                    <TableCell key={product.productId} align="center">
                                                        <IconButton className="DeleteButton" onClick={() => { removeProduct(product.productId) }}><Delete1Icon /></IconButton>
                                                    </TableCell>
                                                ))}
                                            </TableRow>}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Fragment>
                        ) : <Typography variant="h6" component="p" className="NoProductsMessage">No products to compare</Typography>}
                    </Box>
                </Container>
            </Box>

        </Layout >
    );
}

export default CompareProducts;
