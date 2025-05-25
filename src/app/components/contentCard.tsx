/* eslint-disable @next/next/no-img-element */

import React, { useState } from "react";
import { getImgURL } from "../common/utils";
import { ContentItem } from "../common/interfaces";
import { POSTER_FALLBACK } from "../common/constants";

/**
 * A single content card component.
 * - Displays a poster image and name for a content item.
 * - Provides keyboard accessibility and hover effects.
 * - Uses a fallback image if the main image fails to load.
 *
 * Props:
 * @param {ContentItem} props.cardItem - The content item to display
 */
const ContentCard: React.FC<{
  cardItem: ContentItem;
}> = ({ cardItem }) => {
  const [imgSrc, setImgSrc] = useState(getImgURL(cardItem["poster-image"]));
  const setFallBackImg = () => setImgSrc(getImgURL(POSTER_FALLBACK));
  return (
    <div
      className="w-full aspect-[2/3] transform transition-transform hover:scale-105 focus:scale-105 outline-none"
      tabIndex={0}
    >
      <div className="rounded bg-gray-800">
        <img
          className="w-full h-full object-cover"
          src={imgSrc}
          alt={cardItem.name}
          onError={setFallBackImg}
        />
      </div>
      <div className="mt-2 text-sm text-center truncate">{cardItem.name}</div>
    </div>
  );
};

export default ContentCard;
