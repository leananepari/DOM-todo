class TodoComponent {
    constructor(componentElement) {
        // Assign outer TodoComponent Element. We should do all of our searching within here, not `document`.
        this.componentElement = componentElement;
        // Get the todos container element
        this.todosElement = document.querySelector('.todos-container');
        // instantiate the Todos class with it
        this.todos = new Todos(this.todosElement);
        // Do the same with form Element
        this.formElement = document.querySelector('.todo-form');
        // I've given you a hint here. Look at the TodoForm constructor.
        this.form = new TodoForm(this.formElement, this.todos); 
    }
}

class Todos {
    constructor(containerElement) {
        this.containerElement = containerElement;
    }
    addTodo(text) {
        // Add a todo element to the container, and instantiate its class
        let p = document.createElement("p");
        let textNode = document.createTextNode(text);
        p.appendChild(textNode);
        this.containerElement.appendChild(p);
        new Todo(p);
    }
}
  
class Todo {
    constructor(todoElement) {
        this.todoElement = todoElement;
        // What do we need to add to make our element to make `this.toggle` work?
        this.todoElement.addEventListener('click', () => this.toggle());
    }
    toggle() {
        // Toggle the element being 'done'
        this.todoElement.classList.toggle('done');
    }
}

class TodoForm {
    // Note the second argument, `todos`. It is an instance of the `Todos` class
    constructor(formElement, todos) {
        this.formElement = formElement;
        this.todos = todos;
        this.input = this.formElement.querySelector('input');
        this.addButton = this.formElement.querySelector('.add');
        this.clearButton = document.querySelector('.clear');

        this.addButton.addEventListener('click', (e) => {
          e.preventDefault(); 
          this.submitTodo();
        });
        // stretch - make a button clear all completed todos
        this.clearButton.addEventListener('click', (e) => {
          e.preventDefault();
          this.clearCompletedTodos();
        })

        
        // https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event
    }

    clearCompletedTodos() {
      // console.log(this.todos.containerElement)
      let todos = this.todos.containerElement.getElementsByTagName('p');
      
      todos = Array.from(todos)
      console.log(todos)
      todos.forEach(elem => {
        if(elem.classList.contains('done')) {
          this.todos.containerElement.removeChild(elem);
        }
      })
    }

    submitTodo() {
      
        // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
        // see 'value'. 
        this.todos.addTodo(this.input.value);
        // We need to actually add a todo to the page. If only we had access to
        // a class that has a member function that does just that.
    }
}

// Instantiate TodoComponent Classes
document.querySelectorAll('.todo-component')
    .forEach(todoElem => new TodoComponent(todoElem));

