function showButton(btn) {
  var visibleClass = 'btn-container__button--is-visible';
  btn.classList.add(visibleClass);
}

function hideButton(btn) {
  var visibleClass = 'btn-container__button--is-visible';
  btn.classList.remove(visibleClass);
}

export { showButton, hideButton };
