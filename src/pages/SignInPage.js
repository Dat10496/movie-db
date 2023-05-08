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
import { FTextField, FormProvider } from "../components/form";
import useAuth from "../hooks/useAuth";
import backgroundImg from "../image/bgImg.jpg";

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

function SignInPage() {
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
        position: "fixed",
        top: 0,
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        height: "100%",
        width: "100%",
        m: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          p: 1,
          width: 400,
          height: 400,
        }}
      >
        <Box sx={style}>
          <LockIcon sx={{ fontSize: 30, color: "primary.lighter" }}></LockIcon>
        </Box>
        <Box sx={style}>
          <Typography variant="h4" sx={{ mb: 3, color: "#ffff" }}>
            Log In
          </Typography>
        </Box>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
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
            sx={{ bgcolor: "primary.main" }}
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
            <Typography variant="subtitle2" component="div" color="#ffff">
              Forget password?
            </Typography>
            <Typography variant="subtitle2" component="div" color="#ffff">
              Don't have an account? Sign up
            </Typography>
          </Box>
        </FormProvider>
      </Box>
    </Box>
  );
}

export default SignInPage;
