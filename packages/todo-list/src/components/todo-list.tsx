import { css, Jadis } from '@jadis/core';

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

  private readonly _refs = this.useRefs((ref) => ({
    todoAddElement: ref<TodoAdd>('todo-add'),
    todoListElement: ref('.todo-list'),
  }));

  onConnect(): void {
    this._refs.todoAddElement.events.register('add', (text) => {
      const obj = TodoService.getInstance().add(text);
      this.appendTodo(obj);
    });

    if (this._refs.todoListElement.childElementCount === 0) {
      TodoService.getInstance().getAll().forEach(this.appendTodo.bind(this));
    }
  }

  templateHtml(): Node {
    return (
      <>
        <div class="todo-list" />
        <TodoAdd />
      </>
    );
  }

  templateCss(): string {
    return style;
  }

  private appendTodo(todo: Todo): void {
    const element = <TodoItem checked={todo.completed} text={todo.text} />;
    this._refs.todoListElement.appendChild(element);

    element.events.register('delete', () => {
      TodoService.getInstance().delete(todo);
      element.remove();
    });

    element.events.register('checked', (isChecked: boolean) => {
      todo.completed = isChecked;
      TodoService.getInstance().update(todo);
    });
  }
}

TodoList.register();
