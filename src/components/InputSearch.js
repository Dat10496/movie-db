import React, { useState } from "react";
import { Modal, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import SearchParams from "./SearchParams";

const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  with: 300,
  height: 400,
};

function InputSearch() {
  const [openSearch, setOpenSearch] = useState(false);
  const handleOpenSearch = () => setOpenSearch(true);
  const handleCloseSearch = () => setOpenSearch(false);

  return (
    <>
      <SearchIcon
        fontSize="large"
        color="lightly"
        onClick={handleOpenSearch}
        sx={{
          "&: hover": {
            cursor: "pointer",
            color: "fourthly.main",
          },
        }}
      />
      <Modal
        onClose={handleCloseSearch}
        open={openSearch}
        sx={{
          width: { md: 500, xs: "100%" },
          height: { md: 500, xs: "100%" },
          position: "absolute",
          left: { md: 400, xs: 0 },
          top: { md: 80, xs: 0 },
        }}
      >
        <Paper elevation={24} sx={style} mt={0.5}>
          <SearchParams handleCloseSearch={handleCloseSearch} />
        </Paper>
      </Modal>
    </>
  );
}

export default InputSearch;
