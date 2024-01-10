import React, { useEffect, useState } from "react";
import { ThemeSwitcher } from "../UI/Theme";
import { Search } from "../Search";
import { CurrentWeather } from "../CurrentWeather";
import { useResize } from "../../hooks";
import './style.css'

export const Sidebar = () => {
    const { width } = useResize();
    const [isOpen, setIsOpen] = useState(false);
    const openSearch = () => setIsOpen(true);

    useEffect(() => {
        if (width < 768) {
            if (isOpen) {
                document.body.classList.add('_overflow');
            } else {
                document.body.classList.remove('_overflow');
            }
        }
    }, [isOpen]);
    return (
        <section className="sidebar">
            <Search isOpen={ isOpen } closeSearch={ setIsOpen } />
            <button type="button"
                className="sidebar__btn btn"
                onClick={ openSearch } >
                Поиск города
            </button>
            <ThemeSwitcher className="sidebar__toggler" />
            <CurrentWeather />
        </section>
    );
};
