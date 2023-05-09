import React, { useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/pagination";
import MovieCard from "./MovieCard";
import apiService from "../app/apiService";
import { API_KEY } from "../app/config";
import { Alert } from "@mui/material";

function FavoriteMovieCard({ movieId, location, removeFavMovie }) {
  const [movie, setMovie] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get(
          `/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
        );

        setMovie(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [movieId]);

  return (
    <>
      {error && (
        <>
          <Alert sx={{ width: "100%" }} severity="error">
            {error}
          </Alert>
        </>
      )}

      <>
        {movie && (
          <MovieCard
            movie={movie}
            location={location}
            removeFavMovie={removeFavMovie}
          />
        )}
      </>
    </>
  );
}

export default FavoriteMovieCard;
