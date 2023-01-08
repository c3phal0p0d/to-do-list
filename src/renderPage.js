export function changeSelectedSidebarButton(event){
    const sidebarButtons = document.querySelectorAll('.sidebar-button');
    for (let i=0; i<sidebarButtons.length; i++){
        sidebarButtons[i].classList.remove('selected');
    }

    event.currentTarget.classList.add('selected');
}

function renderTodo(todo){
    const todosContainer = document.querySelector('#todos-container');
    const todoElement = document.createElement('div');
    todoElement.classList.add('todo');
    if (todo.completed){
        todoElement.classList.add('completed');
    }

    const toggleCompleteButton = document.createElement('button');
    toggleCompleteButton.classList.add("toggle-completed");
    toggleCompleteButton.innerHTML = `<span class="material-symbols-outlined">${todo.completed?'check_box':'check_box_outline_blank'}</span>`;
    toggleCompleteButton.addEventListener('click', function(event){
        todo.toggleCompleted();
        toggleCompleteButton.innerHTML = `<span class="material-symbols-outlined">${todo.completed?'check_box':'check_box_outline_blank'}</span>`;
        event.currentTarget.parentElement.classList.toggle('completed');
    });
    todoElement.appendChild(toggleCompleteButton)

    const titleElement = document.createElement('span');
    titleElement.classList.add("title");
    titleElement.textContent = todo.title;
    todoElement.appendChild(titleElement);

    const rightAlignedItems = document.createElement('div');
    rightAlignedItems.classList.add("right-aligned-items");
    todoElement.appendChild(rightAlignedItems);

    const dateElement = document.createElement("span");
    dateElement.classList.add("due-date");
    dateElement.textContent = todo.dueDate
    rightAlignedItems.appendChild(dateElement);

    const editButton = document.createElement("button");
    editButton.classList.add("edit");
    editButton.innerHTML = '<span class="material-symbols-outlined">edit</span>';
    editButton.addEventListener('click', function(){
        displayPopup("edit-todo", todo);
    });
    rightAlignedItems.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.innerHTML = '<span class="material-symbols-outlined">delete</span>';
    deleteButton.addEventListener('click', function(){
        displayPopup("delete-todo");
    });
    rightAlignedItems.appendChild(deleteButton);

    todosContainer.appendChild(todoElement);
}

export function renderAllTodos(projects, filter="All"){
    const listTitle = document.querySelector('#list-title');
    listTitle.textContent = filter;
    
    const todosContainer = document.querySelector('#todos-container');
    todosContainer.innerHTML = '';

    for (let i=0; i<projects.length; i++){
        let project = projects[i];
        for (let j=0; j<project.todoList.length; j++){
            let todo = project.todoList[j];

            if (filter=="Today"){
                // if todo.duedate != today's date, 
                continue;
            } else if (filter=="Upcoming"){
                //if todo.duedate later than one week from now,
                continue;
            }

            renderTodo(todo);
        }
    }

}

export function renderProject(project){
    const listTitle = document.querySelector('#list-title');
    listTitle.textContent = project.title;
    
    const todosContainer = document.querySelector('#todos-container');
    todosContainer.innerHTML = '';

    const addTodoContainer = document.querySelector('#add-todo-container');
    addTodoContainer.innerHTML = '';
    const addTodoButton = document.createElement("button");
    addTodoButton.classList.add("add-todo-button");
    addTodoButton.innerHTML = '<span class="material-symbols-outlined">add_box</span>';
    addTodoButton.addEventListener('click', function() {
        displayPopup("add-todo");
    });
    addTodoContainer.appendChild(addTodoButton);

    /*
    document.querySelector('.edit').addEventListener('click', function(){
        displayPopup("edit-todo", todo);
    });

    document.querySelector('.delete').addEventListener('click', function(){
        displayPopup("delete-todo");
    });
    */

    for (let i=0; i<project.todoList.length; i++){
        renderTodo(project.todoList[i]);
    }
}

export function addProjectToSidebar(project){
    const projectsSidebar = document.querySelector('.projects');
    const projectButton = document.createElement('button');
    projectButton.classList.add('sidebar-button');
    projectButton.classList.add('project');
    projectButton.setAttribute('data-id', project.id);
    projectButton.addEventListener('click', function(event){
        changeSelectedSidebarButton(event);
        renderProject(project);
    });

    const projectName = document.createElement("span");
    projectButton.appendChild(projectName);
    projectName.textContent = project.title;

    const deleteProjectButton = document.createElement('button');
    deleteProjectButton.classList.add('sidebar-button');
    deleteProjectButton.classList.add('right-aligned');
    deleteProjectButton.classList.add('delete-project-button');
    deleteProjectButton.innerHTML = '<span class="material-symbols-outlined">delete</span>';
    deleteProjectButton.addEventListener('click', function(){
        displayPopup("delete-project");
    });

    const rightAlignedDiv = document.createElement("div");
    rightAlignedDiv.classList.add("right-aligned")
    rightAlignedDiv.appendChild(deleteProjectButton);

    projectButton.appendChild(rightAlignedDiv);
    projectsSidebar.appendChild(projectButton);



}

function displayAddTodo(){
    const title = document.querySelector(".popup-title");
    title.textContent = "Add new task";
    const content = document.querySelector(".popup-content");
    content.innerHTML = 
        `<form>
            <label for="title">Title:</label>
            <input type="text" id="title-input" name="title">
            <label for="description">Due date:</label>
            <input type="text" id="date-input" name="date">
            <label for="description">Project:</label>
            <input type="text" id="project-input" name="project">
        </form>
        `;

    const buttons = document.querySelector(".popup-buttons");
    const addButton = document.createElement("button");
    addButton.classList.add("add");
    addButton.textContent = "Add";
    addButton.addEventListener("click", function(event){
        hidePopup();
    });

    const cancelButton = document.createElement("button");
    cancelButton.classList.add("cancel");
    cancelButton.textContent = "Cancel";
    cancelButton.addEventListener("click", function(event){
        hidePopup();
    });
    buttons.appendChild(addButton);
    buttons.appendChild(cancelButton);
}

