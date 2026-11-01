/**
 * Navigates to a path of the app. The router exists in the browser only (src/entry-client.ts gives it), so the pages
 * navigate through this, not through a router of their own: on the server, they never navigate.
 */
export const navigation = {
  goto: (path: string): void => {
    window.location.assign(path);
  },
};
