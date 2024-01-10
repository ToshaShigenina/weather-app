export const dateFormat = (timestamp: number): string => {
	if (!timestamp) return '';
	const tempDate = new Date(timestamp * 1000);
	const nowDate = new Date();
	if (tempDate.getUTCDate() === nowDate.getUTCDate() + 1) {
		return 'Завтра';
	}
	return new Intl.DateTimeFormat('ru', {
		weekday: "short",
		month: "short",
		day: "numeric"
	}).format(tempDate);
};
export const timeFormat = (timestamp: number): string => {
	if (!timestamp) return '00:00';
	return `${new Date(timestamp * 1000).getHours()}:00`;
};
export const getIcon = (icon: string, isSmall?: boolean): string => {
	return `http://openweathermap.org/img/wn/${icon}${isSmall ? '@2x' : '@4x'}.png`;
};
export const getWindDirection = (value: number): string => {
	const directions = ['С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ'];
	if (value >= 345 || value <= 15) return directions[0];
	if (value > 15 && value < 75) return directions[1];
	if (value >= 75 && value <= 105) return directions[2];
	if (value > 105 && value < 165) return directions[3];
	if (value >= 165 && value <= 195) return directions[4];
	if (value > 195 && value < 255) return directions[5];
	if (value >= 255 && value <= 285) return directions[6];
	return directions[7];
}