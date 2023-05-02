import {
  Container,
  Grid,
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
} from "@mui/material";

import { BackButton } from "../../../../component/backButton";

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
          <Typography variant="h6" sx={{ fontWeight: "bold", ml: 3 }}>
            포인트 이용내역
          </Typography>
        </Box>
      </Container>{" "}
    </>
  );
};
