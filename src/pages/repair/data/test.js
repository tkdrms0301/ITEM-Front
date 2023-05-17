const estimateHistoryForRepair = [
  {
    id: 1,
    uid: 1,
    shopId: 2,
    shopName: "서비스센터1",
    product: 2,
    productName: "아이폰11",
    img: "https://i.dummyjson.com/data/products/1/1.jpg",
    userComment: "서비스1,서비스2필요",
    repairComment: "",
    minPrice: 0,
    maxPrice: 0,
    minTime: "",
    maxTime: "",
    status: "응답 대기",
  },
  {
    id: 2,
    uid: 2,
    shopId: 2,
    shopName: "서비스센터1",
    product: 3,
    productName: "아이폰12",
    img: "https://i.dummyjson.com/data/products/2/1.jpg",
    userComment: "서비스1필요",
    repairComment: "서비스1제공가능",
    minPrice: 10000,
    maxPrice: 20000,
    minTime: "30분",
    maxTime: "1시간",
    status: "응답 완료",
  },
];

const estimateHistoryForUser = [
  {
    id: 1,
    uid: 1,
    shopId: 1,
    shopName: "서비스센터1",
    product: 2,
    productName: "아이폰11",
    img: "https://i.dummyjson.com/data/products/1/1.jpg",
    userComment: "서비스1,서비스2필요",
    repairComment: "",
    minPrice: 0,
    maxPrice: 0,
    minTime: "",
    maxTime: "",
    status: "응답 대기",
  },
  {
    id: 2,
    uid: 1,
    shopId: 2,
    shopName: "서비스센터2",
    product: 3,
    productName: "아이폰12",
    img: "https://i.dummyjson.com/data/products/2/1.jpg",
    userComment: "서비스1필요",
    repairComment: "서비스1제공가능",
    minPrice: 10000,
    maxPrice: 20000,
    minTime: "30분",
    maxTime: "1시간",
    status: "응답 완료",
  },
];
const reservationHistoryForRepair = [
  {
    id: 1,
    uid: 1,
    shopId: 2,
    shopName: "서비스센터1",
    product: 2,
    productName: "아이폰11",
    img: "https://i.dummyjson.com/data/products/1/1.jpg",
    service: ["서비스1", "서비스2"],
    userComment: "서비스1,서비스2필요",
    date: "2021-10-10",
    time: "10:00",
    status: "예약 대기",
  },
  {
    id: 2,
    uid: 2,
    shopId: 2,
    shopName: "서비스센터1",
    product: 3,
    productName: "아이폰12",
    img: "https://i.dummyjson.com/data/products/2/1.jpg",
    service: ["서비스1"],
    userComment: "서비스1필요",
    date: "2021-10-09",
    time: "11:00",
    status: "예약 완료",
  },
  {
    id: 3,
    uid: 3,
    shopId: 2,
    shopName: "서비스센터1",
    product: 4,
    productName: "아이폰13",
    img: "https://i.dummyjson.com/data/products/2/1.jpg",
    service: ["서비스3"],
    userComment: "서비스1필요",
    date: "2021-10-09",
    time: "11:00",
    status: "정비 완료",
  },
];

const reservationHistoryForUser = [
  {
    id: 1,
    uid: 1,
    shopId: 1,
    shopName: "서비스센터1",
    product: 2,
    productName: "아이폰11",
    img: "https://i.dummyjson.com/data/products/1/1.jpg",
    service: ["서비스1", "서비스2"],
    userComment: "서비스1,서비스2필요",
    date: "2021-10-10",
    time: "10:00",
    status: "예약 대기",
  },
  {
    id: 2,
    uid: 1,
    shopId: 2,
    shopName: "서비스센터2",
    product: 3,
    productName: "아이폰12",
    img: "https://i.dummyjson.com/data/products/2/1.jpg",
    service: ["서비스3"],
    userComment: "서비스1필요",
    date: "2021-10-09",
    time: "11:00",
    status: "예약 완료",
  },
  {
    id: 3,
    uid: 1,
    shopId: 3,
    shopName: "서비스센터2",
    product: 4,
    productName: "아이폰13",
    img: "https://i.dummyjson.com/data/products/2/1.jpg",
    service: ["서비스1"],
    userComment: "서비스1필요",
    date: "2021-10-09",
    time: "11:00",
    status: "정비 완료",
  },
];

const users = [
  {
    id: 1,
    name: "김철수",
    role: "MEMBER",
  },
  {
    id: 2,
    name: "김영희",
    role: "MECHANIC",
  },
];

