import { useRoutes, useLocation } from "react-router-dom";
import { routes } from "./routes";
import ResponsiveAppBar from "./component/appbar";
import SimpleBottomNavigation from "./component/nav";
import { Container } from "@mui/material";

const App = () => {
  const content = useRoutes(routes);

  const location = useLocation();
  const isDataPage = location.pathname.startsWith("/data");
  const maxWidth = isDataPage ? false : "sm";

  return (
    <>
      <ResponsiveAppBar></ResponsiveAppBar>
      <SimpleBottomNavigation></SimpleBottomNavigation>
      <Container
        maxWidth={maxWidth}
        sx={{ padding: 0, pt: "56px", pb: "56px" }}
      >
        {content}
      </Container>
    </>
  );
};

export default App;
