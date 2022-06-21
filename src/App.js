import React, { useState, useEffect } from "react"

import Sidebar from './components/Sidebar/index';
import Forecast from './components/Forecast/index';

import { AppContext } from "./context";
import { setSearch } from './helpers/search';
import { getTheme, setTheme } from './helpers/theme';

function App() {
  const [isOpen, toggleSearch] = useState(false);
  const [theme, toggleTheme] = useState(getTheme());

  useEffect(() => {
    setSearch(isOpen)
  }, [isOpen]);
  useEffect(() => {
    setTheme(theme)
  }, [theme]);

  return (
    <AppContext.Provider
      value={{
        isOpen,
        toggleSearch,
        theme,
        toggleTheme,
      }}>
      <div className="wrapper">
        <Sidebar />
        <div className="content">
          <Forecast />
          <section className="section current"></section>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
