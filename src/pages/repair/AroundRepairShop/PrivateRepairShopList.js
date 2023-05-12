import React, { useEffect, useState } from "react";
import "../css/RepairShopList.css";
import { getLocation } from "../hooks/getLocation";
import { getDistance } from "geolib";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import { PrivateRepairShopData } from "../data/PrivateRepairShopData";
import PrivateRepairListItem from "./PrivateRepairListItem";
const { kakao } = window;

export const PrivateRepairShopList = () => {
  function displayMarker(locPosition, message, map, cur) {
    var marker;
    if (cur) {
      var imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
      var imageSize = new kakao.maps.Size(24, 35);
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      marker = new kakao.maps.Marker({
        map: map,
        position: locPosition,
        image: markerImage,
      });
    } else {
      marker = new kakao.maps.Marker({
        map: map,
        position: locPosition,
      });
    }
    var iwContent =
      '<div style="width:150px;text-align:center;padding:6px 0;">' +
      message +
      "</div>";

    var infowindow = new kakao.maps.InfoWindow({
      content: iwContent,
    });
    infowindow.open(map, marker);
  }

  async function setRepairShopMapMark() {
    await getLocation().then((res) => {
      var bounds = new kakao.maps.LatLngBounds();

      if (res.latitude) {
        var container = document.getElementById("map");
        var options = {
          center: new kakao.maps.LatLng(res.latitude, res.longitude),
          level: 3,
        };
        var map = new kakao.maps.Map(container, options);

        displayMarker(options.center, "현재위치", map, true);
        bounds.extend(options.center);
        var geocoder = new kakao.maps.services.Geocoder();

        PrivateRepairShopData.map((shop) => {
          geocoder.addressSearch(shop.shopAddress, function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
              var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

              displayMarker(coords, shop.shopName, map, false);

              shop.distance =
                Math.round(
                  getDistance(
                    {
                      latitude: options.center.La,
                      longitude: options.center.Ma,
                    },
                    { latitude: coords.La, longitude: coords.Ma }
                  ) / 100
                ) / 10;

              if (shop.distance < 5) {
                bounds.extend(coords);
              }
              const moveLatLon = new kakao.maps.LatLng(
                res.latitude,
                res.longitude
              );

              map.setCenter(moveLatLon);
              map.setBounds(bounds);
            }
          });
        });
      } else {
        alert("위치 정보를 가져올 수 없습니다.");
      }
    });
  }

  useEffect(() => {
    setRepairShopMapMark();
  }, []);

  const [searchRepairShop, setSearchRepairShop] = useState("");

  const filterName = PrivateRepairShopData.filter((p) => {
    return (
      p.shopName
        .replace(" ", "")
        .toLocaleLowerCase()
        .includes(searchRepairShop.toLocaleLowerCase().replace(" ", "")) ||
      p.shopAddress
        .replace(" ", "")
        .toLocaleLowerCase()
        .includes(searchRepairShop.toLocaleLowerCase().replace(" ", ""))
    );
  });

  PrivateRepairShopData.sort((a, b) => a.distance - b.distance);
  return (
    <>
      <div className="repair_map_area">
        <div className="kakao_map" id="map">
          <div className="repair_search_box">
            <input
              type="text"
              className="repair_search_input"
              value={searchRepairShop}
              onChange={(e) => {
                setSearchRepairShop(e.target.value);
              }}
            />
          </div>
        </div>
        <BottomSheet
          open={true}
          snapPoints={({ maxHeight }) => [maxHeight * 0.4, maxHeight * 0.8]}
          blocking={false}
        >
          <div className="repair_list">
            {searchRepairShop
              ? filterName
                  .sort((a, b) => a.distance - b.distance)
                  .map((shop, index) => (
                    <PrivateRepairListItem key={index} shop={shop} />
                  ))
              : PrivateRepairShopData.sort(
                  (a, b) => a.distance - b.distance
                ).map((shop, index) => (
                  <PrivateRepairListItem key={index} shop={shop} />
                ))}
          </div>
        </BottomSheet>
      </div>
    </>
  );
};
