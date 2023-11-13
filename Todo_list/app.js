document.addEventListener("DOMContentLoaded", function () {
    // DOM elements
    var taskInput = document.getElementById("new-task");
    var addButton = document.querySelector("button");
    var incompleteTaskHolder = document.getElementById("incomplete-task");
    var completedTasksHolder = document.getElementById("completed-tasks");

    // Event listeners
    addButton.addEventListener("click", addTask);

    function createNewTaskElement(taskString) {
        var listItem = document.createElement("li");
        var checkBox = document.createElement("input");
        var label = document.createElement("label");
        var editInput = document.createElement("input");
        var editButton = document.createElement("button");
        var deleteButton = document.createElement("button");

        checkBox.type = "checkbox";
        editInput.type = "text";

        editButton.innerText = "Edit";
        editButton.className = "edit";
        deleteButton.innerText = "Delete";
        deleteButton.className = "delete";

        label.innerText = taskString;

        listItem.appendChild(checkBox);
        listItem.appendChild(label);
        listItem.appendChild(editInput);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        return listItem;
    }

    function addTask() {
        var taskString = taskInput.value.trim();
        if (taskString !== "") {
            var listItem = createNewTaskElement(taskString);
            incompleteTaskHolder.appendChild(listItem);
            bindTaskEvents(listItem, taskCompleted);
            taskInput.value = "";
        }
    }

    function editTask() {
        var listItem = this.parentNode;
        var editInput = listItem.querySelector('input[type=text]');
        var label = listItem.querySelector("label");
        var isEditing = listItem.classList.toggle("editMode");

        if (isEditing) {
            editInput.value = label.innerText;
            this.innerText = "Save";
        } else {
            label.innerText = editInput.value;
            this.innerText = "Edit";
        }
    }

    function deleteTask() {
        var listItem = this.parentNode;
        var ul = listItem.parentNode;
        ul.removeChild(listItem);
    }

    function taskCompleted() {
        var listItem = this.parentNode;
        completedTasksHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskIncomplete);
    }

    function taskIncomplete() {
        var listItem = this.parentNode;
        incompleteTaskHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskCompleted);
    }

    function bindTaskEvents(taskListItem, eventHandler) {
        var checkBox = taskListItem.querySelector("input[type=checkbox]");
        var editButton = taskListItem.querySelector("button.edit");
        var deleteButton = taskListItem.querySelector("button.delete");

        editButton.addEventListener("click", editTask);
        deleteButton.addEventListener("click", deleteTask);
        checkBox.addEventListener("change", eventHandler);
    }

    // Bind events for existing tasks
    Array.from(incompleteTaskHolder.children).forEach(function (task) {
        bindTaskEvents(task, taskCompleted);
    });

    Array.from(completedTasksHolder.children).forEach(function (task) {
        bindTaskEvents(task, taskIncomplete);
    });
});
