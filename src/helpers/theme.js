export const setTheme = theme => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
        document.body.classList.add('theme-dark');
    } else {
        document.body.classList.remove('theme-dark');
    }
};

export const getTheme = () => {
    return localStorage.getItem('theme') || 'light';
};