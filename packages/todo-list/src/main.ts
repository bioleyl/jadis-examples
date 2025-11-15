import { MainPage } from './pages/main/main-page';
import { myRouter } from './router';

myRouter.addRoute('/', MainPage.selector, { name: 'MainPage' });

myRouter.mountOn(document.getElementById('app') ?? document.body);
