1) run docker compose, run migrations, run backend, run frontend

<h1 align="center">Donate app</h1>

## The Documentation file for project setup. Do the steps in the mentioned order. Before you begin, ensure you have the following installed on your local machine:

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [git](https://git-scm.com/)
- [TypeScript](https://www.typescriptlang.org/)

### Project Setup

- Clone the project repository
```bash
git clone https://github.com/razachikyan/donate-app.git
```
- Open the project folder with your favorite code editor

#### Setup the Frontend
- Open the frontend project folder
  ```bash
  cd client
  ```
- Install the necessary packages and libs
  ```bash
  npm install
  ```
- Define the environment variables (copy the text from .env.example file, create .env file, past the copied text and define the values)
- Run the project in development mode
  ```bash
  npm run dev
  ```
- Build the project
  ```bash
  npm run build
  ```
- Run the project in production mode
  ```bash
  npm start
  ```

#### Setup the Backend

- Open the frontend project folder
  ```bash
  cd server
  ```
- Install the necessary packages and libs
  ```bash
  npm install
  ```
- Define the environment variables (copy the text from the `.env.example` file, create a `.env` file, past the copied text and define the values)
- Run the project in development mode
  ```bash
  npm run dev
  ```
- Build the project
  ```bash
  npm run build
  ```
- Run the project in production mode
  ```bash
  npm start
  ```
#### Setup the Database

- Start the PostgreSQL container 
  ```bash
  docker-compose up --build
  ```
- Run the migrations
  ```bash
  cd server
  npm run migrate
  ```

