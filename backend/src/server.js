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
import AccessRuleRouter from './api/routes/AccessRuleRoutes';
import BaseCalendarRouter from './api/routes/BaseCalendarsRoutes';
import CalendarEntriesRouter from './api/routes/CalendarEntriesRoutes';
import ColorRouter from './api/routes/ColorRoutes';
// import EventExceptionRouter from './api/routes/EventExceptionRoutes';
import EventRouter from './api/routes/EventRoutes';
import FacultyRouter from './api/routes/FacultyRoutes';
import RoleRouter from './api/routes/RoleRoutes';
import SubjectRouter from './api/routes/SubjectRoutes';
import UserRouter from './api/routes/UserRoutes';

app.use('/access-rule',AccessRuleRouter );
app.use('/base-calendar', BaseCalendarRouter);
app.use('/calendar-entries',CalendarEntriesRouter );
app.use('/color', ColorRouter);
// app.use('/event-exception',EventExceptionRouter );
app.use('/event', EventRouter);
app.use('/faculty', FacultyRouter);
app.use('/role', RoleRouter);
app.use('/subject', SubjectRouter);
app.use('/auth', UserRouter);


