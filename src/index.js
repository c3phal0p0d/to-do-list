import Todo from "./todo";
import Project from "./project";
import {changeSelectedSidebarButton, renderAllTodos, addProjectToSidebar, displayPopup} from "./renderPage"

const homeSidebar = document.querySelector('.home');
for (let i=0; i<homeSidebar.children.length; i++){
    let button = homeSidebar.children[i];
    let filter = button.classList[1].charAt(0).toUpperCase() + button.classList[1].slice(1);
    button.addEventListener('click', function(event) {
        changeSelectedSidebarButton(event);
        renderAllTodos(projects, filter);
    });
}

document.querySelector(".add-project-button").addEventListener("click", function(){
    displayPopup("add-project"); 
});

document.querySelector(".add-todo-button").addEventListener("click", function(){
    displayPopup("add-todo");
});


let todo = Todo(0, "Do this", "Some kind of description", "22/02/99", true, null);

let projects = [];
let project = Project(0, "Sample project");
project.addTodo(todo);

let todo2 = Todo(0, "Do this later", "Blah blah", "23/02/99", false, null);
let project2 = Project(1, "Another project");
project2.addTodo(todo2);

projects.push(project);
addProjectToSidebar(project);
projects.push(project2);
addProjectToSidebar(project2);

renderAllTodos(projects);