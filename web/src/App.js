import React from "react";
import ReactDOM from "react-dom";
import {
    HttpLink,
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import Pages from "./pages";
//require('dotenv').config({path:process.env.NODE_ENV=="production"?".env.prod":".env.dev"})
const uri = process.env.REACT_APP_API_URI;
const uploadLink = createUploadLink({
    uri: uri,
    //headers: {
    //"keep-alive": "true"
    //}
});

console.log("uri:", uri);
const cache = new InMemoryCache();
const client = new ApolloClient({
    cache,
    connectToDevTools: true,
    link: uploadLink,
});
const App = () => {
    return (
        <ApolloProvider client={client}>
            <Pages />
        </ApolloProvider>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
