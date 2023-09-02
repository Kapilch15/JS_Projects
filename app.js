const addUserBtn = document.getElementById("addUser");
const btnText = addUserBtn.innerText;
const userName = document.getElementById("userName");
const recordsDisplay = document.getElementById("records");
let userArray = [];
let edit_id = null;

let objStr = localStorage.getItem("users");

if (objStr != null) {
  userArray = JSON.parse(objStr);
}

DisplayInfo();

addUserBtn.onclick = () => {
  const name = userName.value;
  if (edit_id != null) {
    //edit
    userArray.splice(edit_id, 1, { name: name });
    edit_id = null;
  } else {
    //insert
    userArray.push({ name: name });
  }

  saveInfo(userArray);
  userName.value = "";
  addUserBtn.innerText = btnText;
};

function saveInfo(userArray) {
  let str = JSON.stringify(userArray);
  localStorage.setItem("users", str);
  DisplayInfo();
}

function DisplayInfo() {
  let statement = "";
  userArray.forEach((user, index) => {
    statement += `<tr>
    <th scope="row">${index + 1}</th>
    <td>${user.name}</td>
    <td><i class="btn text-white btn-info fa-solid fa-pen-to-square" onclick='EditInfo(${index})'></i><i class="btn text-white btn-danger fa-solid fa-trash mx-2" onclick='DeleteInfo(${index})'></i></td>
    </tr>`;
  });
  recordsDisplay.innerHTML = statement;
}

function EditInfo(id) {
  edit_id = id;
  userName.value = userArray[id].name;
  addUserBtn.innerText = `Save Changes`;
}

function DeleteInfo(id) {
  userArray.splice(id, 1);
  saveInfo(userArray);
}
