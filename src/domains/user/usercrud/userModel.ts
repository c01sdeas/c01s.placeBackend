import { Model, Schema, model } from 'mongoose';
import { IUserPhotosData, IUserRolesData, IUserThemesData } from './userModelTypes.js';

const userPhotosDataSchema : Schema<IUserPhotosData> = new Schema<IUserPhotosData>({
    username: {type: String, required: [true, 'Username is required.']},
    userAvatar:
        {type: String},
    userBackground:
        {type: String}
});

const userThemeDataSchema : Schema<IUserThemesData> = new Schema<IUserThemesData>({
    username: 
        {type: String, required: [true, 'Username is required. '], 
        // unique: [true, 'Username is already taken.'],
        match: [/^[a-zA-Z0-9]+$/, 'Username must contain only letters and numbers'],
        minlength: [3, 'Username must be at least 3 characters long.'],
        trim: true, lowercase:true},
    lights: { type: Boolean, required: [true, 'Lights info is required. '] }
}, {timestamps: true});

const userRolesDataSchema : Schema<IUserRolesData> = new Schema<IUserRolesData>({
    username: 
        {type: String, required: [true, 'Username is required. '], 
        // unique: [true, 'Username is already taken.'],
        match: [/^[a-zA-Z0-9]+$/, 'Username must contain only letters and numbers'],
        minlength: [3, 'Username must be at least 3 characters long.'],
        trim: true, lowercase:true},
    roles: { type: [String], required: [true, 'Roles are required. '] }
}, {timestamps: true});

const userThemeSchemaExport : Model<IUserThemesData> = model<IUserThemesData>('userTheme', userThemeDataSchema, 'userThemesData');

const userRolesSchemaExport : Model<IUserRolesData> = model<IUserRolesData>('userRole', userRolesDataSchema, 'userRolesData');

const userPhotoSchemaExport : Model<IUserPhotosData> = model<IUserPhotosData>('userPhoto', userPhotosDataSchema, 'userPhotosData');

export {
    userThemeSchemaExport,
    userRolesSchemaExport,
    userPhotoSchemaExport
}