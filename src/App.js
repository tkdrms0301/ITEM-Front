import { useRoutes } from "react-router-dom";
import { routes } from "./routes";
import ResponsiveAppBar from "./component/appbar";
import SimpleBottomNavigation from "./component/nav";
import { Box } from "@mui/material";
import { useState } from "react";

const App = () => {
  const content = useRoutes(routes);
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <ResponsiveAppBar isLogin={isLogin}></ResponsiveAppBar>
      <SimpleBottomNavigation></SimpleBottomNavigation>
      <Box className="mainscreen" sx={{ pt: "56px", pb: "56px" }}>
        {content}
      </Box>
    </>
  );
};

export default App;
