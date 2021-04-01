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
  document.body.addEventListener('click', menuToggle);
});
