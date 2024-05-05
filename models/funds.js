import { Schema, model, models } from 'mongoose';

const FundsSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
//  title:{
//    type:String,
//    required: [true, 'Title is required!']
//  },

//  arrival:{
//     type:Date,
//     required: [true, 'Date is required!']
//  },
 
 department:{
   type:String,
   required: [true, 'Department is required!']
 },
 
 price:{
    type:Number,
    required: [true, 'Price is required!']
 },
  
 






  
});

const Funds = models.Funds || model("Funds", FundsSchema);

export default Funds;