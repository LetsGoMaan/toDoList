import React from "react";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {createRoot} from "react-dom/client";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {green, lightBlue} from "@mui/material/colors";

const theme = createTheme( {
    palette: {
        primary: lightBlue,
        secondary: green ,
        // mode: "dark"
    }
})


const container  = document.getElementById('root') as HTMLElement
const root = createRoot(container);
root.render(
<ThemeProvider theme={theme}>
    {/*<CssBaseline/>*/}
    <App />
</ThemeProvider>


);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

