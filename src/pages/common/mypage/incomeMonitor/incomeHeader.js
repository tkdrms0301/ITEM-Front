import { Container, Box, Typography } from "@mui/material";

import { BackButton } from "../../../../component/backButton";

export const IncomeHeader = () => {
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
            수익조회
          </Typography>
        </Box>
      </Container>{" "}
    </>
  );
};
