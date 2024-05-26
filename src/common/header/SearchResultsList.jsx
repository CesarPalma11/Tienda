import React from 'react';
import './SearchResultsList.css';
import { SearchResult } from './SearchResult';

const SearchResultsList = ({ results, onResultClick }) => {
  return (
    <div className='results-list'>
      {results.map((result, id) => (
        <div key={id} className='result-item' onClick={() => onResultClick(result.name)}>
        <SearchResult result={result} key={id} />
        </div>
      ))}
    </div>
  );
};

export default SearchResultsList;