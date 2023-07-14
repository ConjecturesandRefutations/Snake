function uncheckOthers(checkbox, currentGame) {
  var checkboxes = document.getElementsByName('option');
  checkboxes.forEach(function (element) {
    if (element !== checkbox) {
      element.checked = false;
    }
  });

  checkbox.checked = true; // Ensure the clicked checkbox remains checked
  currentGame.difficulty = checkbox.value; // Set the selected difficulty in the game object
}

console.log(checkbox)