import { Jadis } from '@jadis/core';

import { TodoList } from '../../components/todo-list';
import style from './main-page.css?inline';

export class MainPage extends Jadis {
  static readonly selector = 'todo-list-main-page';

  templateHtml(): Node {
    return (
      <>
        <h1 class="title">Todo List</h1>
        <p>This is a simple todo list application for managing tasks.</p>
        <TodoList />
      </>
    );
  }

  templateCss(): string {
    return style;
  }
}

MainPage.register();
