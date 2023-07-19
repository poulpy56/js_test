const toDoList = JSON.parse(localStorage.getItem('toDoList')) || [];

displayToDoList()

function addToDo() {
  const taskInput = document.querySelector('.newTaskBar')
  const dateInput = document.querySelector('.newTaskDate')
  toDoList.push({
      name: taskInput.value,
      date: dateInput.value
    })
  taskInput.value = ''
  dateInput.value = ''
  displayToDoList(dateInput.value)
}

function displayToDoList() {
  trierListeParDate(toDoList)
  let toDoCode = ''
  for (i=0; i<toDoList.length; i++) {
    toDoCode += `<div class="taskAndDelete">
                  <div class="taskToDo"><p class="taskText">${toDoList[i].name}</p> <p class="taskText">${toDoList[i].date}</p></div>
                  <button class="deleteButton" onclick="deleteTask(${i})">Delete</button>
                </div>`
  }
  if(toDoCode === '') {toDoCode ='<p class="noTaskText">No task yet</p>'}
  document.querySelector('.taskList').innerHTML = toDoCode
  localStorage.setItem('toDoList', JSON.stringify(toDoList))
}

function deleteTask(thisId) {
  toDoList.splice(thisId, 1)
  displayToDoList()
}

function trierListeParDate(listeObjets) {
  return listeObjets.sort(function(a, b) {
    var dateA = new Date(a.date);
    var dateB = new Date(b.date);
    return dateA - dateB;
  });
}
