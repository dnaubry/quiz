// Displays a message asking user to choose an answer if one is not selected
function validation() {
  var msgExists = document.getElementById('validationMsg');
  // Checks if the message already exists so it doesn't display multiple messages
  if (!document.body.contains(msgExists)) {
    var msgEl = document.createElement('div'),
      msg = document.createTextNode('Please choose an answer!'),
      position = document.querySelector('.btn-container'),
      radios = document.getElementsByName('choices');

    msgEl.id = 'validationMsg';
    msgEl.classList.add('btn-container__msg');
    msgEl.appendChild(msg);
    position.appendChild(msgEl);

    // Watches radio buttons for change and calls removeValidationMsg to remove the message
    for (var i = 0; i < radios.length; i++) {
      radios[i].addEventListener('change', function(e) {
        removeValidationMsg();
      }, false);
    }
  }
}

// Removes message when an answer is selected
function removeValidationMsg() {
   var removeMsgEl = document.getElementById('validationMsg');
   var containerEl = removeMsgEl.parentNode;
    containerEl.removeChild(removeMsgEl);
  }

export { validation, removeValidationMsg };
