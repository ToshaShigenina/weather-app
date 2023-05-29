import React from "react";
import { SidebarContext, SidebarContextProvider } from "./context";
import { Search } from '../Search';
import { ThemeSwitch } from "../Theme";

import './css/style.css'

const Sidebar = () => {
    const ctx = React.useContext(SidebarContext);

    const onToggleSearch = () => {
        if (ctx) {
            ctx.toggleSearch(true)
        }
    };

    return (
        <SidebarContextProvider>
            <section className="sidebar">
                <Search />
                <button type="button"
                    className="sidebar__btn btn"
                    onClick={ onToggleSearch } >
                    Поиск города
                </button>
                <ThemeSwitch className="sidebar__toggler" />
            </section>
        </SidebarContextProvider>
    );
};

export default Sidebar;