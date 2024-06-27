import React, { useEffect } from 'react'
import Seo from "../components/common/Seo"
import { Box, Container, Stack, Typography, Divider, MenuItem, Button, Table, TableBody, TableCell, TableContainer, createStyles, TableHead, TableRow, } from "@mui/material"
import Layout from "@/components/common/Layout";
import { PageTitle } from "@/components/common/Utils"
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getAIdata } from '@/redux/reducers/calculatorsReducer';
import { ENDPOINTS } from '@/utils/constants';
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import RenderFields from '@/components/common/RenderFields';
import { any } from 'prop-types';
import Loader from '@/components/common/Loader';


function Qmintopenai() {
    const checkLoadingStatus = useAppSelector(state => state.calculators.loading);
    const dispatch = useAppDispatch();
    const loading = useAppSelector(state => state.calculators.loading);
    const getopenai = useAppSelector(state => state.calculators.openai);
    const headerdata = getopenai.length > 0 ? getopenai[0] : [];

    const styles: any = createStyles({
        tableBody: {
            border: '1px solid #ddd', // border around the table body
        },
        tableRow: {
            '&:nth-of-type(odd)': {
                backgroundColor: '#f2f2f2', // alternate row background color
            },
        },
        tableCell: {
            padding: '8px', // cell padding
            borderBottom: '1px solid #ddd', // bottom border for each cell
            wordWrap: 'break-word',
        },
    });
    interface Inputs {
        Question?: string,
    }

    const schema = yup.object().shape({
        Question: yup.string().required("Question is required"),
    });
    // useEffect(() => {
    //     dispatch(getAIdata({ question: "last name" }) as any);
    // }, [])



    const OpenAIForm = () => {
        const {
            register,
            reset,
            handleSubmit,
            clearErrors,
            control,
            setValue,
            formState: { errors },
        } = useForm<Inputs>({
            resolver: yupResolver(schema)
        })

        var qus = any;
        const handleFormSubmission = (data: any) => {
            dispatch(getAIdata({ question: data.Question }) as any);
            reset();
        }

        // useEffect(() => {
        //     dispatch(getAIdata({
        //         url: ENDPOINTS.qmintopenaidata,
        //         body: {
        //              qus
        //         }
        //     }) as any);
        // }, [])
        // useEffect(() => {
        //     if (token) {
        //       dispatch(getAIdata({token}) as any);
        //       navigate('/')
        //     }
        //   }, [dispatch]);

        return (
            <>
            {checkLoadingStatus && <Loader open = {checkLoadingStatus} />}
            <form onSubmit={handleSubmit(handleFormSubmission)}>
                <Box className="SelectionWrapper">
                    <Stack className='WeightWrapper'>
                        <RenderFields
                            register={register}
                            error={errors.Question}
                            name="Question"
                            label="Ask your question"
                            type="text"
                            placeholder="Enter Question"
                            control={control}
                            variant='outlined'
                            margin='none'
                            className='Weight'
                            />
                        {/* {Note:- refer to types/enums.ts file for reference for value of the input} */}
                    </Stack>
                    <Button className='AddMetaltBtn' size='large' variant="contained" type="submit" disabled={loading}>Submit</Button>
                </Box>
            </form>
            </>
        )

    }
    return (
        <Layout>
            <Seo
                keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
                title="Home"
                lang="en"
            />
            <Box id="Calculator" className='Calculator' component="section">
                <Box className="TitleWrapper">
                    <PageTitle title="Qmint Open AI" />
                </Box>
                <Container>
                    <Box className='openaiPageContent'>
                        <OpenAIForm />
                    </Box>
                    <TableContainer className="GreyTable">
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    {headerdata?.map((bulkProduct: any, index) => (
                                        <TableCell align="center" style={{ ...styles.tableCell }}>
                                            <Typography variant="subtitle1">{bulkProduct}</Typography>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {getopenai.map((bulkProduct: any, mindex) => (
                                    mindex > 0 ?
                                        <TableRow>
                                            {bulkProduct.map((ans: any, index) => (
                                                <TableCell align="center" style={{ ...styles.tableCell }}>
                                                    <Typography>{ans}</Typography>
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                        : null
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </Box>
        </Layout>
    )
}


export default Qmintopenai

