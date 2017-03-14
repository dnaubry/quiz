// Selects all radio buttons with specified name and checks if one is selected
function radioChecked(setNum) {
    var radios = document.getElementsByName(`choices${setNum}`);
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        return true;
      }
    }
    return false;
  }

  export default radioChecked;