import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { GifState } from "../context/gif-context";
import { GiphyFetch } from "@giphy/js-fetch-api";
import GifSearch from "./gif-search";

const Header = () => {
  const gf = new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh");
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  console.log(categories);
  const { filter, setFilter, favorites } = GifState();

  // const fetchGifCategories = async () => {
  //   const res = await fetch("/categories.json");
  //   const { data } = await res.json();
  //   setCategories(data);
  // };

  const fetchGifCategories = async () => {
    const { data } = await gf.categories();
    setCategories(data);
  };

  console.log(categories);
  useEffect(() => {
    fetchGifCategories();
  }, []);

  return (
    <nav>
      <div className="relative flex gap-4 justify-between items-center mb-2">
        <Link to="/" className="flex gap-2">
          <img className="w-8" src="/logo.svg" alt="Giphy Logo" />
          <h1 className="text-5xl font-bold tracking-tight cursor-pointer">
            GIPHY
          </h1>
        </Link>

        <div className="font-bold text-md flex gap-1 items-center">
          {/* render categories */}

          {categories?.slice(0, 5).map((category) => {
            return (
              <Link
                className="px-4 py-1 transition ease-in-out hover:gradient border-b-4 hidden lg:block"
                key={category.name}
                to={`/${category.name_encoded}`}
              >
                {category.name}
              </Link>
            );
          })}

          <button onClick={() => setShowCategories(!showCategories)}>
            <BsThreeDotsVertical
              size={35}
              className={`py-0.5 hover:gradient 
            ${showCategories ? "gradient" : ""}
            border-b-4 hidden lg:block`}
            />
          </button>
          {favorites.length > 0 && (
            <div className="h-9 bg-gray-700 pt-1.5 px-6 cursor-pointer rounded">
              <Link to="/favorite">Favorite GIFS</Link>
            </div>
          )}

          {/* -- Mobile UI -- */}
          <button onClick={() => setShowCategories(!showCategories)}>
            <HiMiniBars3BottomRight
              className="text-sky-400 block lg:hidden"
              size={30}
            />
          </button>
          {/* -- Mobile UI -- */}

          {showCategories && (
            <div className="absolute right-0 top-20 px-10 pt-6 pb-9 w-full gradient z-20">
              <span className="text-3xl font-extrabold">Categories</span>
              <hr className="bg-gray-100 opacity-50 my-5" />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {categories?.map((category) => {
                  return (
                    <Link
                      onClick={() => setShowCategories(false)}
                      className="transition ease-in-out font-bold"
                      key={category.name}
                      to={`/${category.name_encoded}`}
                    >
                      {category.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* search */}
      <GifSearch filter={filter} setFilter={setFilter} />
    </nav>
  );
};

export default Header;
