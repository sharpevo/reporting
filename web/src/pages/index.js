import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Layout from "../components/Layout";
import PageHome from "./home";
import PageTable from "./table";
import PageReport from "./report";
import PageSample from "./sample";

const Pages = () => {
    return (
        <Router>
            <Layout>
                <Route exact path="/home" component={PageHome} />
                <Route path="/tables" component={PageTable} />
                <Route path="/samples" component={PageSample} />
                <Route path="/reports" component={PageReport} />
            </Layout>
        </Router>
    );
};

export default Pages;
