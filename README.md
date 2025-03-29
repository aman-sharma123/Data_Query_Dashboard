# AI Query Interaction System

## 🚀 Project Overview
This project is an **AI-powered Query Interaction System** that allows users to input queries and get simulated AI responses in the form of dynamic graphs. It includes features such as **query history, dynamic data generation, real-time suggestions, and an intelligent loading system.**

## 🔥 Features
- **AI-like Query Suggestions**: Provides real-time suggestions based on user input.
- **Dynamic Data Simulation**: Generates different mock data based on the type of query.
- **Query History Management**: Saves and allows rerunning previous queries.
- **Enhanced AI Loading Experience**: Simulates AI thinking before displaying results.
- **Dark Mode Support**: Automatically adapts to the user's theme preference.

## 🎯 How It Works
1. **User Inputs a Query**
   - The system suggests relevant AI-like queries.
   - User selects a suggestion or types a custom query.
2. **Processing the Query**
   - The system simulates AI thinking with progressive loading stages.
   - Data is dynamically generated based on query content.
3. **Displaying Results**
   - A dynamic **bar chart** visualizes the AI-generated insights.
   - Query history is updated for easy access.
4. **Rerunning Queries**
   - Users can click on past queries to regenerate results instantly.

## 🛠️ Tech Stack
- **Frontend**: React, TypeScript, Redux, Chart.js
- **State Management**: Redux Toolkit
- **UI Components**: Tailwind CSS, Lucide React Icons

## 📂 Project Structure
```
📦 ai-query-system
 ┣ 📂 src
 ┃ ┣ 📂 components
 ┃ ┃ ┣ 📜 QueryInput.tsx  # Handles AI-like input suggestions
 ┃ ┃ ┣ 📜 QueryHistory.tsx  # Displays and reruns query history
 ┃ ┃ ┣ 📜 ResultsDisplay.tsx  # Shows AI-generated results as a chart
 ┃ ┣ 📂 redux
 ┃ ┃ ┣ 📜 store.ts  # Configures Redux store
 ┃ ┃ ┣ 📜 querySlice.ts  # Manages query state and AI simulation logic
 ┃ ┣ 📂 styles
 ┃ ┃ ┣ 📜 tailwind.css  # Custom styles
 ┃ ┣ 📜 App.tsx  # Main application file
 ┃ ┣ 📜 index.tsx  # Entry point
 ┗ 📜 package.json  # Dependencies and scripts
```

## 🚀 Installation & Setup
```bash
# Clone the repository
git clone https://github.com/your-username/ai-query-system.git

# Navigate into the project folder
cd ai-query-system

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 🛠️ Deployment
```bash
# Build the project for production
npm run build

# Deploy to GitHub Pages (if configured)
npm run deploy
```

## 💡 Future Improvements
- Integrate **real AI API** (e.g., OpenAI, Google AI) for real query processing.
- Add **more chart types** (line graphs, pie charts, etc.).
- Implement **user authentication** for personalized query history.

## 📝 License
This project is open-source and available under the **MIT License**.

---
### 🎯 Developed as part of an AI Query Interaction Assignment 🚀
