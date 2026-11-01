import { css, Jadis } from '@jadis/core';

/**
 * The frame of the site: the header, and the page (its child, shown through the slot). The router puts it around
 * each page of its group, on the server and in the browser alike.
 */
export class SiteRoot extends Jadis {
  static readonly selector = 'site-root';

  templateHtml(): Node {
    return (
      <>
        <header class="header">
          <a class="brand" href="/">
            🍽️ Cooking
          </a>
          <span class="tag">rendered on the server</span>
        </header>
        <main class="main">
          <slot />
        </main>
      </>
    );
  }

  templateCss(): string {
    return css`
      :host {
        display: block;
      }
      .header {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem 1.5rem;
        border-bottom: 1px solid #e7e1d6;
        background: #fff;
      }
      .brand {
        color: inherit;
        font-size: 1.25rem;
        font-weight: 700;
        text-decoration: none;
      }
      .tag {
        margin-left: auto;
        color: #7a6f5d;
        font-size: 0.85rem;
      }
      .main {
        max-width: 760px;
        margin: 0 auto;
        padding: 2rem 1.5rem;
      }
    `;
  }
}

SiteRoot.register();
