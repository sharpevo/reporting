import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation } from "@apollo/client";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import WarningIcon from "@material-ui/icons/Warning";
import Tooltip from "@material-ui/core/Tooltip";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import tables from "../models/table";

const useStyles = makeStyles({
    table: {
        minWidth: 1000,
    },
});

const UploadTable = ({ dataArray }) => {
    const heads = dataArray[0];
    const rows = dataArray.slice(1);
    const classes = useStyles();

    return (
        <TableContainer>
            <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell key="head-status" align="center">
                            Status
                        </TableCell>
                        {heads.map((head, index) => (
                            <TableCell key={index} align="center">
                                {head}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            <TableCell
                                key={"status-" + rowIndex}
                                align="center"
                            ></TableCell>
                            {row.map((cell, cellIndex) => (
                                <TableCell
                                    key={rowIndex + "." + cellIndex}
                                    align="center"
                                >
                                    {String(cell)}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const StatusIndicator = ({ statusData }) => {
    let message = statusData;
    switch (message) {
        case undefined:
            return <div></div>;
        case "success":
            return (
                <Tooltip title={message}>
                    <CheckCircleIcon color="primary" size="small" />
                </Tooltip>
            );
        case "pending":
            return <div>pending...</div>;
        default:
            return (
                <Tooltip title={message}>
                    <WarningIcon color="secondary" size="small" />
                </Tooltip>
            );
    }
};

const UploadTableDialog = ({ isOpen, heads, rows, table, setOpen, keys }) => {
    const [uploadResp, setUploadResp] = useState([]);
    const classes = useStyles();
    const [upload, loading, error] = useMutation(
        tables[table].mutation["new"],
        {
            refetchQueries: [{ query: tables[table].query.gql }],
            onCompleted: (data) => {
                console.log("done");
            },
            onError: ({ graphQLErrors, networkError, operation, forward }) => {
                if (graphQLErrors) {
                    for (let err of graphQLErrors) {
                        console.log("gqlerror", err.message);
                    }
                }
                if (networkError) {
                    console.log(`[Network error]: ${networkError}`);
                }
            },
        }
    );
    const [update, loadingUpdate, errorUpdate] = useMutation(
        tables[table].mutation["update"],
        {
            refetchQueries: [{ query: tables[table].query.gql }],
            //fetchPolicy: "no-cache",
            onCompleted: (data) => {
                console.log("done", data);
            },
            onError: ({ graphQLErrors, networkError, operation, forward }) => {
                if (graphQLErrors) {
                    for (let err of graphQLErrors) {
                        console.log("gqlerror", err.message);
                    }
                    graphQLErrors.map((err) => {
                        console.log("gqlerror", err.message);
                    });
                }
                if (networkError) {
                    //console.log(`[Network error]: ${networkError}`);
                    console.log(
                        `[Network error]: ${networkError.result.errors}`
                    );
                }
            },
        }
    );
    const handleUpload = (e) => {
        e.preventDefault();
        setUploadResp([...Array(rows.length)].map((i) => "pending"));
        let func = heads.indexOf("id") > -1 ? update : upload;
        rows.map((values, index) => {
            let obj = {};
            keys.map((key, index) => {
                if (key != "UNRECOGNIZED") {
                    obj[key] = values[index];
                }
            });
            func({
                variables: tables[table].normalize(obj),
            }).then((v) => {
                if (v.errors) {
                    let message = String(v.errors);
                    if (v.errors.networkError) {
                        v.errors.networkError.result.errors.map((err) => {
                            message = message.concat(err.message);
                        });
                    }
                    setUploadResp((prev) => {
                        let newResp = [...prev];
                        newResp[index] = message;
                        return newResp;
                    });
                } else {
                    setUploadResp((prev) => {
                        let newResp = [...prev];
                        newResp[index] = String("success");
                        return newResp;
                    });
                }
            });
            //.catch(e => console.error("x", e))
        });
    };
    const handleClose = () => {
        setOpen(false);
        setUploadResp([]);
        //refetchTable()
    };
    return (
        <Dialog
            aria-labelledby="simple-dialog-title"
            maxWidth="xl"
            open={isOpen}
        >
            <DialogTitle id="simple-dialog-title">Upload</DialogTitle>
            <TableContainer>
                <Table
                    className={classes.table}
                    size="small"
                    aria-label="a dense table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell key="head-status" align="center">
                                Status
                            </TableCell>
                            {heads.map((head, index) => (
                                <TableCell key={index} align="center">
                                    {head}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                <TableCell
                                    key={"status-" + rowIndex}
                                    align="center"
                                >
                                    <StatusIndicator
                                        statusData={uploadResp[rowIndex]}
                                    />
                                </TableCell>
                                {row.map((cell, cellIndex) => (
                                    <TableCell
                                        key={rowIndex + "." + cellIndex}
                                        align="center"
                                    >
                                        {String(cell)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <DialogActions>
                <Button
                    onClick={(e) => {
                        handleUpload(event);
                    }}
                    color="primary"
                >
                    Upload
                </Button>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UploadTableDialog;
