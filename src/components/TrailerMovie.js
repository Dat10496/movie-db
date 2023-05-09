import { Alert, Box, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel, Keyboard } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./TrailerMovie.css";
import apiService from "../app/apiService";
import { API_KEY } from "../app/config";
import LoadingScreen from "../components/LoadingScreen";

function TrailerMovie({ open, handleClose, movieId }) {
  const [dataVideo, setDataVideo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDataVideo = async () => {
      let results;
      setIsLoading(true);
      try {
        const data = await apiService.get(
          `/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
        );
        results = data.data.results.filter(
          (video) => video.type === "Trailer" && video.official === true
        );
        setDataVideo(results);

        setIsLoading(false);
      } catch (error) {
        setError(error.response.data.status_message);
        setIsLoading(false);
      }
    };

    fetchDataVideo();
  }, [movieId]);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Modal
            sx={{
              backgroundColor: "transparent",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            open={open}
            onClose={handleClose}
          >
            {error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <>
                {dataVideo.length === 0 ? (
                  <Alert severity="error">There is not available video</Alert>
                ) : (
                  <Box
                    sx={{
                      width: { md: 560, xs: "100%" },
                      height: 325,
                    }}
                  >
                    <Swiper
                      cssMode={true}
                      navigation={true}
                      mousewheel={true}
                      keyboard={true}
                      modules={[Navigation, Mousewheel, Keyboard]}
                      className="mySwiper"
                    >
                      {dataVideo.map((video) => (
                        <SwiperSlide key={video.key}>
                          <Box>
                            <iframe
                              width="560"
                              height="325"
                              src={`https://www.youtube.com/embed/${video.key}`}
                              title="YouTube video player"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                              className="embed-video"
                            ></iframe>
                          </Box>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </Box>
                )}
              </>
            )}
          </Modal>
        </>
      )}
    </>
  );
}

export default TrailerMovie;
