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
        p: 3,
        boxShadow: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        "&:hover": {
          bgcolor: "action.selected",
          fontWeight: "fontWeightBold",
        },
      }}
    >
      <Box
        component={"img"}
        src={image}
        sx={{ width: "50%", height: "auto" }}
      ></Box>
      <Box display={"flex"} justifyContent={"center"}>
        <Typography variant="h6">{title}</Typography>
      </Box>
    </Card>
  );
};
