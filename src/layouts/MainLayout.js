import { Box, Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import TrailerIntro from "../components/TrailerIntro";
import MainFooter from "./MainFooter";
import MainHeader from "../components/MainHeader";

function MainLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <MainHeader />
      <TrailerIntro />
      <Outlet />
      <Box sx={{ flexGrow: 1 }} />
      <MainFooter />
    </Stack>
  );
}

export default MainLayout;
