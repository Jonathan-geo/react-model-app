import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Store from './componentes/store'
import migrations from './componentes/migrations'
import swDev from './swDev'
//import * as serviceWorker from '../public/serviceWorker';


setTimeout(() => {
	ReactDOM.render(
    <React.StrictMode>
      <App store={new Store('todoList', migrations)} />
    </React.StrictMode>,
    document.getElementById('root')
	);
}, 1000);
swDev();

//serviceWorker.register();