import { Context } from "hono";

const dummyData: Warranty[] = [
  {
    id: 1,
    productName: "iPhone 12",
    tel: "080-1234-5678",
    period: new Date(),
    purchaseDate: new Date(),
    comment: "comment",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    productName: "iPhone 11",
    tel: "080-1234-5678",
    period: new Date(),
    purchaseDate: new Date(),
    comment: "comment",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    productName: "iPhone 10",
    tel: "080-1234-5678",
    period: new Date(),
    purchaseDate: new Date(),
    comment: "comment",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    productName: "iPhone 9",
    tel: "080-1234-5678",
    period: new Date(),
    purchaseDate: new Date(),
    comment: "comment",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    productName: "iPhone 8",
    tel: "080-1234-5678",
    period: new Date(),
    purchaseDate: new Date(),
    comment: "comment",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const getWarranties = (c: Context) => {
  return c.json(dummyData);
};
