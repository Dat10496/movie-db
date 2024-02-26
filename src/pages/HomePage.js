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
            `3/movie/popular?api_key=${API_KEY}&language=en-US&page=${
              page || 1
            }`
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
        </>
      )}
    </Stack>
  );
}

export default memo(HomePages);
