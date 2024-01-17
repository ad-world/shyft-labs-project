# Shyft Labs Assessment

This application is a Student Result Management System, completed as part of an interview process for ShyftLabs.

## Building the Application
### With Docker
1. Enter `docker compose up --build` in the root directory.
2. The server will be live on `localhost:4000`, and the frontend will be live on `localhost:4173`. There will a network url as well to view the web app on different devices.

### Without Docker
1. Install frontend dependencies and build/run: `cd frontend/ && npm i && npm run build && npm run preview` (run this command from root directory)
2. In another terminal window, install backend dependencies and build/run: `cd backend/ && npm i && npm run build && npm start` (run this command from root directory, or remove first command (`cd backend/`) and run from backend directory).
3. The server will be live on `localhost:4000`, and the frontend will be live on `localhost:4173`. There will a network url as well to view the web app on different devices.


## Tech Stack
- React.js
- Node.js
- Typescript
- Express
- SQLite
- Vite
- Chakra UI
- Docker

