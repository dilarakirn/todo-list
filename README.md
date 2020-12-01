# todo-list
Basic todo list app for adding, listing, deleting, updating todos. You can also add deadline of task and set the label color to task. The remain day to task is shown on the table.

## run the project locally
After clone the project, in the project directory you should run "npm run dev" command. You can also check project uri: https://todoexapp.herokuapp.com/

## project structure
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
react-bootstrap and react-icons libraries are in frontend. Axios is used for fetching data and redux is used for state management.

The front-end files are kept in client folder. Components folder contains AddTodo, Filters, Header, TodoList and TodoModal components. Containers folder combines the components. When page is loaded, mongo db connection is provided. The data is get by using axios library then update redux.
* When click the add buton, it renders AddTodo and TodoModal component. After the task is added to database, redux is updated.
* TodoModal component is a form to entering task information which are description, deadline and label color of task.
* Filters component is rendered for filtering tasks as all/incompleted/completed.
* Header component renders the app title.
* TodoList component renders a table which shows the list of the task info. Each todo item has delete button, update button and check button to marked the task as completed. When the item is deleted or edited, firstly database is updated then redux is updated. 
