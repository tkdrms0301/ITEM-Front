import { useState } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = () => {
    console.log("Search:", searchValue);
    if (searchValue.length >= 2)
      navigate(`/community/search/?search=${searchValue}`);
    else alert("검색어는 2글자 이상 입력해주세요.");
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };
  return (
    <>
      <Box
        sx={{
          padding: "2%",
          width: "100%",
        }}
      >
        <TextField
          placeholder="검색어 입력"
          value={searchValue}
          onChange={handleChange}
          size="small"
          fullWidth
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleSearch}>
                <SearchIcon sx={{ fontSize: "30px" }} />
              </IconButton>
            ),
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
      </Box>
    </>
  );
};
