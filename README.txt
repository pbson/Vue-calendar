Install MongoDB version 4.2 (MongoDB Compass will also be installed)
Open MongoDB Compass and connect using port 27017
Import DB
Open a terminal
mongod
Open another terminal in dump folder
mongorestore -d backend ./backend

Open terminal and go into Vue-Calendar folder
cd backend
npm i
npm run serve

Open another terminal and also go to Vue-Calendar
cd frontend
npm i 
npm run serve

Login Admin: /admin/login with mail admin@gm
Login Ministry: /minsitry/login
Register Ministry: /minsitry/register
