import { Schema, model } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import Users from './Users'
import AccessRules from './AccessRules'
import Events from './Events'

const baseCalendarsSchema = new Schema({
    Owner: {
        type: Schema.Types.ObjectId,
        ref: Users
    },
    CalendarTitle: {
        type: String,
        required: true,
        text: true
    },
    CalendarDescription: {
        type: String,
        required: true
    },
    isHidden: { 
        type: Boolean, 
        required: true
    },
    AccessRuleId:{
        type: Schema.Types.ObjectId, 
        ref: AccessRules,
        required: true
    },
    Events: [{ type: Schema.Types.ObjectId, ref: Events }],
})

baseCalendarsSchema.plugin(timestamps);
baseCalendarsSchema.index({'CalendarTitle': 'text'});

export default model('BaseCalendars', baseCalendarsSchema)
