import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App';
import {Provider} from 'react-redux';
import configureStore from './redux/configureStore';
import rootReducer from './redux/reducers';
const store = configureStore(rootReducer);

ReactDOM.render(<Provider store={store}>
<Router>
<App/>
</Router>
</Provider>,document.getElementById('root');
