function Validation() {
  var msgExists = document.getElementById('msg');

  function insertValidationMsg() {
    if (!document.body.contains(msgExists)) {
      var msgEl = document.createElement('div'),
        msg = document.createTextNode('Please choose an answer!'),
        position = document.querySelector('.btn-container'),
        radios = document.getElementsByName('choices');

      msgEl.id = 'msg';
      msgEl.classList.add('btn-container__msg');
      msgEl.appendChild(msg);
      position.appendChild(msgEl);

      for (var i = 0; i < radios.length; i++) {
        radios[i].addEventListener('change', removeValidationMsg, false);
      }
    }
  }

  function removeValidationMsg() {
    var removeMsgEl = document.getElementById('msg'),
      containerEl = removeMsgEl.parentNode;
    containerEl.removeChild(removeMsgEl);
  }
}

export { validation, insertValidationMsg };
