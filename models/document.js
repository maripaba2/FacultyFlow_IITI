import { Schema, model, models } from 'mongoose';

const DocumentSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
 title:{
   type:String,
   required: [true, 'Title is required!']
 }
 ,
 uploadLink:{
    type:String,
    
 },
 driveLink:{
    type:String,
    
 },






  
});

const Document = models.Document || model("Document", DocumentSchema);

export default Document;