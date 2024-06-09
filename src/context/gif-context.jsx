import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext, useContext, useEffect, useState } from "react";

const GifContext = createContext();

const GifProvider = ({ children }) => {
  const [gifs, setGifs] = useState([]);
  const [filter, setFilter] = useState("gifs");
  const [favorites, setFavorites] = useState([]);

  const gf = new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh");
  // const gf = new GiphyFetch("/categories.json");

  // const gf = fetch("/categories.json");
  console.log(gf);
  return (
    <GifContext.Provider
      value={{
        gf,
        gifs,
        setGifs,
        filter,
        setFilter,
        favorites,
      }}
    >
      {children}
    </GifContext.Provider>
  );
};

export const GifState = () => {
  return useContext(GifContext);
};

export default GifProvider;
