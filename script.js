var inputVal = document.getElementById('input-item').value; //input text value variable 
var completedTasks = [];
var incompleteTasks = [];
var totalTaskVal = document.getElementById('t-count'); //total count variable
var totalTasks = completedTasks.length + incompleteTasks.length;


// function to create new todo item
function createNewTodo(task){
    var newDiv = document.createElement('div');
    newDiv.classList.add('todo-item-cont', 'm-tb', 'br-5px');   // add multiple classes
    var div1 = document.createElement('div');
    var checkBox = document.createElement('input');
    var label = document.createElement('label');
    label.innerHTML = task;
    checkBox.type = "checkbox";
    checkBox.classList.add('todo-item');
    div1.appendChild(checkBox);
    div1.appendChild(label)
    var div2 = document.createElement('div');
    div2.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>';
    newDiv.appendChild(div1);
    newDiv.appendChild(div2);
    return newDiv;    
}


function setTotalTaskVal() {
    totalTaskVal.innerHTML = totalTasks;
}

var newD = createNewTodo("hello");
console.log(newD);

setTotalTaskVal();