function displayEditTodo(todo){
    const title = document.querySelector(".popup-title");
    title.textContent = "Edit task";
    const content = document.querySelector(".popup-content");
    content.innerHTML = 
        `<form>
            <label for="title">Title:</label>
            <input type="text" id="title-input" name="title" value=${todo.title}>
            <label for="description">Description:</label>
            <input type="text" id="date-input" name="date" value=${todo.dueDate}>
            <label for="description">Project:</label>
            <input type="text" id="project-input" name="project" value=${todo.project}>
            <label for="description">Completed:</label>
            <input type="text" id="project-input" name="project" value=${todo.completed}>
        </form>
        `;

    const buttons = document.querySelector(".popup-buttons");
    const saveButton = document.createElement("button");
    saveButton.classList.add("add");
    saveButton.textContent = "Save changes";
    saveButton.addEventListener("click", function(event){
        hidePopup();
    });

    const cancelButton = document.createElement("button");
    cancelButton.classList.add("cancel");
    cancelButton.textContent = "Cancel";
    cancelButton.addEventListener("click", function(event){
        hidePopup();
    });
    buttons.appendChild(saveButton);
    buttons.appendChild(cancelButton);
}

function displayDeleteTodoConfirmation(){
    const title = document.querySelector(".popup-title");
    title.textContent = "Delete task?";
    const content = document.querySelector(".popup-content");

    const buttons = document.querySelector(".popup-buttons");
    const confirmButton = document.createElement("button");
    confirmButton.textContent = "Confirm";
    confirmButton.addEventListener("click", function(event){
        hidePopup();
    });

    const cancelButton = document.createElement("button");
    cancelButton.classList.add("cancel");
    cancelButton.textContent = "Cancel";
    cancelButton.addEventListener("click", function(event){
        hidePopup();
    });
    buttons.appendChild(confirmButton);
    buttons.appendChild(cancelButton);
}

function displayAddProject(){
    const title = document.querySelector(".popup-title");
    title.textContent = "Add new project";
    const content = document.querySelector(".popup-content");
    content.innerHTML = 
        `<form>
            <label for="title">Title:</label>
            <input type="text" id="title-input" name="title">
        </form>
        `;

    const buttons = document.querySelector(".popup-buttons");
    const addButton = document.createElement("button");
    addButton.classList.add("add");
    addButton.textContent = "Add";
    addButton.addEventListener("click", function(event){
        hidePopup();
    });

    const cancelButton = document.createElement("button");
    cancelButton.classList.add("cancel");
    cancelButton.textContent = "Cancel";
    cancelButton.addEventListener("click", function(event){
        hidePopup();
    });
    buttons.appendChild(addButton);
    buttons.appendChild(cancelButton);

}

function displayEditProject(project){
    const title = document.querySelector(".popup-title");
    title.textContent = "Edit project";
    const content = document.querySelector(".popup-content");
    content.innerHTML = 
        `<form>
            <label for="title">Title:</label>
            <input type="text" id="title-input" name="title" value=${todo.title}>
        </form>
        `;

    const buttons = document.querySelector(".popup-buttons");
    const saveButton = document.createElement("button");
    saveButton.classList.add("add");
    saveButton.textContent = "Save changes";
    saveButton.addEventListener("click", function(event){
        hidePopup();
    });

    const cancelButton = document.createElement("button");
    cancelButton.classList.add("cancel");
    cancelButton.textContent = "Cancel";
    cancelButton.addEventListener("click", function(event){
        hidePopup();
    });
    buttons.appendChild(saveButton);
    buttons.appendChild(cancelButton);
}

function displayDeleteProjectConfirmation(){
    const title = document.querySelector(".popup-title");
    title.textContent = "Delete project?";
    const content = document.querySelector(".popup-content");

    const buttons = document.querySelector(".popup-buttons");
    const confirmButton = document.createElement("button");
    confirmButton.textContent = "Confirm";
    confirmButton.addEventListener("click", function(event){
        hidePopup();
    });

    const cancelButton = document.createElement("button");
    cancelButton.classList.add("cancel");
    cancelButton.textContent = "Cancel";
    cancelButton.addEventListener("click", function(event){
        hidePopup();
    });
    buttons.appendChild(confirmButton);
    buttons.appendChild(cancelButton);
}

export function displayPopup(type, element=null){
    document.querySelector("#content").style.opacity = "60%";
    const popupContainer = document.querySelector(".popup-container");
    popupContainer.style.display = "inline";
    switch (type){
        case "add-todo":
            displayAddTodo();
            break;
        case "edit-todo":
            displayEditTodo(element);
            break;
        case "delete-todo":
            displayDeleteTodoConfirmation();
            break;
        case "add-project":
            displayAddProject();
            break;
        case "edit-project":
            displayEditProject(element);
            break;
        case "delete-project":
            displayDeleteProjectConfirmation();
            break;
    }
}

export function hidePopup(){
    document.querySelector("#content").style.opacity = "100%";
    const popupContainer = document.querySelector(".popup-container");
    popupContainer.classList.remove(popupContainer.classList[1]);
    popupContainer.style.display = "none";
    document.querySelector(".popup-content").innerHTML = "";
    document.querySelector(".popup-buttons").innerHTML = "";
}