import React, { FC, useState, useEffect } from 'react';
import { useForm, type SubmitHandler, type FieldValues } from 'react-hook-form';
import { Icon } from '../../UI/Icon';
import { useRootStore } from '../../../store';

interface IProps {
	city: string
	setCity: (value: string) => void
}

export const Form: FC<IProps> = ({ city, setCity }) => {
	const { loadCity } = useRootStore();
	const [cityNotFound, setCityNotFound] = useState(false);
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm({ defaultValues: { city } });

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setCity(data.city);
		loadCity()
			.catch(() => {
				setCityNotFound(true);
			});
	};
	const updateCity = (value: string) => {
		if (value) {
			setValue('city', value);
		}
	};

	useEffect(() => {
		updateCity(city)
	}, [city]);

	return <form
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
	</form>;
}
