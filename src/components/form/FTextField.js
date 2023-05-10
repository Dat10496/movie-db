import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@mui/material";

function FTextField({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          focused
          variant="outlined"
          color="lightly"
          fullWidth
          error={!!error}
          helperText={error?.message}
          inputProps={{
            style: {
              color: "#ffff",
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "rgb(145, 148, 148)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "lightly",
              },
            },
          }}
          {...field}
          {...other}
        />
      )}
    />
  );
}

export default FTextField;
