import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchResult.css';

export const SearchResult = ({ result }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${result.id}`);
  };

  return (
    <div className='search-result' onClick={handleClick}>
      <i className='fas fa-search search-icon'></i>
      <span>{result.name}</span>
    </div>
  );
};