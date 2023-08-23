import React from "react";
import { SidebarContext } from "./context";
import { Search } from '../Search';
import { ThemeSwitcher } from "../Theme";

import './css/style.css'

const Sidebar = () => {
    const ctx = React.useContext(SidebarContext);

    const onOpenSearch = () => {
        if (ctx) {
            ctx.toggleSearch(true)
        }
    };

    return (
        <section className="sidebar">
            <Search />
            <button type="button"
                className="sidebar__btn btn"
                onClick={ onOpenSearch } >
                Поиск города
            </button>
            <ThemeSwitcher className="sidebar__toggler" />
        </section>
    );
};

export default Sidebar;