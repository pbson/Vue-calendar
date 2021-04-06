import { Schema, model } from 'mongoose';
import timestamps from 'mongoose-timestamp';

const baseCalendarsSchema = new Schema({
    Owner: { 
        type: Schema.Types.ObjectId, 
        ref: 'Users' 
    },
    CalendarTitle:{
        type: String,
        required: true
    },
    CalendarDescription:{
        type: String,
        required: true
    },
    Events: { 
        type: Array, 
        required: true
    }
})

baseCalendarsSchema.plugin(timestamps);
export default model('BaseCalendars', baseCalendarsSchema)