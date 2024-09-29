# FRONT END - REACT APP

Open terminal on your folder in VsCode

`npm create vite@latest`

choose: react and typescript/js

//change directory to react app

` cd my-react-app-ts`

`npm install`

`npm run dev`

## Bootstrap

https://react-bootstrap.netlify.app/docs/getting-started/introduction

//make sure cd is on the folder

### `npm install react-bootstrap bootstrap`

`Check package.json dependencies if bootstrap is there`

{
/_ The following line can be included in your src/index.js or App.js file _/
}

`import 'bootstrap/dist/css/bootstrap.min.css';`

### goto index.html:

`<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">`

### `Components`

https://react-bootstrap.netlify.app/docs/components/accordion

https://getbootstrap.com/docs/5.3/components/accordion/

## SPA & React Router DOM

A Single Page Application (SPA) is a type of web application that loads a single HTML page and dynamically updates the content as the user interacts with the app. This approach provides a smoother and more responsive user experience, similar to a desktop application, because it avoids full page reloads1.

React Router DOM is a library specifically designed for handling routing in React applications. It allows you to create and manage navigation within your SPA. Here are some key concepts:

### `npm i react-router-dom`

- goto: main.jsx

```html
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById("root")).render(
<BrowserRouter>
  <App />
</BrowserRouter>
);
```

### `npm i axios react-icons`

Axios is a popular promise-based HTTP client for making HTTP requests from both the browser and Node.js environments

React Icons for icons

### `npm i notistack `

cd frontend

Easy to use, customizable, smooth transitions, stack and queue them up!

```html
import { SnackbarProvider } from "notistack";
createRoot(document.getElementById("root")).render(
<BrowserRouter>
  <SnackbarProvider>
    <App />
  </SnackbarProvider>
</BrowserRouter>
);
```

### `npm install @coreui/react @coreui/coreui`

### `npm install @coreui/icons-react @coreui/icons`

- for da dashboard

=====================================================================================

# BACK END - SERVER

## SETUP

`change directory`

- cd backend

### `npm init - y`

- makes a package.json
- "main": "index.js", || inside the package.json

### `index.js`

- create a file; brain of the server
- to run: node index.js

### `inside package.json`

`  "type": "module"`

- allows to use ES Modules; ECMA Scripts

`Inside scripts`
{

`"serve": "node index.js"`

`"dev": "nodemon index.js"`

}

- `npm run serve`
- `npm run dev`

- inside scripts{} in package.json
- kind of like a shorcut command in running the index.js

### `npm i express nodemon`

- install both package

`goto: https://www.npmjs.com/`

- search: express
- be used to build the node API server
- `npm i express`

`npm i nodemon -D`

- when you try to make changes, you need to turn off the server
- nodemon helps to change it w/o turning it off

  ` "devDependencies": {
"nodemon": "^3.1.4"
}`

- inside scripts{ "dev": "nodemon index.js"
  }

### `npm i cors`

Cross-origin resource sharing (CORS) is an extension of the same-origin policy.
You need it for authorized resource sharing with external third parties.
For example, you need CORS when you want to pull data from external APIs that are public or authorized.

### `npm install multer`

You need Multer to handle the image upload on the backend.

`dl one: insomnia, postman, thunder client`

- tools to test api

`dl: git bash`

- cmd: git --version
- .`gitignore: node_modules so that it wont be push in the repo

## index.js

## SETUP MONGO DB

`login via google`: eljontangalin123@gmail.com

`New Project`

- Name
- Permissions - project owner
- Create Project
- Always save username and password for connection string
- `username`: eljontangalin123
- `password`: AJYR6Kl4oMf0of9W
- goto: security> quickstart > add ip: 0.0.0.0/0 anyone
- goto: Database> click Connect to your db> drivers
- NOTE: its different for every cluster
- copy the one inside: `npm install mongodb`
- the <password> - aaabbbccc123
- copy connection string: mongodb+srv://eljontangalin123:<db_password>@backend.igyzi.mongodb.net/?retryWrites=true&w=majority&appName=Backend
- `dl in npmjs: npm i mongoose` - to access mongo db
- `index.js: const mongoose = require('mongoose');`
