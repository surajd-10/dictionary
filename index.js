let dictionary = [];

document.addEventListener("DOMContentLoaded", () => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((data) => {
      dictionary = data.map((result) => ({
        name: result.name,
        phoneNumber: result.phone,
      }));
      renderTable();
    });

//   document
//     .getElementById("addToDictionaryButtonContainer")
//     .addEventListener("click", (e) => {
//       if (e.target.id === "addToDictionaryButton") {
//         e.target.style.display = "none"
//       }
//     });
// });

const renderTable = () => {
  const tableBody = document.getElementsByTagName("tbody")[0];
  tableBody.innerHTML = "";
  dictionary.forEach((record, index) => {
    const nameCell = document.createElement("td");
    nameCell.innerHTML = record.name;
    const phoneNumberCell = document.createElement("td");
    phoneNumberCell.innerHTML = record.phoneNumber;
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", () => handleDelete(index));
    deleteButton.addEventListener("mouseover", function () {
      this.style.cursor = "pointer";
    });
    deleteButton.addEventListener("mouseout", function () {
      this.style.cursor = "";
    });
    const deleteButtonCell = document.createElement("td");
    deleteButtonCell.appendChild(deleteButton);
    const row = document.createElement("tr");
    row.appendChild(nameCell);
    row.appendChild(phoneNumberCell);
    row.appendChild(deleteButtonCell);
    tableBody.appendChild(row);
  });
};

const handleDelete = (index) => {
  dictionary.splice(index, 1);
  renderTable();
};

document
  .getElementById("addToDictionaryButton")
  .addEventListener("click", () => {
    const nameInput = document.getElementById("name");
    const name = nameInput.value;
    const phoneNumberInput = document.getElementById("phoneNumber");
    const phoneNumber = phoneNumberInput.value;
    dictionary.push({ name, phoneNumber });
    renderTable();
    nameInput.value = "";
    phoneNumberInput.value = "";
  });
