import React, { useState, useEffect } from "react";
import Header from "./components/ui/Header";
import axios from "axios";
import CharacterGrid from "./components/characters/CharacterGrid";
import Search from "./components/ui/Search";
import "./App.css";

const App = () => {
  //items
  const [items, setItems] = useState([]);
  //loading
  const [isLoading, setIsLoading] = useState(true);
  //search
  const [query, setQuery] = useState("");
  // current page
  const [currentPage, setCurrentPage] = useState(1);
  // character by page
  const [charactersPerPage, setCharactersPerPage] = useState(1);
  // total
  const [totalCharacters, setTotalCharacters] = useState(1);

  //items from API
  useEffect(() => {
    const fecthItems = async () => {
      const result = query
        ? await axios.get(
            `https://rickandmortyapi.com/api/character?name=${query}`
          )
        : await axios.get(
            `https://rickandmortyapi.com/api/character/?page=${currentPage}`
          );

      setItems(result.data.results);
      setCharactersPerPage(result.data.results.length);
      setTotalCharacters(result.data.info.count);
      setIsLoading(false);
    };

    fecthItems();
  }, [query, currentPage]);

  //console.log(items);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <Header />
      <Search getQuery={(q) => setQuery(q)} />
      <CharacterGrid isLoading={isLoading} items={items} />
    </div>
  );
};

export default App;
