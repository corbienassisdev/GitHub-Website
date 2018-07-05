//simpliest protection for the photo
document.getElementById("myself").addEventListener('contextmenu', event => event.preventDefault());
document.getElementById("myself").ondragstart = function() { return false; };
//removing separators for last items
var work = document.getElementsByClassName('work');
var education = document.getElementsByClassName('education');
if (work.length > 0) work[0].lastChild.lastChild.classList.remove("divider-items");
if (education.length > 0) education[0].lastChild.lastChild.classList.remove("divider-items");
