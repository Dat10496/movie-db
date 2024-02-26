import React, { useState } from "react";
import { Modal, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import SearchParams from "./SearchParams";

const styles = {
  searchIcon: {
    "&: hover": {
      cursor: "pointer",
      color: "fourthly.main",
    },
    mr: 1,
    fontSize: 25,
  },
  modal: {
    width: { md: "100%", xs: "100%" },
    height: { md: "72%", xs: "100%" },
    flexWrap: "wrap",
  },
}; 


function InputSearch() {
  const [openSearch, setOpenSearch] = useState(false);
  const handleOpenSearch = () => setOpenSearch(true);
  const handleCloseSearch = () => setOpenSearch(false);

  return (
    <>
      <Tooltip title="Search Movie">
        <SearchIcon
          color="lightly"
          onClick={handleOpenSearch}
          sx={styles.searchIcon}
        />
      </Tooltip>
      <Modal onClose={handleCloseSearch} open={openSearch} sx={styles.modal}>
        <SearchParams handleCloseSearch={handleCloseSearch} />
      </Modal>
    </>
  );
}

export default InputSearch;
