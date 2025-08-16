import { html, Jadis } from '@jadis/core';
import style from './main-page.css?inline';
import { TodoList } from '../../components';

export class MainPage extends Jadis {
  static readonly selector = 'todo-list-main-page';

  templateHtml(): DocumentFragment {
    return html`
      <h1 class="title">Todo List</h1>
      <p>This is a simple todo list application for managing tasks.</p>
      ${TodoList.createElement()}
    `;
  }

  templateCss(): string {
    return style;
  }
}

MainPage.register();
