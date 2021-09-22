import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FilterListIcon from "@material-ui/icons/FilterList";
import GetAppIcon from "@material-ui/icons/GetApp";
import PublishIcon from "@material-ui/icons/Publish";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import { useQuery, useMutation } from "@apollo/client";
import XLSX from "xlsx";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";
import styled from "styled-components";

import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import InsertDriveFileOutlinedIcon from "@material-ui/icons/InsertDriveFileOutlined";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import NoteAddOutlinedIcon from "@material-ui/icons/NoteAddOutlined";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import DescriptionIcon from "@material-ui/icons/Description";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import UploadTableDialog from "../components/TableUpload";
import tables from "../models/table";
import DataFormDialog from "../components/DataForm";

const exportFile = (data) => {
    const ws = XLSX.utils.aoa_to_sheet(data.data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "template");
    XLSX.writeFile(wb, "template.xlsx");
};

const HiddenArea = styled.div`
    display: none;
`;

const DataInput = ({ handleFile, selectFile }) => {
    const handleChange = (e) => {
        const files = e.target.files;
        if (files && files[0]) handleFile(files[0]);
        e.currentTarget.value = ""; // enable same file on change
    };
    return (
        <HiddenArea>
            <form className="form-inline">
                <div className="form-group">
                    <label htmlFor="file">
                        Drag or choose a spreadsheet file
                    </label>
                    <br />
                    <input
                        ref={selectFile}
                        type="file"
                        className="form-control"
                        id="file"
                        accept=".xlsx"
                        onChange={handleChange}
                    />
                </div>
            </form>
        </HiddenArea>
    );
};

const TableInput = ({ data, cols }) => {
    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        {cols.map((c) => (
                            <th key={c.key}>{c.name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((r, i) => (
                        <tr key={i}>
                            {cols.map((c) => (
                                <td key={c.key}>{r[c.key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const makeCols = (count) => {
    let o = [];
    for (var i = 0; i < count; ++i)
        o[i] = { name: XLSX.utils.encode_col(i), key: i };
    return o;
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === "light"
            ? {
                  color: theme.palette.secondary.main,
                  backgroundColor: lighten(theme.palette.secondary.light, 0.85),
              }
            : {
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.secondary.dark,
              },
    leftAlign: {
        flex: "1 1 80%",
    },
}));

const TableToolbar = ({
    columns,
    rows,
    table,
    selectedId,
    setSelected,
    editRef,
}) => {
    const classes = useToolbarStyles();
    if (selectedId.length > 0) {
        columns = [{ label: "id", key: "id", exportable: true }, ...columns];
    }
    //console.log(rows)
    const columnEnabled = columns.filter((column) => column.exportable);
    const columnLabels = columnEnabled.map((column) => column.label);
    const rowsSelected = selectedId.map(
        (id) => rows.filter((row) => row.id == id)[0]
    );
    const rowsEnabled = rowsSelected.map((row) =>
        columnEnabled.map((column) => {
            let item = row[column.key];
            if (item) {
                if (item.hasOwnProperty("label")) {
                    return item.label;
                }
            }
            return item;
        })
    );
    const dataExp = {
        cols: makeCols(columnLabels.length),
        data: [
            columnLabels,
            ...rowsEnabled,
            //...rowsSelected
        ],
    };
    const ref = React.createRef();
    const [isOpenUploadTableDialog, setOpenUploadTableDialog] =
        React.useState(false);
    const [isOpenDataFormDialog, setOpenDataFormDialog] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState({});
    const [headsImp, setHeadsImp] = React.useState([]);
    const [rowsImp, setRowsImp] = React.useState([]);
    const [keysImp, setKeysImp] = React.useState([]);

    const handleFile = (file) => {
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        reader.onload = (e) => {
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws, {
                header: 1,
                defval: "",
            });
            if (!data) {
                // TODO: error throw
                console.error("invalid file");
                return;
            }
            const heads = data[0];
            const rows = data.slice(1);
            setHeadsImp(heads);
            setRowsImp(rows);

            let keys = [];
            data[0].map((head) => {
                //tables[table].columns.map(column => {
                if (head == "id") {
                    keys.push("id");
                } else {
                    let key = "";
                    columns.map((column) => {
                        if (column.label == head) {
                            key = column.key;
                        }
                    });
                    if (key != "") {
                        keys.push(key);
                    } else {
                        keys.push("UNRECOGNIZED");
                    }
                }
            });
            //console.log(keys, heads, rows)
            if (keys.length != heads.length) {
                // TODO: error throw
                console.error("invalid heading", keys, heads);
            }
            setKeysImp(keys);
            setOpenUploadTableDialog(true);
        };
        if (rABS) reader.readAsBinaryString(file);
        else reader.readAsArrayBuffer(file);
    };

    const [rm, loading, error] = useMutation(tables[table].mutation["delete"], {
        refetchQueries: [{ query: tables[table].query.gql }],
        onCompleted: (data) => {
            console.log("done", data);
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
    });
    const deleteData = () => {
        rowsSelected.map((row) => {
            console.log("deleting", row.id);
            rm({
                variables: {
                    id: row.id,
                },
            }).then((v) => {
                if (v.errors) {
                    console.error(v.errors);
                } else {
                    //console.log("deleted", row.id)
                    setSelected([]);
                }
            });
        });
    };
    const handleAdd = () => {
        setSelectedItem({});
        setOpenDataFormDialog(true);
    };
    const handleEdit = () => {
        if (selectedId.length == 1) {
            let items = rows.filter((row) => row.id == selectedId[0]);
            if (items.length == 1) {
                //console.log("matched", items[0])
                setSelectedItem(items[0]);
            }
        }
        setOpenDataFormDialog(true);
    };

    return (
        <Toolbar disableGutters={true} variant="dense">
            <Grid justifyContent="space-between" container>
                <Grid item>
                    {selectedId.length == 1 ? (
                        <Tooltip title="Edit">
                            <IconButton
                                onClick={() => handleEdit()}
                                ref={editRef}
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Tooltip title="Add">
                            <IconButton onClick={() => handleAdd()}>
                                <AddCircleIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}
                    <Tooltip title="Upload">
                        <IconButton onClick={() => ref.current.click()}>
                            <NoteAddIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Download">
                        <IconButton onClick={() => exportFile(dataExp)}>
                            {selectedId.length > 0 ? (
                                <DescriptionIcon fontSize="small" />
                            ) : (
                                <InsertDriveFileIcon fontSize="small" />
                            )}
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <span>
                            <IconButton
                                onClick={() => deleteData()}
                                disabled={selectedId.length == 0}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </span>
                    </Tooltip>
                    <DataInput handleFile={handleFile} selectFile={ref} />
                </Grid>
                <Grid item>
                    {selectedId.length > 0 ? (
                        <Typography
                            variant="caption"
                            id="tableTitle"
                            component="div"
                        >
                            {selectedId.length} selected
                        </Typography>
                    ) : (
                        <Typography
                            variant="caption"
                            id="tableTitle"
                            component="div"
                        ></Typography>
                    )}
                </Grid>
            </Grid>
            <UploadTableDialog
                isOpen={isOpenUploadTableDialog}
                setOpen={setOpenUploadTableDialog}
                heads={headsImp}
                rows={rowsImp}
                table={table}
                keys={keysImp}
            />
            <DataFormDialog
                isOpen={isOpenDataFormDialog}
                setOpen={setOpenDataFormDialog}
                mutation={tables[table].mutation}
                query={tables[table].query.gql}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                formComponents={tables[table].formComponents}
            />
        </Toolbar>
    );
};

const paginationStyle = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2),
    },
}));

const TablePaginationActions = (props) => {
    const classes = paginationStyle();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                <FirstPageIcon />
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                <KeyboardArrowLeft />
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                <KeyboardArrowRight />
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                <LastPageIcon />
            </IconButton>
        </div>
    );
};

const tableStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2),
    },
    table: {
        whiteSpace: "nowrap",
        tableLayou: "fixed",
        maxWidth: "1800px",
    },
    tableCell: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: "200px",
    },
    visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1,
    },
    tableRow: {
        "&.Mui-selected, &.Mui-selected:hover": {
            backgroundColor: "#f5f5f5",
            "& > .MuiTableCell-root": {
                fontWeight: "bold",
            },
        },
    },
    head: {
        backgroundColor: "#f5f5f5",
    },
    body: {
        fontSize: 14,
    },
}));

