import { useState } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

export const SearchBar = ({ url }) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = () => {
    if (searchValue.length >= 2) {
      navigate(`${url}/?search=${searchValue}`);
      window.location.reload();
    } else alert("검색어는 2글자 이상 입력해주세요.");
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };
  return (
    <>
      <Box
        sx={{
          ml: 2,
          width: "100%",
          backgroundColor: "white",
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
                <SearchIcon sx={{}} />
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
