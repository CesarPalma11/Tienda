import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Data from '../../components/Data';
import SearchResultsList from "./SearchResultsList";
import Login from '../login/login'

const Search = ({ CartItem }) => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showLogin, setShowLogin] = useState(false); // Estado para mostrar/ocultar el login modal
  const searchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const search = document.querySelector(".search");
      if (search) {
        search.classList.toggle("active", window.scrollY > 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fetchData = (value) => {
    const filteredResults = Data.productItems.filter((item) => {
      return value && item && item.name && item.name.toLowerCase().includes(value.toLowerCase());
    });
    setResults(filteredResults);
    setShowResults(true);
  };

  const handleChange = (value) => {
    setInput(value);
    if (value) {
      fetchData(value);
    } else {
      setResults([]);
      setShowResults(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchData(input);
    }
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowResults(false);
    }
  };

  const handleResultClick = (name) => {
    setInput(name); // Autocompletar el campo de búsqueda
    setShowResults(false); // Ocultar resultados de búsqueda
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
    <section className='search' ref={searchRef}>
    <div className='container-search c_flex'>
      <div className='logo width'>
        <a href="/">LOGO</a> 
      </div>
      <div className='search-box f_flex'>
        <div className="input-wrapper">
          <input
            type='text'
            placeholder='Buscar...'
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button class="btn-search" type="submit"><i className='fa fa-search'></i></button>
       
      </div>
      
      <div className='icon f_flex width'>
      <i className='fa fa-user position-icon' style={{cursor:'pointer'}} onClick={() => setShowLogin(true)}></i>
        <div className='cart'>
          <Link to='/cart'>
            <i className='fa fa-shopping-cart icon-circle carrito'></i>
            <span>{CartItem.length === 0 ? "0" : CartItem.length}</span>
          </Link>
        </div>
      </div>
    </div>
    {showResults && <SearchResultsList results={results} onResultClick={handleResultClick} />}
    {showLogin && <Login onClose={() => setShowLogin(false)} />} {/* Muestra el modal de login */}
  </section>
  </>
  );
};

export default Search;