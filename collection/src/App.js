import React, { useEffect, useState } from "react";
import Collection from "./Collection";
import "./index.scss";

const categs = [
  { name: "Все" },
  { name: "Море" },
  { name: "Горы" },
  { name: "Архитектура" },
  { name: "Города" },
];

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [collections, setCollections] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const category = categoryId ? `category=${categoryId}` : "";
    fetch(
      `https://630cf8f953a833c534399e7e.mockapi.io/api/db/photo_collections?page=${page}&limit=3&${category}`
    )
      .then((res) => res.json())
      .then((json) => setCollections(json))
      .catch((err) => {
        console.error(err);
        alert("Ошибка при получении данных");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [categoryId, page]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {categs.map((obj, i) => (
            <li
              onClick={() => setCategoryId(i)}
              className={categoryId === i ? "active" : ""}
              key={obj.name}
            >
              {obj.name}
            </li>
          ))}
        </ul>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Загрузка коллекций...</h2>
        ) : (
          collections
            .filter((obj) =>
              obj.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((obj, index) => (
              <Collection key={index} name={obj.name} images={obj.photos} />
            ))
        )}
      </div>
      <ul className="pagination">
        {[...Array(3)].map((_, i) => (
          <li
            onClick={() => setPage(i + 1)}
            className={page === i + 1 ? "active" : ""}
            key={i}
          >
            {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;