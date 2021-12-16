//Tüm elementleri seçme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();
//Tüm event listenerlar
function eventListeners(){
  form.addEventListener("submit",addTodo);
  document.addEventListener("DOMContentLoaded",loadAllTodostoUI);
  secondCardBody.addEventListener("click",deleteTodo);
  filter.addEventListener("keyup",filterTodos);
  clearButton.addEventListener("click",clearallTodos);

}

function clearallTodos(e){
   if (confirm("Tümünü silmek istediğinize emin misiniz ?")){
       //Arayüzden todoları temizleme
       //todoList.innerHTML= ""; //Yavaş
       while(todoList.firstElementChild != null) {
           todoList.removeChild(todoList.firstElementChild);
       }
       localStorage.removeItem("todos");

      
   }

}



function filterTodos(e){
   const filtervalue = e.target.value.toLowerCase();
   const listItems = document.querySelectorAll(".list-group-item");

   listItems.forEach(function(listItem){
       const text = listItem.textContent.toLowerCase();
       if(text.indexOf(filtervalue) === -1){
           listItem.setAttribute("style","display : none!important");
       }
       else{
        listItem.setAttribute("style","display:block");
       }

   });


}

function loadAllTodostoUI(){
   let todos = getTodosFromStorage();

   todos.forEach(function(todo){
        addTodoToUI(todo);
   })

}
function deleteTodo(e){
    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Todo başarıyla silindi.");
    }
}
function deleteTodoFromStorage(deletetodo){
      let todos = getTodosFromStorage();
      
      todos.forEach(function(todo,index){
          if(todo === deletetodo){
               todos.splice(index,1);
          }
      
      });
    localStorage.setItem("todos",JSON.stringify(todos));
}



function addTodo(e){
  const newTodo= todoInput.value.trim();//yazının başındaki ve sonundaki boşlukları kaldırır.
  if(newTodo === ""){
      
     showAlert("danger","Lütfen bir todo girin.");
  }
  else{
      addTodoToUI(newTodo);
      addtodoToStorage(newTodo);
      showAlert("success","Todo başarıyla eklendi.");
  }

 e.preventDefault();
}

function getTodosFromStorage(){
    let todos;
    if(localStorage.getItem("todos")  === null){
        todos=[];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    return todos;


}


function addtodoToStorage(newTodo){
   let todos = getTodosFromStorage();
   todos.push(newTodo);
   localStorage.setItem("todos",JSON.stringify(todos));

}



function showAlert(type,message){
  const alert = document.createElement("div");

  alert.className = `alert alert-${type}`;
  alert.textContent = message;

  firstCardBody.appendChild(alert);
  //setTimeout
  
  setTimeout(function(){
          alert.remove();
  },1000);

}



function addTodoToUI(newTodo){

   
    //list item oluşturma
    const listItem = document.createElement("li");
    //link oluşturma
    const link = document.createElement("a");
    link.href="#";
    link.className="delete-item";
    link.innerHTML="<i class = 'fa fa-remove'></i>";

    listItem.className="list-group-item d-flex justify-content-between";
    //Text Node Ekleme
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);
    //TodoList'e ListItem'ı ekleme

    todoList.appendChild(listItem);
    todoInput.value="";
   

}