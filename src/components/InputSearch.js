import React, { useState } from "react";
import { Modal } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import SearchParams from "./SearchParams";

function InputSearch() {
  const [openSearch, setOpenSearch] = useState(false);
  const handleOpenSearch = () => setOpenSearch(true);
  const handleCloseSearch = () => setOpenSearch(false);

  return (
    <>
      <SearchIcon
        color="lightly"
        onClick={handleOpenSearch}
        sx={{
          "&: hover": {
            cursor: "pointer",
            color: "fourthly.main",
          },
          fontSize: { sm: 30, xs: 20, md: 40, lg: 40 },
        }}
      />
      <Modal
        onClose={handleCloseSearch}
        open={openSearch}
        sx={{
          width: { md: "100%", xs: "100%" },
          height: { md: "72%", xs: "100%" },
          flexWrap: "wrap",
        }}
      >
        <SearchParams handleCloseSearch={handleCloseSearch} />
      </Modal>
    </>
  );
}

export default InputSearch;
