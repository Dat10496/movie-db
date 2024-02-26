import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
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
          modules={[Pagination]}
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
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
          className="mySwiper"
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

      {!favoriteMovie.length && (
        <Alert
          sx={{ width: { md: 400, xs: "100%" } }}
          severity="info"
          color="info"
        >
          There is empty favorite movie
        </Alert>
      )}
    </Box>
  );
}

export default FavoriteMoviePage;
