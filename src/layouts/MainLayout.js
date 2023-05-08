import { Box, Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import TrailerIntro from "../components/TrailerIntro";
import MainFooter from "./MainFooter";

function MainLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <TrailerIntro />
      <Outlet />
      <Box sx={{ flexGrow: 1 }} />
      <MainFooter />
    </Stack>
  );
}

export default MainLayout;
