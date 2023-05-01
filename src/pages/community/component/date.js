import { Typography } from "@mui/material";

export const DateView = () => {
  return (
    <Typography variant="subtitle1">
      {new Date().toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </Typography>
  );
};
