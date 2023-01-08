let Todo = (id, title, description, dueDate, completed, project) => {

    const edit = () => {
        console.log("editing");
    }

    const toggleCompleted = () => {
        completed = !completed;
    };

    const changeProject = (projectName) => {
        project = projectName;
    }

    return {
        id,
        get title() {
            return title;
        },
        get description() {
            return description;
        },
        get dueDate() {
            return dueDate;
        },
        get completed() {
            return completed;
        },
        get project() {
            return project
        },
        edit,
        toggleCompleted,
        changeProject
    };
};

export default Todo;