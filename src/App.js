import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import "./App.css";
import Router from "./routes/Router";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0d253f",
    },
    secondary: {
      main: "#01b4e4",
    },
    tertiary: {
      main: " #90cea1",
    },
    lightly: {
      main: "#ffff",
    },
    thirdly: {
      main: "#de8818",
    },
    fourthly: {
      main: "#d50000",
    },
    fifthly: {
      main: "#8b8c8c",
      lighter: "#bdbdbd",
    },
    sixthly: {
      main: "#f0e816",
    },
  },
  typography: {
    fontFamily: "Poppins",
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <MainHeader /> */}
        <Router />
      </ThemeProvider>
    </div>
  );
}

export default App;
