import { Schema, model, models } from 'mongoose';

const EntrySchema = new Schema({
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
 name:{
    type:String,
    required: [true, 'Department is required!']
  },
 
  amount:{
    type:Number,
    required: [true, 'Department is required!']
  },
 
  date:{
    type:Date,
    required: [true, 'Department is required!']
  },
  link:{
    type:String,
    
  },
 
 






  
});

const Entry = models.Entry || model("Entry", EntrySchema);

export default Entry;