## Project 

Esta aplicação é um simples gerador de pasword. O objetivo neste 'exemple_code' é mostrar a interação 
entre um servidor com rotas (back-end - Express) e uma aplicação client (front-end - React) rodando separadamente. 


#### Servidor

Como esta aplicação esta dividida em client e server, necessita que a pasta build esteja criada. 

```javascript
"scripts": {
    "start": "node index.js",
    "heroku-postbuild": "cd client && npm install && npm run build"
}
```
 
> start: `npm run start`

> Open: [http://localhost:5000](http://localhost:5000) 

#### Client

```javascript
 "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
 }
```
> start: `npm run start`

> Build: `npm run build`


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


## Observações

Rodar o comando build para abstração no servidor.