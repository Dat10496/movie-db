import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import apiService from "../app/apiService";
import { API_KEY } from "../app/config";
import MovieCard from "./MovieCard";

const styles = {
  typo: {
    "&: hover": {
      color: "fourthly.main",
    },
    fontSize: 20,
    fontWeight: 600,
    color: "lightly.main",
  },
};

function SwiperBox({ value, label }) {
  const [movies, setMovies] = useState();
  //eslint-disable-next-line
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await apiService.get(
        `/3/movie/${value}?api_key=${API_KEY}&language=en-US&page=${page}`
      );
      setMovies(data);
    };

    fetchData();
  }, [value, page]);

  return (
    <>
      <Button
        variant="outlined"
        color="lightly"
        onClick={() => navigate(`/category/${value}`)}
      >
        <Typography sx={styles.typo}>{label}</Typography>
      </Button>

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
        {movies?.data?.results?.map((e) => (
          <SwiperSlide key={e.id}>
            <MovieCard movie={e} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default SwiperBox;
