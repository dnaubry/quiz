// Displays a message asking user to choose an answer if one is not selected
function validation() {
  var existingMsg = document.getElementById('validationMsg');
  // Checks if the message already exists so it doesn't display multiple messages
  if (!document.body.contains(existingMsg)) {
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
  var validationMsg = document.getElementById('validationMsg');

  if (document.body.contains(validationMsg)) {
    var containerEl = validationMsg.parentNode;
    containerEl.removeChild(validationMsg);
  }
}

export { validation, removeValidationMsg };
