import { css, Jadis } from '@jadis/core';

const style = css`
  .todo-item {
    display: flex;
    align-items: center;
    padding: 8px;
    border-bottom: 1px solid #ccc;
  }
  .todo-checkbox {
    margin-right: 8px;
  }
  .todo-text {
    flex: 1;
  }
  .delete-button {
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    height: 24px;
  }
`;

export class TodoItem extends Jadis {
  static readonly selector = 'todo-item';

  private readonly _refs = this.useRefs((ref) => ({
    deleteButton: ref('.delete-button'),
    inputElement: ref<HTMLInputElement>('.todo-checkbox'),
    todoText: ref('.todo-text'),
  }));

  readonly checked = this.useChange(false, (val) => {
    this._refs.inputElement.checked = val;
  });

  readonly text = this.useChange('', (val) => {
    this._refs.todoText.textContent = val;
  });

  events = this.useEvents<{
    delete: undefined;
    checked: boolean;
  }>();

  onConnect(): void {
    this.on(this._refs.deleteButton, 'click', () => {
      this.events.emit('delete');
    });

    this.on(this._refs.inputElement, 'change', () => {
      this.checked.set(this._refs.inputElement.checked);
      this.events.emit('checked', this.checked.get());
    });
  }

  templateHtml(): Node {
    return (
      <div class="todo-item">
        <input type="checkbox" class="todo-checkbox" />
        <span class="todo-text" />
        <button type="button" class="delete-button">
          Delete
        </button>
      </div>
    );
  }

  templateCss(): string {
    return style;
  }
}

TodoItem.register();
