import { MovieCardProps } from "./components/MovieCard/MovieCard";

export const cards: MovieCardProps[] = [
  {
    orientation: "vertical",
    name: "Capitan Marvel",
    year: 2000,
    genres: ["comedy", "action", "epic"],
    rating: 3.4,
    views: 123000,
    img:
      "https://upload.wikimedia.org/wikipedia/ru/0/07/Captain_Marvel_film_logo.jpg",
    length: 123,
    pgRating: "PG-13",
  },
  {
    orientation: "vertical",
    name: "Hobbit",
    year: 2004,
    genres: ["fantasy", "epic"],
    rating: 4.9,
    views: 9123000,
    img:
      "https://images-na.ssl-images-amazon.com/images/I/7145Wo9GjlL._AC_SL1006_.jpg",
    length: 123,
    pgRating: "PG-6",
  },
  {
    orientation: "vertical",
    name: "Star Trek",
    year: 1994,
    genres: ["action", "sci-fi"],
    rating: 1.4,
    views: 987654,
    img: "https://m.media-amazon.com/images/I/615RWFNlXDL._AC_SY741_.jpg",
    length: 123,
    pgRating: "PG-13",
  },
];
