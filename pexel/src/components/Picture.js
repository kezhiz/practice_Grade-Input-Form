import React from "react";

const Picture = ({ data }) => {
  return (
    <div className="picture">
      {/* 作者標籤 */}
      <span className="photo-card__author">{data.photographer}</span>
      <a target="_blank" href={data.src.large} rel="noreferrer">
        <div className="imageContainer">
          <img src={data.src.large} alt="" />
        </div>
      </a>
    </div>
  );
};

export default Picture;
