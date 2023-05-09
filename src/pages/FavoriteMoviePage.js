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
      <Typography color="lightly.main" fontSize={30} fontWeight={600}>
        Favorite Movie
      </Typography>

      {favoriteMovie.length && (
        <Swiper
          effect={"coverflow"}
          spaceBetween={10}
          slidesPerView={1.5}
          slidesPerGroup={1}
          coverflowEffect={{
            rotate: 6,
            stretch: 0,
            depth: 50,
            modifier: 1,
          }}
          modules={[EffectCoverflow, Pagination]}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
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
