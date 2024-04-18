import { Schema, model, models } from 'mongoose';

const InventSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
 title:{
   type:String,
   required: [true, 'Title is required!']
 },
 place:{
    type:String,
   required: [true, 'Place is required!']
 },
 
 deadline:{
    type:String,
    required: [true, 'Deadline is required!']
 },
 price:{
    type:Number,
    required: [true, 'Price is required!']
 },
 type:{
    type:String,
    required: [true, 'Type is required!']
 },
 
 link: {
   type: String,
 }
  
});

const Invent = models.Invent || model("Invent", InventSchema);

export default Invent;