import mongoose from 'mongoose';
import { model, Schema, Model, Document } from 'mongoose';
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

export class userInterface {
  _id:string='';
  name:string='';
  profile_picture:string='';
  password:string='';
  email:string ='';
  contact_no:string = '';
  creation_time:number=0;
  creation_date:string='';
  status:boolean =true;
}
const userSchema = new mongoose.Schema({
  _id: {
    type: String
  },
  creation_time: {
    type: Number
  },

  name: {
    type: String,
    required: true,
    
  },

  profile_picture: {
    type: String
  },

  creation_date: {
    type: String
  },

  password: {
    type: String
  },

  email: {
    type: String
  },
  contact_no: {
    type: String
  },
  status:{
   type:Boolean 
  },
});

userSchema.plugin(aggregatePaginate);
export const User = model('user', userSchema);

module.exports = { User, userInterface };
