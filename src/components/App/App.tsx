import React from "react";
import { ThemeContextProvider } from "../Theme";
import { SidebarContextProvider } from "../Sidebar";
import { Page } from '../Page';
import { Icon } from '../Icon';

const App: React.FC = () => {
  return (
    <ThemeContextProvider>
      <Icon.Sprite />
      <SidebarContextProvider>
        <Page />
      </SidebarContextProvider>
    </ThemeContextProvider>
  );
};

export default App;
