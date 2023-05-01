import { AppBar, Container, Grid, Toolbar, Typography } from "@mui/material";


// const pages = ["Products", "Pricing", "Blog"];
// const settings = ["Profile", "Account", "Dashboard", "Logout"];



function ResponsiveAppBar({ isLogin, setIsLogin }) {
  // const [anchorElNav, setAnchorElNav] = React.useState(null);
  // const [anchorElUser, setAnchorElUser] = React.useState(null);
  // const [mobileOpen, setMobileOpen] = React.useState(false);

  // const handleDrawerToggle = () => {
  //   setMobileOpen(!mobileOpen);
  // };

  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

  // const drawerWidth = 240;

  // const drawer = (
  //   <div>
  //     <Toolbar />
  //     <Divider />
  //     <List>
  //       {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
  //         <ListItem key={text} disablePadding>
  //           <ListItemButton>
  //             <ListItemIcon>
  //               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
  //             </ListItemIcon>
  //             <ListItemText primary={text} />
  //           </ListItemButton>
  //         </ListItem>
  //       ))}
  //     </List>
  //     <Divider />
  //     <List>
  //       {["All mail", "Trash", "Spam"].map((text, index) => (
  //         <ListItem key={text} disablePadding>
  //           <ListItemButton>
  //             <ListItemIcon>
  //               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
  //             </ListItemIcon>
  //             <ListItemText primary={text} />
  //           </ListItemButton>
  //         </ListItem>
  //       ))}
  //     </List>
  //   </div>
  // );

  return (
    <AppBar position="fixed" sx={{ height: "56px" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Grid container justifyContent="center">
            <Grid item>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  // display: { xs: "flex", md: "none" },
                  // flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                ITEM
              </Typography>
            </Grid>
          </Grid>
          {isLogin ? null : (
            <Grid
              item
              sx={{
                position: "absolute",
                right: "1%",
              }}
            >
              <Link
                to={"/login"}
                style={{
                  textDecoration: "none",
                  fontWeight: "bold",
                  color: "white",
                  marginRight: "15%",
                }}
              >
                Login
              </Link>
              <Link
                to={"/sign"}
                style={{
                  textDecoration: "none",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Sign
              </Link>
            </Grid>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
