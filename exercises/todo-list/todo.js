const toDoLists = JSON.parse(localStorage.getItem('toDoLists')) || [
                                                                    {
                                                                      name : 'To do list 0',
                                                                      toDoList : []
                                                                    }
                                                                   ];

displayToDoLists()

function addToDolist() {
  const toDoListsList = document.querySelectorAll('.todo_list')
  const n = toDoListsList.length
  toDoLists.push({
    name : findName(n),
    toDoList : []
  })
  if (n === 0) {
    document.querySelector('header').outerHTML += initToDoList(n)
  }
  else {
    toDoListsList[n-1].outerHTML += initToDoList(n)
  }
  displayList(n)
}

function addToDo(j) {
  const taskInput = document.querySelectorAll('.newTaskBar')[j]
  const dateInput = document.querySelectorAll('.newTaskDate')[j]
  toDoLists[j].toDoList.push({
      name: taskInput.value,
      date: dateInput.value
    })
  taskInput.value = ''
  dateInput.value = ''
  displayList(j)
}

function displayToDoLists() {
  let bodyStr = `<header><button class="addToDoListButton" onclick="addToDolist()">Add to do list</button></header>`
  for (j=0; j<toDoLists.length; j++) {
    bodyStr += initToDoList(j)
  }
  bodyStr +=`<script src="todo.js"></script>` 
  document.querySelector('body').innerHTML = bodyStr
  for (j=0; j<toDoLists.length; j++) {
    displayList(j)
  }
}

function displayList(j) {
    const toDoList = toDoLists[j].toDoList
    trierListeParDate(toDoList)
    let toDoCode = ''
    for (i=0; i<toDoList.length; i++) {
      toDoCode += `<div class="taskAndDelete">
                    <div class="taskToDo"><p class="taskText">${toDoList[i].name}</p> <p class="taskText">${toDoList[i].date}</p></div>
                    <button class="deleteButton" onclick="deleteTask(${i}, ${j})">Delete</button>
                  </div>`
    }
    if(toDoCode === '') {toDoCode ='<p class="noTaskText">No task yet</p>'}
    document.querySelectorAll('.todo_list .taskList')[j].innerHTML = toDoCode
  localStorage.setItem('toDoLists', JSON.stringify(toDoLists))
}

function deleteTask(thisId, toDoListId) {
  toDoLists[toDoListId].toDoList.splice(thisId, 1)
  displayList(toDoListId)
}

function trierListeParDate(listeObjets) {
  return listeObjets.sort(function(a, b) {
    var dateA = new Date(a.date);
    var dateB = new Date(b.date);
    return dateA - dateB;
  });
}

function deleteToDoList(n) {
  toDoLists.splice(n, 1)
  displayToDoLists()
}

function initToDoList(num) {
  return `<div class="todo_list">
            <p class="title">${toDoLists[num].name}</p>
            <button class="toDoListDeleteButton" onclick="deleteToDoList(${num})">&#215;</button>
            <div class="createTask">
              <input class="newTaskBar" placeholder="New task" onkeydown="if (event.key==='Enter'){addToDo(${num})}">
              <input type="date" class="newTaskDate">
              <button class="addTaskButton" onclick="addToDo(${num})">Add</button>
            </div>
            <div class="taskList"></div>
          </div>`
}

function findName(n) {
  let nameNumber = n
  let regex = 0
  for (i=0; i<toDoLists.length; i++) {
    regex = toDoLists[i].name.search(/To do list \d*/)
    if (!regex) {nameNumber = Math.max(nameNumber, Number(toDoLists[i].name.slice(10))+1)}
  }
  return `To do list ${nameNumber}`
}