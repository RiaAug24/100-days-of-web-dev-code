const TodosApp = {
  data() {
    return {
      isLoading: false,
      todos: [],
      enteredTodoText: "",
      editedTodoId: null,
    };
  },
  methods: {
    async saveTodo(e) {
      e.preventDefault();

      console.log(this.editedTodoId);
      if (this.editedTodoId) {
        // Updating todo
        const todoId = this.editedTodoId;

        const todoIndex = this.todos.findIndex((todoItem) => {
          return todoItem.id === todoId;
        });

        let response;

        try {
          response = await fetch("http://localhost:3000/todos/" + todoId, {
            method: "PATCH",
            body: JSON.stringify({
              newText: this.enteredTodoText,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
        } catch (error) {
          alert("Something went wrong!");
          return;
        }

        if (!response.ok) {
          alert("Something went wrong!");
          return;
        }
        console.log(this.todos);
        const updatedTodoItem = {
          id: this.editedTodoId,
          text: this.enteredTodoText,
        };
        this.editedTodoId = null;
        this.todos[todoIndex] = updatedTodoItem;
      } else {
        // console.log("Control flow made it here!");
        // Creating todo

        let response;
        try {
          response = await fetch("http://localhost:3000/todos", {
            method: "POST",
            body: JSON.stringify({
              text: this.enteredTodoText,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
        } catch (error) {
          alert("Something went wrong!");
          return;
        }
        if (!response.ok) {
          alert("Something went wrong!");
          return;
        }

        const responseData = await response.json();
        const todoId = responseData.createdTodo.id;

        const newTodo = {
          id: todoId,
          text: this.enteredTodoText,
        };

        this.todos.push(newTodo);
      }
      this.enteredTodoText = "";
    },
    startEditTodo(todoId) {
      this.editedTodoId = todoId;
      const todo = this.todos.find((todoItem) => {
        return todoItem.id === todoId;
      });
      this.enteredTodoText = todo.text;
    },
    async deleteTodo(todoId) {
      let response;

      try {
        response = await fetch("http://localhost:3000/todos/" + todoId, {
          method: "DELETE",
        });
      } catch (error) {
        alert("Something went wrong!");
        return;
      }

      if (!response.ok) {
        alert("Something went wrong!");
        return;
      }
      this.todos = this.todos.filter((todoItem) => {
        return todoItem.id !== todoId;
      });
    },
  },
  async created() {
    let response;
    this.isLoading = true;
    try {
      response = await fetch("http://localhost:3000/todos/");
    } catch (error) {
      alert("Something went wrong!");
      return;
    }
    this.isLoading = false;

    if (!response.ok) {
      alert("An error occurred!");
    }

    const responseData = await response.json();
    this.todos = responseData.todos;
  },
};

Vue.createApp(TodosApp).mount("#todos-app");
