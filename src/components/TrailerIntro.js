import React, { useState } from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import ReactPlayer from "react-player";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import { Box, Button, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import "./TrailerIntro.css";
import { URL_TRAILER } from "../app/config";
import logoTrailer from "../image/logo-trailer.png";

const styles = {
  icon: {
    color: "lightly.main",
    "&:hover": {
      color: "fourthly.main",
    },
    mr: 1,
    fontSize: { xs: 25, sm: 30, md: 35, lg: 40 },
  },
  typoContent: {
    fontSize: { xs: 10, sm: 12, md: 14, lg: 20 },
    color: "lightly.main",
    fontStyle: "italic",
    fontWeight: 400,
  },
  boxCoverBtn: {
    position: { xs: "absolute", sm: "relative", lg: "relative" },
    display: "flex",
    justifyContent: { sm: "space-between", xs: "flex-end" },
    alignItems: "center",
    top: { xs: 0, sm: "none" },
    width: "100%",
  },
  boxWrapCir: {
    alignItems: "center",
    justifyContent: "space-between",
    width: 200,
    display: { sm: "none", xs: "none", md: "flex" },
  },
  boxCoverScore: {
    top: 0,
    left: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 70,
    display: "flex",
  },
  typoRateScore: {
    fontWeight: 700,
    fontStyle: "italic",
    color: "lightly.main",
  },
  btnPlay: {
    height: { sm: 40, xs: 30, md: 50, lg: 50 },
    width: { xs: 80, lg: 120 },
  },
  btnMute: {
    position: "absolute",
    right: 0,
    bottom: { sm: "25%", xs: "40%", lg: "15%" },
    width: { sm: 100, xs: 30 },
    height: { sm: 50, xs: 30 },
    justifyContent: "flex-start",
  },
};

function TrailerIntro() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handlePlaying = () => {
    setIsPlaying(!isPlaying);
  };

  const handleIsMuted = () => {
    setIsMuted(!isMuted);
  };

  return (
    <>
      <div className="wrapped-container">
        <ReactPlayer
          url={URL_TRAILER}
          playing={isPlaying}
          muted={isMuted}
          volume={0.3}
          loop={true}
          width="100%"
          height="100%"
        />
        <div className="faded-box"></div>

        <div className="box-content">
          <img src={logoTrailer} alt="logo" width="100%" className="logo-img" />

          <Typography variant="h6" sx={styles.typoContent}>
            With the price on his head ever increasing, John Wick uncovers a
            path to defeating The High Table. But before he can earn his
            freedom, Wick must face off against a new enemy with powerful
            alliances across the globe and forces that turn old friends into
            foes.
          </Typography>

          <Box className="box-button-circle" sx={styles.boxCoverBtn}>
            <Box sx={styles.boxWrapCir}>
              <CircularProgress
                variant="determinate"
                value={80}
                color="thirdly"
                size={70}
              />

              <Box sx={styles.boxCoverScore}>
                <Typography variant="h6" color="sixthly.main" fontWeight={800}>
                  80%
                </Typography>
              </Box>

              <Typography variant="h6" sx={styles.typoRateScore}>
                Rate Score
              </Typography>
            </Box>

            <Button
              variant="outlined"
              color="lightly"
              onClick={handlePlaying}
              sx={styles.btnPlay}
            >
              {isPlaying ? (
                <PauseCircleIcon sx={styles.icon} fontSize="large" />
              ) : (
                <PlayCircleIcon sx={styles.icon} fontSize="large" />
              )}
              PLAY
            </Button>
          </Box>
        </div>

        <Button
          variant="outlined"
          color="lightly"
          onClick={handleIsMuted}
          sx={styles.btnMute}
        >
          {isMuted ? (
            <VolumeOffIcon sx={styles.icon} fontSize="large" />
          ) : (
            <VolumeUpIcon sx={styles.icon} fontSize="large" />
          )}
        </Button>
      </div>
    </>
  );
}

export default TrailerIntro;
