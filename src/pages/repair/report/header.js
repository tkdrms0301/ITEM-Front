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
import { MoreButton } from "./MoreButton";

export const Header = ({ title, handleReportDialogOpen }) => {
  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          borderBottom: "2px solid gray",
        }}
      >
        <Grid
          container
          sx={{ height: "56px", display: "flex", alignItems: "center" }}
        >
          <Grid item xs={1.5}>
            <BackButton />
          </Grid>
          <Grid item xs={9.5}>
            <Typography variant="h4" sx={{ ml: 3 }}>
              {title}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            {handleReportDialogOpen ? (
              <MoreButton reportId={1} onReport={handleReportDialogOpen} />
            ) : null}
          </Grid>
        </Grid>
      </Container>{" "}
    </>
  );
};
