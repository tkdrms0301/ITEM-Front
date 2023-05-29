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
  balance: 10000,
};
export { topProductsData, cartData, orderData };
