import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const fabStyle = {
  position: "fixed",
  top: "auto",
  left: "auto",
  right: 20,
  bottom: 80,
  margin: 0,
};

const DeviceManagementButton = ({ registerOpenHandle }) => {
  const fab = {
    color: "primary",
    sx: { ...fabStyle },
    icon: <AddIcon />,
    label: "Add",
    click: () => registerOpenHandle(),
  };

  return (
    <>
      <Fab
        color={fab.color}
        sx={fab.sx}
        aria-label={fab.label}
        onClick={fab.click}>
        {fab.icon}
      </Fab>
    </>
  );
};

export default DeviceManagementButton;
