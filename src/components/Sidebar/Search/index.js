import React, { useState, useContext } from "react";
import { AppContext } from "../../../context";

import './style.css';

const Search = () => {
    const [value, setValue] = useState('Москва');
    const { isOpen, toggleSearch } = useContext(AppContext);
    const className = isOpen ? 'search _open' : 'search';

    const onChange = (event) => setValue(event.target.value);
    const onSubmit = (event) => {
        event.preventDefault();

        // setValue("");
    };
    const onToggleSearch = () => {
        toggleSearch(!isOpen)
    };

    return (
        <aside className={className}>
            <button 
                className="btn_close btn search__btn" 
                type="button"
                onClick={onToggleSearch}
            />
            <form 
                className="serch__form" 
                onSubmit={onSubmit}
            >
                <input
                    placeholder="Введите название города"
                    type="text" 
                    className="input search__input"
                    value={value}
                    onChange={onChange}
                />
                <button type="submit" 
                    className="search__submit btn" >
                    Найти
                </button>
                <p className="search__error"></p>
            </form>
        </aside>
    );
};

export default Search;