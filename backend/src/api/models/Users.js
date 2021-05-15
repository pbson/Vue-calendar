import { Schema, model } from 'mongoose';
import timestamps  from 'mongoose-timestamp';
import Faculty from './Faculties';
import Role from './Roles'

const userSchema = new Schema({
    Name:{
        type: String,
        required: true,
        min: 6,
        max: 25,
    },
    Email:{
        type: String,
        required: true,
        min: 6,
        max: 25
    },
    Password:{
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    Role: { 
        type: Schema.Types.ObjectId, 
        ref: Role
    },
    Faculty: { 
        type: Schema.Types.ObjectId, 
        ref: Faculty 
    },
    Avatar:{
        type: String,
        // required: true,
    },
    CalendarLists:[{ type: Schema.Types.ObjectId, ref: 'CalendarEntries' }]
})
userSchema.plugin(timestamps);
userSchema.index({'Email': 'text'});

export default model('User', userSchema)