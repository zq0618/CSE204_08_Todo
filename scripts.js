
//Qiao Zhang's API Key:
var apiKey = "6553a2-bd0212-bd6959-b3564d-915c3e";


var listRequest = new XMLHttpRequest();
listRequest.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE) {
        if (this.status == 200) {
            var todos = JSON.parse(this.responseText);
            console.log(todos);
            for (var index = 0; index < todos.length; index++) {
                startTodo(todos[index]);
            }
        } else {
            console.error("Error loading todos:", this.responseText);
        }
    }
};

listRequest.open("GET", "https://cse204.work/todos", true);
listRequest.setRequestHeader("x-api-key", apiKey);
listRequest.send();


document.getElementById("new-todo-list").addEventListener("submit", function (event) {
    event.preventDefault();

    var data = { text: newTitle.value };

    var createRequest = new XMLHttpRequest();
    createRequest.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (this.status == 200) {
                startTodo(JSON.parse(this.responseText));
                newTitle.value = '';
            } else {
                console.log('Error in creating todo:', this.responseText);
            }
        }
    };

    createRequest.open("POST", "https://cse204.work/todos", true);
    createRequest.setRequestHeader("Content-type", "application/json");
    createRequest.setRequestHeader("x-api-key", apiKey);
    createRequest.send(JSON.stringify(data));
});


function startTodo(todoData) {
    var todo = document.createElement("article");
    todo.setAttribute("id", todoData.id);
    todo.classList.add("todo");
    if (todoData.completed) {
        todo.classList.add("completed");
    }

    var completeButton = document.createElement("button");
    completeButton.classList.add("check");
    completeButton.addEventListener("click", completeTodo);

    var todoText = document.createElement("p");
    todoText.innerText = todoData.text;

    var deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.innerText = '-';
    deleteButton.addEventListener("click", deleteTodo);

    todo.appendChild(completeButton);
    todo.appendChild(todoText);
    todo.appendChild(deleteButton);

    document.getElementById("todos").appendChild(todo);

    document.getElementById("newTitle").value = '';
}


function completeTodo(event) {
    var todoId = event.target.parentNode.id;
    var data = { completed: true };
    var completeRequest = new XMLHttpRequest();

    completeRequest.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (this.status == 200) {
                event.target.parentNode.classList.add("completed");
            } else {
                console.log(this.responseText);
            }
        }
    };

    completeRequest.open("PUT", "https://cse204.work/todos/" + todoId, true);
    completeRequest.setRequestHeader("Content-type", "application/json");
    completeRequest.setRequestHeader("x-api-key", apiKey);
    completeRequest.send(JSON.stringify(data));
}


function deleteTodo(event) {
    var todoId = event.target.parentNode.id;
    var deleteRequest = new XMLHttpRequest();

    deleteRequest.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (this.status == 200) {
                var todoElement = document.getElementById(todoId);
                if (todoElement) {
                    todoElement.parentNode.removeChild(todoElement);
                }
            } else {
                console.log(this.responseText);
            }
        }
    };

    deleteRequest.open("DELETE", "https://cse204.work/todos/" + todoId, true);
    deleteRequest.setRequestHeader("Content-type", "application/json");
    deleteRequest.setRequestHeader("x-api-key", apiKey);
    deleteRequest.send();
}





