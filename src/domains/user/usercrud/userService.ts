import { userSchemaExport } from "../authentication/authModel.js";
import { IUserPhotosData, IUserThemesData } from "./userModelTypes.js";
import { userPhotoSchemaExport, userRolesSchemaExport, userThemeSchemaExport } from "./userModel.js";

const user = userSchemaExport;
const getUsersListService = async (): Promise<ResponseWithMessage<IUserData[]>> => {
    try {
        return {statusCode: 200, success: true, data: await user.find()};
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

//roles
const getUserRolesDataService = async (username:string): Promise<ResponseWithMessage<string[]>> => {
    try {
        const userRoles = await userRolesSchemaExport.findOne({username});
        if(userRoles)
            return {statusCode: 200, success: true, data: userRoles.roles};
        return {statusCode: 400, success: false, message: 'No roles found for this user.', data: []};
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

//session-data      
const getUserBaseDataService = async (username:string): Promise<ResponseWithMessage<IUser>> => {
    try {
        const userBaseData = await user.findOne({username});
        if(userBaseData)
            return {statusCode: 200, success: true, data: userBaseData};
        return {statusCode: 400, success: false, message: 'No user found with this username.', data: null};
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const userPhotos = userPhotoSchemaExport;
const getUserPhotosDataService = async (username: string): Promise<ResponseWithMessage<IUserPhotosData>> => {
    try {
        const userPhotosData = await userPhotos.findOne({username});
        if(userPhotosData)
            return {statusCode: 200, success: true, data: userPhotosData};
        return {statusCode: 400, success: false, message: 'No photos found for this user.', data: null};
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

//user-theme
const userThemes = userThemeSchemaExport;
const getUserThemesDataService = async (username: string): Promise<ResponseWithMessage<IUserThemesData>> => {
    try {
        const userThemesData = await userThemes.findOne({username});
        if(userThemesData)
            return {statusCode: 200, success: true, data: userThemesData};
        else {
            await new userThemes({username, lights: false}).save();
            return {statusCode: 200, success: true, data: {username, lights: false}};
        }
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}


//edit-user-profile-data
//theme
const changeUserThemesDataService = async (username:string): Promise<ResponseWithMessage<IUserThemesData>> => {
    try {
        let data = await userThemes.findOne({username});

        if(data)
            data.lights = !data.lights;
        else
            data = new userThemes({username, lights: false});

        await data.save();

        return {statusCode: 200, success: true, message: 'Success.'};

    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

//nickname
const changeUserNicknameDataService = async (username:string, newUserNickname:string):Promise<ResponseWithMessage<boolean>> => {
    try {        
        if (newUserNickname.length <= 30) {
            await user.findOneAndUpdate({username}, {userNickname: newUserNickname});
            return {statusCode: 200, success: true, message: 'Nickname updated.'};
        } else
        return {statusCode: 400, success: false, message: 'Nickname can be up to 30 characters.'};
        
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}   

//firstname
const changeUserFirstNameDataService = async (username:string, newUserFirstName:string):Promise<ResponseWithMessage<boolean>> => {
    try {
        await user.findOneAndUpdate({username}, {userFirstName: newUserFirstName});
        return {statusCode: 200, success: true, message: 'First Name updated.'};
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

//lastname
const changeUserLastNameDataService = async (username:string, newUserLastName:string):Promise<ResponseWithMessage<boolean>> => {
    try {
        await user.findOneAndUpdate({username}, {userLastName: newUserLastName});
        return {statusCode: 200, success: true, message: 'Last Name updated.'};
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

//email
const changeUserEmailDataService = async (username:string, newUserEmail:string):Promise<ResponseWithMessage<boolean>> => {
    try {
        await user.findOneAndUpdate({username}, {userEmail: newUserEmail});
        return {statusCode: 200, success: true, message: 'E-Mail updated.'};
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

//dateOfBirth
const changeUserDateOfBirthDataService=async (username:string, newUserDateOfBirth:string):Promise<ResponseWithMessage<boolean>> => {
    try {
        await user.findOneAndUpdate({username}, {userDateOfBirth: newUserDateOfBirth});
        return {statusCode: 200, success: true, message: 'Date of birth updated.'};
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}


export {
    getUsersListService,
    getUserBaseDataService,
    getUserPhotosDataService,
    getUserThemesDataService,
    getUserRolesDataService,
    
    //edit-user-profile-data
    changeUserThemesDataService,
    changeUserNicknameDataService,
    changeUserFirstNameDataService,
    changeUserLastNameDataService,
    changeUserEmailDataService,
    changeUserDateOfBirthDataService,
}