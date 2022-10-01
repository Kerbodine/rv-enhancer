// get first instance of div with class et_builder_inner_content et_pb_gutters3 (main questions div)
var div = document.querySelector("div.et_builder_inner_content.et_pb_gutters3");

// get current url
var url = window.location.href;

// when checkbox with class rv_q_check is toggled, update checkbox id and url in local storage
document.addEventListener("click", function (e) {
  if (e.target && e.target.matches(".rv_q_check")) {
    var id = e.target.id;
    state = e.target.checked;
    if (state) {
      localStorage.setItem(`${url}||${id}`, true); // store url and question id in local storage
    } else {
      localStorage.removeItem(`${url}||${id}`);
    }
  }
});

// for each children of div
// skip first element (title card)
// load checkbox id state from local storage
// inside each div, find the first div, and add a checkbox inside it, with class rv_q_check

for (var i = 2; i < div.children.length; i++) {
  var id = `q_${i - 1}`; // id of checkbox question
  var state = localStorage.getItem(`${url}||${id}`); // check if checkbox is checked
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = id;
  checkbox.className = "rv_q_check";
  if (state) {
    checkbox.checked = true;
  }
  div.children[i].firstElementChild.appendChild(checkbox);
}
