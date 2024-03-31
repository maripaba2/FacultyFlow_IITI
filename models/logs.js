import { Schema, model, models } from 'mongoose';

const LogsSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
 title:{
   type:String,
   required: [true, 'Title is required!']
 },
 type:{
    type:String,
    required: [true, 'Type is required!']
 },
 entry:{
    type:String,
    required: [true, 'entry is required!']
 },
 price:{
   type:Number,
   required: [true, 'price is required!']
}
});

const Logs = models.Logs || model("Logs", LogsSchema);

export default Logs;