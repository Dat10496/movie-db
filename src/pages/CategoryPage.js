import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert, Box, Grid, Pagination, Stack, Typography } from "@mui/material";

import apiService from "../app/apiService";
import { ELEMENT_NAV, API_KEY } from "../app/config";
import LoadingScreen from "../components/LoadingScreen";
import MovieCard from "../components/MovieCard";

function CategoryPage() {
  const [movies, setMovies] = useState();
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(1);
  const [label, setLabel] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");

  const { value } = useParams();

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    ELEMENT_NAV.forEach((e) => {
      if (e.value === value) {
        setLabel(e.title);
      }
    });

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await apiService.get(
          `/3/movie/${value}?api_key=${API_KEY}&language=en-US&page=${page}`
        );
        setMovies(data.data.results);
        setTotalPage(data.data.total_pages);

        setLoading(false);
      } catch (error) {
        setError(error.response.data.status_message);
        setLoading(false);
      }
    };

    fetchData();
  }, [value, page]);

  return (
    <Stack mt={2}>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {error && <Alert severity="error">{error}</Alert>}

          <Typography
            color="lightly.main"
            fontSize={30}
            fontWeight={600}
            pl={5}
            fontStyle="italic"
          >
            {label}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid
              container
              sx={{
                width: "90%",
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                mt: { xs: 2, sm: 0 },
              }}
            >
              {movies?.map((movie) => (
                <Grid key={movie.id} item sm={5} xs={20} md={4} lg={3}>
                  <MovieCard movie={movie} />
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "inherit",
              mt: 2,
            }}
          >
            <Pagination
              page={page}
              color="thirdly"
              count={totalPage}
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#ffff",
                },
              }}
              onChange={handleChangePage}
            />
          </Box>
        </>
      )}
    </Stack>
  );
}

export default CategoryPage;
