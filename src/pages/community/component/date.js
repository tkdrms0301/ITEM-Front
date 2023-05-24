import { Typography } from "@mui/material";

export const DateView = ({ date }) => {
  return (
    <Typography variant="subtitle1">
      {new Date(date).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </Typography>
  );
};
