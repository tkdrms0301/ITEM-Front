import { Container, Box, Typography } from "@mui/material";
import { BackButton } from "../../../component/backButton";

export const Header = ({ title }) => {
  return (
    <>
      <Container
        sx={{
          borderBottom: "2px solid gray",
        }}
      >
        <Box sx={{ height: "56px", display: "flex", alignItems: "center" }}>
          <BackButton />
          <Typography variant="h4" sx={{ fontWeight: "bold", ml: 3 }}>
            {title}
          </Typography>
        </Box>
      </Container>{" "}
    </>
  );
};
