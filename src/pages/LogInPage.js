import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import { LoadingButton } from "@mui/lab";

import "./LoginPage.css";
import { FTextField, FormProvider } from "../components/form";
import useAuth from "../hooks/useAuth";
import backgroundImg from "../image/img-login.png";

const style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  p: 1,
};

const defaultValues = {
  username: "votada",
  password: "123456",
};

function LogInPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  const [showPassword, setShowPassword] = useState(true);

  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    let from = location.state?.from?.pathname || "/";
    let username = data.username;
    let password = data.password;

    auth.login(username, password, () => {
      navigate(from, { replace: true });
    });
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        top: 0,
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        height: "100%",
        width: "100%",
        m: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box component="div" className="faded-div" />

      <Box
        sx={{
          p: 1,
          width: 450,
          height: 450,
          borderTop: "0.1px solid white",
          borderBottom: "0.1px solid white",
          borderRadius: 3,
          // filter: "brightness(120%)",
        }}
      >
        <Box sx={style}>
          <LockIcon sx={{ fontSize: 30, color: "lightly.main" }}></LockIcon>
        </Box>
        <Box sx={style}>
          <Typography variant="h4" sx={{ mb: 3, color: "#ffff" }}>
            Log In
          </Typography>
        </Box>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack sx={{ color: "#ffff" }} spacing={3}>
            <FTextField name="username" label="User name" />
            <FTextField
              name="password"
              label="Password"
              type={showPassword ? "password" : "text"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOff color="lightly" />
                      ) : (
                        <Visibility color="lightly" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="space-between"
            sx={{ my: 2 }}
          ></Stack>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            loading={isSubmitting}
            variant="contained"
            sx={{ color: "lightly.main" }}
            color="primary"
          >
            Sign In
          </LoadingButton>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              color: "primary.main",
              p: 2,
            }}
          >
            <Typography variant="subtitle2" color="lightly.main">
              Forget password?
            </Typography>
            <Typography variant="subtitle2" color="lightly.main">
              Don't have an account? Sign up
            </Typography>
          </Box>
        </FormProvider>
      </Box>
    </Box>
  );
}

export default LogInPage;
