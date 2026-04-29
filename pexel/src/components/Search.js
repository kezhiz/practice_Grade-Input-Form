import React, { useState } from "react";

const Search = ({ search, setInput }) => {
  const inputHandler = (e) => {
    setInput(e.target.value); // 使用者打字時更新 state
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search(); // 如果按下的鍵是 Enter，就執行搜尋
    }
  };

  return (
    <div className="search">
      <input
        className="input"
        onChange={inputHandler}
        onKeyDown={handleKeyDown}
        type="text"
      />
      <button className="button" onClick={search}>
        Search
      </button>
    </div>
  );
};

export default Search;
