import React, { useState, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchBarProps {
  onSearch: (query: string) => void;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, className = "" }) => {
  const [query, setQuery] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`w-full max-w-md mx-auto ${className}`}
    >
      <form 
        onSubmit={handleSubmit} 
        className={`relative flex items-center transition-all duration-300 ${
          isFocused 
            ? 'bg-white shadow-lg' 
            : 'bg-white/80 shadow'
        } rounded-full overflow-hidden`}
      >
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search for a city..."
          className="w-full py-3 px-5 pl-12 bg-transparent outline-none text-gray-700"
          aria-label="Search for a location"
        />
        
        <div className="absolute left-3 flex items-center justify-center text-gray-500">
          <Search size={20} />
        </div>
        
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-14 p-1 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
        
        <button
          type="submit"
          className={`py-3 px-5 text-white transition-colors ${
            query ? 'bg-primary-600 hover:bg-primary-700' : 'bg-gray-400'
          }`}
          disabled={!query}
          aria-label="Search"
        >
          Search
        </button>
      </form>
    </motion.div>
  );
};