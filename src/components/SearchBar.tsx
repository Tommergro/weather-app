import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface SearchBarProps {
  onLocationSelect: (location: string) => void;
}

interface City {
  name: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onLocationSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Debounce input changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim() === '') {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await axios.get(
          'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
          {
            headers: {
              'X-RapidAPI-Key':
                'ec8cdb8792msh72fde2e6aad7627p130ff9jsn3e2bd1e6c7ee',
              'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
            },
            params: {
              namePrefix: query,
              limit: 10,
            },
          }
        );
        const results = response.data.data.map((city: City) => city.name);
        setSuggestions(results);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimeout = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setSuggestions([]); // Clear suggestions after selection
    onLocationSelect(suggestion);
  };

  return (
    <div style={{ position: 'relative', width: '300px' }}>
      <input
        type="text"
        placeholder="Enter location..."
        value={query}
        onChange={handleInputChange}
        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
      />
      {isLoading && <div>Loading...</div>}
      {suggestions.length > 0 && (
        <ul
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'white',
            border: '1px solid #ccc',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            zIndex: 1000,
          }}
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{ padding: '8px', cursor: 'pointer' }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
