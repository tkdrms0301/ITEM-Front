const commentList = [
  {
    id: 1,
    body: "You are engaging.You are engaging.You are engaging.You are engaging.You are engaging.You are engaging.You are engaging.You are engaging.You are engaging.",
    shopId: 3,
    user: { id: 2, username: "omarsland1y" },
    rating: 5,
    comments: [],
  },
  {
    id: 32,
    body: "I really like your creativity!",
    shopId: 3,
    user: { id: 1, username: "lgherardi12" },
    rating: 3,
    comments: [
      {
        id: 32,
        body: "I really like your creativity!I really like your creativity!I really like your creativity!I really like your creativity!I really like your creativity!I really like your creativity!I really like your creativity!",
        shopId: 3,
        user: { id: 73, username: "lgherardi12" },
      },
    ],
  },
  {
    id: 138,
    body: "Your sense of fashion is great.\nYou're helping us sound lovely.\nYou are engaging.\nYour sense of fashion is great.\nYou're helping us sound lovely.\nYou are engaging.\nYour sense of fashion is great.\nYou're helping us sound lovely.\nYou are engaging.",
    shopId: 3,
    user: { id: 4, username: "yraigatt3" },
    rating: 4,
    comments: [
      {
        id: 138,
        body: "Your sense of fashion is great.\nYou're helping us sound lovely.\nYou are engaging.\nYour sense of fashion is great.\nYou're helping us sound lovely.\nYou are engaging.\nYour sense of fashion is great.\nYou're helping us sound lovely.\nYou are engaging.",
        shopId: 3,
        user: { id: 4, username: "yraigatt3" },
      },
    ],
  },
  {
    id: 152,
    body: "You're helping us sound lovely.",
    shopId: 3,
    user: { id: 73, username: "wfeldon20" },
    rating: 5,
    comments: [
      {
        id: 152,
        body: "You're helping us sound lovely.",
        shopId: 3,
        user: { id: 73, username: "wfeldon20" },
      },
    ],
  },
  {
    id: 213,
    body: "You are engaging.",
    shopId: 3,
    user: { id: 71, username: "omarsland1y" },
    rating: 3,
    comments: [
      {
        id: 213,
        body: "You are engaging.",
        shopId: 3,
        user: { id: 71, username: "omarsland1y" },
      },
    ],
  },
];

const shopId = 3;

export { commentList, shopId };
