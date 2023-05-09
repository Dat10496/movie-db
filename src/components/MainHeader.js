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

export default function MainHeader() {
  let { user, logout } = useAuth();
  let navigate = useNavigate();
  const location = useLocation();

  const Logout = async () => {
    logout(() => navigate("/"));
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        position: "absolute",
        p: 1,
        top: 0,
        left: 0,
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <Logo />

      <Box
        sx={{
          width: { xs: "100%", sm: "80%" },
          display: "flex",
          justifyContent: "space-between",
          mt: { xs: 1.5, sm: 0 },
          alignItems: "center",
        }}
      >
        <NavBar />

        <Box
          sx={{
            display: "flex",
            justifyContent: { sm: "space-between", xs: "flex-end" },
            alignItems: "center",
            width: 400,
          }}
        >
          <Box
            sx={{
              display: {
                sm: "flex",
                md: "flex",
                xs: "flex",
              },
              alignItems: "center",
              width: { md: 220, sm: 120, lg: 250 },
              justifyContent: "space-between",
            }}
          >
            <Tooltip title="Favorite Movie">
              <IconButton
                onClick={() => navigate("/favorite-movie")}
                variant="outlined"
                color="lightly"
                sx={{
                  display: { xs: "none", md: "flex", sm: "flex" },
                  alignItems: "center",
                }}
                fontSize="small"
              >
                <StarsRoundedIcon
                  color="lightly"
                  sx={{
                    "&:hover": {
                      color: "fourthly.main",
                    },
                    fontSize: { sm: 30, md: 40, lg: 40 },
                  }}
                />
              </IconButton>
            </Tooltip>

            <InputSearch />

            <Box
              component="div"
              sx={{
                display: {
                  sm: "none",
                  md: "flex",
                  xs: "none",
                  alignItems: "center",
                },
              }}
            >
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
          >
            <LoginIcon
              sx={{
                color: "white",
                mr: 1,
                fontSize: { xs: 20, sm: 25, md: 30 },
              }}
            />
            <Typography
              sx={{
                color: "white",
                textDecoration: "none",
                "&:hover": {
                  color: "fourthly.main",
                },
                fontSize: { md: 16, xs: 14 },
                fontWeight: { md: 550, xs: 450 },
              }}
            >
              {user ? "Sign out" : "Sign in"}
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
