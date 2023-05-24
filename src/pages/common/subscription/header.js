import {
  Container,
  Grid,
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
} from "@mui/material";
import { BackButton } from "../../../component/backButton";

export const Header = () => {
  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          borderBottom: "2px solid gray",
        }}
      >
        <Box sx={{ height: "56px", display: "flex", alignItems: "center" }}>
          <BackButton />
          <Typography variant="h4" sx={{ ml: 3 }}>
            구독권 구매
          </Typography>
        </Box>
      </Container>{" "}
    </>
  );
};
