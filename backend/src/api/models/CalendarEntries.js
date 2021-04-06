import { Schema, model } from 'mongoose';
import { timestamps } from 'mongoose-timestamp';

const calendarEntriesSchema = new Schema({
    CalendarId: { 
        type: Schema.Types.ObjectId, 
        ref: 'BaseCalendars',
        required: true
    },
    AccessRuleId:{
        type: Schema.Types.ObjectId, 
        ref: 'AccessRuleId',
        required: true
    },
    ColorId:{
        type: Schema.Types.ObjectId, 
        ref: 'Colors',
        required: true
    },
    Reminders: { 
        minutes:{
            type: String
        },
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