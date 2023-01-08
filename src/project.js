let Project = (id, title) => {
    let todoList = [];

    const edit = () => {
        console.log("editing");
    };

    const addTodo = (todo) => {
        todo.changeProject(title);
        todoList.push(todo);
    };

    const removeTodo = (id) => {

    };
    
    return {
        get id(){
            return id;
        },
        get title(){
            return title;
        },
        get todoList(){
            return todoList;
        },
        edit,
        addTodo,
        removeTodo
    };
};

export default Project;