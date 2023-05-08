import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import apiService from "../app/apiService";
import { API_KEY } from "../app/config";

const styleGenre = {
  color: "lightly.main",
  "&:hover": {
    color: "thirdly.main",
  },
};

function GenresList({ nameOfGenre }) {
  const [genresList, setGenresList] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    navigate(`/genres/${e.target.value}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get(
          `/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
        );
        setGenresList(response.data.genres);
      } catch (error) {
        console.log(error, "error");
      }
    };
    fetchData();
  }, []);

  return (
    <Box sx={{ backgroundColor: "inherit" }}>
      <Typography
        fontSize={22}
        fontWeight={700}
        color="lightly.main"
        fontStyle="italic"
      >
        Search by Genre
      </Typography>

      <FormControl
        sx={{
          m: 1,
          maxWidth: { md: 160, xs: "100%", sm: 160 },
        }}
        size="small"
      >
        <RadioGroup value={nameOfGenre} onChange={handleChange}>
          <Grid container>
            {genresList.map((genre) => (
              <Grid key={genre.id} item xs={4} sm={20} md={20}>
                <FormControlLabel
                  key={genre.name}
                  value={genre.name}
                  sx={styleGenre}
                  control={<Radio color="thirdly" sx={styleGenre} />}
                  label={
                    <Typography fontSize={14} fontWeight={600}>
                      {genre.name}
                    </Typography>
                  }
                >
                  {genre.name}
                </FormControlLabel>
              </Grid>
            ))}
          </Grid>
        </RadioGroup>
      </FormControl>
    </Box>
  );
}

export default GenresList;
