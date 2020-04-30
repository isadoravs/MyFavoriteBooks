import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import App from './app.routes';

const Routes = createAppContainer(createSwitchNavigator({App}));

export default Routes;
