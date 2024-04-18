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
    required: [true, 'Price is required!']
 },
 






  
});

const Inventory = models.Inventory || model("Inventory", InventorySchema);

export default Inventory;