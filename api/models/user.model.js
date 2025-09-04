import mongoose from "mongoose";
import { type } from "os";

const userSchema = new  mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    number : {
        type : Number
    },
    dob : {
        type : Date,
    },
    location : {
        type : String
    },
    skills : {
        type : Array
    },
    gender : {
        type : String
    },
    linkedin : {
        type : String
    },
    about : {
        type : String
    },
    jobTitle:{
        type : String
    },
    officeLocation : {
        type : String
    },
    empType : {
        type : String
    },

    avatar : {
        type : String,
    },
} , {timestamps: true});

const User = mongoose.model('user' , userSchema);

export default User;  // this will be used in our routes to interact with the database.  // this file should be imported into the server.js file.  // This file should be created in the models folder.  // this file should be created in the models folder.  // this file should be created in the models folder.  // this file should be created in the models folder.  // this file should be created in the models folder.  // this file should

