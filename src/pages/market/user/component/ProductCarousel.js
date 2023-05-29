import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Typography } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import CircleIcon from "@mui/icons-material/Circle";

export const ProductCarousel = ({ data }) => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(1);
  const [transition, setTransition] = useState(true);
  return (
    <Box>
      <SwipeableViews
        enableMouseEvents
        index={index}
        animateTransitions={transition}
        onChangeIndex={(index) => {
          if (index === 0) {
            setTransition(false);
            setIndex(data.length);
            setTimeout(() => {
              setTransition(true);
            }, 100);
          } else if (index === data.length + 1) {
            setTransition(false);
            setIndex(1);
            setTimeout(() => {
              setTransition(true);
            }, 100);
          } else {
            setIndex(index);
          }
        }}
      >
        <Box></Box>
        {data.map((product) => (
          <Box
            key={product.id}
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Avatar
              src={product.imageUrl}
              alt=""
              onClick={() => {
                navigate(`/market/product/${product.id}`);
              }}
              sx={{
                width: "40%",
                height: "auto",
                boxShadow: 10,
              }}
            ></Avatar>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography variant="h4" sx={{ mt: 1 }}>
                {product.name}
              </Typography>
            </Box>
          </Box>
        ))}
        <Box></Box>
      </SwipeableViews>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {data.map((product, i) => (
          <CircleIcon
            key={i}
            onClick={() => setIndex(i + 1)}
            sx={{
              color: index === i + 1 ? "primary.main" : "grey",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};
