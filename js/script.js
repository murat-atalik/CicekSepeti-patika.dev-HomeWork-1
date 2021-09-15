let reqHeader = new Headers();
reqHeader.append("Content-type", "text/json");
let initObject = {
  method: "GET",
  headers: reqHeader,
};
//select card grid
const gridContainer = document.querySelector(".grid-container");
//select search bar
const search = document.querySelector(".textinput");
const companyForm = document.querySelector(".companyForm");
const formButton = document.querySelector(".formButton");
const together = document.querySelector(".together");
const sidebar = document.querySelector(".sidebar");
const menuButtonOff = document.querySelector(".menuButtonOff");
const menuButtonOn = document.querySelector(".menuButtonOn");
const modalContent = document.querySelector(".modal-content");
const modal = document.querySelector(".modal");

//creating empty array for response data
let responseData = [];

const listCart = (data) => {
  // carCount for how many card shows on screen
  let cartCount = 0;
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    const gridItem = document.createElement("div");
    const gridImg = document.createElement("div");
    const gridImgSource = document.createElement("img");
    const responseBody = document.createElement("div");
    const responseTitle = document.createElement("h2");
    const responseText = document.createElement("p");
    gridContainer.className = "grid-container";
    gridItem.className = "grid-item";
    gridImg.className = "grid-img";
    gridImgSource.src = `https://picsum.photos/id/${element.id}/200/200`;
    responseTitle.innerHTML = element.title;
    responseText.innerHTML = element.body;
    gridImg.appendChild(gridImgSource);
    gridItem.appendChild(gridImg);
    responseBody.appendChild(responseTitle);
    responseBody.appendChild(responseText);
    gridItem.appendChild(responseBody);
    gridContainer.appendChild(gridItem);
    cartCount++;
    if (cartCount === 10) {
      break;
    }
  }
};
//fetching data
fetch("https://jsonplaceholder.typicode.com/posts", initObject)
  .then((response) => response.json())
  .then((data) => {
    responseData = data;
    //calling grid data
    listCart(data);
  });

function updateValue() {
  let searchValue = search.value.toLowerCase();
  //filtering response data
  filteredData = responseData.filter(
    (data) =>
      data.title.includes(searchValue) || data.body.includes(searchValue)
  );
  //cleaning grid
  gridContainer.innerHTML = "";
  //filtering data
  listCart(filteredData);
}
//calling event listener for search bar
search.addEventListener("input", updateValue);
//toggle button
const toggleButton = () => {
  if (
    (menuButtonOn.style.display === "none" ||
      menuButtonOn.style.display === "") &&
    document.documentElement.clientWidth > 600
  ) {
    menuButtonOn.style.display = "inline-block";
    menuButtonOff.style.display = "none";
  } else if (
    menuButtonOn.style.display === "" &&
    document.documentElement.clientWidth <= 600
  ) {
    menuButtonOn.style.display = "none";
    menuButtonOff.style.display = "inline-block";
  } else if (
    menuButtonOn.style.display === "none" &&
    document.documentElement.clientWidth <= 600
  ) {
    menuButtonOn.style.display = "inline-block";
    menuButtonOff.style.display = "none";
  } else {
    menuButtonOn.style.display = "none";
    menuButtonOff.style.display = "inline-block";
  }
};
//hiding cards and disabling search bar
const hideCards = () => {
  gridContainer.style.display = "none";
  companyForm.style.display = "flex";
  search.disabled = true;
  if (document.documentElement.clientWidth <= 600) {
    sidebar.style.display = "none";
    together.style.display = "block";
    toggleButton();
  }
};
//hiding forms and enable search bar
const hideForms = () => {
  gridContainer.style.display = "grid";
  companyForm.style.display = "none";
  search.disabled = false;
  if (document.documentElement.clientWidth <= 600) {
    sidebar.style.display = "none";
    together.style.display = "block";
    toggleButton();
  }
};

//Links
const githubPersonal = () => {
  window.open("https://github.com/murat-atalik", "_blank");
};
const githubTrainer = () => {
  window.open("https://github.com/CaglayanYanikoglu", "_blank");
};
document.querySelector(".logo").addEventListener("click", githubTrainer);
document.querySelector(".avatar").addEventListener("click", githubPersonal);

//Menu
const toggleMenuOff = () => {
  /*   console.log(menuButtonOn.style.display); */
  sidebar.style.display = "none";
  together.style.display = "block";
  toggleButton();
};
const toggleMenuOn = () => {
  /*   console.log(menuButtonOn.style.display); */
  document.documentElement.clientWidth <= 600
    ? ((together.style.display = "none"),
      (sidebar.style.display = "block"),
      toggleButton())
    : ((together.style.display = "block"),
      (sidebar.style.display = "block"),
      toggleButton());
};
menuButtonOff.addEventListener("click", toggleMenuOff);
menuButtonOn.addEventListener("click", toggleMenuOn);

//event listeners for forms and cards
const form = document
  .querySelector(".forms")
  .addEventListener("click", hideCards);
const cards = document
  .querySelector(".cards")
  .addEventListener("click", hideForms);

//form modal creation
const formModal = () => {
  const formData = document.querySelector(".companyForm").elements;
  const modalHeader = document.createElement("div");
  const modalHeaderBtn = document.createElement("button");
  const modalHeaderTitle = document.createElement("h4");
  const modalBody = document.createElement("div");
  const close = () => {
    modal.style.display = "none";
    modalContent.innerHTML = "";
    document.querySelector(".companyForm").reset();
  };

  modalHeader.className = "model-header";
  modalHeaderBtn.className = "close";
  modalHeaderBtn.type = "button";
  modalHeaderBtn.innerHTML = "&times;";
  modalHeaderTitle.className = "modelTitle";
  modalHeaderTitle.innerHTML = "Form answers";
  modal.addEventListener("click", close);
  modalHeaderBtn.addEventListener("click", close);
  /*  console.log(formData); */

  for (let i = 0; i < formData.length - 1; i++) {
    const element = formData[i];
    if (element.type === "radio" && element.checked) {
      const modalBodyTxt = document.createElement("p");
      modalBodyTxt.innerHTML = "Job Function: " + element.value;
      modalBody.appendChild(modalBodyTxt);
    }
    if (element.type !== "radio") {
      const modalBodyTxt = document.createElement("p");
      modalBodyTxt.innerHTML = element.name + ": " + element.value;
      modalBody.appendChild(modalBodyTxt);
    }
  }
  modalHeader.appendChild(modalHeaderBtn);
  modalHeader.appendChild(modalHeaderTitle);
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modal.style.display = "block";
};

formButton.addEventListener("click", formModal);
