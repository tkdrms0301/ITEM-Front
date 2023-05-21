import { Grid } from "@mui/material";

import DeviceList from "./list/DeviceList";
import DeviceRegister from "./register/DeviceRegister";
import DeviceManagementButton from "./DeviceManagementButton";
import { listData } from "./constant";
import { useEffect, useState } from "react";
import { get } from "../../../api";
import { BaseUrl } from "../../../api/BaseUrl";

const DeviceManagement = () => {
  const [data, setData] = useState([...listData]);
  const [registerOpen, setRegisterOpen] = useState(false);

  const registerOpenHandle = () => {
    setRegisterOpen(true);
  };

  const registerCloseHandle = () => {
    setRegisterOpen(false);
  };

  useEffect(() => {
    get(BaseUrl + "/api/device/get-device").then((res) => {
      setData([...res.data.data]);
    });
    setTimeout(1000);
  }, [data]);

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
              setData={setData}
            />
          </div>
        </Grid>
      </Grid>
    </>
  );
};
export default DeviceManagement;
