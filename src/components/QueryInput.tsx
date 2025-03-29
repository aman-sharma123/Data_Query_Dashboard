import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentQuery, setLoading, addQueryResult, setError } from '../redux/slices/querySlice';
import { RootState } from '../redux/store';
import { generateDynamicSuggestions, generateMockData } from '../utils/dataGenerators';

export default function QueryInput() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const darkMode = useSelector((state: RootState) => state.query.darkMode);

  // Update suggestions based on input
  useEffect(() => {
    if (inputValue.trim()) {
      setSuggestions(generateDynamicSuggestions(inputValue));
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    dispatch(setCurrentQuery(inputValue));
    dispatch(setLoading(true));
    dispatch(setError(null));

    // Simulate API call with dynamic data generation
    setTimeout(() => {
      const mockData = generateMockData(inputValue);
      dispatch(addQueryResult({
        id: Date.now().toString(),
        query: inputValue,
        timestamp: Date.now(),
        data: mockData,
      }));
      dispatch(setLoading(false));
    }, 1500);
  };

  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.querySelector<HTMLInputElement>('input[type="text"]')?.focus();
      }
      // Escape to clear input
      if (e.key === 'Escape') {
        setInputValue('');
        document.querySelector<HTMLInputElement>('input[type="text"]')?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Enter your query... (Ctrl+K)"
            className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
          >
            <Search size={20} />
          </button>
        </div>
        
        {showSuggestions && inputValue && suggestions.length > 0 && (
          <div className="absolute w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer dark:text-white"
                onClick={() => setInputValue(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}