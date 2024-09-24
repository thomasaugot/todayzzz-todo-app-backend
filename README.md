# TODAYZZZ TODOS - Backend PERN stack / hosted on Fly.io

This is the backend of my todo list app I named TODAYZZZ TODOS, providing a RESTful API for managing users, collections, and todo items. <br>
For the frontend code, please go to https://github.com/thomasaugot/todayzzz-todo-app-frontend

## Prerequisites

Before you begin and run the app locally, ensure you have met the following requirements:

- Node.js: You should have Node.js installed on your system. If not, you can download and install it from [nodejs.org](https://nodejs.org/).

## Installation

1. Clone this repository to your local machine:

   ```shell
   git clone https://github.com/thomasaugot/ts-todo-app-backend
   ```

2. Go to the project directory:

   ```shell
   cd ts-todo-app-backend
   ```

3. Install project dependencies:

   ```shell
   npm install
   ```

4. Configure environment variables:

Create a .env file in the project root directory and define the necessary environment variables, such as database connection details, as needed. You can use the .env.example file as a template.

```shell
DATABASE_URL=your_database_url
PORT=3001
```

5. Start the server:

   ```shell
   npm start
   ```

The server should now be running and listening on the specified port.

## Usage

### API Endpoints

1. <b>Create a User (Sign Up)</b><br>
   Endpoint: POST /api/users <br>
   Request Body: JSON with user information<br>
   Response: New user information

2. <b>Get User by ID</b><br>
   Endpoint: GET /api/users/:user_id<br>
   Response: User information by ID

3. <b>Update User by ID</b><br>
   Endpoint: PUT /api/users/:user_id<br>
   Request Body: JSON with updated user information<br>
   Response: Updated user information

4. <b>Delete User by ID</b><br>
   Endpoint: DELETE /api/users/:user_id<br>
   Response: No content

5. <b>Create a Collection</b><br>
   Endpoint: POST /api/collections<br>
   Request Body: JSON with collection information<br>
   Response: New collection information

6. <b>Get All Collections</b><br>
   Endpoint: GET /api/collections<br>
   Response: List of collections

7. <b>Get Collection by ID</b><br>
   Endpoint: GET /api/collections/:collection_id<br>
   Response: Collection information by ID

8. <b>Update Collection by ID</b><br>
   Endpoint: PUT /api/collections/:collection_id<br>
   Request Body: JSON with updated collection information<br>
   Response: Updated collection information

9. <b>Delete Collection by ID</b><br>
   Endpoint: DELETE /api/collections/:collection_id<br>
   Response: No content

10. <b>Create a Todo Item</b><br>
    Endpoint: POST /api/todo_items<br>
    Request Body: JSON with todo item information<br>
    Response: New todo item information

11. <b>Get Todo Item by ID</b><br>
    Endpoint: GET /api/todo_items/:todo_item_id<br>
    Response: Todo item information by ID

12. <b>Update Todo Item by ID</b><br>
    Endpoint: PUT /api/todo_items/:todo_item_id<br>
    Request Body: JSON with updated todo item information<br>
    Response: Updated todo item information

13. <b>Delete Todo Item by ID</b><br>
    Endpoint: DELETE /api/todo_items/:todo_item_id<br>
    Response: No content

## Tech stack

This project was built using React, Typescript, Express, Node.js, PostgrSQL, Jest and SCSS.

## Demo

Access the live website at https://todayzzz-todos.netlify.app/
