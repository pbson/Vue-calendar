import { Schema, model } from 'mongoose';
import timestamps from 'mongoose-timestamp';

const eventsSchema = new Schema({
    EventTitle: { 
        type: String,
        required: true
    },
    EventDescription: { 
        type: String,
        required: true
    },
    OnDay: { 
        type: String,
        required: true
    },
    StartAt: { 
        type: String,
        required: true
    },
    EndAt: { 
        type: String,
        required: true
    },
    Duration: { 
        type: String,
    },
    IsRecurring: { 
        type: Boolean,
        required: true
    },
    RecurrencePattern: { 
        type: String,
    },
    Owner:{
        type: Schema.Types.ObjectId, 
        ref: 'Users',
        required: true
    },
    ResponseStatus: { 
        type: String,
        required: true
    },
    Attendees: { 
        UserId:{
            type: Schema.Types.ObjectId,
            ref: 'Users',
        },
        AccessRuleId:{
            type: Schema.Types.ObjectId,
            ref: 'AccessRules',
        },
        ResponseStatus:{
            type: String,
        },
    },
    ColorId:{
        type: Schema.Types.ObjectId, 
        ref: 'Colors',
        required: true
    },
    BaseCalendarId: {
        type: Schema.Types.ObjectId, 
        ref: 'BaseCalendars',
        required: true
    },
})

eventsSchema.plugin(timestamps);
export default model('Events', eventsSchema)