import './components';
import { MainPage } from './pages/main/main-page';
import { myRouter } from './router';

myRouter.addRoute('/', MainPage.selector, 'MainPage');

myRouter.mountOn(document.getElementById('app')!);
