import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import Picture from "../components/Picture";

const Homepage = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [currentSeacrch, setCurrentSearch] = useState("");

  // 圖片網pexels金鑰和URL
  const auth = "563492ad6f91700001000001c32fb7c11ef640a4a51b5ceaa40f3123";
  const initialURL = "https://api.pexels.com/v1/curated?page=1&per_page=15";
  const searchURL = `https://api.pexels.com/v1/search?query=${currentSeacrch}&per_page=15&page=1`;

  // fetch data when loads up
  // useEffect(() => {
  //   search(initialURL);
  // }, []);

  // detect if the URL's search is empty or not
  useEffect(() => {
    if (currentSeacrch === "") {
      search(initialURL);
    } else {
      search(searchURL);
    }
  }, [currentSeacrch]);

  // fetch data from pexels api
  // 裡面的url就看你放甚麼網址而決定render甚麼圖片
  const search = async (url) => {
    setPage(2); // 為了讓我們search新關鍵字時，page的state不會被之前load more過的所影響到
    const dataFetch = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth, // 這裡面是填你的金鑰密碼
      },
    });
    let parsedData = await dataFetch.json(); // 記得改成json才能得到資料
    setData(parsedData.photos);
  };

  // load more pictures
  const morePicture = async () => {
    let newURL;
    if (currentSeacrch === "") {
      newURL = `https://api.pexels.com/v1/curated?page=${page}&per_page=15`;
    } else {
      newURL = `https://api.pexels.com/v1/search?query=${currentSeacrch}&per_page=15&page=${page}`;
    }
    setPage(page + 1);

    // fetch data again
    const dataFetch = await fetch(newURL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth, // 這裡面是填你的金鑰密碼
      },
    });
    let parsedData = await dataFetch.json(); // 記得改成json才能得到資料
    setData(data.concat(parsedData.photos)); // 因為load更多照片了，所以陣列變多，map出來的東西也變多
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <Search
        search={() => {
          // JS Closure
          setCurrentSearch(input);
        }}
        setInput={setInput}
      />
      <div className="pictures">
        {data &&
          data.map((d) => {
            return <Picture data={d} key={d.id} />;
          })}
      </div>

      <div className="morePicture">
        <button onClick={morePicture}>Load More</button>
      </div>
    </div>
  );
};

export default Homepage;
