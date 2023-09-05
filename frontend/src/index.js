import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { FoodsContextProvider } from './context/FoodContext';
import { AuthContextProvider } from './context/AuthContext';

//Food Context Provider wraps App component which is the root component 
//meaning all of the components inside this react application can access this context value
// To consume this context we have the useWorkoutContext.js hook
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <FoodsContextProvider>
        <App />
      </FoodsContextProvider>
      </AuthContextProvider>
  </React.StrictMode>
);

