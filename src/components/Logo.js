import { Box } from "@mui/system";
import React from "react";
import Img from "../image/logoimg.svg";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Box
      component={Link}
      to={"/"}
      sx={{
        width: { sm: 200, xs: "100%", md: 200 },
        height: "100%",
        mt: 0.5,
      }}
    >
      <img src={Img} alt="logo" width="100%" />
    </Box>
  );
}

export default Logo;
