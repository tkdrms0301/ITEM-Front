import { Container, Box, Typography, IconButton } from "@mui/material";

import { BackButton } from "../../../../component/backButton";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const Header = ({ title }) => {
  const url = window.location.href;
  const OrderBackButton = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
      window.confirm("주문을 취소하시겠습니까?") &&
        navigate("/market/mypage/cart", { replace: true });
    };

    return (
      <IconButton onClick={handleBackClick}>
        <ArrowBackIcon sx={{ fontSize: "30px" }} />
      </IconButton>
    );
  };

  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          borderBottom: "2px solid gray",
        }}
      >
        <Box sx={{ height: "56px", display: "flex", alignItems: "center" }}>
          {url.includes("order") ? <OrderBackButton /> : <BackButton />}
          <Typography variant="h4" sx={{ fontWeight: "bold", ml: 3 }}>
            {title}
          </Typography>
        </Box>
      </Container>{" "}
    </>
  );
};
