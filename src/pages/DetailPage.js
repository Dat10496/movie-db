import { React, useEffect, useState } from "react";
import { Alert, Button, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Box } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import StarsRoundedIcon from "@mui/icons-material/StarsRounded";
import YouTubeIcon from "@mui/icons-material/YouTube";

import "./DetailPage.css";

import LoadingScreen from "../components/LoadingScreen";
import apiService from "../app/apiService";
import { API_KEY, DOMAIN_IMG, DOMAIN_BACKDROP } from "../app/config";
import TrailerPage from "../components/TrailerMovie";
import useAuth from "../hooks/useAuth";

export default function DetailPage() {
  const [loading, setLoading] = useState(true);
  const [openTrailer, setOpenTrailer] = useState(false);
  const [controlAddFavMovie, setControlAddFavMovie] = useState(false);
  const [movieDetail, setMovieDetail] = useState([]);
  const [error, setError] = useState("");
  // console.log(controlAddFavMovie);
  const { id } = useParams();
  const auth = useAuth();
  const { favoriteMovie, addFavMovie } = auth;

  const handleAddFavMovie = (movieId) => {
    addFavMovie(movieId);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiService.get(
          `/3/movie/${id}?api_key=${API_KEY}`
        );

        setMovieDetail(response.data);
      } catch (error) {
        setError(error.message);
        console.log(error, "error");
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (favoriteMovie.includes(id)) {
      setControlAddFavMovie(true);
    }

    // eslint-disable-next-line
  }, [favoriteMovie]);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  minHeight: "100vh",
                  backgroundImage: `url("${DOMAIN_BACKDROP}${movieDetail.backdrop_path}")`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  position: "relative",
                }}
              >
                <div className="faded-detail-box">
                  <Box
                    sx={{
                      display: "flex",
                      width: "85%",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      component="img"
                      sx={{ height: 400, borderRadius: 3 }}
                      src={`${DOMAIN_IMG}${movieDetail.poster_path}`}
                      alt={movieDetail.title}
                    />

                    <Box className="content-detail-box">
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          color="lightly.main"
                          fontSize={35}
                          fontWeight={700}
                        >
                          {movieDetail.original_title}
                        </Typography>

                        <Button
                          onClick={() => handleAddFavMovie(movieDetail.id)}
                          variant="outlined"
                          color="lightly"
                          disabled={controlAddFavMovie}
                        >
                          <StarsRoundedIcon
                            fontSize="large"
                            color={controlAddFavMovie ? "fourthly" : "fifthly"}
                          />
                        </Button>
                      </Box>

                      <Typography
                        fontSize={15}
                        fontStyle="italic"
                        color="fifthly.lighter"
                        fontWeight={200}
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        Date Release:{" "}
                        <Typography color="sixthly.main" ml={0.5}>
                          {movieDetail.release_date}
                        </Typography>
                      </Typography>

                      <Typography
                        color="lightly.main"
                        variant="subtitle1"
                        fontStyle="italic"
                      >
                        Overview:
                      </Typography>

                      <Typography variant="body2" color="lightly.main">
                        {movieDetail.overview}
                      </Typography>

                      <Box
                        sx={{
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: 320,
                          display: { sm: "flex", xs: "none" },
                        }}
                      >
                        <Box
                          sx={{
                            position: "relative",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: 150,
                          }}
                        >
                          <CircularProgress
                            variant="determinate"
                            value={80}
                            color="thirdly"
                            size={50}
                          />
                          <Box
                            sx={{
                              top: 0,
                              left: 0,
                              bottom: 0,
                              position: "absolute",
                              alignItems: "center",
                              justifyContent: "center",
                              width: 50,
                              height: 50,
                              display: "flex",
                            }}
                          >
                            <Typography
                              fontSize={14}
                              color="thirdly.main"
                              fontWeight={500}
                            >
                              {Math.floor(movieDetail.vote_average * 10)}%
                            </Typography>
                          </Box>

                          <Typography
                            fontWeight={500}
                            fontStyle="italic"
                            color="lightly.main"
                          >
                            Rate Score
                          </Typography>
                        </Box>

                        <Button
                          variant="outlined"
                          color="fourthly"
                          sx={{ width: 110, height: 45 }}
                          onClick={() => setOpenTrailer(true)}
                        >
                          <YouTubeIcon fontSize="large" />

                          <Typography fontSize={14} fontWeight={600}>
                            Trailer
                          </Typography>
                        </Button>
                      </Box>
                    </Box>
                  </Box>

                  {openTrailer && (
                    <TrailerPage
                      open={openTrailer}
                      handleClose={() => setOpenTrailer(false)}
                      movieId={id}
                    />
                  )}
                </div>
              </Box>
            </>
          )}
        </>
      )}
    </>
  );
}
