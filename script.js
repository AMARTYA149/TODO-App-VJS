var inputVal = document.getElementById('input-item').value; //input text value variable 
var completedTasks = [];
var incompleteTasks = [];
var totalTaskVal = document.getElementById('t-count'); //total count variable
var totalTasks = completedTasks.length + incompleteTasks.length;
var todoContainer = document.getElementById('todo-sect');
var notificationDiv = document.getElementById('notification');
var todoItem ;


// function to create new todo item
function createTodoItem(task){
    if(totalTasks === 0)
    {
        todoContainer.classList.remove('empty-div');
        todoContainer.innerText = "";   
    }
    var newDiv = document.createElement('div');
    newDiv.classList.add('todo-item-cont', 'm-tb', 'br-5px');   // add multiple classes
    var div1 = document.createElement('div');
    var checkBox = document.createElement('input');
    var label = document.createElement('label');
    div1.classList.add('div1');
    label.innerHTML = task;
    checkBox.type = "checkbox";
    checkBox.classList.add('todo-item');
    div1.appendChild(checkBox);
    div1.appendChild(label)
    var div2 = document.createElement('div');
    div2.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>';
    div2.style.paddingRight = "1.5%";
    newDiv.appendChild(div1);
    newDiv.appendChild(div2);
    return newDiv; 

}

function showNotification(type, message){
   if(type === 'error')
   {
       notificationDiv.classList.remove('green');
       notificationDiv.classList.add('red');
   } else if(type === 'success')
   {
    notificationDiv.classList.remove('red');
    notificationDiv.classList.add('green');
   } 

   notificationDiv.style.display = 'flex';
   notificationDiv.innerText = message;

   setTimeout(() => {
       notificationDiv.style.display = 'none';
   }, 2500);
}

function createNewTodo(enteredTask) {
    if(event.key === 'Enter') {
        if(enteredTask.value === "")
        {
            showNotification('error', 'Enter a Todo...');
            return;
        }
        todoItem = createTodoItem(enteredTask.value); 
        console.log(todoItem);
        todoContainer.appendChild(todoItem);
        showNotification('success', 'Todo added successfully')
    }
}


function setTotalTaskVal() {
    totalTaskVal.innerHTML = totalTasks;
    if(totalTasks === 0)
    {
        todoContainer.classList.add('empty-div');
        todoContainer.innerText = "No TODOs";
    }
    else{
        todoContainer.classList.remove('empty-div');
        todoContainer.innerText = "";        
    }
}


setTotalTaskVal();


