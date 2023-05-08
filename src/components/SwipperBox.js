import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import apiService from "../app/apiService";
import { API_KEY } from "../app/config";
import MovieCard from "./MovieCard";
import { Button, Typography } from "@mui/material";

function SwiperBox({ value, label }) {
  const [movies, setMovies] = useState();

  //eslint-disable-next-line
  const [page, setPage] = useState(1);

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
      <Button variant="outlined" color="lightly">
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
          {label}
        </Typography>
      </Button>

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
