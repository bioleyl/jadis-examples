import './components';
import MainPage from './pages/main/main-page';
import GamePage from './pages/game/game-page';
import { myRouter } from './router';

myRouter.addRoute('/', MainPage.selector, 'MainPage');
myRouter.addRoute('/game/:difficulty', GamePage.selector, 'GamePage');

myRouter.mountOn(document.getElementById('app')!);
