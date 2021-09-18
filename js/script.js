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
  const searchValue = search.value.toLowerCase();
  //filtering response data
  const filteredData = responseData.filter(
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

//Links
const githubPersonal = () => {
  window.open("https://github.com/murat-atalik", "_blank");
};
const githubTrainer = () => {
  window.open("https://github.com/CaglayanYanikoglu", "_blank");
};
document.querySelector(".logo").addEventListener("click", githubTrainer);
document.querySelector(".avatar").addEventListener("click", githubPersonal);
