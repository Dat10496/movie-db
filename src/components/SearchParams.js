import { React, useEffect, useState } from "react";
import InputBase from "@mui/material/InputBase";
import { useSearchParams } from "react-router-dom";
import styled from "@emotion/styled";
import { alpha, Divider, Pagination, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";

import apiService from "../app/apiService";
import { API_KEY, DOMAIN_IMG } from "../app/config";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: "100%",
  color: "white",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const styles = {
  boxCover: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#0c0d0d",
    color: "white",
    width: "100%",
    height: { md: "80%", lg: "80%", sm: "60%", xs: "70%" },
    p: 1,
    textDecoration: "none",
    flexWrap: "wrap",
  },
  search: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    p: 0.5,
  },
  boxCoverData: {
    display: "flex",
    flexWrap: "wrap",
    p: 1,
    ml: 1,
    flexDirection: "column",
    textDecoration: "none",
    color: "white",
  },
  boxWrapTypo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    mb: 1,
  },
  boxCoverPag: {
    justifyContent: "center",
    display: "flex",
  },
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

function SearchParams({ handleCloseSearch }) {
  let [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const [storageData, setStorageData] = useState([]);

  const limit = 6;
  const offset = limit * (page - 1);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get(
          `/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`
        );
        const result = response.data.results;
        setStorageData(result);
      } catch (error) {
        console.log(error, "error");
      }
    };

    fetchData();
  }, [query]);

  return (
    <Box sx={styles.boxCover}>
      <Search
        value={searchParams.get("query") || ""}
        onChange={(event) => {
          let query = event.target.value;
          if (query) {
            setSearchParams({ query });
            setQuery(query);
          } else {
            setSearchParams({});
          }
        }}
        sx={styles.search}
      >
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>

        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
      <Divider variant="middle" color="primary.dark" sx={{ mt: 1 }} />
      <Box sx={styles.boxCoverData}>
        {storageData?.slice(offset, offset + limit).map((movie) => (
          <Box key={movie.id} sx={styles.boxWrapTypo}>
            <Typography
              component={Link}
              to={`/movies/${movie.id}`}
              sx={{ textDecoration: "none", color: "white" }}
              onClick={handleCloseSearch}
            >
              {movie.title}
            </Typography>

            <img
              src={`${DOMAIN_IMG}${movie.poster_path}`}
              alt={movie.title}
              width="50px"
              height="50px"
            />
          </Box>
        ))}
      </Box>

      {query && (
        <Box sx={styles.boxCoverPag}>
          <Pagination
            count={Math.ceil(storageData.length / limit)}
            variant="outlined"
            color="lightly"
            sx={{
              "& .MuiPaginationItem-root": {
                color: "#fff",
              },
            }}
            page={page}
            onChange={handleChangePage}
          />
        </Box>
      )}
    </Box>
  );
}

export default SearchParams;
