import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ContactsIcon from "@mui/icons-material/Contacts";
import StorageIcon from "@mui/icons-material/Storage";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Grid,
    Tabs,
    Tab,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AssignmentReturnedIcon from "@mui/icons-material/AssignmentReturned";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import Changelog from "./changelog";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        backgroundColor: "#f5f5f5",
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    hide: {
        display: "none",
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        maxWidth: "1800px",
        margin: "auto",
    },
}));

const Layout = ({ children }) => {
    const classes = useStyles();
    const [tab, setTab] = React.useState(0);

    const handleTabChange = (event, newTab) => {
        setTab(newTab);
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <div className={classes.root}>
                <AppBar position="fixed">
                    <Toolbar variant="dense">
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            iGeneTech
                        </Typography>

                        <Tabs
                            textColor="inherit"
                            value={tab}
                            onChange={handleTabChange}
                            centered
                        >
                            <Tab component={Link} to="/tables" label="TABLE" />
                            <Tab
                                component={Link}
                                to="/samples"
                                label="SAMPLE"
                            />
                            <Tab
                                component={Link}
                                to="/templates"
                                label="TEMPLATE"
                            />
                            <Tab component={Link} to="/tasks" label="TASK" />
                            <Tab
                                component={Link}
                                to="/reports"
                                label="REPORT"
                            />
                        </Tabs>
                        <IconButton
                            size="large"
                            color="inherit"
                            component={Link}
                            to="/tables"
                        >
                            <AccountCircleIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <main className={classes.content}>
                    <div className={classes.toolbar}></div>
                    <Grid container spacing={0} justifyContent="center">
                        <Grid item xs={12}>
                            {children}
                            <Changelog />
                        </Grid>
                    </Grid>
                </main>
            </div>
        </Box>
    );
};

export default Layout;
