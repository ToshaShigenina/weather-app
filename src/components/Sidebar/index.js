import React, { useContext } from "react";
// import { SwitchTransition } from "react-transition-group";
import { AppContext } from "../../context";

import Search from './Search/index';
import Theme from './Theme/index';

import './style.css'

const Sidebar = () => {
    const { isOpen, toggleSearch } = useContext(AppContext);

    const onToggleSearch = () => {
        toggleSearch(!isOpen)
    };

    return (
        <section className="sidebar">
            <Search />
            <button type="button"
                className="sidebar__btn btn"
                onClick={onToggleSearch} >
                Поиск города
            </button>
            <Theme className="sidebar__toggler" />
            
        </section>
    );
};

export default Sidebar;