
# Vue Calendar

On the user side, this is a similar Web Application to Google Calendar. Some extra features can be seen on the admin side to help school create calendars, events and share it among students, and teachers


## Run locally

#### Note: This repository contains folder for Frontend, Backend and Database
Clone the project

```bash
  git clone https://github.com/pbson/Vue-calendar
```
### Install and connect to MongoDB
- Install MongoDB version 4.2 (MongoDB Compass will also be installed)
- Open MongoDB Compass and connect using port 27017
### Import the Database
- In a terminal:
```bash
 mongod
```
- Open another terminal inside dump folder and type:
```bash
 mongorestore -d backend ./backend
```
### Build and run the backend part
- Inside VueCalendar folder
```bash
cd backend
npm i
npm run serve
```
### Build and run the frontend part
- Inside VueCalendar folder
```bash
cd frontend
npm i 
npm run serve
```
#### Note: Path to access Admin and Ministry
- **Login Admin**: /admin/login with mail admin@gmail.com
- **Login Ministry**: /minsitry/login
- **Register Ministry**: /minsitry/register


