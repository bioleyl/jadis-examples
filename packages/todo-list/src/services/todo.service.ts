import { assert } from '@jadis/core';

import type { Todo } from '../types/todo.type';

export class TodoService {
  private static _instance: TodoService;
  private readonly _todos: Todo[] = [];
  private _id = 0;

  private constructor() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      this._todos.push(...JSON.parse(storedTodos));
      this._id = Math.max(...this._todos.map((todo) => todo.id)) + 1;
    }
  }

  static getInstance(): TodoService {
    TodoService._instance ??= new TodoService();
    return TodoService._instance;
  }

  getAll(): Todo[] {
    return this._todos;
  }

  add(text: string): Todo {
    this._id++;
    const todo = {
      completed: false,
      id: this._id,
      text,
    };
    this._todos.push(todo);
    this.saveState();
    return todo;
  }

  delete(todo: Todo): void {
    const index = this._todos.findIndex((t) => t.id === todo.id);
    assert(index !== -1, 'Todo not found');
    this._todos.splice(index, 1);
    this.saveState();
  }

  update(todo: Todo): void {
    const obj = this.getById(todo.id);
    obj.text = todo.text;
    obj.completed = todo.completed;
    this.saveState();
  }

  private getById(id: number): Todo {
    const todo = this._todos.find((t) => t.id === id);
    assert(todo, 'Todo not found');
    return todo;
  }

  private saveState(): void {
    localStorage.setItem('todos', JSON.stringify(this._todos));
  }
}
