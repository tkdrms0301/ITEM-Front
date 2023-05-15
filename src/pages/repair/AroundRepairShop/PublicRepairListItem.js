import "../css/RepairListItem.css";
import { Link } from "react-router-dom";

const PublicRepairListItem = ({ shop }) => {
  return (
    <>
      <Link
        to={"/repair/publicShops/detail"}
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
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default PublicRepairListItem;
