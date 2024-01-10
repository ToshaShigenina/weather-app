import React, { FC, ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import { Form } from './components/Form'
import { History } from '../History';
import { useRootStore } from '../../store';
import './style.css';

interface Props {
    className?: string
    children?: ReactNode
    isOpen?: boolean
    closeSearch?: (value: boolean) => void
}

export const Search: FC<Props> = observer(({
    isOpen = false,
    className,
    closeSearch
}) => {
    const { location } = useRootStore();

    const setCity = (value: string) => location.setCity(value);
    const onCloseSearch = () => closeSearch && closeSearch(false);

    return (
        <aside className={ cn(className, 'search', isOpen && '_open') }>
            <button
                className="btn-close btn search__btn"
                type="button"
                onClick={ onCloseSearch }
            />
            <Form city={ location.getCity() } setCity={ setCity } />
            <History value={ location.getCity() } setValue={ setCity } />
        </aside>
    );
});
