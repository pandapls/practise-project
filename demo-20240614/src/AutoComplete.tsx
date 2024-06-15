import React, { useState } from 'react';
import './autoComplete.css';

interface AutoCompleteProps {
  suggestions: string[];
}

export const AutoComplete: React.FC<AutoCompleteProps> = ({ suggestions }) => {

  const [input, setInput] = useState<string>('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = e;
    setInput(value);
    const filtered = suggestions.filter(
      (suggestion) => suggestion.toLowerCase().indexOf(value.toLowerCase()) > -1
    );

    setInput(value);
    setFilteredSuggestions(filtered);
    setActiveSuggestionIndex(0);
    setShowSuggestions(true);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setInput(filteredSuggestions[activeSuggestionIndex])
      setFilteredSuggestions([]);
    } else if (e.key === 'ArrowUp') {
      if (activeSuggestionIndex === 0) {
        return;
      }
      setActiveSuggestionIndex(activeSuggestionIndex - 1);
    } else if (e.key === 'ArrowDown') {
      if (activeSuggestionIndex + 1 === filteredSuggestions.length) {
        return;
      }
      setActiveSuggestionIndex(activeSuggestionIndex + 1);
    }
  }
  const handleClick = (suggestion: string) => {
    setInput(suggestion);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  };
  return <div className='autoComplete'>
    <input type="text"
      value={input}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onFocus={() => setShowSuggestions(true)}
      onBlur={() => setShowSuggestions(false)}
    />
    {showSuggestions && (
      <ul className="suggestions">
        {filteredSuggestions.map((suggestion, index) => (
          <li
            key={index}
            className={index === activeSuggestionIndex ? 'active' : ''}
            onMouseDown={() => handleClick(suggestion)}
          >
            {suggestion}
          </li>
        ))}
      </ul>
    )}
  </div>;
};