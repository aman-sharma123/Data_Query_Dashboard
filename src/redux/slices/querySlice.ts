import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QueryResult {
  id: string;
  query: string;
  timestamp: number;
  data: any;
}

interface QueryState {
  history: QueryResult[];
  currentQuery: string;
  isLoading: boolean;
  error: string | null;
  results: QueryResult | null;
  darkMode: boolean;
}

// Load initial state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('queryState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const initialState: QueryState = {
  history: [],
  currentQuery: '',
  isLoading: false,
  error: null,
  results: null,
  darkMode: false,
  ...loadState(),
};

const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setCurrentQuery: (state, action: PayloadAction<string>) => {
      state.currentQuery = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    addQueryResult: (state, action: PayloadAction<QueryResult>) => {
      state.results = action.payload;
      state.history.unshift(action.payload);
      // Save to localStorage
      localStorage.setItem('queryState', JSON.stringify(state));
    },
    clearError: (state) => {
      state.error = null;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('queryState', JSON.stringify(state));
    },
  },
});

export const {
  setCurrentQuery,
  setLoading,
  setError,
  addQueryResult,
  clearError,
  toggleDarkMode,
} = querySlice.actions;

export default querySlice.reducer;