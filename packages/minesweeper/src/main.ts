import GamePage from './pages/game/game-page';
import MainPage from './pages/main/main-page';
import { myRouter } from './router';

myRouter.addRoute('/', MainPage.selector, { name: 'MainPage' });
myRouter.addRoute('/game/:difficulty', GamePage.selector, { name: 'GamePage' });

myRouter.mountOn(document.getElementById('app') ?? document.body);
