const topProductsData = [
  {
    id: 1,
    name: "PC1",
    imageUrl:
      "https://item0container.blob.core.windows.net/image/computer.webp",
  },
  {
    id: 2,
    name: "LAPTOP2",
    imageUrl: "https://item0container.blob.core.windows.net/image/noteBook.png",
  },
  {
    id: 3,
    name: "TABLET3",
    imageUrl: "https://item0container.blob.core.windows.net/image/tablet.png",
  },
];

const cartData = [
  {
    id: 1,
    name: "Product 1",
    price: 10000,
    quantity: 2,
    selected: true,
    imageUrl:
      "https://item0container.blob.core.windows.net/image/computer.webp",
  },
  {
    id: 2,
    name: "Product 2",
    price: 15000,
    quantity: 1,
    selected: false,
    imageUrl: "https://item0container.blob.core.windows.net/image/noteBook.png",
  },
  {
    id: 3,
    name: "Product 3",
    price: 20000,
    quantity: 3,
    selected: true,
    imageUrl: "https://item0container.blob.core.windows.net/image/tablet.png",
  },
];
const orderData = {
  name: "홍길동",
  phone: "010-1234-5678",
  address: "서울시 강남구 테헤란로 427 위워크타워 10층",
  orderItems: cartData.filter((item) => item.selected),
  totalPrice: cartData.reduce(
    (total, item) =>
      item.selected ? total + item.price * item.quantity : total,
    0
  ),
  balance: 100000,
};
const carriers = [
  {
    id: "de.dhl",
    name: "DHL",
    tel: "+8215880001",
  },
  {
    id: "jp.sagawa",
    name: "Sagawa",
    tel: "+810120189595",
  },
  {
    id: "jp.yamato",
    name: "Kuroneko Yamato",
    tel: "+810120189595",
  },
  {
    id: "jp.yuubin",
    name: "Japan Post",
    tel: "+810570046111",
  },
  {
    id: "kr.chunilps",
    name: "천일택배",
    tel: "+8218776606",
  },
  {
    id: "kr.cjlogistics",
    name: "CJ대한통운",
    tel: "+8215881255",
  },
  {
    id: "kr.cupost",
    name: "CU 편의점택배",
    tel: "+8215771287",
  },
  {
    id: "kr.cvsnet",
    name: "GS Postbox 택배",
    tel: "+8215771287",
  },
  {
    id: "kr.cway",
    name: "CWAY (Woori Express)",
    tel: "+8215884899",
  },
  {
    id: "kr.daesin",
    name: "대신택배",
    tel: "+82314620100",
  },
  {
    id: "kr.epost",
    name: "우체국 택배",
    tel: "+8215881300",
  },
  {
    id: "kr.hanips",
    name: "한의사랑택배",
    tel: "+8216001055",
  },
  {
    id: "kr.hanjin",
    name: "한진택배",
    tel: "+8215880011",
  },
  {
    id: "kr.hdexp",
    name: "합동택배",
    tel: "+8218993392",
  },
  {
    id: "kr.homepick",
    name: "홈픽",
    tel: "+8218000987",
  },
  {
    id: "kr.honamlogis",
    name: "한서호남택배",
    tel: "+8218770572",
  },
  {
    id: "kr.ilyanglogis",
    name: "일양로지스",
    tel: "+8215880002",
  },
  {
    id: "kr.kdexp",
    name: "경동택배",
    tel: "+8218995368",
  },
  {
    id: "kr.kunyoung",
    name: "건영택배",
    tel: "+82533543001",
  },
  {
    id: "kr.logen",
    name: "로젠택배",
    tel: "+8215889988",
  },
  {
    id: "kr.lotte",
    name: "롯데택배",
    tel: "+8215882121",
  },
  {
    id: "kr.slx",
    name: "SLX",
    tel: "+82316375400",
  },
  {
    id: "kr.swgexp",
    name: "성원글로벌카고",
    tel: "+82327469984",
  },
  {
    id: "nl.tnt",
    name: "TNT",
  },
  {
    id: "un.upu.ems",
    name: "EMS",
  },
  {
    id: "us.fedex",
    name: "Fedex",
  },
  {
    id: "us.ups",
    name: "UPS",
  },
  {
    id: "us.usps",
    name: "USPS",
  },
];
const orderHistoryData = [
  {
    id: 1,
    orderData: orderData,
    date: "2021-09-01",
    status: "결제 완료",
    carrier: carriers[10],
    trackingNumber: "1111111111111",
  },
  {
    id: 2,
    orderData: orderData,
    date: "2021-09-02",
    status: "배송중",
    carrier: carriers[10],
    trackingNumber: "1111111111111",
  },
  {
    id: 3,
    orderData: orderData,
    date: "2021-09-03",
    status: "배송 완료",
    carrier: carriers[10],
    trackingNumber: "1111111111111",
  },
  {
    id: 4,
    orderData: orderData,
    date: "2021-09-04",
    status: "구매 확정",
    carrier: carriers[10],
    trackingNumber: "1111111111111",
  },
];

const trackingInfoData = {
  from: { name: "", time: "2021-09-01T00:00:00+09:00" },
  to: { name: orderData.address, time: "2021-09-03T07:00:00+09:00" },
  state: { id: "information_received", text: "방문예정" },
};

const productDetail = {
  id: 1,
  name: "상품이름123",
  // name: "Velit aliquip Lorem fugiat nostrud id culpa ad culpa",
  thumbnailUrl:
    "https://item0container.blob.core.windows.net/image/computer.webp",
  price: 10000,
  deliveryCompany: "우체국택배",
  deliveryCost: 2500,
  comment: "상품 설명입니다.",
  imageUrls: [
    "https://item0container.blob.core.windows.net/image/computer.webp",
    "https://item0container.blob.core.windows.net/image/noteBook.png",
    "https://item0container.blob.core.windows.net/image/tablet.png",
  ],
  rating: 4.5,
  reviewList: [
    {
      id: 1,
      ownerId: 1,
      ownerName: "홍길동",
      date: "2020-01-01",
      comment: "리뷰 내용입니다.",
      rating: 4.5,
    },
    {
      id: 1,
      ownerId: 1,
      ownerName: "홍길동2",
      date: "2020-01-02",
      comment: "리뷰 내용입니다.2",
      rating: 4.5,
    },
    {
      id: 3,
      ownerId: 2,
      ownerName: "홍길동3",
      date: "2020-01-03",
      comment: "리뷰 내용입니다.3",
      rating: 4.5,
    },
  ],
};

export {
  topProductsData,
  cartData,
  orderData,
  orderHistoryData,
  trackingInfoData,
  productDetail,
};
