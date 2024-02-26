import { React, useState } from "react";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Box, Card, IconButton } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import { DOMAIN_IMG } from "../app/config";
import "./MovieCard.css";


const styles = {
  card: {
    height: "100%",
    width: 260,
    m: 1,
    flexWrap: "wrap",
    display: "flex",
    textDecoration: "none",
    justifyContent: "flex-start",
    p: 0,
    borderRadius: 3,
    "&: hover": {
      border: "1px solid #d50000",
    },
    position: "relative",
  },
  boxCoverContent: {
    height: 100,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    p: 0.2,
  },
  boxCoverTypo: {
    height: 12,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    pr: 1,
  },
  iconBtn: {
    position: "absolute",
    right: 0,
    top: 0,
  },
};

export default function MovieCard({ removeFavMovie, movie, location }) {
  const [content, setContent] = useState("none-display");

  return (
    <Box p={0} width={260} sx={{ position: "relative" }}>
      <Card
        onMouseEnter={() => setContent("display")}
        onMouseLeave={() => setContent("none-display")}
        sx={styles.card}
        component={Link}
        to={`movies/${movie.id}`}
        id={movie.id}
      >
        <img
          src={`${DOMAIN_IMG}/${movie.poster_path}`}
          alt={movie.title}
          width="100%"
          className="poster"
        />

        <div className={content}>
          <Box sx={styles.boxCoverContent}>
            <Typography
              color="lightly.main"
              fontWeight={700}
              fontSize={14}
              height={70}
            >
              {movie.title}
            </Typography>

            <Box sx={{ height: 100 }}>
              <Box sx={styles.boxCoverTypo}>
                <Typography
                  fontWeight={700}
                  fontSize={14}
                  color="lightly.main"
                  fontStyle="italic"
                >
                  {movie.release_date}
                </Typography>
              </Box>
            </Box>
          </Box>
        </div>
      </Card>

      {location === "/favorite-movie" && (
        <IconButton
          variant="outlined"
          color="fifthly"
          sx={styles.iconBtn}
          onClick={() => removeFavMovie(movie.id)}
        >
          <HighlightOffIcon color="lightly" />
        </IconButton>
      )}
    </Box>
  );
}
