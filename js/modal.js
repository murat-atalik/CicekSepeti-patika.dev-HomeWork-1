const companyForm = document.querySelector(".companyForm");
const formButton = document.querySelector(".formButton");
const modalContent = document.querySelector(".modal-content");
const modal = document.querySelector(".modal");

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
      console.log("Job Function: " + element.value);
    }
    if (element.type !== "radio") {
      const modalBodyTxt = document.createElement("p");
      modalBodyTxt.innerHTML = element.name + ": " + element.value;
      modalBody.appendChild(modalBodyTxt);
      console.log(element.name + ": " + element.value);
    }
  }
  modalHeader.appendChild(modalHeaderBtn);
  modalHeader.appendChild(modalHeaderTitle);
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modal.style.display = "block";
};

formButton.addEventListener("click", formModal);
