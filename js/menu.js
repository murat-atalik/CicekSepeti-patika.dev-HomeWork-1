const together = document.querySelector(".together");
const sidebar = document.querySelector(".sidebar");
const menuButtonOff = document.querySelector(".menuButtonOff");
const menuButtonOn = document.querySelector(".menuButtonOn");

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
