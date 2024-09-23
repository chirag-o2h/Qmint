import * as React from "react";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";

import { ENDPOINTS } from "@/utils/constants";

// Hooks
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import useAPIoneTime from "@/hooks/useAPIoneTime";
import { getRewardPointsHistory } from "@/redux/reducers/myVaultReducer";
import { requestBodyDefault } from "@/pages/category/[category]";
import { convertDate } from "@/utils/helper";

function createData(
    date: string,
    points: string,
    pointsBalance: string,
    Message: string,

) {
    return { date, points, pointsBalance, Message };
}

function RewardsPointsTable() {
    const rewardPointsData = useAppSelector(state => state.myVault.rewardPointsHistory);
    const dispatch = useAppDispatch();
    // useAPIoneTime({service : getRewardPointsHistory, endPoint : ENDPOINTS.getRewardPointsHistory, body : { ...requestBodyDefault, filter : {} }})

    useEffect(() => {
        dispatch(getRewardPointsHistory({ url: ENDPOINTS.getRewardPointsHistory, body: { ...requestBodyDefault, filters: {} } }));
    }, []);


    return (
        <>
            <Box className="CommonTableWrapper">
                <TableContainer
                    className="RewardsPointsTableWrapper  CommonTableDesign"
                >
                    <Table className="RewardsPointsTable" sx={{ minWidth: 650 }} aria-label="Rewards Points table">
                        <TableHead>
                            <TableRow className="RewardsPointsRow">
                                <TableCell sx={{ minWidth: "300px" }}>Date</TableCell>
                                <TableCell sx={{ minWidth: "100px" }}>Points</TableCell>
                                <TableCell sx={{ minWidth: "200px" }}>Points balance</TableCell>
                                <TableCell sx={{ minWidth: "600px" }}>Message</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!!rewardPointsData?.pointsHistories?.items?.length ? rewardPointsData?.pointsHistories?.items?.map((item: { id: React.Key | null | undefined; createdOnUtc: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; points: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; pointsBalance: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; message: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
                                <TableRow
                                    key={item.id}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{convertDate(item.createdOnUtc as any)}</TableCell>
                                    <TableCell>{item.points}</TableCell>
                                    <TableCell>{item.pointsBalance}</TableCell>
                                    <TableCell>{item.message}</TableCell>
                                </TableRow>
                            )) : null}

                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}

export default RewardsPointsTable