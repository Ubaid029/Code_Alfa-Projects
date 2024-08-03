const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const Alert= document.getElementById('Alert')

let todo = JSON.parse(localStorage.getItem("todo-list"));
if (!todo) {
  todo = [];
}


function CreateToDoItems() {
    if (taskInput.value === "") {
      Alert.innerText = "Please enter your todo text!";
      taskInput.focus();
    } else {
      let IsPresent = false;
      todo.forEach((element) => {
        if (element.item == taskInput.value) {
          IsPresent = true;
        }
      });
  
      if (IsPresent) {
        setAlertMessage("This item already present in the list!");
        return;
      }
  
      let li = document.createElement("li");
      const todoItems = `<div title="Hit Double Click and Complete" ondblclick="CompletedToDoItems(this)">${taskInput.value}</div><div>
                      <img class=" controls" onclick="UpdateToDoItems(this)" src="/Images/edit.png" />
                      <img class=" controls" onclick="DeleteToDoItems(this)" src="/Images/del.png" /></div></div>`;
      li.innerHTML = todoItems;
      taskList.appendChild(li);
  
      if (!todo) {
        todo = [];
      }
      let itemList = { item: taskInput.value, status: false };
      todo.push(itemList);
      setLocalStorage();
    }
    taskInput.value = "";
    setAlertMessage("Todo item Created Successfully!");
  }

  function ReadToDoItems() {
    todo.forEach((element) => {
      let li = document.createElement("li");
      let style = "";
      if (element.status) {
        style = "style='text-decoration: line-through'";
      }
      const todoItems = `<div ${style} title="Hit Double Click and Complete" ondblclick="CompletedToDoItems(this)">${
        element.item
      }
      ${
        style === ""
          ? ""
          : '<img class="controls" src="/Images/check_mark.png />'
      }</div><div>
      ${
        style === ""
          ? '<img class="controls" onclick="UpdateToDoItems(this)" src="/Images/edit.png" />'
          : ""
      }
      <img class="controls" onclick="DeleteToDoItems(this)" src="/Images/del.png" /></div></div>`;
      li.innerHTML = todoItems;
      taskList.appendChild(li);
    });
  }
  ReadToDoItems();


  function UpdateToDoItems(e) {
    if (
      e.parentElement.parentElement.querySelector("div").style.textDecoration ===
      ""
    ) {
     taskInput.value =
        e.parentElement.parentElement.querySelector("div").innerText;
      updateText = e.parentElement.parentElement.querySelector("div");
      addTaskBtn.setAttribute("onclick", "UpdateOnSelectionItems()");
      addTaskBtn.setAttribute("src", "/Images/refresh.png");
      taskInput.focus();
    }
  }

  function UpdateOnSelectionItems() {
    let IsPresent = false;
    todo.forEach((element) => {
      if (element.item == taskInput.value) {
        IsPresent = true;
      }
    });
  
    if (IsPresent) {
      setAlertMessage("This item already present in the list!");
      return;
    }
  
    todo.forEach((element) => {
      if (element.item == updateText.innerText.trim()) {
        element.item = taskInput.value;
      }
    });
    setLocalStorage();
  
    updateText.innerText = taskInput.value;
    addTaskBtn.setAttribute("onclick", "CreateToDoItems()");
    addTaskBtn.setAttribute("id" ,"addTaskBtn");
    taskInput.value = "";
    setAlertMessage("Todo item Updated Successfully!");
  }

  function DeleteToDoItems(e) {
    let deleteValue =
      e.parentElement.parentElement.querySelector("div").innerText;
  
    if (confirm(`Are you sure. Due you want to delete this ${deleteValue}!`)) {
      e.parentElement.parentElement.setAttribute("class", "deleted-item");
      taskInput.focus();
  
      todo.forEach((element) => {
        if (element.item == deleteValue.trim()) {
          todo.splice(element, 1);
        }
      });
  
      setTimeout(() => {
        e.parentElement.parentElement.remove();
      }, 1000);
  
      setLocalStorage();
    }
  }

function CompletedToDoItems(e) {
  if (e.parentElement.querySelector("div").style.textDecoration === "") {
    const img = document.createElement("img");
    img.src = "/Images/check_mark.png";
    img.className = "controls";
    e.parentElement.querySelector("div").style.textDecoration = "line-through";
    e.parentElement.querySelector("div").appendChild(img);
    e.parentElement.querySelector("img.edit").remove();

    todo.forEach((element) => {
      if (
        e.parentElement.querySelector("div").innerText.trim() == element.item
      ) {
        element.status = true;
      }
    });
    setLocalStorage();
    setAlertMessage("Todo item Completed Successfully!");
  }
}






  function setLocalStorage() {
    localStorage.setItem("todo-list", JSON.stringify(todo));
  }

  function setAlertMessage(message) {
    Alert.removeAttribute("class");
    Alert.innerText = message;
    setTimeout(() => {
      Alert.classList.add("toggleMe");
    }, 1500);
  }


  






























