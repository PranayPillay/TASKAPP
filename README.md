## Tech Stack

- **Frontend:** React (with Vite)
- **Backend:** Node.js, Express
- **Database:** MySQL or any SQL DB via Sequelize ORM
- **Authentication:** JWT

---

## Setup Instructions

### Clone the repo
```bash
git clone https://github.com/PranayPillay/TASKAPP
cd TASKAPP
```
## setup the backend(server)
```bash
cd server
npm install
```
## Create a .env file inside /server and add:
PORT=5000
JWT_SECRET=12345

## inside server/config open db.js and replace the "taskdb","postgres","redhat" with your dbname,username and postgrespassword

## Start the server
```bash
nodemon server.js
```
-----

## Setup the frontend
```bash
cd ../client/app-ui
npm install
```
## Start the frontend
```bash
npm run dev
```

## Access the APP

- Frontend: http://localhost:5173
- Backend: http://localhost:5000



