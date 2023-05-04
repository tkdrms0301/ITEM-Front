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
            <div className="repair_list_item_info_name">{shop.shopName}</div>
            <div className="repair_list_item_info_address">
              {shop.shopAddress}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default PublicRepairListItem;
