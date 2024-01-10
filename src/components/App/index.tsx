import React, { FC } from "react";
import { Sidebar } from "../Sidebar";
import { TabsWeather } from "../TabsWeather";
import { DetailsWeather } from "../DetailsWeather";
import { Page } from "../UI/Page";
import { ThemeContextProvider } from "../UI/Theme";
import { RootStoreProvider } from '../../store';

export const App: FC = () => {
  return (
    <RootStoreProvider>
      <ThemeContextProvider>
        <Page sidebar={ <Sidebar /> }>
          <TabsWeather />
          <DetailsWeather />
        </Page>
      </ThemeContextProvider>
    </RootStoreProvider>
  );
};
