# Todo-List App
Basic todo list app for adding, listing, deleting, updating todos. You can also add deadline of task. You can set the label color to task for grouping in order of importance. The remain day to task is shown on the table. It builts by using Node, Express, MongoDB on back-end and React, Redux, CSS on front-end.

## Installation & Set up
To clone the project, you will need node and npm installed globally on your machine.
After clone the repository, in the project directory firstly you should run

```
npm install

cd client && npm install
```
command.
After that in the project directory, run 
```
npm run dev
```

To visit app:
```
https://todoexapp.herokuapp.com/
```

## Project Structure
### backend
Node.js and express framework are used for server side. Mongodb is used as database. In routes folder todo route is created for mongo db process. In models folder, todoSchema is created. server.js file is used for server side process.

```
Todo schema attributes
* id (string)
* description (string)
* deadline (string)
* labelColor (string)
* completed (string)
```

### frontend
react-bootstrap and react-icons libraries are used in frontend. Axios is used for fetching data and redux is used for state management.

The front-end files are kept in client folder. Components folder contains AddTodo, Filters, Header, TodoList and TodoModal components. Containers folder combines the components. When page is loaded, mongo db connection is provided. The data is fetched by using axios library then update redux.
* When click the add buton, it renders AddTodo and TodoModal component. After the task is added to database, redux is updated.
* TodoModal component is a form to entering task information which are description, deadline and label color of task.
* Filters component is rendered for filtering tasks as all/incompleted/completed. You can check the task as completed and view completed or incompleted tasks separately.
* Header component renders the app title.
* TodoList component renders a table which shows the list of the task info. Each todo item has delete button, update button and check button to marked the task as completed. When the item is deleted or edited, firstly database is updated then redux is updated and list is rerendered.
