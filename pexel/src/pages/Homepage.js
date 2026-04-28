import React, { useState, useEffect, useRef } from "react";
import Search from "../components/Search";
import axios from "axios";
import Picture from "../components/Picture";

const Homepage = () => {
  let [input, setInput] = useState("");
  let [data, setData] = useState([]);
  let [page, setPage] = useState(1);
  let [currentSearch, setCurrentSearch] = useState("");
  let [isLoading, setIsLoading] = useState(false); //
  const picturesRef = useRef(null);

  const auth = "DgPR2YXdyKxdjQdqMFcuhKWEmz8yLDFWS3QvpEDKezgqup7GVlqoWShi";
  const initialURL = "https://api.pexels.com/v1/curated?page=1&per_page=15";
  let searchURL = `https://api.pexels.com/v1/search?query=${input}&per_page=15&page=1`;

  const search = async (url) => {
    setPage(1);

    let result = await axios.get(url, {
      headers: { Authorization: auth },
    });
    setData(result.data.photos);
    setCurrentSearch(input);
  };

  const morePicture = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const neededCount = 15;
      let currentPage = page;
      let collectedPhotos = [];
      while (collectedPhotos.length < neededCount) {
        currentPage += 1;
        const stillNeeded = neededCount - collectedPhotos.length;

        let newURL;

        if (currentSearch === "") {
          newURL = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${stillNeeded}`;
        } else {
          newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=${stillNeeded}&page=${currentPage}`;
        }

        let result = await axios.get(newURL, {
          headers: { Authorization: auth },
        });
        const newPhotos = result.data.photos;
        if (!newPhotos || newPhotos.length === 0) break;

        // 過濾掉重複的圖片
        const filtered = newPhotos.filter(
          (newPhoto) =>
            !data.some((oldPhoto) => oldPhoto.id === newPhoto.id) &&
            !collectedPhotos.some((c) => c.id === newPhoto.id),
        );

        collectedPhotos = [...collectedPhotos, ...filtered];
      }

      setPage(currentPage);
      setData((prevData) => [...prevData, ...collectedPhotos]);
    } finally {
      setIsLoading(false); // 無論成功或失敗都解鎖
    }
  };

  useEffect(() => {
    search(initialURL);
  }, []); //一打開網頁執行函式

  return (
    <div style={{ minHeight: "100vh" }}>
      <Search
        search={() => {
          if (input.trim() === "") {
            search(initialURL); // 如果是空的，執行初始的精選照片網址
          } else {
            search(searchURL);
          }
        }}
        setInput={setInput}
      />
      <div className="pictures" ref={picturesRef}>
        {data &&
          data.map((d) => {
            return <Picture data={d} key={d.id} />;
          })}
      </div>
      <div className="morePicture">
        <button onClick={morePicture} disabled={isLoading}>
          {isLoading ? "載入中..." : "更多圖片"}
        </button>
      </div>
    </div>
  );
};

export default Homepage;
