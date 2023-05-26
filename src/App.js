import { useEffect, useState } from "react";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes";
import ResponsiveAppBar from "./component/appbar";
import SimpleBottomNavigation from "./component/nav";
import { Box } from "@mui/material";

const App = () => {
  const content = useRoutes(routes);
  const [isBottomNavigationVisible, setIsBottomNavigationVisible] =
    useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsBottomNavigationVisible(window.innerWidth < 1200);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // 초기 로드 시에도 한 번 실행

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <ResponsiveAppBar></ResponsiveAppBar>
      {isBottomNavigationVisible && (
        <SimpleBottomNavigation content={content}></SimpleBottomNavigation>
      )}
      <Box className="mainscreen" sx={{ pt: "56px", pb: "56px" }}>
        {content}
      </Box>
    </>
  );
};

export default App;
