import { Book } from "@models/book/book.model";

export const defaultBooks = (): any[] => [
  {
    id:1,
    order:1,
    publishYear : 1965,
    authorName: 'Frank Herbert',
    title: 'Dune',
    poster: 'https://m.media-amazon.com/images/I/71I4xUFNGpL._AC_SL1500_.jpg',
  },
  {
    id:2,
    order:2,
    publishYear : 1985,
    authorName: 'Orson Scott Card',
    title: "Ender's Game",
    poster:
      'https://images-na.ssl-images-amazon.com/images/I/51YfSAtW63L._SX304_BO1,204,203,200_.jpg',
  },
  {
    id:3,
    order:3,
    publishYear : 1949,
    authorName: 'George Revenge',
    title: '1984',
    poster:
      'https://sp-ao.shortpixel.ai/client/q_glossy,ret_img,w_600,h_928/https://www.jltstore.com/wp-content/uploads/2021/04/81U4kNa3BVL.jpg',
  },
  {
    id:4,
    order:4,
    publishYear : 1953,
    authorName: 'Ray Bradbury',
    title: 'Fahrenheit 451',
    poster: 'https://images-na.ssl-images-amazon.com/images/I/51WTp7hAmfL._SX324_BO1,204,203,200_.jpg',
  },
  {
    id:5,
    order:5,
    publishYear : 1932,
    authorName: 'Aldous Huxley',
    title: 'Brave New World',
    poster: 'https://images-na.ssl-images-amazon.com/images/I/51qUjJFVSpL._SY344_BO1,204,203,200_QL70_ML2_.jpg',
  }
];
