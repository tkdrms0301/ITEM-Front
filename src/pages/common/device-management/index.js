import * as React from "react";
import { Grid } from "@mui/material";

import DeviceList from "./list/DeviceList";
import DeviceRegister from "./register/DeviceRegister";
import DeviceManagementButton from "./DeviceManagementButton";
import { listData } from "./constant";

const DeviceManagement = () => {
  const [data, setData] = React.useState([...listData]);
  const [registerOpen, setRegisterOpen] = React.useState(false);

  const dataHandle = (newData) => {
    setData(newData);
  };

  const registerOpenHandle = () => {
    setRegisterOpen(true);
  };

  const registerCloseHandle = () => {
    setRegisterOpen(false);
  };

  return (
    <>
      <Grid container>
        <Grid item>
          <div style={{ margin: "10%", maxWidth: "90%" }}>
            <DeviceList
              data={data}
              registerOpenHandle={registerOpenHandle}
              registerCloseHandle={registerCloseHandle}
            />
            <DeviceManagementButton registerOpenHandle={registerOpenHandle} />
            <DeviceRegister
              registerOpen={registerOpen}
              registerCloseHandle={registerCloseHandle}
            />
          </div>
        </Grid>
      </Grid>
    </>
  );
};
export default DeviceManagement;