const testServiceTime = [
  {
    time: "10:00",
    isEnable: true,
  },
  {
    time: "11:00",
    isEnable: false,
  },
  {
    time: "12:00",
    isEnable: true,
  },
];
const services = [
  { id: 1, title: "서비스1" },
  { id: 2, title: "서비스2" },
  { id: 3, title: "서비스3" },
];
const products = [
  {
    id: 1,
    title: "iPhone 9",
    description: "An apple mobile which is nothing like apple",
    price: 549,
    discountPercentage: 12.96,
    rating: 4.69,
    stock: 94,
    brand: "Apple",
    category: "smartphones",
    thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/1/1.jpg",
      "https://i.dummyjson.com/data/products/1/2.jpg",
      "https://i.dummyjson.com/data/products/1/3.jpg",
      "https://i.dummyjson.com/data/products/1/4.jpg",
      "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
    ],
  },
  {
    id: 2,
    title: "iPhone X",
    description:
      "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
    price: 899,
    discountPercentage: 17.94,
    rating: 4.44,
    stock: 34,
    brand: "Apple",
    category: "smartphones",
    thumbnail: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/2/1.jpg",
      "https://i.dummyjson.com/data/products/2/2.jpg",
      "https://i.dummyjson.com/data/products/2/3.jpg",
      "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
    ],
  },
  {
    id: 3,
    title: "Samsung Universe 9",
    description:
      "Samsung's new variant which goes beyond Galaxy to the Universe",
    price: 1249,
    discountPercentage: 15.46,
    rating: 4.09,
    stock: 36,
    brand: "Samsung",
    category: "smartphones",
    thumbnail: "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
    images: ["https://i.dummyjson.com/data/products/3/1.jpg"],
  },
  {
    id: 4,
    title: "OPPOF19",
    description: "OPPO F19 is officially announced on April 2021.",
    price: 280,
    discountPercentage: 17.91,
    rating: 4.3,
    stock: 123,
    brand: "OPPO",
    category: "smartphones",
    thumbnail: "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/4/1.jpg",
      "https://i.dummyjson.com/data/products/4/2.jpg",
      "https://i.dummyjson.com/data/products/4/3.jpg",
      "https://i.dummyjson.com/data/products/4/4.jpg",
      "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
    ],
  },
  {
    id: 5,
    title: "Huawei P30",
    description:
      "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
    price: 499,
    discountPercentage: 10.58,
    rating: 4.09,
    stock: 32,
    brand: "Huawei",
    category: "smartphones",
    thumbnail: "https://i.dummyjson.com/data/products/5/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/5/1.jpg",
      "https://i.dummyjson.com/data/products/5/2.jpg",
      "https://i.dummyjson.com/data/products/5/3.jpg",
    ],
  },
];

const reservationCurrentStatus = [
  {
    myItems: [
      {
        itName: "아이폰13",
        itImg:
          "https://item0container.blob.core.windows.net/image/computer.webp",
      },
      {
        itName: "아이폰12",
        itImg:
          "https://item0container.blob.core.windows.net/image/computer.webp",
      },
      {
        itName: "아이폰10",
        itImg:
          "https://item0container.blob.core.windows.net/image/computer.webp",
      },
      {
        itName: "아이폰9",
        itImg:
          "https://item0container.blob.core.windows.net/image/computer.webp",
      },
    ],
    services: [
      {
        svName: "배터리 교체",
      },
      {
        svName: "스크린 교체",
      },
      {
        svName: "카메라 교체",
      },
    ],
    reservationTimes: [
      {
        time: "09:00",
        isEnable: true,
      },
      {
        time: "09:30",
        isEnable: true,
      },
      {
        time: "10:00",
        isEnable: true,
      },
      {
        time: "10:30",
        isEnable: true,
      },
      {
        time: "11:00",
        isEnable: true,
      },
      {
        time: "11:30",
        isEnable: true,
      },
      {
        time: "12:00",
        isEnable: true,
      },
      {
        time: "12:30",
        isEnable: true,
      },
      {
        time: "14:00",
        isEnable: true,
      },
      {
        time: "14:30",
        isEnable: true,
      },
      {
        time: "15:00",
        isEnable: true,
      },
      {
        time: "15:30",
        isEnable: true,
      },
      {
        time: "16:00",
        isEnable: true,
      },
      {
        time: "16:30",
        isEnable: true,
      },
      {
        time: "17:00",
        isEnable: true,
      },
      {
        time: "17:30",
        isEnable: true,
      },
    ],
  },
];

export {
  estimateHistoryForRepair,
  estimateHistoryForUser,
  reservationHistoryForRepair,
  reservationHistoryForUser,
  users,
  testServiceTime,
  services,
  products,
  reservationCurrentStatus,
};
