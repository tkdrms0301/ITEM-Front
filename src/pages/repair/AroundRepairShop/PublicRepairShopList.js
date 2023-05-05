import React, { useEffect, useState } from "react";
import "../css/RepairShopList.css";
import { getLocation } from "../hooks/getLocation";
import { PublicRepairShopData } from "../data/PublicRepairShopData";
import PublicRepairListItem from "./PublicRepairListItem";
const { kakao } = window;

export const PublicRepairShopList = () => {
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

  useEffect(() => {
    async function setLocation() {
      await getLocation().then((res) => {
        if (res.latitude) {
          var container = document.getElementById("map");
          var options = {
            center: new kakao.maps.LatLng(res.latitude, res.longitude),
            level: 3,
          };
          var map = new kakao.maps.Map(container, options);

          displayMarker(options.center, "현재위치", map, true);

          var geocoder = new kakao.maps.services.Geocoder();

          PublicRepairShopData.map((shop) => {
            geocoder.addressSearch(shop.shopAddress, function (result, status) {
              if (status === kakao.maps.services.Status.OK) {
                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                displayMarker(coords, shop.shopName, map, false);

                const moveLatLon = new kakao.maps.LatLng(
                  res.latitude,
                  res.longitude
                );

                map.setCenter(moveLatLon);
              }
            });
          });
        } else {
          alert("위치 정보를 가져올 수 없습니다.");
        }
      });
    }

    setLocation();
  }, []);

  const [searchRepairShop, setSearchRepairShop] = useState("");

  const filterName = PublicRepairShopData.filter((p) => {
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

  return (
    <>
      <div>
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
        <div className="repair_list">
          {searchRepairShop
            ? filterName.map((shop, index) => (
                <PublicRepairListItem key={index} shop={shop} />
              ))
            : PublicRepairShopData.map((shop, index) => (
                <PublicRepairListItem key={index} shop={shop} />
              ))}
        </div>
      </div>
    </>
  );
};
