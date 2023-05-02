import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const BackButton = () => {
  const navigate = useNavigate();
  
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <IconButton onClick={handleBackClick}>
      <ArrowBackIcon sx={{ fontSize: "30px" }} />
    </IconButton>
  );
};
