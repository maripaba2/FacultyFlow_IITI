import { Schema, model, models } from 'mongoose';

const FundsSchema = new Schema({
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
 comment:{
    type:String,
    required: [true, 'Comment is required!']
 },
 price:{
    type:Number,
    required: [true, 'Price is required!']
 },
 link:{
    type:String,
    required: [true, 'Link is required!']
 }






  
});

const Funds = models.Funds || model("Funds", FundsSchema);

export default Funds;