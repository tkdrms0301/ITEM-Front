import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { trackingInfoData } from "../../testdata";

export const Tracker = ({ carrier, trackId }) => {
  const [trackingData, setTrackingData] = useState(null);
  useEffect(() => {
    // fetch(
    //   `https://apis.tracker.delivery/carriers/${carrier.id}/tracks/${trackId}`
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setTrackingData(data);
    //   });
    setTrackingData(trackingInfoData);
  }, [trackId]);

  if (trackingData === null) return <></>;
  else
    return (
      <Box>
        <Box sx={{ display: "flex" }}>
          <Box>
            <Typography noWrap variant="subtitle1" gutterBottom>
              배송 주소 : &nbsp;
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              {trackingData.to.name}
            </Typography>
          </Box>
        </Box>
        <Typography variant="subtitle1" gutterBottom>
          배송 상태 : {trackingData.state.text}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          배송 출발 :{trackingData.from.time}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          배송 도착 :{trackingData.to.time}
        </Typography>
      </Box>
    );
};
