import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Clock, ArrowRight } from 'lucide-react';
import { RootState } from '../redux/store';
import { setCurrentQuery, setLoading, addQueryResult } from '../redux/slices/querySlice';

export default function QueryHistory() {
  const dispatch = useDispatch();
  const { history } = useSelector((state: RootState) => state.query);
  const darkMode = useSelector((state: RootState) => state.query.darkMode);

  const handleRerunQuery = (query: string) => {
    dispatch(setCurrentQuery(query));
    dispatch(setLoading(true));

    // Simulate API call
    setTimeout(() => {
      dispatch(addQueryResult({
        id: Date.now().toString(),
        query,
        timestamp: Date.now(),
        data: history[0].data, // Reuse the same data for simulation
      }));
      dispatch(setLoading(false));
    }, 1500);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 dark:text-white">
        <Clock size={20} />
        Query History
      </h2>
      <div className="space-y-3">
        {history.map((item) => (
          <div
            key={item.id}
            className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer group"
            onClick={() => handleRerunQuery(item.query)}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-300">{item.query}</p>
              <ArrowRight
                size={16}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500"
              />
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              {new Date(item.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
        {history.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">No queries yet</p>
        )}
      </div>
    </div>
  );
}