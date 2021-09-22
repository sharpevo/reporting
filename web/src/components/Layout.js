import React from "react";
import styled from "style-components";
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
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
    const theme = useTheme();
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        iGeneTech
                    </Typography>
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
    );
};

export default Layout;
