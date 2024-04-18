import { Schema, model, models } from 'mongoose';

const CallogSchema = new Schema({
creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    },
Link:{
    type:String,
    required: [true, 'Link is required!']
},
 
});

const Callog = models.Callog || model("Callog", CallogSchema);

export default Callog;