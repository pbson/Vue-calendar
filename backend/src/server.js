if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

import express from 'express';
const app = express()
const server = require('http').createServer(app)
import fileUpload from 'express-fileupload';
import { json as _json } from 'body-parser';
import cors from 'cors';

//cors
app.use(cors())
app.use(express.json());
app.use(_json());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));
app.use(express.static(__dirname + '/public/'));

app.set("view engine", "ejs"); 

server.listen(process.env.PORT || 3000);

//Mongoose connect
import { connect, connection } from 'mongoose';

connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, 'useCreateIndex':true})

const db = connection
db.on('error',error => console.log(error));
db.on('open',() => console.log('Connected to mongoose'));

//Import Routes
import UserRouter from './api/routes/UserRoutes';
import BaseCalendarRouter from './api/routes/BaseCalendarsRoutes';

app.use('/auth', UserRouter);
app.use('/base-calendar', BaseCalendarRouter);

