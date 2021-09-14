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

//creating empty array for response data
let responseData = [];

const listCart = (data) => {
  // carCount for how many card shows on screen
  let cartCount = 0;
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    console.log(element);
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

//hiding cards and disabling search bar
const hideCards = () => {
  gridContainer.style.display = "none";
  companyForm.style.display = "flex";
  search.disabled = true;
};
//hiding forms and enable search bar
const hideForms = () => {
  gridContainer.style.display = "grid";
  companyForm.style.display = "none";
  search.disabled = false;
};
//event listeners for forms and cards
const form = document
  .querySelector(".forms")
  .addEventListener("click", hideCards);
const cards = document
  .querySelector(".cards")
  .addEventListener("click", hideForms);
