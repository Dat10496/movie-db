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
import MainHeader from "./MainHeader";

const iconStyle = {
  color: "lightly.main",
  "&:hover": {
    color: "fourthly.main",
  },
  mr: 1,
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
          <img
            src={logoTrailer}
            alt="logo"
            width="400"
            height="200"
            className="logo-img"
          />

          <Typography
            color="lightly.main"
            variant="h6"
            fontStyle="italic"
            fontSize={{ xs: 14, sm: 14, md: 14, lg: 20 }}
          >
            With the price on his head ever increasing, John Wick uncovers a
            path to defeating The High Table. But before he can earn his
            freedom, Wick must face off against a new enemy with powerful
            alliances across the globe and forces that turn old friends into
            foes.
          </Typography>

          <Box
            className="box-button-circle"
            sx={{
              position: { xs: "absolute", sm: "relative", lg: "relative" },
              display: "flex",
              justifyContent: { sm: "space-between", xs: "flex-end" },
              alignItems: "center",
              top: { xs: 0, sm: "none" },
              width: "100%",
            }}
          >
            <Box
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                width: 200,
                display: { sm: "flex", xs: "none" },
              }}
            >
              <CircularProgress
                variant="determinate"
                value={80}
                color="thirdly"
                size={70}
              />

              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  position: "absolute",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 70,
                  height: 70,
                  display: "flex",
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  color="sixthly.main"
                  fontWeight={800}
                >
                  80%
                </Typography>
              </Box>

              <Typography
                variant="h6"
                fontWeight={700}
                fontStyle="italic"
                color="lightly.main"
              >
                Rate Score
              </Typography>
            </Box>

            <Button
              variant="outlined"
              color="lightly"
              onClick={handlePlaying}
              sx={{
                height: { sm: 50, xs: 30 },
                width: { xs: 100 },
              }}
            >
              {isPlaying ? (
                <PauseCircleIcon sx={iconStyle} fontSize="large" />
              ) : (
                <PlayCircleIcon sx={iconStyle} fontSize="large" />
              )}
              PLAY
            </Button>
          </Box>
        </div>

        <Button
          variant="outlined"
          color="lightly"
          onClick={handleIsMuted}
          sx={{
            position: "absolute",
            right: 0,
            bottom: { sm: "25%", xs: "40%", lg: "15%" },
            width: { sm: 100, xs: 50 },
            height: { sm: 50, xs: 30 },
            justifyContent: "flex-start",
          }}
        >
          {isMuted ? (
            <VolumeOffIcon sx={iconStyle} fontSize="large" />
          ) : (
            <VolumeUpIcon sx={iconStyle} fontSize="large" />
          )}
        </Button>

        <MainHeader />
      </div>
    </>
  );
}

export default TrailerIntro;
