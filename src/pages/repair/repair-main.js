import React from "react";
import "./css/repair-main.css";
import { Link } from "react-router-dom";

export const RepairMain = () => {
  return (
    <>
      <div>
        <Link to={"/repair/privateShops"} className="private_shop_search">
          <div>사설 수리점 찾기</div>
        </Link>
        <Link to={"/repair/publicShops"} className="public_shop_search">
          <div>공식 수리점 찾기</div>
        </Link>
      </div>
    </>
  );
};
