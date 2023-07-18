const toDoList = JSON.parse(localStorage.getItem('toDoList')) || [];

console.log(toDoList)

function addToDo() {
  const taskInput = document.querySelector('.newTaskBar')
  toDoList.push(taskInput.value)
  taskInput.value = ''
  localStorage.setItem('toDoList', JSON.stringify(toDoList))
  displayToDoList()
}

function displayToDoList() {
  let toDoCode = ''
  for (i=0; i<toDoList.length; i++) {
    toDoCode += `<div class="taskAndDelete">
                  <div class="taskToDo">${toDoList[i]}</div>
                  <button class="deleteButton">Delete</button>
                </div>`
  }
  document.querySelector('.taskList').innerHTML = toDoCode
}