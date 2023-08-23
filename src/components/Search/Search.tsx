import React, { useState } from 'react';
import cn from 'classnames';
import { useForm, type SubmitHandler, type FieldValues } from 'react-hook-form';
import { SidebarContext } from '../Sidebar';
import { History } from '../History';
import { Icon } from '../Icon';

import './css/style.css';

const Search: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    className,
    children,
    ...otherProps
}) => {
    const [cityNotFound, setCityNotFound] = useState(false);
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
        <aside { ...otherProps } className={ cn(className, 'search', isOpen && '_open') }>
            <button
                className="btn-close btn search__btn"
                type="button"
                onClick={ onCloseSearch }
            />
            <form
                className="serch__form"
                onSubmit={ handleSubmit(onSubmit) }
            >
                <div className="search__group">
                    <Icon type="search" />
                    <input
                        placeholder="Введите название города"
                        type="text"
                        className="input search__input"
                        { ...register('city', {
                            required: true,
                            maxLength: 255
                        }) }
                    />
                </div>
                <button type="submit" className="search__submit btn">
                    Найти
                </button>
                {
                    errors.city && errors.city.type === "required"
                    && <p className="search__error">Введите город</p>
                }
                {
                    errors.city && errors.city.type === "maxLength"
                    && <p className="search__error">Слишком длинное название города</p>
                }
                {
                    cityNotFound
                    && <p className="search__error">Упс! Город не найден, попробуйте другой</p>
                }
            </form>
            <History />
            { children }
        </aside>
    );
};

export default Search;