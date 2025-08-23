import { css, html, Jadis } from '@jadis/core';

import { TodoService } from '../services/todo.service';
import { TodoAdd } from './todo-add';
import { TodoItem } from './todo-item';

import type { Todo } from '../types/todo.type';

const style = css`
  :host {
    display: block;
    padding: 16px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-width: 400px;
  }
  .todo-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

export class TodoList extends Jadis {
  static readonly selector = 'todo-list';

  onConnect(): void {
    this.todoAddElement.events.register('add', (text) => {
      const obj = TodoService.getInstance().add(text);
      this.appendTodo(obj);
    });

    TodoService.getInstance().getAll().forEach(this.appendTodo.bind(this));
  }

  templateHtml(): DocumentFragment {
    return html`
      <div class="todo-list"></div>
      ${TodoAdd.createElement()}
    `;
  }

  templateCss(): string {
    return style;
  }

  private appendTodo(todo: Todo): void {
    const element = new TodoItem();
    element.text = todo.text;

    element.events.register('delete', () => {
      TodoService.getInstance().delete(todo);
      element.remove();
    });

    element.events.register('checked', (isChecked) => {
      todo.completed = isChecked;
      TodoService.getInstance().update(todo);
    });

    this.todoListElement.appendChild(element);
  }

  private get todoAddElement(): TodoAdd {
    return this.getElement('todo-add');
  }

  private get todoListElement(): HTMLElement {
    return this.getElement('.todo-list');
  }
}

TodoList.register();
