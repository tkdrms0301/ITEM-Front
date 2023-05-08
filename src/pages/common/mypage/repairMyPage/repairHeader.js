import {
  Container,
  Box,
  Typography,
} from "@mui/material";

import { BackButton } from "../../../../component/backButton";

export const RepairMyPageHeader = () => {
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
            정비소 마이페이지
          </Typography>
        </Box>
      </Container>{" "}
    </>
  );
};
