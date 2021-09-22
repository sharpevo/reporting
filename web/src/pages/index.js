import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Layout from "../components/Layout";
import Home from "./home";
import Tables from "./tables";
import Reports from "./reports";

const Pages = () => {
    return (
        <Router>
            <Layout>
                <Route exact path="/home" component={Home} />
                <Route path="/" component={Tables} />
                <Route path="/reports" component={Reports} />
            </Layout>
        </Router>
    );
};

export default Pages;
