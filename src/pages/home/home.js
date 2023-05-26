import { Card, CardHeader, Grid, Paper, Typography } from "@mui/material";

import { Container } from "@mui/system";
import { MainBanner } from "./mainBanner";
import { RepairServiceMenu } from "./repairServiceMenu";
import CommunityView from "./communityView";

export const Home = () => {
  const communityData = [
    {
      postId: 1,
      title: "GTX3060 한달 사용 후기1",
      content:
        "이 가격에 신품사느니 벤치성능 비슷하고 몇년 안써서 as기간도 남아있는 2060super 중고 현시세 18~20에 사는게 개이득, 고사양게임 안돌릴거면 13정도에 1660super 중고 사는게 개이득이고 ㅋㅋ (이것도 현존게임 80% 이상은 무리없이 돌림) 현재 신품 사기엔 뭐같지만 중고 사기엔 여지없이 좋은 시기임 ㅋㅋ",
      image: `https://img.danawa.com/prod_img/500000/144/463/img/13463144_1.jpg?shrink=130:130&_v=20220711095454`,
      date: "2023.05.20",
    },
    {
      postId: 2,
      title: "GTX3060 한달 사용 후기2",
      content:
        "이 가격에 신품사느니 벤치성능 비슷하고 몇년 안써서 as기간도 남아있는 2060super 중고 현시세 18~20에 사는게 개이득, 고사양게임 안돌릴거면 13정도에 1660super 중고 사는게 개이득이고 ㅋㅋ (이것도 현존게임 80% 이상은 무리없이 돌림) 현재 신품 사기엔 뭐같지만 중고 사기엔 여지없이 좋은 시기임 ㅋㅋ",
      image: `https://img.danawa.com/prod_img/500000/714/453/img/14453714_1.jpg?shrink=130:130&_v=20220527160129`,
      date: "2023.05.20",
    },
    {
      postId: 3,
      title: "GTX3060 한달 사용 후기3",
      content:
        "이 가격에 신품사느니 벤치성능 비슷하고 몇년 안써서 as기간도 남아있는 2060super 중고 현시세 18~20에 사는게 개이득, 고사양게임 안돌릴거면 13정도에 1660super 중고 사는게 개이득이고 ㅋㅋ (이것도 현존게임 80% 이상은 무리없이 돌림) 현재 신품 사기엔 뭐같지만 중고 사기엔 여지없이 좋은 시기임 ㅋㅋ",
      image: `https://img.danawa.com/prod_img/500000/714/453/img/14453714_1.jpg?shrink=130:130&_v=20220527160129`,
      date: "2023.05.20",
    },
    {
      postId: 4,
      title: "GTX3060 한달 사용 후기4",
      content:
        "이 가격에 신품사느니 벤치성능 비슷하고 몇년 안써서 as기간도 남아있는 2060super 중고 현시세 18~20에 사는게 개이득, 고사양게임 안돌릴거면 13정도에 1660super 중고 사는게 개이득이고 ㅋㅋ (이것도 현존게임 80% 이상은 무리없이 돌림) 현재 신품 사기엔 뭐같지만 중고 사기엔 여지없이 좋은 시기임 ㅋㅋ",
      image: `https://img.danawa.com/prod_img/500000/714/453/img/14453714_1.jpg?shrink=130:130&_v=20220527160129`,
      date: "2023.05.20",
    },
    {
      postId: 5,
      title: "GTX3060 한달 사용 후기5",
      content:
        "이 가격에 신품사느니 벤치성능 비슷하고 몇년 안써서 as기간도 남아있는 2060super 중고 현시세 18~20에 사는게 개이득, 고사양게임 안돌릴거면 13정도에 1660super 중고 사는게 개이득이고 ㅋㅋ (이것도 현존게임 80% 이상은 무리없이 돌림) 현재 신품 사기엔 뭐같지만 중고 사기엔 여지없이 좋은 시기임 ㅋㅋ",
      image: `https://img.danawa.com/prod_img/500000/714/453/img/14453714_1.jpg?shrink=130:130&_v=20220527160129`,
      date: "2023.05.20",
    },
  ];

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
        <CommunityView
          title="IT 기기에 대한 정보가 필요하신가요?"
          communityData={communityData.map((data, index) => ({
            postId: data.postId,
            title: data.title,
            content: data.content,
            image: data.image,
            date: data.date,
          }))}
        />
      </Container>
    </>
  );
};
