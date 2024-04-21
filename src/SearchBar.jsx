// SearchBar.js
import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = async (event) => {
    const query = event.target.value;
    setQuery(query);
    if (query.length > 0) {
      try {
        const response = await axios.get(`https://api.example.com/search?q=${query}`);
        setSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleClick = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
        className="search-input"
      />
      <ul className="suggestions-list">
        {suggestions.map((item, index) => (
          <li key={index} onClick={() => handleClick(item)}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;