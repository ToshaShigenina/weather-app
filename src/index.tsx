import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/style/fonts.css';
import './assets/style/main.css';
import './assets/style/buttons.css';
import { Icon } from "./components/UI/Icon";
import { App } from './components/App';

const container = document.getElementById("root")!;

ReactDOM.createRoot(container)
  .render(
    <React.StrictMode>
      <Icon.Sprite />
      <App />
    </React.StrictMode>
  );