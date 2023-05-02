import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const SearchButton = () => {
  return (
    <IconButton
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <SearchIcon sx={{ fontSize: "40px" }} />
    </IconButton>
  );
};
