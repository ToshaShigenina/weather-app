import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/style/fonts.css';
import './assets/style/main.css';
import './assets/style/buttons.css';
import './assets/style/animation.css';
import { App } from './components/App';

const container = document.getElementById("root")!;

ReactDOM.createRoot(container)
  .render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );