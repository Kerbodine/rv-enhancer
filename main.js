// get first instance of div with class et_builder_inner_content et_pb_gutters3 (main questions div)
let div = document.querySelector("div.et_builder_inner_content.et_pb_gutters3");

// get current url
let url = window.location.href;

// for each children of div
// skip first element (title card)
// load checkbox id state from local storage
// inside each div, find the first div, and add a checkbox inside it, with class rv_q_check

for (let i = 2; i < div.children.length; i++) {
  // find a tag with class et_pb_lightbox_image and get the href
  let img = div.children[i].querySelector("a.et_pb_lightbox_image").href; // https://www.revisionvillage.com/wp-content/uploads/2019/11/QAA161.png

  // split img url by / and get the last element   // split img url by . and get the first element
  let questionId = img.split("/").pop().split(".")[0];

  let id = questionId; // id of checkbox question
  let state = JSON.parse(localStorage.getItem(id))?.checked; // check if checkbox is checked

  let container = document.createElement("div");
  container.className = "rv_q_buttons";

  let checkContainer = document.createElement("label");
  checkContainer.className = "rv_q_container";
  div.children[
    i
  ].firstElementChild.firstElementChild.firstElementChild.firstElementChild.prepend(
    container
  );
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = id;
  // checkbox.className = "rv_q_check";
  if (state) {
    checkbox.checked = true;
  }

  let checkmark = document.createElement("span");
  checkmark.className = "checkmark";

  checkbox.addEventListener("click", function (e) {
    let id = e.target.id;
    state = e.target.checked;
    let item = JSON.parse(localStorage.getItem(id));
    if (state) {
      localStorage.setItem(
        id,
        JSON.stringify({
          ...item,
          checked: true,
        })
      ); // store url and question id in local storage
    } else {
      localStorage.setItem(
        id,
        JSON.stringify({
          ...item,
          checked: false,
        })
      );
    }
  });

  checkContainer.prepend(checkbox);
  checkContainer.append(checkmark);
  container.append(checkContainer);

  let bookmark = document.createElement("button");
  bookmark.classList.add("bookmark");

  let item = JSON.parse(localStorage.getItem(id));

  if (item?.bookmarked) {
    bookmark.classList.add("b-selected");
    bookmark.innerHTML = "★";
  } else {
    bookmark.innerHTML = "☆";
  }

  bookmark.addEventListener("click", function (e) {
    let state = e.target.classList.contains("b-selected") ? true : false;

    if (state) {
      e.target.classList.remove("b-selected");
      bookmark.innerHTML = "☆";
    } else {
      e.target.classList.add("b-selected");
      bookmark.innerHTML = "★";
    }

    let id = questionId;
    let obj = {
      ...item,
      bookmarked: !state,
    };
    if (!state) {
      // get current window scroll
      let scroll = window.scrollY;
      obj["scroll"] = scroll;
    }
    localStorage.setItem(id, JSON.stringify(obj));
  });

  container.append(bookmark);
}
