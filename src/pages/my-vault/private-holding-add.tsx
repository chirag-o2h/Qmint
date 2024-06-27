import React, { useEffect, useLayoutEffect, useMemo, useReducer, useState } from "react";
import {
    Box, Button, Container, IconButton, MenuItem, Stack, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material"
import { PageTitle } from "@/components/common/Utils"
import Seo from "@/components/common/Seo"
import useAPIoneTime from "@/hooks/useAPIoneTime"
import { ENDPOINTS } from "@/utils/constants"
import { getTopicDetails } from "@/redux/reducers/topicReducer"
import { useAppDispatch, useAppSelector } from "@/hooks"
import Layout from "@/components/common/Layout"
import Loader from "@/components/common/Loader"
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import RenderFields from "@/components/common/RenderFields"
import { Delete1Icon } from "@/assets/icons"
import BasicDatePicker from "@/components/partials/my-vault/BasicDatePicker"
import { IPrivateHoldingAddInputs, IPrivateHoldingAddorEditQuery } from "@/types/myVault";
import { addOrEditPrivateHolding, clearPrivateHoldingCurrentData, getConfigDropdowns, getPrivateHoldingFormDropdowns, getPrivateHoldingWithId } from "@/redux/reducers/myVaultReducer";
import DynamicFields, { ISpecificationField } from "@/components/partials/my-vault/private-holding-form/DynamicFields";
import ProvenanceDocuments from "@/components/partials/my-vault/private-holding-form/ProvenanceDocuments";
import ProductPhotos from "@/components/partials/my-vault/private-holding-form/ProductPhotos";
import useRequireLogin from "@/hooks/useRequireLogin";
import Toaster from "@/components/common/Toaster";
import useShowToaster from "@/hooks/useShowToaster";
import { hasFulfilled } from "@/utils/common";
import { PrivateHoldingDocumentTypeEnum, PrivateHoldingDocumentTypeReverseEnum, WeightTypes } from "@/types/enums";
import { navigate } from "gatsby";
import RecordNotFound from "@/components/common/RecordNotFound";

const schema = yup.object().shape({
    Account: yup.string().notOneOf(["none"], "Account is required field"),
    ProductName: yup.string().trim().required("Product Name is required field"),
    MintOrBrand: yup.string().notOneOf(["none"], "Mint or Brand is required field"),
    Metal: yup.string().notOneOf(["none"], "Metal is required field"),
    Type: yup.string().notOneOf(["none"], "Type is required field"),
    Series: yup.string().notOneOf(["none"], "Series is required field"),
    Purity: yup.string().notOneOf(["none"], "Purity is required field"),
    Weight: yup.number().required("Weight is required field").typeError("Weight must be a number"),
    WeightType: yup.string().notOneOf(["none"], "Weight Type is required field"),
    Date: yup.string().required("Purchase Date is required field"),
    PurchasePrice: yup.number().required("Purchase Price is required field"),
    PurchaseFrom: yup.string().trim().required("Purchase From is required field"),
    Qty: yup.string().required("Quantity is required field"),
    // ProvenanceDocuments: yup.string().trim(),
    // ProductPhotos: yup.string().trim().required("Product Photos is required field"),
    // DocumentType: yup.string().notOneOf(["none"], "Document Type is required field"),
});

function dropdownStateReducer(state: any, action: any) {
    switch (action.type) {
        case "APPLY_VALUES":
            return {
                Account: action.nextAccount,
                Mint: action.nextMint,
                Metal: action.nextMetal,
                Type: action.nextType,
                Series: action.nextSeries,
                Purity: action.nextPurity,
                WeightType: action.nextWeightType
            }
        default:
            return state;
    }
}
function arrayBufferToBase64(buffer: any) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

export interface IFile {
    id: string,
    fileName: string,
    type: number,
    fileByte?: string,
    filePath?: string,
    documentType?: string
}

function privateHoldingAdd({ location }: { location: any }) {
    const openToaster = useAppSelector(state => state.homePage.openToaster)
    const { loadingForCheckingLogin } = useRequireLogin()
    const loading = useAppSelector(state => state.myVault.loading);
    const currentPrivateHolding = useAppSelector(state => state.myVault.currentPrivateHolding)
    const formDropdowns = useAppSelector(state => state.myVault.privateHoldingFormDropdowns);
    const formDropdownsKeys = useAppSelector(state => state.myVault.privateHoldingFormDropdownsKeys);
    const configDropdowns = useAppSelector(state => state.myVault.configDropdowns)
    const formDropdownsReverseKeys = useAppSelector(state => state.myVault.privateHoldingFormDropdownsReverseKeys);
    const [preparingDataLoading, setPreparingDataLoading] = useState(false)
    const dispatch = useAppDispatch()
    const { showToaster } = useShowToaster()
    const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

    const [dropdownState, dropdownDispatch] = useReducer(dropdownStateReducer, {
        Mint: "none",
        Metal: "none",
        Type: "none",
        Series: "none",
        Purity: "none",
        WeightType: "none",
        Account: "none"
    });
    // documents and image state
    const [provenanceDocuments, setProvenanceDocuments] = useState<IFile[]>([]);
    const [productPhotos, setProductPhotos] = useState<IFile[]>([]);

    // dynamic fields state
    const [dynamicSpecificationFields, setDynamicSpecificationFields] = useState<ISpecificationField[] | null>(null);
    const [dynamicCustomSpecificationFields, setDynamicCustomSpecificationFields] = useState<ISpecificationField[] | null>(null);

    const {
        register,
        handleSubmit,
        control,
        clearErrors,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<IPrivateHoldingAddInputs>({
        resolver: yupResolver(schema)
    })

    useEffect(() => {
        return () => {
            dispatch(clearPrivateHoldingCurrentData());
        }
    }, [])

    useLayoutEffect(() => {
        const fetchFormDropdowns = async () => {
            await dispatch(getPrivateHoldingFormDropdowns({ url: ENDPOINTS.getPrivateHoldingAddFormDropdowns }))
        }
        fetchFormDropdowns();
    }, [])

    // get the inputs data if user wants to edit
    useEffect(() => {
        if (!searchParams.has("holdingId")) return;
        const holdingId = searchParams.get("holdingId");

        const fetchHolding = async () => {
            await dispatch(getPrivateHoldingWithId({ url: ENDPOINTS.getPrivateHoldingWithId + holdingId }))
        }
        fetchHolding()
    }, [])

    // set intial form values if user wants to edit
    useEffect(() => {
        if (!currentPrivateHolding || currentPrivateHolding === "rejected") return;

        setValue("ProductName", currentPrivateHolding.productName)
        setValue("PurchaseFrom", currentPrivateHolding.purchasedFrom);
        setValue("Weight", currentPrivateHolding.weight);
        setValue("Qty", currentPrivateHolding.qty.toString());
        setValue("PurchasePrice", +currentPrivateHolding.price as any) 
        setProvenanceDocuments(currentPrivateHolding.attachments.filter(doc => doc.type !== "ProductPhotos").map((doc: any) => {
            return {
                id: doc.id,
                fileName: doc.fileName,
                type: doc.type,
                filePath: doc.filepath,
                documentType: PrivateHoldingDocumentTypeReverseEnum[doc.provenanceDocType]
            }
        }))
        setProductPhotos(currentPrivateHolding.attachments.filter(doc => doc.type === "ProductPhotos").map((doc: any) => {
            return {
                id: doc.id,
                fileName: doc.fileName,
                type: doc.type,
                filePath: doc.filepath
            }
        }))

        if (!formDropdownsKeys) return;

        function getNextSpecificationItem(specificationName: string) {
            return currentPrivateHolding !== "rejected" && currentPrivateHolding!.productattribute.find((option: any) => formDropdownsKeys![option["specificationAttributeId"].toString()] === specificationName)
        }

        const nextMint = getNextSpecificationItem("Mint");
        const nextMetal = getNextSpecificationItem("Metal");
        const nextType = getNextSpecificationItem("Type");
        const nextSeries = getNextSpecificationItem("Series");
        const nextPurity = getNextSpecificationItem("Purity");

        dropdownDispatch({
            type: "APPLY_VALUES",
            nextAccount: currentPrivateHolding?.subCustomerId,
            // NOTE : static
            nextMint: nextMint ? nextMint["specificationAttributeOptionId"] : "0",
            nextMetal: nextMetal ? nextMetal["specificationAttributeOptionId"] : "0",
            nextType: nextType ? nextType["specificationAttributeOptionId"] : "0",
            nextSeries: nextSeries ? nextSeries["specificationAttributeOptionId"] : "0",
            nextPurity: nextPurity ? nextPurity["specificationAttributeOptionId"] : "0",
            nextWeightType: "0"
        })
    }, [currentPrivateHolding, formDropdownsKeys])

    useAPIoneTime({
        service: getConfigDropdowns,
        endPoint: ENDPOINTS.getConfigDropdown
    })

    if (loadingForCheckingLogin) {
        return
    }

    const onSubmit = async (data: IPrivateHoldingAddInputs) => {
        if (!formDropdownsKeys) return;

        setPreparingDataLoading(() => true)
        const prepareDynamicSpecificationFields = dynamicSpecificationFields?.filter(field => field[Object.keys(field)[0]].specificationName !== "none" && field[Object.keys(field)[0]].value !== "none").map((field) => {
            return {
                "SpecificationAttributeOptionId": Number(field[Object.keys(field)[0]].value),
                "SpecificationAttributeId": Number(field[Object.keys(field)[0]].specificationName),
                "SpecificationAttributeOptionOther": ""
            }
        })
        const prepareDynamicCustomeSpecificationFields = dynamicCustomSpecificationFields?.filter(field => field[Object.keys(field)[0]].specificationName !== "" && field[Object.keys(field)[0]].value !== "").map(field => {
            return {
                key: field[Object.keys(field)[0]].specificationName,
                value: field[Object.keys(field)[0]].value
            }
        })

        let prepareData: IPrivateHoldingAddorEditQuery = {
            // "Id": 0,
            CustomerID: Number(data.Account),
            SubCustomerID: Number(data.Account),
            // "ProductId": 0,
            ProductName: data.ProductName,
            PurchaseDate: data.Date,
            Price: Number(data.PurchasePrice),
            Qty: Number(data.Qty),
            // "RunningQty": 12,
            PurchasedFrom: data.PurchaseFrom,
            Weight: data.Weight,
            WeightType: Number(data.WeightType),
            Attribute: [
                {
                    "SpecificationAttributeOptionId": Number(data.MintOrBrand),
                    "SpecificationAttributeId": Number(formDropdownsReverseKeys ? formDropdownsReverseKeys["Mint"] : "0"),
                    "SpecificationAttributeOptionOther": ""
                },
                {
                    "SpecificationAttributeOptionId": Number(data.Metal),
                    "SpecificationAttributeId": Number(formDropdownsReverseKeys ? formDropdownsReverseKeys["Metal"] : "0"),
                    "SpecificationAttributeOptionOther": ""
                },
                {
                    "SpecificationAttributeOptionId": Number(data.Series),
                    "SpecificationAttributeId": Number(formDropdownsReverseKeys ? formDropdownsReverseKeys["Series"] : "0"),
                    "SpecificationAttributeOptionOther": ""
                },
                {
                    "SpecificationAttributeOptionId": Number(data.Type),
                    "SpecificationAttributeId": Number(formDropdownsReverseKeys ? formDropdownsReverseKeys["Type"] : "0"),
                    "SpecificationAttributeOptionOther": ""
                },
                {
                    "SpecificationAttributeOptionId": Number(data.Purity),
                    "SpecificationAttributeId": Number(formDropdownsReverseKeys ? formDropdownsReverseKeys["Purity"] : "0"),
                    "SpecificationAttributeOptionOther": ""
                },
                // add specification attribute
            ].concat(prepareDynamicSpecificationFields ? prepareDynamicSpecificationFields : []),
            CustomeAttribute: prepareDynamicCustomeSpecificationFields,
            Attachments: provenanceDocuments.map((file) => {
                const fileByteAsString = arrayBufferToBase64(file.fileByte);
                return {
                    "FileName": file.fileName,
                    "Type": 0,
                    "FileByte": fileByteAsString === "" ? undefined : fileByteAsString,
                    "Filepath": file.filePath,
                    "ProvenanceDocType": file.documentType ? Number(file.documentType) : undefined,
                    "ProvenanceOtherDocType": ""
                }
            }).concat(productPhotos.map((file) => {
                const fileByteAsString = arrayBufferToBase64(file.fileByte);

                return {
                    "FileName": file.fileName,
                    "Type": 1,
                    "FileByte": fileByteAsString === "" ? undefined : fileByteAsString,
                    "Filepath": file.filePath,
                    "ProvenanceDocType": undefined,
                    "ProvenanceOtherDocType": ""
                }
            }))
        }

        if (currentPrivateHolding && currentPrivateHolding !== "rejected") {
            prepareData = { ...prepareData, Id: currentPrivateHolding.id };
        }
        // console.log("🚀 ~ onSubmit ~ prepareData:", prepareData)
        setPreparingDataLoading(() => false)

        const response = await dispatch(addOrEditPrivateHolding({ url: ENDPOINTS.addOrEditPrivateHolding, body: prepareData }))

        if (hasFulfilled(response.type)) {
            showToaster({ message: "Private Holding saved successfully", severity: "success" })
            navigate("/my-vault/private-holding")
        }
    }

    const renderDropdownItems = (dropdowns: any) => dropdowns?.map((option: any) => <MenuItem key={option.specificationAttributeOptionsId} value={option.specificationAttributeOptionsId}>{option.specificationOption}</MenuItem>);

    return (
        <>
            {loading || preparingDataLoading && <Loader open={loading || preparingDataLoading} />}
            {openToaster && <Toaster />}
            <Layout>
                <Seo
                    keywords={[`QMint Topics`]}
                    title="Add New Private Holding"
                    lang="en"
                />
                <PageTitle title={searchParams.has("holdingId") ? "Update Private Holding" : "Add New Private Holding"} isMyVaultSubpage={true} backToDashboard={true} />
                {searchParams.has("holdingId") && currentPrivateHolding === "rejected" ? <Typography style={{ textAlign: "center" }}>Private holding not found!</Typography>
                    : (<Box id="PrivateHoldingAddPage" className='PrivateHoldingAddPage' component="section">
                        <Container>
                            <Box className="Content PrivateHoldingAddContent">
                                <form onSubmit={handleSubmit(onSubmit)} id="AddPrivateHolding">
                                    <Stack className="RowWrapper">
                                        <RenderFields
                                            type="select"
                                            register={register}
                                            error={errors.Account}
                                            name="Account"
                                            label="Account:"
                                            control={control}
                                            value={dropdownState.Account}
                                            getValues={getValues}
                                            setValue={setValue}
                                            variant='outlined'
                                            clearErrors={clearErrors}
                                            disabled={searchParams.has("holdingId")}
                                            margin='none'
                                            className='SelectAccount'
                                            required
                                        >
                                            <MenuItem value="none">Select Account</MenuItem>
                                            {configDropdowns && configDropdowns.accountList.map((account) => {
                                                return (<MenuItem key={account.id} value={account.id}>{account.name}</MenuItem>)
                                            })}
                                        </RenderFields>
                                        <RenderFields
                                            register={register}
                                            error={errors.ProductName}
                                            name="ProductName"
                                            label="Product Name:"
                                            disabled={searchParams.has("holdingId")}
                                            placeholder="Enter your product name."
                                            variant='outlined'
                                            margin='none'
                                            required
                                        />
                                        <RenderFields
                                            type="select"
                                            register={register}
                                            error={errors.MintOrBrand}
                                            name="MintOrBrand"
                                            label="Mint/Brand"
                                            value={dropdownState.Mint}
                                            control={control}
                                            variant='outlined'
                                            setValue={setValue}
                                            disabled={searchParams.has("holdingId")}
                                            getValues={getValues}
                                            clearErrors={clearErrors}
                                            margin='none'
                                            className='SelectMint'
                                            required
                                        >
                                            <MenuItem value="none">Select Mint</MenuItem>
                                            {formDropdowns && renderDropdownItems(formDropdowns["Mint"])}
                                        </RenderFields>
                                    </Stack>
                                    <Stack className="RowWrapper">
                                        <RenderFields
                                            type="select"
                                            register={register}
                                            error={errors.Metal}
                                            name="Metal"
                                            getValues={getValues}
                                            label="Metal"
                                            value={dropdownState.Metal}
                                            control={control}
                                            setValue={setValue}
                                            disabled={searchParams.has("holdingId")}
                                            clearErrors={clearErrors}
                                            variant='outlined'
                                            margin='none'
                                            className='SelectMetal'
                                            required
                                        >
                                            <MenuItem value="none">Select Metal</MenuItem>
                                            {/* {formDropdowns && <RenderDropdownItems dropdowns={formDropdowns["Metal"]} />} */}
                                            {formDropdowns && renderDropdownItems(formDropdowns["Metal"])}
                                        </RenderFields>
                                        <RenderFields
                                            type="select"
                                            register={register}
                                            error={errors.Type}
                                            name="Type"
                                            setValue={setValue}
                                            getValues={getValues}
                                            label="Type"
                                            disabled={searchParams.has("holdingId")}
                                            value={dropdownState.Type}
                                            control={control}
                                            variant='outlined'
                                            clearErrors={clearErrors}
                                            margin='none'
                                            className='SelectType'
                                            required
                                        >
                                            <MenuItem value="none">Select Type</MenuItem>
                                            {/* {formDropdowns && <RenderDropdownItems dropdowns={formDropdowns["Type"]} />} */}
                                            {formDropdowns && renderDropdownItems(formDropdowns["Type"])}
                                        </RenderFields>
                                    </Stack>
                                    <Stack className="RowWrapper">
                                        <RenderFields
                                            type="select"
                                            register={register}
                                            error={errors.Series}
                                            name="Series"
                                            getValues={getValues}
                                            label="Series"
                                            value={dropdownState.Series}
                                            control={control}
                                            setValue={setValue}
                                            clearErrors={clearErrors}
                                            disabled={searchParams.has("holdingId")}
                                            variant='outlined'
                                            margin='none'
                                            className='SelectSeries'
                                        // required
                                        >
                                            <MenuItem value="none">Select Series</MenuItem>
                                            {/* {formDropdowns && <RenderDropdownItems dropdowns={formDropdowns["Series"]} />} */}
                                            {formDropdowns && renderDropdownItems(formDropdowns["Series"])}
                                        </RenderFields>
                                        <RenderFields
                                            type="select"
                                            register={register}
                                            error={errors.Purity}
                                            name="Purity"
                                            label="Purity"
                                            getValues={getValues}
                                            setValue={setValue}
                                            disabled={searchParams.has("holdingId")}
                                            value={dropdownState.Purity}
                                            control={control}
                                            clearErrors={clearErrors}
                                            variant='outlined'
                                            margin='none'
                                            className='SelectPurity'
                                            required
                                        >
                                            <MenuItem value="none">Select Purity</MenuItem>
                                            {/* {formDropdowns && <RenderDropdownItems dropdowns={formDropdowns["Purity"]} />} */}
                                            {formDropdowns && renderDropdownItems(formDropdowns["Purity"])}
                                        </RenderFields>
                                    </Stack>
                                    <Stack className="RowWrapper">
                                        <RenderFields
                                            register={register}
                                            error={errors.Weight}
                                            name="Weight"
                                            label="Weight"
                                            type="number"
                                            disabled={searchParams.has("holdingId")}
                                            placeholder="Enter Weight"
                                            control={control}
                                            variant='outlined'
                                            margin='none'
                                            className='Weight'
                                            setValue={setValue}
                                            alloweTheDotIntertion = {true}
                                            inputProps={{ step: "0.01" }}
                                        />
                                        <RenderFields
                                            type="select"
                                            register={register}
                                            error={errors.WeightType}
                                            name="WeightType"
                                            clearErrors={clearErrors}
                                            value={dropdownState.WeightType}
                                            label="Weight Type"
                                            disabled={searchParams.has("holdingId")}
                                            getValues={getValues}
                                            control={control}
                                            variant='outlined'
                                            setValue={setValue}
                                            margin='none'
                                            className='SelectWeightType'
                                            required
                                        >
                                            <MenuItem value="none">Select Weight Type</MenuItem>
                                            <MenuItem value='0'>ounces</MenuItem>
                                            <MenuItem value='1'>grams</MenuItem>
                                            <MenuItem value='2'>kilograms</MenuItem>
                                        </RenderFields>
                                    </Stack>
                                    <DynamicFields existingFields={currentPrivateHolding && currentPrivateHolding !== "rejected" ? currentPrivateHolding.productattribute : null} setDynamicSpecificationFields={setDynamicSpecificationFields} setDynamicCustomSpecificationFields={setDynamicCustomSpecificationFields} existingCustomFields={currentPrivateHolding && currentPrivateHolding !== "rejected" ? currentPrivateHolding.customeAttribute : null} />
                                    <Stack className="RowWrapper">
                                        <BasicDatePicker name="Date" label="Purchase Date" setValue={setValue} existingDate={currentPrivateHolding && currentPrivateHolding !== "rejected" ? currentPrivateHolding?.purchaseDate : null} error={errors.Date} clearErrors={clearErrors} />
                                        <RenderFields
                                            register={register}
                                            control={control}
                                            error={errors.PurchasePrice}
                                            name="PurchasePrice"
                                            label="Purchase price (per unit):"
                                            disabled={searchParams.has("holdingId")}
                                            placeholder="Enter Purchase price"
                                            variant='outlined'
                                            margin='none'
                                            type="number"
                                            required
                                            setValue={setValue}
                                            alloweTheDotIntertion={true}
                                        />
                                        <RenderFields
                                            register={register}
                                            error={errors.PurchaseFrom}
                                            name="PurchaseFrom"
                                            placeholder="Enter Purchase from"
                                            label="Purchase From: "
                                            variant='outlined'
                                            margin='none'
                                            disabled={searchParams.has("holdingId")}
                                            required
                                        />
                                        <RenderFields
                                            type="number"
                                            register={register}
                                            error={errors.Qty}
                                            disabled={searchParams.has("holdingId")}
                                            control={control}
                                            name="Qty"
                                            placeholder="Enter available quantity"
                                            label="Qty:"
                                            variant='outlined'
                                            margin='none'
                                            required
                                        />
                                    </Stack>
                                    <Stack className="RowWrapper DocumentPhotosContentWrapper">
                                        <ProvenanceDocuments register={register} errors={errors} control={control} getValues={getValues} clearErrors={clearErrors} setValue={setValue} provenanceDocuments={provenanceDocuments} setProvenanceDocuments={setProvenanceDocuments} />
                                        <ProductPhotos register={register} errors={errors} control={control} getValues={getValues} clearErrors={clearErrors} setValue={setValue} productPhotos={productPhotos} setProductPhotos={setProductPhotos} />
                                    </Stack>
                                    <Stack sx={{ gap: "20px", justifyContent: "flex-end" }} className='BottomButtonsWrapper'>
                                        <Button variant="outlined" size="large" onClick={() => navigate("/my-vault/private-holding")}>Cancel</Button>
                                        <Button variant="contained" size="large" type="submit">Save</Button>
                                    </Stack>
                                </form>
                            </Box>
                        </Container>
                    </Box>)}
            </Layout >
        </>
    )
}

export default privateHoldingAdd
