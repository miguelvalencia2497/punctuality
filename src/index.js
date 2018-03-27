import React from 'react';
import ReactDOM from 'react-dom';

import { composeWithDevTools } from 'redux-devtools-extension';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import allReducers from './_reducers';

import PunctualityApp from './_containers/PunctualityApp';

const store = createStore(allReducers, composeWithDevTools(
  applyMiddleware(),
));

ReactDOM.render(
	<Provider store={store}>
		<PunctualityApp/>
	</Provider>,
	document.getElementById('root')
);
