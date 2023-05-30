import { Card, CardHeader, Grid, Paper, Typography } from "@mui/material";

import { Container } from "@mui/system";
import { MainBanner } from "./mainBanner";
import { RepairServiceMenu } from "./repairServiceMenu";
import CommunityView from "./communityView";
import { get } from "../../api";
import { useEffect, useState } from "react";
import { BaseUrl } from "../../api/BaseUrl";

export const Home = () => {
  const [communityData, setCommunityData] = useState(null);

  useEffect(() => {
    get(BaseUrl + "/api/community/posts/latest").then((res) => {
      console.log(res.data.data);
      setCommunityData(res.data.data);
    });
  }, []);


  return (
    <>
      <Container
        sx={{
          marginTop: "5%",
          width: "100%",
        }}
      >
        <MainBanner />
        <RepairServiceMenu />
        {communityData ? (
          <CommunityView
            title="IT 기기에 대한 정보가 필요하신가요?"
            communityData={communityData.map((data, index) => ({
              postId: data.id,
              title: data.title,
              content: data.content,
              image: data.thumbnail,
              date: data.date,
            }))}
          />
        ) : null}
      </Container>
    </>
  );
};
