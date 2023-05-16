import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/RepairShopDetail.css";
import Reviews from "../review/index.js";
const { kakao } = window;

let map, lat, lng;

export const PublicRepairShopDetail = () => {
  const [selectShop, setSelectShop] = useState(null);

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
    setSelectShop(location.state?.shop);
  }, []);

  const [currentTab, clickTab] = useState(0);

  useEffect(() => {
    if (selectShop) {
      getPrivateShopLocation();
    }
  }, [selectShop]);

  useEffect(() => {
    if (currentTab === 0 && map) {
      var coords = new kakao.maps.LatLng(lat, lng);

      map.relayout();
      map.setCenter(coords);
    }
  }, [currentTab]);

  const menuArr = [
    {
      name: "위치 / 전화번호",
    },
    { name: "리뷰" },
  ];

  const selectMenuHandler = (index) => {
    clickTab(index);
  };

  const navigate = useNavigate();

  const onClickBackBtn = () => {
    navigate(-1);
  };

  return (
    <>
      {selectShop ? (
        <>
          <div className="top_field">
            <div className="backButton_title">
              <img
                className="backButton"
                src={process.env.PUBLIC_URL + "/backButton.png"}
                style={{ width: "10vw", height: "10vw" }}
                alt="back"
                onClick={onClickBackBtn}
              />
              <div className="title">정비 상세</div>
            </div>
          </div>
          <div className="shop_title_area">
            <div className="shop_title">
              <div className="shop_name">{selectShop.shopName}</div>
            </div>
          </div>

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
                  currentTab === 1
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
