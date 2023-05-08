import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectCoverflow } from "swiper";
import { Alert, Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import useAuth from "../hooks/useAuth";
import FavoriteMovieCard from "../components/FavoriteMovieCard";

function FavoriteMoviePage() {
  const { favoriteMovie } = useAuth();
  const location = useLocation();
  const { removeFavMovie } = useAuth();

  return (
    <Box sx={{ minHeight: "70vh", p: 2 }}>
      <Typography
        sx={{
          "&: hover": {
            color: "fourthly.main",
          },
        }}
        color="lightly.main"
        fontSize={20}
        fontWeight={600}
      >
        Favorite Movie
      </Typography>

      {favoriteMovie.length && (
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          spaceBetween={5}
          slidesPerView={5}
          slidesPerGroup={2}
          coverflowEffect={{
            rotate: 10,
            stretch: 0,
            depth: 50,
            modifier: 1,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
        >
          {favoriteMovie?.map((movieId) => (
            <SwiperSlide key={movieId}>
              <FavoriteMovieCard
                movieId={movieId}
                location={location.pathname}
                removeFavMovie={removeFavMovie}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {favoriteMovie.length === 0 && (
        <Alert sx={{ width: 400 }} severity="info" color="info">
          There is empty favorite movie
        </Alert>
      )}
    </Box>
  );
}

export default FavoriteMoviePage;
