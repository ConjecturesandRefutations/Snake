function uncheckOthers(checkbox) {
  var checkboxes = document.getElementsByName('option');
  checkboxes.forEach(function (element) {
    if (element !== checkbox) {
      element.checked = false;
    }
  });

}
if (checkbox.checked) {
  if (checkbox.id === 'option1') {
    currentGame.difficulty = 'easy';
  } else if (checkbox.id === 'option2') {
    currentGame.difficulty = 'medium';
  } else if (checkbox.id === 'option3') {
    currentGame.difficulty = 'hard';
  }
}

console.log(currentGame.difficulty)