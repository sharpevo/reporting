import * as React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { useQuery, useMutation } from "@apollo/client";
import { makeStyles } from "@mui/styles";
import InnerTable from "../components/InnerTable";

const useStyles = makeStyles({
    container: {
        maxWidth: 800,
        marginBottom: 2,
    },
});

const PageSample = () => {
    const classes = useStyles();
    return (
        <Box>
            <Typography variant="h6">Sample Management</Typography>
            <Paper sx={{ mb: 2 }}>
                <InnerTable databaseKey="report_sample" />
            </Paper>
        </Box>
    );
};

export default PageSample;
