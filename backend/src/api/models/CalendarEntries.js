import { Schema, model } from 'mongoose';
import timestamps  from 'mongoose-timestamp';
import BaseCalendars from './BaseCalendars'
import AccessRules from './AccessRules'
import Colors from './Colors'


const calendarEntriesSchema = new Schema({
    CalendarId: { 
        type: Schema.Types.ObjectId, 
        ref: BaseCalendars,
        required: true
    },
    AccessRuleId:{
        type: Schema.Types.ObjectId, 
        ref: AccessRules,
        required: true
    },
    ColorId:{
        type: Schema.Types.ObjectId, 
        ref: Colors,
        required: true
    },
    Reminders: { 
        type: String
    },
    isHidden: { 
        type: Boolean, 
        required: true
    },
    isPrimary: { 
        type: Boolean, 
        required: true
    },
})

calendarEntriesSchema.plugin(timestamps);
export default model('CalendarEntries', calendarEntriesSchema)