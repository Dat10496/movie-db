import { React, useEffect, useState } from "react";
import { Alert, Button, Chip, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Box } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import StarsRoundedIcon from "@mui/icons-material/StarsRounded";
import YouTubeIcon from "@mui/icons-material/YouTube";

import "./DetailPage.css";

import LoadingScreen from "../components/LoadingScreen";
import apiService from "../app/apiService";
import { API_KEY, DOMAIN_IMG, DOMAIN_BACKDROP } from "../app/config";
import TrailerMovie from "../components/TrailerMovie";
import useAuth from "../hooks/useAuth";

const styles = {
  boxFaded: {
    display: "flex",
    width: { md: "85%", xs: "100%" },
    height: { xs: "100%" },
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: { xs: "column", md: "row" },
  },
  boxImg: { height: { md: 400, xs: 300 }, borderRadius: 3 },
  boxCoverDetail: {
    display: "flex",
    justifyContent: "space-between",
  },
  btnAddFav: {
    border: "1px solid white",
    width: 50,
    height: 50,
    color: "lightly.main",
  },
  typoDate: {
    fontSize: 15,
    fontStyle: "italic",
    color: "fifthly.lighter",
    fontWeight: 200,
    display: "flex",
    alignItems: "center",
  },

  boxCoverBottom: {
    alignItems: "center",
    justifyContent: "space-between",
    width: 320,
    display: "flex",
  },
  boxWrapCir: {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: 150,
  },
  boxWrapTypoRate: {
    top: 0,
    left: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    display: "flex",
  },
  typoDataScore: {
    fontSize: 14,
    color: "thirdly.main",
    fontWeight: 500,
  },
};

export default function DetailPage() {
  const [loading, setLoading] = useState(true);
  const [openTrailer, setOpenTrailer] = useState(false);
  const [controlAddFavMovie, setControlAddFavMovie] = useState(false);
  const [movieDetail, setMovieDetail] = useState([]);
  const [error, setError] = useState("");

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
                  width: { md: "100%", xs: "100%" },
                  minHeight: { md: "100vh", xs: 900 },
                  backgroundImage: `url('${DOMAIN_BACKDROP}${movieDetail.backdrop_path}')`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  position: "relative",
                }}
              >
                <div className="faded-detail-box">
                  <Box sx={styles.boxFaded}>
                    <Box
                      component="img"
                      sx={styles.boxImg}
                      src={`${DOMAIN_IMG}${movieDetail.poster_path}`}
                      alt={movieDetail.title}
                    />

                    <Box className="content-detail-box">
                      <Box sx={styles.boxCoverDetail}>
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
                          disabled={controlAddFavMovie}
                          sx={styles.btnAddFav}
                        >
                          <StarsRoundedIcon
                            fontSize="large"
                            color={controlAddFavMovie ? "fourthly" : "fifthly"}
                          />
                        </Button>
                      </Box>

                      <Box display="flex" alignItems="center">
                        <Typography sx={styles.typoDate}>
                          Date Release:
                        </Typography>
                        <Typography ml={0.5} color="sixthly.main">
                          {movieDetail.release_date}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex" }}>
                        {movieDetail?.genres.map((genre) => (
                          <Chip
                            key={genre.id}
                            label={genre.name}
                            color="primary"
                            variant="outlined"
                            sx={{ backgroundColor: "tertiary.main", mr: 0.5 }}
                          />
                        ))}
                      </Box>

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

                      <Box sx={styles.boxCoverBottom}>
                        <Box sx={styles.boxWrapCir}>
                          <CircularProgress
                            variant="determinate"
                            value={80}
                            color="thirdly"
                            size={50}
                          />
                          <Box sx={styles.boxWrapTypoRate}>
                            <Typography sx={styles.typoDataScore}>
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
                          <YouTubeIcon />
                          <Typography fontSize={14} fontWeight={600}>
                            Trailer
                          </Typography>
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </div>
                {openTrailer && (
                  <TrailerMovie
                    open={openTrailer}
                    handleClose={() => setOpenTrailer(false)}
                    movieId={id}
                  />
                )}
              </Box>
            </>
          )}
        </>
      )}
    </>
  );
}
