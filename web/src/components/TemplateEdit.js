import * as React from 'react';

import {
    Box,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    List,
    ListItem,
    ListItemButton,
    Button,
    ListItemIcon,
    ListItemText,
    Checkbox,
    IconButton,
    Collapse,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const ModuleList = ({ modules, setModules }) => {
    const [checked, setChecked] = React.useState(
        modules.map((m, i) => (m.enabled ? i : -1)),
    );
    const [moreOpened, setMoreOpened] = React.useState(
        modules.map((m, i) => false),
    );
    const handleToggle = (index) => {
        var newModules = [...modules];
        var module = newModules[index];
        var result = !Boolean(module.enabled);
        module.enabled = result;
        var level = module.key.split('/').length;
        for (let i = index + 1; i < newModules.length; i++) {
            var m = newModules[i];
            if (m.key.split('/').length > level) {
                m.enabled = result;
            } else {
                break;
            }
        }
        setChecked(newModules.map((m, i) => (m.enabled ? i : -1)));
        setModules(newModules);
    };

    const handleMore = (index) => {
        var newOpened = [...moreOpened];
        newOpened[index] = !Boolean(newOpened[index]);
        setMoreOpened(newOpened);
    };
    const handleNote = (event, index) => {
        var newModules = [...modules];
        var module = newModules[index];
        module.note = event.target.value;
        setModules(newModules);
    };

    return (
        <List
            sx={{
                minWidth: 500,
                bgcolor: 'background.paper',
            }}
            dense={true}
        >
            {modules.map((module, index) => (
                <div key={index}>
                    <ListItem
                        key={index}
                        secondaryAction={
                            <IconButton
                                edge="end"
                                onClick={() => handleMore(index)}
                            >
                                {moreOpened[index] ? (
                                    <ExpandMore />
                                ) : (
                                    <ExpandLess />
                                )}
                            </IconButton>
                        }
                        disablePadding
                        dense={true}
                        sx={{ pl: module.key.split('/').length * 4 }}
                    >
                        <ListItemButton
                            onClick={() => {
                                handleToggle(index);
                            }}
                            dense={true}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(index) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    size="small"
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary={module.name}
                                sx={{ ml: -3 }}
                            />
                        </ListItemButton>
                    </ListItem>
                    <Collapse
                        in={moreOpened[index]}
                        timeout="auto"
                        unmountOnExit
                        sx={{
                            pl: (module.key.split('/').length + 1) * 4,
                            width: '80%',
                        }}
                    >
                        <TextField
                            sx={{
                                width: '80%',
                                margin: 2,
                            }}
                            size="small"
                            label="Remark"
                            multiline
                            value={module.note}
                            onChange={(event) => handleNote(event, index)}
                        />
                    </Collapse>
                </div>
            ))}
        </List>
    );
};

const TemplateEditDialog = ({
    isOpen,
    setOpen,
    modules,
    setModules,
    onModuleChanged,
    setSelectedItem,
}) => {
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
