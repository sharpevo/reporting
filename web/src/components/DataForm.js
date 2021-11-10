import React, { useState, useEffect } from "react";
//import { withApollo } from '@apollo/client/react/hoc';
import { makeStyles } from "@material-ui/core/styles";
import { useQuery, useLazyQuery, useMutation, useMemo } from "@apollo/client";
import { format, parseISO } from "date-fns";
import {
    Button,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Snackbar,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
    FormControlLabel,
    Switch,
    Checkbox,
    Chip,
    Autocomplete,
    TextField,
    Stack,
    AdapterDateFns,
    LocalizationProvider,
} from "@mui/material";

import { REPORT_FILE_NEW } from "../gql/mutation";
import InnerTable from "./InnerTable";

const componentMinWidth = 500;
const componentStyles = makeStyles((theme) => ({
    componentMargin: {
        margin: theme.spacing(2),
        minWidth: componentMinWidth,
    },
    minWidth: {
        minWidth: componentMinWidth,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const FormComponent = ({
    formComponent,
    item,
    itemId,
    itemLabel,
    handleChange,
    setItem,
    setErrorMessage,
}) => {
    const [entries, setEntries] = useState([]);
    const [lazyValue, setLazyValue] = useState();
    useEffect(() => {
        if (formComponent.lazy) {
            if (lazyValue) {
                console.log("loading");
                getLazyData({
                    variables: {
                        label: lazyValue,
                    },
                });
            }
        } else {
            getLazyData();
        }
    }, [lazyValue]);
    const classes = componentStyles();
    if (!formComponent) {
        return <span>N/A</span>;
    }

    const handleReportFileChange = (event) => {
        upload({ variables: { file: event.target.files[0] } }).then((v) => {
            if (v.errors) {
                let message = String(v.errors);
                if (v.errors.networkError) {
                    v.errors.networkError.result.errors.map((err) => {
                        message = message.concat(err.message);
                    });
                }
                console.log("error", message);
                setErrorMessage(message);
                setOpenSnackbar(true);
            } else {
                setItem({
                    ...item,
                    [event.target.name]: v.data.newReportFile.path,
                });
            }
        });
    };
    const [upload, uploadLoading, uploadError] = useMutation(REPORT_FILE_NEW, {
        onCompleted: (data) => {
            //console.log("done", data)
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

    let getLazyData = () => {};
    if (formComponent.query) {
        const [getData, { loading, data, error }] = useLazyQuery(
            formComponent.query,
            {
                fetchPolicy: "network-only",
                onCompleted: (data) => {
                    console.log(data);
                    const entryObjs = data[formComponent.queryKey];
                    setEntries(entryObjs.map((obj) => obj.label));
                },
            }
        );
        getLazyData = getData;
    }

    switch (formComponent.inputType) {
        case "text":
            return (
                <div className={classes.componentMargin}>
                    <TextField
                        size="small"
                        name={formComponent.key}
                        label={formComponent.label}
                        required={formComponent.required}
                        value={item[formComponent.key] || ""}
                        onChange={handleChange}
                    />
                </div>
            );
        case "textarea":
            return (
                <div className={classes.componentMargin}>
                    <TextField
                        size="small"
                        multiline
                        name={formComponent.key}
                        label={formComponent.label}
                        required={formComponent.required}
                        value={item[formComponent.key] || ""}
                        onChange={handleChange}
                    />
                </div>
            );
        case "select":
            return (
                <div className={classes.componentMargin}>
                    <TextField
                        size="small"
                        select
                        name={formComponent.key}
                        label={formComponent.label}
                        required={formComponent.required}
                        value={item[formComponent.key] || ""}
                        onChange={handleChange}
                    >
                        {entries.map((entry, index) => (
                            <MenuItem
                                key={index}
                                value={entry.label ? entry.label : "-"}
                            >
                                {entry.label ? entry.label : "-"}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
            );
        case "simpleselect":
            return (
                <div className={classes.componentMargin}>
                    <TextField
                        size="small"
                        select
                        name={formComponent.key}
                        label={formComponent.label}
                        required={formComponent.required}
                        value={item[formComponent.key] || ""}
                        onChange={handleChange}
                    >
                        {formComponent.values.map((entry, index) => (
                            <MenuItem key={index} value={entry}>
                                {entry}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
            );
        case "switch":
            return (
                <div className={classes.componentMargin}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={item[formComponent.key] == true}
                                value={item[formComponent.key] || false}
                                onChange={handleChange}
                                name={formComponent.key}
                                color="primary"
                            />
                        }
                        labelPlacement="end"
                        label={formComponent.label}
                    />
                </div>
            );
        case "checkbox":
            return (
                <div className={classes.componentMargin}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={item[formComponent.key] == true}
                                value={item[formComponent.key] || false}
                                onChange={handleChange}
                                name={formComponent.key}
                                color="primary"
                            />
                        }
                        labelPlacement="end"
                        label={formComponent.label}
                    />
                </div>
            );
        case "file":
            return (
                <div className={classes.componentMargin}>
                    <FormControlLabel
                        control={
                            <Button variant="contained" component="span">
                                Upload
                                <input
                                    name="file"
                                    type="file"
                                    onChange={handleChange}
                                    hidden
                                />
                            </Button>
                        }
                        labelPlacement="start"
                        label={formComponent.label}
                    />
                </div>
            );
        case "reportfile":
            return (
                <div className={classes.componentMargin}>
                    <Typography variant="body2" color="text.secondary">
                        {formComponent.label}
                    </Typography>
                    {formComponent.previewComponent &&
                        item[formComponent.key] &&
                        formComponent.previewComponent(item[formComponent.key])}
                    <FormControlLabel
                        style={{ marginLeft: 1 }}
                        control={
                            <Button
                                disabled={formComponent.disabled}
                                variant="contained"
                                component="span"
                                size="small"
                                color="primary"
                                style={{
                                    marginRight: 4,
                                }}
                            >
                                Upload
                                <input
                                    disabled={formComponent.disabled}
                                    name={formComponent.key}
                                    type="file"
                                    onChange={handleReportFileChange}
                                    hidden
                                />
                            </Button>
                        }
                        label=""
                    />
                </div>
            );
        case "singleselect":
            //value={tmpValue[formComponent.key]}
            //getOptionLabel={(option) => option}
            let lazyParams = {};
            if (formComponent.lazy) {
                lazyParams = {
                    filterOptions: (x) => x,
                    onInputChange: (event, inputValue) => {
                        setLazyValue(inputValue);
                    },
                    noOptionsText: "search as type",
                };
            }
            return (
                <div className={classes.componentMargin}>
                    <Stack spacing={3} style={{ width: componentMinWidth }}>
                        <Autocomplete
                            sx={formComponent.hidden ? { display: "none" } : {}}
                            size="small"
                            {...lazyParams}
                            options={entries}
                            name={formComponent.key}
                            value={item[formComponent.key] || ""}
                            onChange={(event, values) =>
                                handleChange(event, values, formComponent.key)
                            }
                            renderInput={(params) => (
                                <TextField
                                    name={formComponent.key}
                                    {...params}
                                    label={formComponent.label}
                                />
                            )}
                        />
                    </Stack>
                    {formComponent.previewComponent &&
                        item[formComponent.key] &&
                        formComponent.previewComponent(item[formComponent.key])}
                </div>
            );
        case "multiselect":
            //value={tmpValue[formComponent.key]}
            //getOptionLabel={(option) => option}
            let lazyParamsMulti = {};
            if (formComponent.lazy) {
                lazyParamsMulti = {
                    filterOptions: (x) => x,
                    onInputChange: (event, inputValue) => {
                        setLazyValue(inputValue);
                    },
                    noOptionsText: "search as type",
                };
            }
            return (
                <div className={classes.componentMargin}>
                    <Stack spacing={3} style={{ width: componentMinWidth }}>
                        <Autocomplete
                            {...lazyParamsMulti}
                            multiple
                            size="small"
                            options={entries}
                            name={formComponent.key}
                            value={item[formComponent.key] || []}
                            onChange={(event, values) =>
                                handleChange(event, values, formComponent.key)
                            }
                            renderInput={(params) => (
                                <TextField
                                    name={formComponent.key}
                                    {...params}
                                    label={formComponent.label}
                                />
                            )}
                        />
                    </Stack>
                </div>
            );
        case "datepicker":
            return (
                <div className={classes.componentMargin}>
                    <TextField
                        size="small"
                        type="date"
                        name={formComponent.key}
                        label={formComponent.label}
                        InputLabelProps={{ shrink: true }}
                        required={formComponent.required}
                        value={item[formComponent.key] || ""}
                        onChange={handleChange}
                    />
                </div>
            );
        case "table":
            //console.log(formComponent, itemId, formComponent);
            return (
                <div>
                    {itemId ? (
                        <div className={classes.componentMargin}>
                            <Typography variant="body2" color="text.secondary">
                                {formComponent.label}
                            </Typography>
                            <InnerTable
                                databaseKey={formComponent.databaseKey}
                                queryVariableValue={itemId}
                                defaultValues={formComponent.defaultValues(
                                    itemLabel
                                )}
                            />
                        </div>
                    ) : (
                        <span></span>
                    )}
                </div>
            );
        default:
            return <span>nil</span>;
    }
};

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiTextField-root": {
            minWidth: componentMinWidth,
        },
    },
}));

const DataFormDialog = ({
    client,
    isOpen,
    setOpen,
    query,
    mutation,
    selectedItem,
    setSelectedItem,
    formComponents,
    queryVariables,
    defaultValues,
}) => {
    const [item, setItem] = useState({});
    //const [tmpValue, setTmpValue] = useState({})
    const [errorMessage, setErrorMessage] = useState("");
    const [isOpenSnackbar, setOpenSnackbar] = useState(false);
    useEffect(() => {
        //console.log("effect", selectedItem)
        if (selectedItem.id) {
            //console.log("synced")
            formComponents.map((component) => {
                switch (component.inputType) {
                    case "multiselect":
                        item[component.key] = selectedItem[component.key].map(
                            (entry) => entry.label
                        );
                        break;
                    case "reportfile":
                        console.log(
                            component.inputType,
                            component.key,
                            selectedItem[component.key]
                        );
                        item[component.key] = selectedItem[component.key]
                            ? selectedItem[component.key]["path"]
                            : "";
                        break;
                    case "datepicker":
                        let v = selectedItem[component.key];
                        if (v) {
                            item[component.key] = format(
                                parseISO(v),
                                "yyyy-MM-dd"
                            );
                        }
                        break;
                    default:
                        if (
                            selectedItem[component.key] &&
                            selectedItem[component.key].label
                        ) {
                            item[component.key] =
                                selectedItem[component.key].label;
                        } else {
                            item[component.key] = selectedItem[component.key];
                        }
                }
            });
        } else {
            setItem({});
        }
        //console.log(defaultValues);
        if (defaultValues) {
            defaultValues.map((defaultValue) => {
                setItem({
                    ...item,
                    [defaultValue.key]: defaultValue.value,
                });
            });
        }
    }, [selectedItem]);
    const classes = useStyles();
    const [submit, loading, error] = useMutation(
        selectedItem.id ? mutation["update"] : mutation["new"],
        {
            refetchQueries: [{ query: query, variables: queryVariables }],
            onCompleted: (data) => {
                //console.log("done", data)
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
    const handleChange = (event, values, targetName) => {
        //console.log("<", event.target.name, event.target.value, event.target)
        let value = event.target.value;
        switch (event.target.type) {
            case "checkbox":
                value = event.target.checked;
                break;
            case "file":
                value = event.target.files[0];
                break;
            case "date":
                value = format(new Date(event.target.value), "yyyy-MM-dd");
                console.log(value);
                break;
        }
        if (values && values.length > 0) {
            //console.log("x", values)
            setItem({
                ...item,
                [targetName]: values,
            });
            //setTmpValue(values)
        } else {
            setItem({
                ...item,
                [event.target.name]: value,
            });
        }
    };
    const handleClose = () => {
        setOpen(false);
        setItem({});
        //setTmpValue({})
        setSelectedItem({});
    };
    const handleSubmit = (e) => {
        setErrorMessage("");
        e.preventDefault();
        if (Object.keys(selectedItem).length != 0) {
            item.id = selectedItem.id;
        }
        submit({
            variables: item,
        }).then((v) => {
            if (v.errors) {
                let message = String(v.errors);
                if (v.errors.networkError) {
                    v.errors.networkError.result.errors.map((err) => {
                        message = message.concat(err.message);
                    });
                }
                console.log("error", message);
                setErrorMessage(message);
                setOpenSnackbar(true);
            } else {
                setOpen(false);
                setItem({});
                //setTmpValue({})
            }
        });
        setSelectedItem({});
        //console.log(item)
    };
    return (
        <div>
            <Dialog
                disableEnforceFocus
                aria-labelledby="simple-dialog-title"
                maxWidth="xl"
                className={classes.root}
                open={isOpen}
            >
                <DialogTitle>Form</DialogTitle>
                <DialogContent>
                    {formComponents &&
                        formComponents.map((formComponent, index) => (
                            <FormComponent
                                key={index}
                                formComponent={formComponent}
                                TransitionProps={() => {
                                    console.log("enter");
                                }}
                                itemId={selectedItem.id}
                                itemLabel={selectedItem.label}
                                item={item}
                                setItem={setItem}
                                //tmpValue={tmpValue}
                                //setTmpValue={setTmpValue}
                                setErrorMessage={setErrorMessage}
                                handleChange={handleChange}
                            />
                        ))}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={(e) => {
                            handleSubmit(event);
                        }}
                        color="primary"
                    >
                        Submit
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={6000}
                open={isOpenSnackbar}
                onClose={() => {
                    setOpenSnackbar(false);
                }}
                message={errorMessage}
            />
        </div>
    );
};

//export default withApollo(DataFormDialog)
export default DataFormDialog;
