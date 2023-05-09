import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

import "./NavBar.css";
import { ELEMENT_NAV } from "../app/config";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function NavBar() {
  const [openMenu, setOpenMenu] = useState(null);
  const { value } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const handleToFavPage = () => {
    navigate("/favorite-movie");
    setOpenMenu(null);
  };
  return (
    <>
      <Box
        className="box-category"
        color="lightly.main"
        width={500}
        justifyContent="space-between"
        sx={{
          display: {
            xs: "none",
            sm: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 5,
          },
        }}
      >
        {location.pathname !== `/category/${value}` &&
          location.pathname !== "/favorite-movie" && (
            <>
              {ELEMENT_NAV.map((e, index) => (
                <a key={index} href={`#${e.value}`} className="link-category">
                  <Typography
                    sx={{
                      "&:hover": {
                        cursor: "pointer",
                        color: "fourthly.main",
                      },
                    }}
                    variant="subtitle2"
                    fontWeight={600}
                    fontSize={16}
                  >
                    {e.title}
                  </Typography>
                </a>
              ))}
            </>
          )}
      </Box>

      {location.pathname !== "/favorite-movie" && (
        <Box
          sx={{ display: { xs: "block", sm: "none" } }}
          className="icon-category"
          color="lightly"
        >
          <Button onClick={(e) => setOpenMenu(e.currentTarget)}>
            <MenuIcon
              sx={{
                fontSize: { xs: 25, sm: 30 },
              }}
              fontSize="large"
              color="lightly"
            />
          </Button>

          <Menu
            id="basic-menu"
            anchorEl={openMenu}
            open={Boolean(openMenu)}
            onClose={() => setOpenMenu(null)}
          >
            {ELEMENT_NAV.map((e, index) => (
              <a href={`#${e.value}`} key={index}>
                <MenuItem key={index} onClick={() => setOpenMenu(null)}>
                  {e.title}
                </MenuItem>
              </a>
            ))}
            <MenuItem onClick={() => handleToFavPage()}>
              Favorite Movies
            </MenuItem>
          </Menu>
        </Box>
      )}
    </>
  );
}

export default NavBar;
