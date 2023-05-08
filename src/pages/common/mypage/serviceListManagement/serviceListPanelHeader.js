import { Container, Box, Typography } from "@mui/material";
import { BackButton } from "../../../../component/backButton";

export const ServiceListPanelHeader = () => {
  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          borderBottom: "2px solid gray",
        }}
      >
        <Box sx={{ height: "56px", display: "flex", alignItems: "center" }}>
          <BackButton></BackButton>
          <Typography variant="h6" sx={{ fontWeight: "bold", ml: 3 }}>
            서비스 항목 관리
          </Typography>
        </Box>
      </Container>{" "}
    </>
  );
};
