import {
  Box,
  Card,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import palette from "../../../../../theme/palette";

export const CustomCard = ({ title, content, action }) => {
  return (
    <Card sx={{ boxShadow: 10, width: "100%" }}>
      <Box sx={{ borderBottom: `1px solid ${palette.grey[500]}` }}>
        <Typography variant={"h5"} sx={{ py: 1, px: 2 }}>
          {title}
        </Typography>
      </Box>
      <Grid container>
        <Grid
          item
          xs={action === null ? 12 : 10}
          display={"flex"}
          alignItems={"center"}
        >
          {content}
        </Grid>
        {action === null ? null : (
          <Grid item xs={2}>
            <IconButton onClick={action}>
              <KeyboardArrowRightIcon />
            </IconButton>
          </Grid>
        )}
      </Grid>
    </Card>
  );
};
