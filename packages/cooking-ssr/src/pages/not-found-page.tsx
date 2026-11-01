import { css, Jadis } from '@jadis/core';

/** Any path no other route matches: the server answers it with a 404 (src/entry-server.ts). */
export class NotFoundPage extends Jadis {
  static readonly selector = 'not-found-page';

  templateHtml(): Node {
    return (
      <>
        <h1>Nothing here</h1>
        <p>
          This address leads nowhere. <a href="/">See the recipes</a>.
        </p>
      </>
    );
  }

  templateCss(): string {
    return css`
      :host {
        display: block;
        max-width: 760px;
        margin: 4rem auto;
        padding: 0 1.5rem;
      }
    `;
  }
}

NotFoundPage.register();
