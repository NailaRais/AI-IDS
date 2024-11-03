import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'; // Add your own CSS file if needed

const container = document.getElementById('root');
const root = createRoot(container); // Create a root.
root.render(<App />); // Render your app
