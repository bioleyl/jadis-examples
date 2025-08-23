import './components';

import GamePage from './pages/game/game-page';
import MainPage from './pages/main/main-page';
import { myRouter } from './router';

myRouter.addRoute('/', MainPage.selector, 'MainPage');
myRouter.addRoute('/game/:difficulty', GamePage.selector, 'GamePage');

myRouter.mountOn(document.getElementById('app') ?? document.body);
