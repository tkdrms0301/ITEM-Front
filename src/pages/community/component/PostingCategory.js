import {
  Box,
  ButtonGroup,
  Button
} from "@mui/material";

export const PostingCategory = () => {
  const buttonStyle = {
    color: "gray",
    fontSize: "20px",
    fontWeight: "bold",
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <ButtonGroup
        fullWidth={true}
        variant="text"
        color="inherit"
        sx={{ height: "100%" }}
      >
        <Button sx={buttonStyle}>전체</Button>
        <Button sx={buttonStyle}>자유</Button>
        <Button sx={buttonStyle}>질문</Button>
        <Button sx={buttonStyle}>정보</Button>
      </ButtonGroup>
    </Box>
  );
};
