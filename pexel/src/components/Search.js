import React, { useState } from "react";

const Search = ({ search, setInput }) => {
  const inputHandler = (e) => {
    setInput(e.target.value); // 使用者打字時更新 state
  };
  return (
    <div className="search">
      <input className="input" onChange={inputHandler} type="text" />
      <button className="button" onClick={search}>
        Search
      </button>
    </div>
  );
};

export default Search;
