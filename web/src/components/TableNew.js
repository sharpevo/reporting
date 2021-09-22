import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useMutation } from "@apollo/client";

import { NEW_TABLE } from "../gql/mutation";
import { GET_TABLES } from "../gql/query";

const TableNew = ({ isOpen, setOpen }) => {
    //const [open, setOpen] = React.useState(false);
    const [newTable, { loading, error }] = useMutation(NEW_TABLE, {
        refetchQueries: [{ query: GET_TABLES }],
        onCompleted: (data) => {
            console.log("done");
        },
    });
    const [values, setValues] = React.useState();
    const onChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    let errTextKey = "";
    const checkFieldKey = (text) => {
        console.log(text.match(/[a-z_]+/));
        if (text.match(/[a-z_]+/)) {
            errTextKey = "";
        } else {
            errTextKey = "allowed characters: a-z, _";
        }
        console.log(errTextKey);
    };
    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        newTable({
                            variables: {
                                ...values,
                            },
                        });
                        handleClose();
                    }}
                >
                    <DialogTitle id="form-dialog-title">New Table</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To subscribe to this website, please enter your
                            email address here. We will send updates
                            occasionally.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="key"
                            name="key"
                            label="Key"
                            onChange={onChange}
                            //onChange={e => checkFieldKey(e.target.value)}
                            required
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="label"
                            name="label"
                            label="名称"
                            onChange={onChange}
                            required
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="group"
                            name="group"
                            label="组别"
                            onChange={onChange}
                            required
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};

export default TableNew;
