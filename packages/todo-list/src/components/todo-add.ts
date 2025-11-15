import { css, html, Jadis } from '@jadis/core';

const style = css`
  .todo-add {
    display: flex;
  }
  .todo-input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 8px;
  }
  .add-button {
    padding: 8px 16px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

export class TodoAdd extends Jadis {
  static readonly selector = 'todo-add';

  private readonly _refs = this.useRefs((ref) => ({
    addButton: ref('.add-button'),
    inputElement: ref<HTMLInputElement>('.todo-input'),
  }));

  events = this.useEvents<{
    add: string;
  }>();

  onConnect(): void {
    this.on(this._refs.addButton, 'click', () => this.onAddEvent());
    this.on(this._refs.inputElement, 'keydown', (event) => {
      if (event.key === 'Enter') {
        this.onAddEvent();
      }
    });
  }

  templateHtml(): DocumentFragment {
    return html`
      <div class="todo-add">
        <input type="text" class="todo-input" placeholder="Add a new todo..." autofocus />
        <button class="add-button">Add</button>
      </div>
    `;
  }

  templateCss(): string {
    return style;
  }

  private onAddEvent(): void {
    const value = this._refs.inputElement.value.trim();
    if (value) {
      this.events.emit('add', value);
      this._refs.inputElement.value = '';
    }
  }
}

TodoAdd.register();
