import { API_BASE } from "./constants";
import { ContentItem } from "./interfaces";

/**
 * Constructs the URL for a specific page JSON file based on the page number.
 * @param {number} page - The page number to retrieve.
 * @returns {string} - The full URL to the JSON file for the given page.
 */
export const getPageURL = (page: number) => `${API_BASE}/data/page${page}.json`;

/**
 * Constructs the full URL for an image asset given its filename.
 * @param {string} imgName - The image filename.
 * @returns {string} - The full image URL.
 */
export const getImgURL = (imgName: string) => `${API_BASE}/images/${imgName}`;

/**
 * Calculates the total number of pages based on the total item count
 * and the number of items per page.
 * @param {string} totalItemCount - Total number of content items (as a string).
 * @param {string} itemCountPerPage - Number of items per page (as a string).
 * @returns {number} - Total number of pages.
 */
export const getTotalPageCount = (
  totalItemCount: string,
  itemCountPerPage: string
) => {
  return Math.ceil(parseInt(totalItemCount) / parseInt(itemCountPerPage));
};

/**
 * Filters content items based on a search key match in the item's name.
 * Case-insensitive.
 * @param {ContentItem[]} content - Array of content items.
 * @param {string} searchKey - Search keyword to filter by.
 * @returns {ContentItem[]} - Filtered array of content items.
 */
export const getFilteredItems = (content: ContentItem[], searchKey: string) =>
  content.filter((c) => c.name.toLowerCase().includes(searchKey.toLowerCase()));

/**
 * Smoothly scrolls the window to the top of the document.
 */
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

/**
 * Calculates the next focusable index based on keyboard arrow key input.
 * Useful for grid navigation.
 * @param {string} keyStroke - The key pressed (e.g. "ArrowRight", "ArrowLeft").
 * @param {number} currentIndex - The current index in the focusable items array.
 * @param {number} columnCount - Number of columns in the grid layout.
 * @returns {number} - The next index to focus.
 */
export const getNextIndex = (
  keyStroke: string,
  currentIndex: number,
  columnCount: number
) => {
  let nextIndex = currentIndex;
  switch (keyStroke) {
    case "ArrowRight":
      nextIndex = currentIndex + 1;
      break;
    case "ArrowLeft":
      nextIndex = currentIndex - 1;
      break;
    case "ArrowDown":
      nextIndex = currentIndex + columnCount;
      break;
    case "ArrowUp":
      nextIndex = currentIndex - columnCount;
      break;
  }
  return nextIndex;
};
