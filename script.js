var inputVal = document.getElementById('input-item').value; //input text value variable 
var completedTasks = [];
var incompleteTasks = [];
var taskList = [];
var totalTaskVal = document.getElementById('t-count'); //total count variable
var totalTasks = completedTasks.length + incompleteTasks.length;
var todoContainer = document.getElementById('todo-sect');
var notificationDiv = document.getElementById('notification');
var todoItem ;
var deleteItem;


function makeID(str){
    str = str.toLowerCase();
    str = str.replace(/\s/g, "");
    return str;
}

// function to create new todo div item
function createTodoItem(task){
    var idDiv = makeID(task);   
    if(totalTasks === 0)
    {
        todoContainer.classList.remove('empty-div');
        todoContainer.innerText = "";   
    }
    var newDiv = document.createElement('div');
    newDiv.classList.add('todo-item-cont', 'm-tb', 'br-5px');   // add multiple classes
    var div1 = document.createElement('div');
    var p = document.createElement('p');
    div1.classList.add('div1');
    p.innerHTML = task;
    p.id = idDiv;
    p.classList.add('todo-item');
    div1.appendChild(p)
    var div2 = document.createElement('div');
    div2.innerHTML = `<i class="fa fa-trash-o ${idDiv} cursor" aria-hidden="true"></i>`;
    div2.style.paddingRight = "1.5%";
    newDiv.appendChild(div1);
    newDiv.appendChild(div2);
    return newDiv; 

}

//function creating striked todo item
function createDoneTodoItem(task){
    var idDiv = makeID(task);   
    if(totalTasks === 0)
    {
        todoContainer.classList.remove('empty-div');
        todoContainer.innerText = "";   
    }
    var newDiv = document.createElement('div');
    newDiv.classList.add('todo-item-cont', 'm-tb', 'br-5px');   // add multiple classes
    var div1 = document.createElement('div');
    var p = document.createElement('p');
    div1.classList.add('div1');
    p.innerHTML = task;
    p.style.textDecoration = "line-through";
    p.id = idDiv;
    p.classList.add('todo-item');
    div1.appendChild(p)
    var div2 = document.createElement('div');
    div2.innerHTML = `<i class="fa fa-trash-o ${idDiv} cursor" aria-hidden="true"></i>`;
    div2.style.paddingRight = "1.5%";
    newDiv.appendChild(div1);
    newDiv.appendChild(div2);
    return newDiv; 
}

//function to show notification of action done
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


//function creating new todo
function createNewTodo(enteredTask) {
    
    if(event.key === 'Enter') {
    
        if(enteredTask.value === "")
        {
            showNotification('error', 'Enter a Todo...');
            return;
        }
        todoItem = createTodoItem(enteredTask.value); 
        incompleteTasks.push(enteredTask.value);
        enteredTask.value = "";
        setTotalTaskVal();
        // console.log(todoItem);
        todoContainer.appendChild(todoItem);
        showNotification('success', 'Todo added successfully')
    }    
}


//function deleting todos from completed and incomplete todos
document.addEventListener('click', function(ele){
   
    if(ele.target.classList[1] === 'fa-trash-o'){
        var item = ele.target.classList[2]
        deleteItem = document.getElementById(item);
        console.log(deleteItem);
        console.log(deleteItem.innerText);
        const indexI = incompleteTasks.indexOf(deleteItem.innerText);
        const indexC = completedTasks.indexOf(deleteItem.innerText);
        if(indexI > -1)
        {
            incompleteTasks.splice(indexI, 1);
        } else if(indexC > -1)
        {
            completedTasks.splice(indexC, 1);
        }
        showNotification('error', 'Todo Deleted');
        setTotalTaskVal();
        renderAllTodos();
    }

    if(ele.target.tagName.toLowerCase() === 'p' && completedTasks.indexOf(ele.target.innerText) === -1)
    {
        completedTasks.push(ele.target.innerText);
        ele.target.style.textDecoration = "line-through";
        
        // console.log("id", ele.target.id);
        // console.log("text", ele.target.innerText);
        const index = incompleteTasks.indexOf(ele.target.innerText);
        if(index > -1)
        {
            incompleteTasks.splice(index, 1);
        }
       
    }
    
    if(ele.target.id === 'completed-tasks'){
        todoContainer.innerText = "";
        if(completedTasks.length === 0)
        {
            todoContainer.classList.add('empty-div');
            todoContainer.innerText = "No TODOs";
            return;
        }
        else
        {
            // console.log(completedTasks);
            todoContainer.classList.remove('empty-div');
            for(let i=0; i<completedTasks.length;i++)
        {
            todoItem = createDoneTodoItem(completedTasks[i]);
            todoContainer.appendChild(todoItem);
        } 
        }

    }

    if(ele.target.id === 'incomplete-tasks'){
        todoContainer.innerText = "";
        if(incompleteTasks.length === 0)
        {
            todoContainer.classList.add('empty-div');
            todoContainer.innerText = "No Incomplete TODOs";
            return;
        }
        else 
        {
            console.log(incompleteTasks);
            todoContainer.classList.remove('empty-div');
            for(let i=0; i<incompleteTasks.length;i++)
          {
            todoItem = createTodoItem(incompleteTasks[i]);
            todoContainer.appendChild(todoItem);
          } 

        }

    }

    if(ele.target.id === 'all-tasks'){        
        renderAllTodos();
        setTotalTaskVal();
    }
    
});


//function showing all todos
function renderAllTodos(){
    todoContainer.innerText = "";
        if(incompleteTasks.length + completedTasks.length === 0)
        {
            todoContainer.classList.add('empty-div');
            todoContainer.innerText = "No Incomplete TODOs";
            return;
        }
        else 
        {
            todoContainer.classList.remove('empty-div');
            for(let i=0; i<incompleteTasks.length;i++)
         {
            todoItem = createTodoItem(incompleteTasks[i]);
            // console.dir(todoItem);
            todoContainer.appendChild(todoItem);
         }  
           for(let i=0; i<completedTasks.length;i++)
          {
          todoItem = createDoneTodoItem(completedTasks[i]);
          todoContainer.appendChild(todoItem);
          } 
        }
        return;
}


function setTotalTaskVal() {
    totalTasks = completedTasks.length + incompleteTasks.length;
    totalTaskVal.innerHTML = totalTasks;
    if(totalTasks === 0)
    {
        todoContainer.classList.add('empty-div');
        todoContainer.innerText = "No TODOs";
    }
    
}


setTotalTaskVal();


