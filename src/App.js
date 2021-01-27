import React, { useState, useEffect } from "react";
import Header from "./components/ui/Header";
import axios from "axios";
//components
import Pagination from "./components/ui/Pagination";
import CharacterGrid from "./components/characters/CharacterGrid";
import Search from "./components/ui/Search";
//style
import "./App.scss";

const App = () => {
  //items
  const [items, setItems] = useState([]);
  //loading
  const [isLoading, setIsLoading] = useState(true);
  //search
  const [query, setQuery] = useState("");
  // character by page
  const [charactersPerPage, setCharactersPerPage] = useState(1);
  // total
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfCharacters, setNumberOfCharacters] = useState(1);

  //console.log(query);
  //items
  useEffect(() => {
    const fecthItems = async () => {
      const result = await axios.get(
        `https://rickandmortyapi.com/api/character/?page=${currentPage}`
      );

      setItems(result.data.results);
      setCharactersPerPage(result.data.results.length);
      setNumberOfCharacters(result.data.info.count);
      setIsLoading(false);
    };

    fecthItems();
  }, [currentPage]);

  //items
  useEffect(() => {
    const fecthQuery = async () => {
      const result = await axios.get(
        `https://rickandmortyapi.com/api/character?name=${query}`
      );
      setItems(result.data.results);
      setCharactersPerPage(result.data.results.length);
      setNumberOfCharacters(result.data.info.count);
      setIsLoading(false);
    };

    fecthQuery();
  }, [query]);

  //click pagination
  const handleClick = (page) => setCurrentPage(page);

  return (
    <div className="container">
      <Header />
      <Search getQuery={(q) => setQuery(q)} />
      <CharacterGrid isLoading={isLoading} items={items} />
      <Pagination
        currentPage={currentPage}
        handleClick={handleClick}
        numberOfCharacters={numberOfCharacters}
        charactersPerPage={charactersPerPage}
      />
    </div>
  );
};

export default App;
