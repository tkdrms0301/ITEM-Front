import React from "react";
import "./css/repair-main.css";
import { Link } from "react-router-dom";

export const RepairMain = () => {
  return (
    <>
      <div className="shop_search_button_area">
        <div className="shop_search_button">
          <Link to={"/repair/privateShops"} className="shop_search ">
            <div>사설 수리점 찾기</div>
          </Link>
        </div>

        <div className="shop_search_button">
          <Link to={"/repair/publicShops"} className="shop_search">
            <div>공식 수리점 찾기</div>
          </Link>
        </div>
        <div>
          <Link
            to={"/repair/readReport"}
            className="shop_search"
            state={{ repairId: 1 }}
          >
            <div>리포트 조회</div>
          </Link>
        </div>
        <div>
          <Link to={"/repair/registReport"} className="shop_search">
            <div>리포트 등록</div>
          </Link>
        </div>
      </div>
    </>
  );
};
