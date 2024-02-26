import { React } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LoginIcon from "@mui/icons-material/Login";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, IconButton, Tooltip } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import StarsRoundedIcon from "@mui/icons-material/StarsRounded";

import useAuth from "../hooks/useAuth";
import Logo from "./Logo";
import InputSearch from "./InputSearch";
import NavBar from "./NavBar";


const styles = {
  boxCover: {
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    position: "fixed",
    p: 1,
    top: 0,
    left: 0,
    flexDirection: { xs: "column", sm: "row" },
    backdropFilter: "blur(6px)",
    zIndex: 5,
    boxShadow: 5,
  },
  boxCoverNav: {
    width: { xs: "100%", sm: "80%" },
    display: "flex",
    justifyContent: "space-between",
    mt: { xs: 1.5, sm: 0 },
    alignItems: "center",
  },
  boxCoverEnd: {
    display: "flex",
    justifyContent: { sm: "space-evenly", xs: "flex-end" },
    alignItems: "center",
    width: { sm: 300, md: 400 },
  },
  boxCoverFav: {
    display: "flex",
    alignItems: "center",
    width: { md: 220, sm: 120, lg: 250 },
    justifyContent: "space-between",
  },
  tooltip: {
    display: { xs: "none", md: "flex", sm: "flex" },
    alignItems: "center",
  },
  startIcon: {
    "&:hover": {
      color: "fourthly.main",
    },
    fontSize: 25,
  },
  boxCoverIconAcc: {
    display: {
      sm: "none",
      md: "flex",
      xs: "none",
      alignItems: "center",
    },
  },
  loginIcon: {
    color: "white",
    mr: 1,
    fontSize: 20,
  },
  typoUser: {
    color: "white",
    textDecoration: "none",
    "&:hover": {
      color: "fourthly.main",
    },
    fontSize: "0.8rem",
    fontWeight: 400,
  },
};

export default function MainHeader() {
  let { user, logout } = useAuth();
  let navigate = useNavigate();
  const location = useLocation();

  const Logout = async () => {
    logout(() => navigate("/"));
  };

  return (
    <Box sx={styles.boxCover}>
      <Logo />

      <Box sx={styles.boxCoverNav}>
        {/* NavBar */}
        <NavBar />
        {/*  */}

        <Box sx={styles.boxCoverEnd}>
          <Box sx={styles.boxCoverFav}>
            <Tooltip title="Favorite Movie">
              <IconButton
                onClick={() => navigate("/favorite-movie")}
                variant="outlined"
                color="lightly"
                sx={styles.tooltip}
                fontSize="small"
              >
                <StarsRoundedIcon color="lightly" sx={styles.startIcon} />
              </IconButton>
            </Tooltip>

            <InputSearch />

            <Box component="div" sx={styles.boxCoverIconAcc}>
              <AccountCircle sx={{ mr: 1, color: "lightly.main" }} />
              <Typography color="lightly.main" mr={1}>
                {user ? user.username : ""}!
              </Typography>
            </Box>
          </Box>

          <Button
            state={{ from: location }}
            component={Link}
            to={user ? "/" : "/log-in"}
            onClick={Logout}
            color="lightly"
            variant="outlined"
            size="small"
          >
            <LoginIcon sx={styles.loginIcon} />
            <Typography sx={styles.typoUser}>
              {user ? "Sign out" : "Sign in"}
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
