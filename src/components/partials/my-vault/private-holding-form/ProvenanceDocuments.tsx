import { Delete1Icon } from '@/assets/icons';
import RenderFields from '@/components/common/RenderFields'
import useShowToaster from '@/hooks/useShowToaster';
import { PrivateHoldingDocumentTypeEnum } from '@/types/enums';
import {
    Box, IconButton, Link, MenuItem, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material"
import React, { useEffect, useState } from 'react'

const ProvenanceDocuments = ({ register, errors, control, setValue, getValues, clearErrors, provenanceDocuments, setProvenanceDocuments }: any) => {
    // console.log("🚀 ~ ProvenanceDocuments ~ provenanceDocuments:", provenanceDocuments)
    const { showToaster } = useShowToaster()
    const [selectedFile, setSelectedFile] = useState<any>(null);
    // const [docTypeValue, setDocTypeValue] = useState<string>("none");

    const handleDeleteFile = (id: string) => {
        setProvenanceDocuments(provenanceDocuments.filter((file: any) => file.id !== id));
    }

    const uploadHandler = () => {
        if (getValues("DocumentType") === "none") {
            showToaster({ message: "Select the document type", severity: "error" })
            return;
        }
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (event: any) => {
                const fileData = event?.target?.result;

                setProvenanceDocuments([...provenanceDocuments, {
                    id: new Date().getTime().toString(),
                    fileName: selectedFile.name,
                    type: getValues("DocumentType"),
                    filePath: "",
                    fileByte: fileData,
                    documentType: getValues("DocumentType")
                }]);
            };
            reader.readAsArrayBuffer(selectedFile);
            setValue("ProvenanceDocuments", selectedFile);
            setSelectedFile(null);
        }
        else {
            showToaster({ message: "Please select a file", severity: "error" })
        }
    }

    return (
        <Box className="DocumentsContentwrapper">
            <RenderFields
                type="file"
                register={register}
                error={errors.ProvenanceDocuments}
                name="ProvenanceDocuments"
                label="Provenance Documents:"
                control={control}
                variant='outlined'
                setSelectedFile={setSelectedFile}
                uploadFileHandler={uploadHandler}
                margin='none'
                required
            >
            </RenderFields>
            <RenderFields
                type="select"
                register={register}
                error={errors.DocumentType}
                clearErrors={clearErrors}
                name="DocumentType"
                control={control}
                variant='outlined'
                getValues={getValues}
                margin='none'
                setValue={setValue}
                value="none"
                className='SelectValue'
            >
                <MenuItem value='none'>Select Document Type</MenuItem>
                {Object.entries(PrivateHoldingDocumentTypeEnum).map(([key, value]) => (
                    <MenuItem key={key} value={key}>{value}</MenuItem>
                ))}
            </RenderFields>
            <Box className="CommonTableWrapper">
                <TableContainer
                    className="DocumentsDetailTablewrapper  CommonTableDesign"
                >
                    <Table className="DocumentsDetailTable" sx={{ minWidth: 550 }} aria-label="Documents Details table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ minWidth: "200px" }}>File Name</TableCell>
                                <TableCell sx={{ minWidth: "200px" }}>Documents Type</TableCell>
                                <TableCell sx={{ minWidth: "100px" }}>Remove</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {provenanceDocuments?.length > 0 ? provenanceDocuments.map((file: any) => (
                                <TableRow
                                    key={file.id}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell component="th" scope="document">
                                        <Link href={file.filePath} target="_blank">{file.fileName}</Link>
                                    </TableCell>
                                    <TableCell>{PrivateHoldingDocumentTypeEnum[file.documentType]}</TableCell>
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

export default ProvenanceDocuments