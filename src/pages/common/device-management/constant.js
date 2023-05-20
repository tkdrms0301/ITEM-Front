const listData = [
  {
    summary: "컴퓨터",
    detail: [],
  },
  {
    summary: "노트북",
    detail: [],
  },
  {
    summary: "스마트폰",
    detail: [],
  },
  {
    summary: "테블릿",
    detail: [],
  },
];

// const listData = [
//   {
//     summary: "컴퓨터",
//     detail: [
//       {
//         //id : 1,
//         //categoryId : 1,
//         //brandId : 1,
//         //productId : 1,
//         brand: "조립",
//         product: "조립 컴퓨터",
//         productNumber: "DIY-111",
//         type: false, // true이면 완본체 false이면 부품 보유
//         url: "https://cdn-icons-png.flaticon.com/512/2004/2004699.png",
//         part: [
//           {
//             brand: "RTX",
//             product: "3060 Ti",
//             productNumber: "DIY-1",
//           },
//           {
//             brand: "Intel",
//             product: "RAM 32GB",
//             productNumber: "DIY-2",
//           },
//           {
//             brand: "삼성",
//             product: "오디세이",
//             productNumber: "DIY-3",
//           },
//         ],
//       },
//       {
//         brand: "제닉스",
//         product: "제닉스 컴퓨터",
//         productNumber: "XSA-123",
//         type: true,
//         url: "https://cdn-icons-png.flaticon.com/512/2004/2004699.png",
//         part: [],
//       },
//       {
//         brand: "제닉스",
//         product: "제닉스 컴퓨터",
//         productNumber: "XSA-123",
//         type: true,
//         url: "https://cdn-icons-png.flaticon.com/512/2004/2004699.png",
//         part: [],
//       },
//       {
//         brand: "제닉스",
//         product: "제닉스 컴퓨터",
//         productNumber: "XSA-123",
//         type: true,
//         url: "https://cdn-icons-png.flaticon.com/512/2004/2004699.png",
//         part: [],
//       },
//     ],
//   },
//   {
//     summary: "노트북",
//     detail: [
//       {
//         brand: "ASUS",
//         product: "ASUS 노트북",
//         productNumber: "XSA-123",
//         type: true,
//         url: "/public/logo192.png",
//         part: [],
//       },
//       {
//         brand: "ASUS",
//         product: "ASUS 노트북2",
//         productNumber: "XSA-123",
//         type: true,
//         url: "/public/logo192.png",
//         part: [],
//       },
//       {
//         brand: "ASUS",
//         product: "ASUS 노트북3",
//         productNumber: "XSA-123",
//         type: true,
//         url: "/public/logo192.png",
//         part: [],
//       },
//     ],
//   },
//   {
//     summary: "스마트폰",
//     detail: [
//       {
//         brand: "삼성",
//         product: "삼성 스마트폰",
//         productNumber: "XSA-123",
//         type: true,
//         url: "/public/logo192.png",
//         part: [],
//       },
//       {
//         brand: "삼성",
//         product: "삼성 스마트폰2",
//         productNumber: "XSA-123",
//         type: true,
//         url: "/public/logo192.png",
//         part: [],
//       },
//       {
//         brand: "삼성",
//         product: "삼성 스마트폰3",
//         productNumber: "XSA-123",
//         type: true,
//         url: "/public/logo192.png",
//         part: [],
//       },
//     ],
//   },
//   {
//     summary: "테블릿",
//     detail: [
//       {
//         brand: "삼성",
//         product: "삼성 테블릿",
//         productNumber: "XSA-123",
//         type: true,
//         url: "/public/logo192.png",
//         part: [],
//       },
//       {
//         brand: "삼성",
//         product: "삼성 테블릿2",
//         productNumber: "XSA-123",
//         type: true,
//         url: "/public/logo192.png",
//         part: [],
//       },
//       {
//         brand: "삼성",
//         product: "삼성 테블릿3",
//         productNumber: "XSA-123",
//         type: true,
//         url: "/public/logo192.png",
//         part: [],
//       },
//     ],
//   },
// ];

const categorys = [
  {
    id: 1,
    name: "PC",
  },
  {
    id: 2,
    name: "노트북",
  },
  {
    id: 3,
    name: "스마트폰",
  },
  {
    id: 4,
    name: "테블릿",
  },
];

const brands = [
  {
    id: 1,
    name: "삼성",
  },
  {
    id: 2,
    name: "애플",
  },
  {
    id: 3,
    name: "ASUS",
  },
  {
    id: 4,
    name: "인텔",
  },
];

const products = [
  {
    id: 1,
    name: "Tuf A15 XXXX",
  },
  {
    id: 2,
    name: "Tuf A16 XXXX",
  },
  {
    id: 3,
    name: "Tuf A17 XXXX",
  },
  {
    id: 4,
    name: "Tuf A18 XXXX",
  },
];

export { listData, categorys, brands, products };
