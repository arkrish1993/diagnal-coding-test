/* eslint-disable @next/next/no-img-element */

import React, { useState } from "react";
import { getImgURL, scrollToTop } from "../common/utils";
import { FaXmark } from "react-icons/fa6";

/**
 * Header component that displays the app title and a toggleable search input.
 *
 * Props:
 * @param {string} title - The title text to display.
 * @param {string} searchKey - The current value of the search input.
 * @param {boolean} visible - Whether the "scroll to top" button is visible (used to determine scroll behavior).
 * @param {React.Dispatch<React.SetStateAction<string>>} setSearch - Setter for updating the search input.
 */
const Header: React.FC<{
  title: string;
  searchKey: string;
  visible: boolean;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}> = ({ title, searchKey, visible, setSearch }) => {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <header className="flex justify-between items-center">
      <img src={getImgURL("Back.png")} className="w-6 h-6" alt="back" />
      {!showSearch && <h1 className="text-xl font-semibold">{title}</h1>}
      {showSearch && (
        <input
          className="w-full p-2 mx-4 rounded bg-white text-black placeholder:text-gray-500"
          placeholder="Search..."
          value={searchKey}
          onChange={(e) => {
            if (visible) {
              scrollToTop();
            }
            setSearch(e.target.value);
          }}
        />
      )}
      ;
      <button>
        {!showSearch && (
          <img
            src={getImgURL("search.png")}
            className="w-6 h-6"
            alt="Search"
            onClick={() => setShowSearch(!showSearch)}
          />
        )}
        {showSearch && (
          <FaXmark
            className="w-6 h-6"
            onClick={() => {
              setShowSearch(!showSearch);
              setSearch("");
            }}
          />
        )}
      </button>
    </header>
  );
};

export default Header;
