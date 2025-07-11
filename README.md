## Tech Stack

- **Frontend:** React (with Vite)
- **Backend:** Node.js, Express
- **Database:** MySQL or any SQL DB via Sequelize ORM
- **Authentication:** JWT

---

## Setup Instructions

### Clone the repo
git clone <your-repo-url>
cd <your-repo-folder>

## setup the backend(server)

cd server
npm install

## Create a .env file inside /server and add:
PORT=5000
JWT_SECRET=12345

## inside server/config open db.js and replace the "taskdb","postgres","redhat" with your dbname,username and postgrespassword

## Start the server
nodemon server.js

-----

## Setup the frontend

cd ../client/app-ui
npm install

## Start the frontend
npm run dev


## Access the APP

Frontend: http://localhost:5173
Backend: http://localhost:5000



