document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = e => {
    const searchElem = document.querySelector('.search');
    const target = e.target;
    if(target.closest('#open-search')) {
      searchElem.classList.add('open');
    }
    if(target.closest('#close-search')) {
      searchElem.classList.remove('open');
    }
  };
  const themeChange = e => {
    const target = e.target;
    if (target.closest('.theme__checkbox')) {
      document.body.classList.toggle('theme-dark');
    }
  };
  document.body.addEventListener('change', themeChange);
  document.body.addEventListener('click', menuToggle);
});
