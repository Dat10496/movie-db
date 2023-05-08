import { Link, Typography } from "@mui/material";
import React from "react";

function MainFooter() {
  return (
    <Typography
      variant="body2"
      color="fifthly.lighter"
      align="center"
      p={1}
      mt={2}
    >
      {"Copyright © "}
      <Link color="fifthly.lighter" href="https://www.coderschool.vn">
        DatVo
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default MainFooter;
