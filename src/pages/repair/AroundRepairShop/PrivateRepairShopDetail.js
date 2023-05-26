import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/RepairShopDetail.css";
import Reviews from "../review/index.js";
import { Header } from "./header";
import { Card, Container, Typography } from "@mui/material";
import palette from "../../../theme/palette";
import { Box } from "@mui/system";

const { kakao } = window;

let map, lat, lng;

export const PrivateRepairShopDetail = () => {
  const [selectShop, setSelectShop] = useState(null);

  const [roleType, setRoleType] = useState(
    JSON.parse(window.localStorage.getItem("user")) !== null
      ? JSON.parse(window.localStorage.getItem("user")).roleType
      : "MEMBER"
  );

  function getPrivateShopLocation() {
    var container = document.getElementById("repair_shop_map");
    var options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    map = new kakao.maps.Map(container, options);
    var geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(selectShop.shopAddress, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        lat = result[0].y;
        lng = result[0].x;
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        var marker = new kakao.maps.Marker({
          position: coords,
        });
        marker.setMap(map);
        map.setCenter(coords);
      }
    });
  }

  const location = useLocation();

  useEffect(() => {
    console.log(location.state?.shop);
    setSelectShop(location.state?.shop);
  }, []);

  const [currentTab, clickTab] = useState(0);

  useEffect(() => {
    if (selectShop) {
      getPrivateShopLocation();
    } else {
      // 여기다가 스켈레톤 만들기
    }
  }, [selectShop]);

  useEffect(() => {
    if (currentTab === 1) {
      var coords = new kakao.maps.LatLng(lat, lng);

      map.relayout();
      map.setCenter(coords);
    }
  }, [currentTab]);

  const menuArr = [
    {
      name: "서비스 목록",
    },
    {
      name: "위치/전화번호",
    },
    { name: "리뷰" },
  ];

  const selectMenuHandler = (index) => {
    clickTab(index);
  };

  const navigate = useNavigate();

  return (
    <>
      {selectShop ? (
        <>
          <Header></Header>
          <Container>
            <Card
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: 10,
                bgcolor: palette.info.lighter,
                flexDirection: "column",
                borderRadius: "5px",
                my: 2,
                py: 2,
              }}
            >
              <Typography variant="h2" sx={{ mb: 1 }}>
                {selectShop.shopName}
              </Typography>
              <Typography variant="subtitle2">
                {selectShop.description}
              </Typography>
            </Card>
          </Container>
          <div>
            <ul className="tab_menu">
              {menuArr.map((el, index) => (
                <li
                  key={index}
                  className={
                    index === currentTab ? "submenu focused" : "submenu"
                  }
                  onClick={() => selectMenuHandler(index)}
                >
                  {el.name}
                </li>
              ))}
            </ul>
            <div className="shop_content">
              <div
                className={
                  currentTab === 0
                    ? "content_visible"
                    : "content_visible invisible"
                }
              >
                <Container sx={{ mt: 3, pb: 20 }}>
                  {selectShop.services.map((service, index) => (
                    <Card
                      key={index}
                      sx={{
                        boxShadow: 10,
                        my: 1,
                        borderRadius: "5px",
                        py: 1,
                        pl: 1,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "flex-start",
                          flexDirection: "column",
                          borderBottom: "2px solid #f1f1f1",
                          pb: 2,
                        }}
                      >
                        <Typography variant="h5">
                          {service.serviceName}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 500 }}
                        >
                          {service.description}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "flex-start",
                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ color: palette.error.main, mt: 0.5 }}
                        >
                          ITEM 특가
                        </Typography>
                        <Box sx={{ display: "flex" }}>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 800 }}
                          >
                            {service.servicePrice.toLocaleString()}원
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              fontWeight: 600,
                              ml: 0.5,
                              textDecoration: "line-through",
                            }}
                          >
                            {(
                              service.servicePrice +
                              service.servicePrice * 0.1
                            ).toLocaleString()}
                            원
                          </Typography>
                        </Box>
                      </Box>
                    </Card>
                  ))}
                </Container>
                {roleType === "MEMBER" ? (
                  <Box
                    sx={{
                      position: "fixed",
                      display: "flex",
                      justifyContent: "space-evenly",
                      bottom: "15vw",
                      margin: "0 auto",
                      left: 0,
                      right: 0,
                      py: 1,
                      backgroundColor: palette.background.default,
                      borderTop: "solid 3px #f1f1f1",
                    }}
                  >
                    <Card
                      sx={{ py: 2, px: 4, bgcolor: "Highlight" }}
                      onClick={() => {
                        JSON.parse(window.localStorage.getItem("user")) !== null
                          ? navigate(
                              {
                                pathname:
                                  window.location.pathname + "/reservation",
                              },
                              {
                                state: {
                                  repairShopId: selectShop.repairShopId,
                                },
                              }
                            )
                          : window.location.replace("/login");
                      }}
                    >
                      <Typography variant="h5">예약하기</Typography>
                    </Card>

                    <Card
                      sx={{ py: 2, px: 4, bgcolor: palette.error.lighter }}
                      onClick={() => {
                        JSON.parse(window.localStorage.getItem("user")) !== null
                          ? navigate(
                              {
                                pathname:
                                  window.location.pathname + "/estimate",
                              },
                              {
                                state: {
                                  repairShopId: selectShop.repairShopId,
                                },
                              }
                            )
                          : window.location.replace("/login");
                      }}
                    >
                      <Typography variant="h5">견적받기</Typography>
                    </Card>
                  </Box>
                ) : null}
              </div>
              <div
                className={
                  currentTab === 1
                    ? "content_visible"
                    : "content_visible invisible"
                }
              >
                <div className="shop_address_and_phonenum">
                  <div className="kakao_map" id="repair_shop_map"></div>
                  <div className="shop_address">
                    주소 : {selectShop.shopAddress}
                  </div>
                  <div className="shop_tel_number">
                    전화 번호 : {selectShop.shopPhoneNumber}
                  </div>
                </div>
              </div>
              <div
                className={
                  currentTab === 2
                    ? "content_visible"
                    : "content_visible invisible"
                }
              >
                <div className="shop_review_area">
                  <Reviews />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
