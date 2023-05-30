import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import CircleIcon from "@mui/icons-material/Circle";
import ProductCard from "./ProductCard";

// ----------------------------------------------------------------------

export const ProductCarousel = ({ data }) => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(1);
  const [transition, setTransition] = useState(true);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
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
        {data.map((data) => (
          <Box
            key={data.id}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <ProductCard product={data} />
          </Box>
        ))}
        <Box></Box>
      </SwipeableViews>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