const TableCellEllipsis = ({ formatter, row, index }) => {
    const classes = tableStyles();
    let value = formatter(row);
    if (!value) {
        value = "-";
    }
    return (
        <Tooltip title={value}>
            <TableCell
                align={index == 0 ? "left" : "right"}
                className={classes.tableCell}
            >
                {value}
            </TableCell>
        </Tooltip>
    );
};

const InnerTable = ({ databaseKey }) => {
    const table = tables[databaseKey];
    if (!table) {
        return "N/A";
    }

    const classes = tableStyles();
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        console.log("page", newPage);
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const editRef = React.createRef();
    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        if (event.detail == 2) {
            editRef.current.click();
        }
        setSelected(newSelected);
    };

    //const {loading, error, data, refetch} = useQuery(table.query.gql, {fetchPolicy: "cache-and-network"})
    const { loading, error, data, refetch } = useQuery(table.query.gql, {
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
    });
    if (data) {
        //console.log("data fetched")
        refetch();
    } else {
        //console.log("refetch")
    }
    if (loading) return <p>loading...</p>;
    if (error) {
        console.log(error);
        return <p>error: {String(error)}</p>;
    }
    const rows = data[table.query.key];
    const columns = table.columns;
    const cellFormatters = table.cellFormatters;

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    //console.log(rows)

    return (
        <div className={classes.root}>
            <TableToolbar
                columns={columns}
                rows={rows}
                selectedId={selected}
                setSelected={setSelected}
                editRef={editRef}
                table={databaseKey}
            />
            <TableContainer className={classes.table}>
                <Table aria-labelledby="tableTitle" size="small">
                    <TableHead className={classes.head}>
                        <TableRow>
                            {columns.map((column, index) => (
                                <TableCell
                                    key={index}
                                    align={index == 0 ? "left" : "right"}
                                    className={classes.tableCell}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((row, index) => {
                                return (
                                    <TableRow
                                        tabIndex={-1}
                                        selected={
                                            selected.indexOf(row.id) !== -1
                                        }
                                        onClick={(event) =>
                                            handleClick(event, row.id)
                                        }
                                        className={classes.tableRow}
                                        key={row.id}
                                    >
                                        {cellFormatters.map(
                                            (formatter, index) => (
                                                <TableCellEllipsis
                                                    formatter={formatter}
                                                    row={row}
                                                    index={index}
                                                    key={index}
                                                />
                                            )
                                        )}
                                    </TableRow>
                                );
                            })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 33 * emptyRows }}>
                                <TableCell colSpan={columns.length} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
                    native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
            />
        </div>
    );
};
export default InnerTable;
