import { html, Jadis } from '@jadis/core';

import { TodoList } from '../../components';
import style from './main-page.css?inline';

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
