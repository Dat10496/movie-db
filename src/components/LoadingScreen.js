import { Box, CircularProgress } from "@mui/material";
import React from "react";

function LoadingScreen() {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "inherit",
      }}
    >
      <CircularProgress color="lightly" />
    </Box>
  );
}

export default LoadingScreen;
