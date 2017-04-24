// Selects all radio buttons with specified name and checks if one is selected
function radioChecked() {
  var radios = document.getElementsByName('choices');
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      return true;
    }
  }
  return false;
}

export { radioChecked };
