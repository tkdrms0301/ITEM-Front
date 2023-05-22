import { Container, Box, Typography } from "@mui/material";
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
          <Typography variant="h4" sx={{ fontWeight: "bold", ml: 3 }}>
            정비 상세
          </Typography>
        </Box>
      </Container>{" "}
    </>
  );
};
