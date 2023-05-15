import "../css/RepairListItem.css";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

const PrivateRepairListItem = ({ shop }) => {
  return (
    <>
      <Link
        to={"/repair/privateShops/detail"}
        className="repair_shop_detail_link"
        state={{ shop: shop }}
      >
        <div className="repair_list_item">
          <div className="repair_list_item_info">
            <div className="repair_item_name_n_addr">
              <div className="repair_list_item_info_name">{shop.shopName}</div>

              <div className="repair_list_item_info_address">
                {shop.shopAddress}
              </div>
            </div>
            <div className="repair_shop_dis_n_star">
              <div className="form_cur_distance">{shop.distance}Km</div>
              <Rating
                sx={{
                  width: "100px",
                  height: "20px",
                  fontSize: "15px",
                  justifyContent: "flex-end",
                }}
                readOnly
                name="simple-controlled"
                value={4}
              />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default PrivateRepairListItem;
