import React from 'react';

import NavigationContainer from './MainTabNavigator';

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer from '../redux/reducers';
import devToolsEnhancer from 'remote-redux-devtools';
import { composeWithDevTools } from 'remote-redux-devtools';

const middleware = [thunk];
const composeEnhancers = composeWithDevTools || compose;
const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(reducer, enhancer);

const AppNavigator = () => (
	<Provider store={store}>
		<NavigationContainer />
	</Provider>
);

export default AppNavigator;
