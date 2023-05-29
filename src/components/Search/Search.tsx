import React from 'react';
import cn from 'classnames';
import { useForm, type SubmitHandler, type FieldValues } from 'react-hook-form';
import { SidebarContext } from '../Sidebar';

import './css/style.css';

const Search: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className }) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ defaultValues: { city: 'Москва' } });
    const ctx = React.useContext(SidebarContext);
    const isOpen = ctx?.isOpenSearch;

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
    };
    const onCloseSearch = () => {
        if (ctx) {
            ctx.toggleSearch(false);
        }
    };

    return (
        <aside className={ cn(className, 'search', isOpen && '_open') }>
            <button
                className="btn-close btn search__btn"
                type="button"
                onClick={ onCloseSearch }
            />
            <form
                className="serch__form"
                onSubmit={ handleSubmit(onSubmit) }
            >
                <input
                    placeholder="Введите название города"
                    type="text"
                    className="input search__input"
                    { ...register('city', {
                        required: true,
                        maxLength: 255
                    }) }
                />
                <button type="submit"
                    className="search__submit btn" >
                    Найти
                </button>
                <p className="search__error"></p>
                {
                    errors.city && errors.city.type === "required"
                    && <p className="search__error">Введите город</p>
                }
                {
                    errors.city && errors.city.type === "maxLength"
                    && <p className="search__error">Слишком длинное название города</p>
                }
            </form>
        </aside>
    );
};

export default Search;