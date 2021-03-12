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
  //numbers of characters
  const [numberOfCharacters, setNumberOfCharacters] = useState(1);
  //numbers of pages
  const [numberOfPages, setNumberOfPages] = useState(1);

  //items
  useEffect(() => {
    if (query !== "") {
      axios
        .get(`https://rickandmortyapi.com/api/character?name=${query}`)
        .then(function (response) {
          const { data } = response;
          setItems(data.results);
          setCharactersPerPage(data.results.length);
          setNumberOfCharacters(data.info.count);
          setNumberOfPages(data.info.pages);
          setIsLoading(false);
        });
    } else {
      axios
        .get(`https://rickandmortyapi.com/api/character/?page=${currentPage}`)
        .then(function (response) {
          const { data } = response;
          setItems(data.results);
          setCharactersPerPage(data.results.length);
          setNumberOfPages(data.info.pages);
          setNumberOfCharacters(data.info.count);
          setIsLoading(false);
        });
    }
  }, [currentPage, query]);

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
        numberOfPages={numberOfPages}
        charactersPerPage={charactersPerPage}
      />
    </div>
  );
};

export default App;
