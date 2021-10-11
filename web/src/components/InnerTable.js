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
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { useQuery, useMutation } from "@apollo/client";
import XLSX from "xlsx";
//import styled from "styled-components";
import { styled, alpha } from "@mui/material/styles";

import { InputBase } from "@mui/material";

import UploadTableDialog from "../components/TableUpload";
import tables from "../models/table";
import DataFormDialog from "../components/DataForm";

import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import SelectAllIcon from "@mui/icons-material/SelectAll";
import SearchIcon from "@mui/icons-material/Search";

const exportFile = (data) => {
    const ws = XLSX.utils.aoa_to_sheet(data.data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "template");
    XLSX.writeFile(wb, "template.xlsx");
};

const DataInput = ({ handleFile, selectFile }) => {
    const handleChange = (e) => {
        const files = e.target.files;
        if (files && files[0]) handleFile(files[0]);
        e.currentTarget.value = ""; // enable same file on change
    };
    return (
        <div style={{ display: "none" }}>
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
        </div>
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

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    margin: theme.spacing(0, 0, 0, -5),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            //"&:focus": {
            //width: "20ch",
            //},
        },
    },
}));
const TableToolbar = ({
    columns,
    rows,
    table,
    selectedId,
    setSelected,
    editRef,
    queryVariables,
    defaultValues,
    onSelectAllClick,
    setFilter,
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
    const [isOpenUploadTableDialog, setOpenUploadTableDialog] = React.useState(
        false
    );
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
        refetchQueries: [
            { query: tables[table].query.gql, variables: queryVariables },
        ],
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
        rm({
            variables: { ids: selectedId },
        }).then((v) => {
            if (v.errors) {
                console.error(v.errors);
            } else {
                //console.log("deleted", row.id)
                setSelected([]);
            }
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

    const handleSearch = (event) => {
        setSelected([]);
        let value = event.target.value;
        if (value) {
            setFilter(() => (row) => {
                let matched = false;
                tables[table].cellFormatters.map((formatter) => {
                    if (formatter(row)) {
                        if (formatter(row).includes(value)) {
                            matched = true;
                        }
                    }
                });
                return matched;
            });
        } else {
            setFilter(() => (row) => {
                return true;
            });
        }
    };

    return (
        <Toolbar disableGutters={true} variant="dense">
            <Grid justifyContent="space-between" container>
                <Grid item>
                    {!tables[table].disable_scu &&
                        (selectedId.length == 1 ? (
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
                        ))}
                    <Tooltip title="Select All">
                        <IconButton onClick={() => onSelectAllClick()}>
                            <SelectAllIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    {!tables[table].disable_bcu && (
                        <Tooltip title="Upload">
                            <IconButton onClick={() => ref.current.click()}>
                                <NoteAddIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}
                    <Tooltip title="Download">
                        <IconButton onClick={() => exportFile(dataExp)}>
                            {selectedId.length > 0 ? (
                                <DescriptionIcon fontSize="small" />
                            ) : (
                                <InsertDriveFileIcon fontSize="small" />
                            )}
                        </IconButton>
                    </Tooltip>
                    {!tables[table].disable_d && (
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
                    )}
                    <DataInput handleFile={handleFile} selectFile={ref} />
                </Grid>
                <Grid item>
                    <Search>
                        <SearchIconWrapper>
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
                        </SearchIconWrapper>
                        <StyledInputBase
                            onChange={(event) => handleSearch(event)}
                            placeholder="search..."
                            fontSize="small"
                        />
                    </Search>
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
                defaultValues={defaultValues}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                queryVariables={queryVariables}
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
        maxWidth: "100px",
        fontSize: "10px",
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
        },
    },
    head: {
        fontWeight: "bold",
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

const InnerTable = ({
    databaseKey,
    setItem,
    queryVariableValue,
    defaultValues,
}) => {
    const table = tables[databaseKey];
    if (!table) {
        return "N/A";
    }

    const classes = tableStyles();
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [filter, setFilter] = React.useState(() => (row) => {
        return true;
    });

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
        if (event.detail == 2 && editRef.current) {
            editRef.current.click();
        }
        setSelected(newSelected);
        if (setItem) {
            let items = rows.filter((row) => row.id == name);
            setItem(items[0]);
        }
    };

    //const {loading, error, data, refetch} = useQuery(table.query.gql, {fetchPolicy: "cache-and-network"})
    let queryVariables = {};
    if (table.query.variables) {
        queryVariables = table.query.variables(queryVariableValue);
    }
    const { loading, error, data, refetch } = useQuery(table.query.gql, {
        variables: queryVariables,
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
    const rows = data[table.query.key].filter(filter);
    const columns = table.columns;
    const cellFormatters = table.cellFormatters;

    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    //console.log(rows)

    const handleSelectAllClick = () => {
        if (selected.length == rows.length) {
            setSelected([]);
        } else {
            const newSelecteds = rows.map((row) => row.id);
            setSelected(newSelecteds);
        }
    };

    return (
        <div className={classes.root}>
            <TableToolbar
                columns={columns}
                rows={rows}
                table={table}
                selectedId={selected}
                setSelected={setSelected}
                editRef={editRef}
                table={databaseKey}
                queryVariables={queryVariables}
                defaultValues={defaultValues}
                onSelectAllClick={handleSelectAllClick}
                setFilter={setFilter}
            />
            <TableContainer className={classes.table}>
                <Table aria-labelledby="tableTitle" size="small">
                    <TableHead className={classes.head}>
                        <TableRow>
                            {columns.map((column, index) => (
                                <TableCell
                                    style={{ fontWeight: "bold" }}
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
