// const mongoose = require('mongoose');

import { Model, Schema, model } from 'mongoose';

const userSchema : Schema<IUser> = new Schema<IUser>({
    username: {
        type: String, 
        required: [true, 'Username is required. '],
        match: [/^[a-zA-Z0-9]+$/, 'Username must contain only letters and numbers'],
        minlength: [3, 'Username must be at least 3 characters long.'],
        maxlength: [30, 'Username can be up to 30 characters.'],
        trim: true, 
        lowercase:true,
        unique: true,
    },
    userFirstName: {
        type: String, 
        required: [true, 'First Name is required. '], 
        minlength: [1, 'First name must be at least 1 characters long.'],
        maxlength: [255, 'First name can be up to 255 characters.'],
        trim:true
    },
    userLastName: {
        type: String, 
        required: [true, 'Last Name is required. '], 
        minlength: [1, 'Last name must be at least 1 characters long.'],
        maxlength: [255, 'Last name can be up to 255 characters.'],
        trim:true
    },
    userEmail: {
        type: String, 
        required: [true, 'E-Mail is required. '],
        match: [/.+\@.+\..+/, 'Please enter a valid email.'], 
        minlength: [1, 'E-mail must be at least 1 characters long.'],
        maxlength: [255, 'E-mail can be up to 255 characters.'],
        trim:true, 
        lowercase: true
    },
    userNickname: {
        type: String, 
        required: [true, 'Nickname is required. '], 
        minlength: [3, 'Nickname must be at least 3 characters long'],
        maxlength: [30, 'Nickname can be up to 30 characters.'],
        trim: true, 
    },
    userDateOfBirth: {
        type: Date,
        required: [true, 'Date Of Birt info is required.'],
        validate: {
            validator: function(v:Date) {
            const today = new Date();
            const sixteenYearsAgo = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());
            return v <= sixteenYearsAgo;
            },
            message: 'You must be over 16!'
        }
    },
    status: { type: Boolean, required: true, default: true }

}, {timestamps: true});

// const getUserDataSchema : Schema<IUserData> = new Schema({
//     userAvatar: {type: String},
//     userBackground: {type: String},
//     username: {type: String},
//     userFirstName: {type: String},
//     userLastName: {type: String},
//     userEmail: {type: String},
//     userNickname: {type: String},
//     userRecoveryKey: {type: String},
//     status: {type: Boolean}

// }, {timestamps: true});

const userAuthDataSchema : Schema<IUserAuthData> = new Schema({
    username: {
        type: String, required: [true, 'Username is required. '], 
        match: [/^[a-zA-Z0-9]+$/, 'Username must contain only letters and numbers'],
    },
    password: {
        type: String, 
        required: [true, 'Password is required.'], 
        minlength: [7, 'Password must be at least 6 characters long.'], 
        trim:true
    },
    status: {
        type: Boolean,
        default: true
    }
}, {timestamps: true});

//look at the password. is really required?
const userAuthLogSchema : Schema<IUserAuthLog> = new Schema({
    username: 
        {type: String, required: [true, 'Username is required. '],
        match: [/^[a-zA-Z0-9]+$/, 'Username must contain only letters and numbers'],},
    
    token: {type: String, required: [true, 'Username is required. ']}
}, {timestamps: true});

const userRecoveryKeySchema : Schema<IUserRecoveryKeyData> = new Schema({
    // userId: {type: String, required: [true, 'User is required. '],},
    //await userId: newUser._id in controller
    username: {type: String, required: [true, 'User is required. '],},
    key: {type: String, required: [true, 'Key is required. '],},
}, {timestamps: true});



const userSchemaExport : Model<IUser> = model<IUser>('user', userSchema, 'userData');

// const getUserSchemaExport : Model<IUserData> = model<IUserData>('getUser', getUserDataSchema, 'userData');

const userAuthDataSchemaExport : Model<IUserAuthData> = model<IUserAuthData>('userAuth', userAuthDataSchema, 'userAuthData');

const userAuthLogSchemaExport : Model<IUserAuthLog> = model<IUserAuthLog>('userAuthLog', userAuthLogSchema, 'userAuthLogData');

const userRecoveryKeySchemaExport : Model<IUserRecoveryKeyData> = model<IUserRecoveryKeyData>('userRecoveryKey', userRecoveryKeySchema, 'userRecoveryKeyData');


export {
    userSchemaExport,
    // getUserSchemaExport,
    userAuthDataSchemaExport,
    userAuthLogSchemaExport,
    userRecoveryKeySchemaExport
}