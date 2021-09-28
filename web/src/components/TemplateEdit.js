import * as React from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Collapse,
    List,
    ListItem,
    ListItemButton,
    Button,
    ListItemIcon,
    ListItemText,
    Checkbox,
    IconButton,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import ExpandLess from "@mui/icons-material/ExpandLess";

const ModuleList = ({ modules, pl, rootModules, setModules }) => {
    //console.log(
    //"ml",
    //modules.filter((module) => module.enabled).map((module) => module.key)
    //);
    const [checked, setChecked] = React.useState(
        modules.filter((module) => module.enabled).map((module) => module.key)
    );
    const handleToggle = (key) => {
        let newModules = toggleModule(rootModules, key);
        setModules(newModules);

        const currentIndex = checked.indexOf(key);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(key);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };
    return (
        <List
            sx={{
                minWidth: 500,
                bgcolor: "background.paper",
                pl: pl,
            }}
            dense={true}
        >
            {modules.map((module, index) => (
                <div key={index}>
                    <ListItem key={index} disablePadding dense={true}>
                        <ListItemButton
                            role={undefined}
                            onClick={() => {
                                handleToggle(module.key);
                            }}
                            dense={true}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(module.key) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    size="small"
                                />
                            </ListItemIcon>
                            <ListItemText primary={module.name} />
                        </ListItemButton>
                    </ListItem>
                    {module.modules && (
                        <Collapse in={true}>
                            <ModuleList
                                modules={module.modules}
                                pl={pl + 4}
                                rootModules={rootModules}
                                setModules={() => setModules}
                            />
                        </Collapse>
                    )}
                </div>
            ))}
        </List>
    );
};

const toggleModule = (modules, key) => {
    return modules.map((module) => {
        if (module.key == key) {
            module.enabled = !Boolean(module.enabled);
        }
        if (module.modules) {
            module.modules = toggleModule(module.modules, key);
        }
        return module;
    });
};
const TemplateEditDialog = ({
    isOpen,
    setOpen,
    modules,
    setModules,
    onModuleChanged,
    setSelectedItem,
}) => {
    //console.log("t", modules);
    const [checked, setChecked] = React.useState([0]);

    const handleClose = () => {
        setOpen(false);
        setSelectedItem({});
        setModules([]);
    };
    const handleSubmit = () => {
        setOpen(false);
        onModuleChanged(modules);
        setSelectedItem({});
        setModules([]);
    };
    return (
        <Dialog
            disableEnforceFocus
            aria-labelledby="simple-dialog-title"
            maxWidth="xl"
            open={isOpen}
        >
            <DialogTitle>Form</DialogTitle>
            <DialogContent>
                <ModuleList
                    modules={modules}
                    pl={0}
                    rootModules={modules}
                    setModules={setModules}
                />
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
    );
};

export default TemplateEditDialog;
