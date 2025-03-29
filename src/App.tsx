import React, { useEffect } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { Moon, Sun } from 'lucide-react';
import { store } from './redux/store';
import { toggleDarkMode } from './redux/slices/querySlice';
import { RootState } from './redux/store';
import QueryInput from './components/QueryInput';
import QueryHistory from './components/QueryHistory';
import ResultsDisplay from './components/ResultsDisplay';

function DarkModeToggle() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.query.darkMode);

  return (
    <button
      onClick={() => dispatch(toggleDarkMode())}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <Sun className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      ) : (
        <Moon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      )}
    </button>
  );
}

function AppContent() {
  const darkMode = useSelector((state: RootState) => state.query.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''} bg-gray-100 dark:bg-gray-900`}>
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Data Query Dashboard</h1>
            <DarkModeToggle />
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center mb-8">
          <QueryInput />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <QueryHistory />
          </div>
          <div className="lg:col-span-3">
            <ResultsDisplay />
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;