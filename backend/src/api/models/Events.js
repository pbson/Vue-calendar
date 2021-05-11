import { Schema, model } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import Users from './Users'
import AccessRules from './AccessRules'

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
    },
    Duration: {
        type: String,
    },
    IsRecurring: {
        type: Boolean,
    },
    RecurrencePattern: {
        type: String,
    },
    Owner: {
        type: Schema.Types.ObjectId,
        ref: Users,
        required: true
    },
    ResponseStatus: {
        type: String,
    },
    Attendees: [
        {
            UserId: {
                type: Schema.Types.ObjectId,
                ref: Users,
            },
            AccessRuleId: {
                type: Schema.Types.ObjectId,
                ref: AccessRules,
            },
            ResponseStatus: {
                type: String,
            },
        }
    ],
    ColorId: {
        type: Schema.Types.ObjectId,
        ref: 'Colors',
        required: true
    },
    BaseCalendarId: {
        type: Schema.Types.ObjectId,
        ref: 'BaseCalendars',
        required: true
    },
    IsComplete: {
        type: Boolean,
    },
    Type: {
        type: String,
    }
})

eventsSchema.plugin(timestamps);
eventsSchema.index({ Owner: 1 });
export default model('Events', eventsSchema)