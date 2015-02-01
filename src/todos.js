import {TodoItem} from './todo-item';
import _ from 'underscore';

export class Todos {
  constructor() {
    this.filter = undefined;
    this.items = [];
    this.newTodoTitle = null;
  }

  activate(params) {
    this.filter = params.filter;
  }

  addNewTodo(title = this.newTodoTitle) {
    var newTodoItem = new TodoItem(title);
    this.items.push(newTodoItem);
    this.newTodoTitle = null;
  }

  deleteTodo(todoItem) {
    var index = this.items.indexOf(todoItem);
    if (index < 0) return;

    this.items.splice(index, 1);
  }

  clearCompletedTodos() {
    this.items = _(this.items).filter(i => !i.isChecked);
  }

  get countTodosLeft() {
    return _(this.items).filter(i => !i.isChecked).length;
  }

  get filteredItems() {
    switch(this.filter) {
      case 'active':    return _(this.items).filter(i => !i.isChecked);
      case 'completed': return _(this.items).filter(i =>  i.isChecked);
    }

    return this.items;
  }
}
