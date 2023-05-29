import { Box, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const CategoryCard = ({ category, title, image }) => {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => {
        navigate(`/market/products/?category=${category}`);
      }}
      sx={{
        width: "100%",
        aspectRatio: "1 / 1",
        p: 3,
        boxShadow: 10,
      }}
    >
      <Box
        component={"img"}
        src={image}
        sx={{ width: "100%", height: "100%" }}
      ></Box>
      <Box display={"flex"} justifyContent={"center"}>
        <Typography variant="h6">{title}</Typography>
      </Box>
    </Card>
  );
};
