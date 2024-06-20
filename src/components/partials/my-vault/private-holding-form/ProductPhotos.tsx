import { Delete1Icon } from '@/assets/icons';
import RenderFields from '@/components/common/RenderFields'
import useShowToaster from '@/hooks/useShowToaster';
import {
    Box, IconButton, Link, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material"
import React, { useEffect, useState } from 'react'

const ProductPhotos = ({ register, errors, control, setValue, getValues, clearErrors, existingDocuments = null, productPhotos, setProductPhotos }: any) => {
    const { showToaster } = useShowToaster()
    const [selectedImage, setSelectedImage] = useState<any>(null);

    const handleDeleteFile = (id: string) => {
        setProductPhotos(productPhotos.filter((file: any) => file.id !== id));
    }

    const uploadHandler = () => {
        if (selectedImage) {
            if (selectedImage.type !== "image/jpeg" && selectedImage.type !== "image/png" && selectedImage.type !== "image/jpg") {
                showToaster({ message: "Please select a jpeg, jpg or png image", severity: "error" })
                return;
            }
            const reader = new FileReader();
            reader.onload = (event: any) => {
                const fileData = event?.target?.result;

                setProductPhotos([...productPhotos, {
                    id: new Date().getTime().toString(),
                    fileName: selectedImage.name,
                    type: getValues("DocumentType"),
                    fileByte: fileData
                }]);
            };
            reader.readAsArrayBuffer(selectedImage);
            setValue("ProductPhotos", selectedImage);
            setSelectedImage(null);
        }
        else {
            showToaster({ message: "Please select a image", severity: "error" })
        }
    }

    return (
        <Box className="PhotosContentwrapper">
            <RenderFields
                type="file"
                register={register}
                error={errors.ProductPhotos}
                name="ProductPhotos"
                label="Product Photos:"
                control={control}
                variant='outlined'
                margin='none'
                setSelectedFile={setSelectedImage}
                uploadFileHandler={uploadHandler}
                required
            >
            </RenderFields>
            <Box className="CommonTableWrapper">
                <TableContainer
                    className="DocumentsDetailTablewrapper  CommonTableDesign"
                >
                    <Table className="DocumentsDetailTable" sx={{ minWidth: 550 }} aria-label="Documents Details table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ minWidth: "300px" }}>File Name</TableCell>
                                <TableCell sx={{ minWidth: "100px" }}>Remove</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productPhotos?.length > 0 ? productPhotos.map((file: any) => (
                                <TableRow
                                    key={file.id}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell component="th" scope="document">
                                        <Link href={file.filePath} target="_blank">{file.fileName}</Link>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton className="DeleteButton" onClick={() => handleDeleteFile(file.id)}><Delete1Icon /></IconButton>
                                    </TableCell>
                                </TableRow>
                            )) :
                                <TableRow
                                    key={"No data"}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell component="th" scope="document">
                                        No Data
                                    </TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}

export default ProductPhotos