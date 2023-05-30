import { Box, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const CategoryCard = ({ categoryId, name, url }) => {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => {
        navigate(`/market/products`, {
          state: {
            categoryId: categoryId,
            name: name,
          },
        });
      }}
      sx={{
        width: "100%",
        p: 1,
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
        src={url}
        sx={{ width: "60%", height: "auto" }}
      ></Box>
      <Box display={"flex"} justifyContent={"center"}>
        <Typography variant="body2" sx={{ fontSize: "10px" }}>
          {name}
        </Typography>
      </Box>
    </Card>
  );
};
