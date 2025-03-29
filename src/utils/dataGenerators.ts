interface DataPoint {
  label: string;
  value: number;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
}

// Keywords and their associated data patterns
const dataPatterns = {
  sales: ['Revenue', 'Units Sold', 'Profit Margin'],
  revenue: ['Q1', 'Q2', 'Q3', 'Q4'],
  users: ['New Users', 'Active Users', 'Churn Rate'],
  growth: ['Month-over-Month', 'Year-over-Year', 'Weekly'],
  products: ['Electronics', 'Clothing', 'Food', 'Books'],
  performance: ['Speed', 'Reliability', 'Satisfaction'],
  comparison: ['Current Period', 'Previous Period', 'Target'],
};

// Generate suggestions based on input
export function generateDynamicSuggestions(input: string): string[] {
  const lowercaseInput = input.toLowerCase();
  const suggestions: string[] = [];

  // Base suggestions that can be modified based on input
  const baseQueries = [
    { prefix: 'Show', subject: ['sales data', 'user growth', 'revenue trends', 'product performance'] },
    { prefix: 'Compare', subject: ['monthly sales', 'quarterly revenue', 'year-over-year growth'] },
    { prefix: 'Analyze', subject: ['customer behavior', 'market trends', 'performance metrics'] },
    { prefix: 'Display', subject: ['top products', 'user engagement', 'sales forecast'] },
  ];

  // Generate contextual suggestions based on input
  baseQueries.forEach(({ prefix, subject }) => {
    subject.forEach(s => {
      if (s.toLowerCase().includes(lowercaseInput) || prefix.toLowerCase().includes(lowercaseInput)) {
        suggestions.push(`${prefix} ${s}`);
      }
    });
  });

  // Add time-based suggestions if input contains temporal keywords
  if (lowercaseInput.includes('last') || lowercaseInput.includes('next') || 
      lowercaseInput.includes('previous') || lowercaseInput.includes('current')) {
    suggestions.push(
      'Show data for last quarter',
      'Compare current month with previous month',
      'Display year-to-date performance'
    );
  }

  // Add specific metric suggestions based on keywords
  Object.keys(dataPatterns).forEach(key => {
    if (lowercaseInput.includes(key)) {
      suggestions.push(
        `Analyze ${key} trends`,
        `Show ${key} breakdown`,
        `Compare ${key} metrics`
      );
    }
  });

  // Return unique suggestions that match the input
  return Array.from(new Set(suggestions))
    .filter(s => s.toLowerCase().includes(lowercaseInput))
    .slice(0, 5); // Limit to 5 suggestions
}

// Generate mock data based on the query
export function generateMockData(query: string): ChartData {
  const lowercaseQuery = query.toLowerCase();
  let labels: string[] = [];
  let data: number[] = [];
  let label = 'Data';

  // Determine the type of data to generate based on query keywords
  if (lowercaseQuery.includes('sales') || lowercaseQuery.includes('revenue')) {
    labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    data = labels.map(() => Math.floor(Math.random() * 100000) + 50000);
    label = 'Sales Revenue ($)';
  } else if (lowercaseQuery.includes('users') || lowercaseQuery.includes('growth')) {
    labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    data = labels.map((_, i) => Math.floor(Math.random() * 1000) + i * 100);
    label = 'User Growth';
  } else if (lowercaseQuery.includes('products')) {
    labels = ['Electronics', 'Clothing', 'Food', 'Books', 'Sports'];
    data = labels.map(() => Math.floor(Math.random() * 500) + 100);
    label = 'Product Performance';
  } else if (lowercaseQuery.includes('comparison')) {
    labels = ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024'];
    data = labels.map(() => Math.floor(Math.random() * 200) + 100);
    label = 'Quarterly Comparison';
  } else {
    // Default data if no specific pattern is matched
    labels = ['Category A', 'Category B', 'Category C', 'Category D'];
    data = labels.map(() => Math.floor(Math.random() * 100) + 50);
    label = 'General Metrics';
  }

  return {
    labels,
    datasets: [
      {
        label,
        data,
        backgroundColor: '#3b82f6',
      },
    ],
  };
}