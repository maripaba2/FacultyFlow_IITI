import { Schema, model, models } from 'mongoose';

const InventorySchema = new Schema({
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
 department:{
    type:String,
    required: [true, 'Department is required!']
 },
 arrival:{
    type:Date,
    required: [true, 'Arrival is required!']
 },
 deadline:{
    type:Date,
    required: [true, 'Deadline is required!']
 },
 price:{
    type:Number,
    required: [true, 'Price is required!']
 },
 task:{
    type:String,
    required: [true, 'Task is required!']
 },
 company:{
    type:String,
    required: [true, 'Company is required!']
 },
 
 
 link:{
    type:String,
    
 }






  
});

const Inventory = models.Inventory || model("Inventory", InventorySchema);

export default Inventory;