import { Schema, model, models } from 'mongoose';

const TravelSchema = new Schema({
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
 departure:{
    type:String,
    required: [true, 'Departure is required!']
 },
 arrival:{
    type:String,
    required: [true, 'Arrival is required!']
 },
 type:{
    type:String,
    required: [true, 'Type is required!']
 },
 
 link: {
   type: String,
 }
  
});

const Travel = models.Travel || model("Travel", TravelSchema);

export default Travel;
