import React, { useState, useEffect } from "react";
//import { withApollo } from '@apollo/client/react/hoc';
import { makeStyles } from "@material-ui/core/styles";
import { useQuery, useMutation } from "@apollo/client";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
//import TextField from '@material-ui/core/TextField';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Snackbar from "@material-ui/core/Snackbar";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Checkbox from "@material-ui/core/Checkbox";

import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import { REPORT_FILE_NEW } from "../gql/mutation";

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
    handleChange,
    setItem,
    setErrorMessage,
}) => {
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

    let entries = [];
    if (formComponent.query) {
        const { loading, error, data, refetch } = useQuery(formComponent.query);
        if (loading) {
            return <span>loading...</span>;
        }
        if (error) console.log(error);
        //console.log(formComponent, data)
        entries = data[formComponent.queryKey];
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
                    <FormControlLabel
                        control={
                            <Button variant="contained" component="span">
                                Upload
                                <input
                                    name={formComponent.key}
                                    type="file"
                                    onChange={handleReportFileChange}
                                    hidden
                                />
                            </Button>
                        }
                        labelPlacement="start"
                        label={formComponent.label}
                    />
                    path:{item[formComponent.key]}
                </div>
            );
        case "singleselect":
            //value={tmpValue[formComponent.key]}
            //getOptionLabel={(option) => option}
            return (
                <div className={classes.componentMargin}>
                    <Stack spacing={3} sx={{ width: 500 }}>
                        <Autocomplete
                            size="small"
                            options={entries.map((entry) => entry.label)}
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
                </div>
            );
        case "multiselect":
            //value={tmpValue[formComponent.key]}
            //getOptionLabel={(option) => option}
            return (
                <div className={classes.componentMargin}>
                    <Stack spacing={3} sx={{ width: 500 }}>
                        <Autocomplete
                            multiple
                            size="small"
                            options={entries.map((entry) => entry.label)}
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
}) => {
    const [item, setItem] = useState({});
    //const [tmpValue, setTmpValue] = useState({})
    const [errorMessage, setErrorMessage] = useState("");
    const [isOpenSnackbar, setOpenSnackbar] = useState(false);
    useEffect(() => {
        //console.log("effect", selectedItem)
        if (Object.keys(selectedItem).length != 0) {
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
                        item[component.key] =
                            selectedItem[component.key]["path"];
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
        }
    }, [selectedItem]);
    const classes = useStyles();
    const [submit, loading, error] = useMutation(
        Object.keys(selectedItem).length != 0
            ? mutation["update"]
            : mutation["new"],
        {
            refetchQueries: [{ query: query }],
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
