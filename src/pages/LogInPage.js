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
import backgroundImg from "../image/img-login.png";

const styles = {
  boxWrapIconSigIn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    p: 1,
    color: "lightly.main",
  },
  boxCover: {
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
    color: "lightly.main",
  },
  boxWrap: {
    p: 1,
    width: 450,
    height: 450,
    borderTop: "0.1px solid white",
    borderBottom: "0.1px solid white",
    borderRadius: 3,
  },
  boxCoverTypoBottom: {
    display: "flex",
    justifyContent: "space-between",
    p: 2,
  },
  typoBottom: {
    "&:hover": {
      cursor: "pointer",
      color: "thirdly.main",
    },
  },
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
    <Box sx={styles.boxCover}>
      <Box component="div" className="faded-div" />

      <Box sx={styles.boxWrap}>
        <Box sx={styles.boxWrapIconSigIn}>
          <LockIcon sx={{ fontSize: 30 }}></LockIcon>
        </Box>
        <Box sx={styles.boxWrapIconSigIn}>
          <Typography variant="h4" mb={3}>
            Sign In
          </Typography>
        </Box>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3} mb={4}>
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

          <Box sx={styles.boxCoverTypoBottom}>
            <Typography sx={styles.typoBottom} variant="subtitle2">
              Forget password?
            </Typography>
            <Typography sx={styles.typoBottom} variant="subtitle2">
              Don't have an account? Sign up
            </Typography>
          </Box>
        </FormProvider>
      </Box>
    </Box>
  );
}

export default LogInPage;
