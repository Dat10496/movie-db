import { React, useState, useEffect, memo } from "react";
import { Alert, Box, Stack } from "@mui/material";
import { useParams } from "react-router-dom";

import SwiperBox from "../components/SwipperBox";
import LoadingScreen from "../components/LoadingScreen";
import apiService from "../app/apiService";
import { ELEMENT_NAV, API_KEY } from "../app/config";

function HomePages() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // eslint-disable-next-line
  const [storageData, setStorageData] = useState([]);
  // eslint-disable-next-line
  const [totalPage, setTotalPage] = useState();

  const { name, page } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      let response;

      setLoading(true);
      try {
        if (name || (name && page)) {
          response = await apiService.get(
            `/3/search/movie?api_key=${API_KEY}&language=en-US&query=${name}&page=${
              page || 1
            }&include_adult=false&genre=${name}`
          );

          setStorageData(response.data.results);
          setTotalPage(response.data.total_pages);
          setLoading(false);
        } else {
          response = await apiService.get(
            `3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
          );

          setStorageData(response.data.results);
          setTotalPage(response.data.total_pages);
          setLoading(false);
        }
      } catch (error) {
        setError(error.message);
      }

      setLoading(false);
    };

    fetchData();
  }, [page, name]);

  return (
    <Stack minHeight="200vh">
      {loading ? (
        <LoadingScreen />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <Box padding={1}>
            {ELEMENT_NAV.map((e) => (
              <Box key={e.value} height={460} id={e.value}>
                <SwiperBox key={e.value} label={e.title} value={e.value} />
              </Box>
            ))}
          </Box>

          {/* <Box
            sx={{
              display: { sm: "flex", xs: "block" },
              width: { md: "100%" },
              justifyContent: "space-between",
              mt: 2,
              p: 2,
            }}
          >
            <GenresList nameOfGenre={name} />

            <Grid
              container
              sx={{
                width: { xs: "100%", md: 950 },
                display: { xs: "flex" },
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "center",
                alignItems: "center",
                mt: { xs: 2, sm: 0 },
              }}
            >
              {storageData.map((movie) => (
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
              p: 1.5,
              backgroundColor: "inherit",
            }}
          >
            <Pagination
              page={parseInt(page) || 1}
              color="thirdly"
              count={totalPage}
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#ffff",
                },
              }}
              renderItem={(item) => (
                <PaginationItem
                  component={RouterLink}
                  to={
                    name
                      ? `/genres/${name}/page/${item.page}`
                      : `/page/${item.page}`
                  }
                  {...item}
                />
              )}
            />
          </Box> */}
        </>
      )}
    </Stack>
  );
}

export default memo(HomePages);
