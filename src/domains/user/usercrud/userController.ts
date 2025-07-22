import {Request, Response, NextFunction} from 'express';
import { userPhotoSchemaExport } from './userModel.js';
import {userSchemaExport, userAuthLogSchemaExport} from '../authentication/authModel.js';
import { getUsersListService, getUserThemesDataService, changeUserThemesDataService, changeUserNicknameDataService, changeUserFirstNameDataService, changeUserLastNameDataService, changeUserEmailDataService, changeUserDateOfBirthDataService, getUserRolesDataService } from './userService.js';
import { IUserThemesData } from './userModelTypes.js';

const user = userSchemaExport;
const login = userAuthLogSchemaExport;

const getUserListController = async (req:Request,res:Response,next:NextFunction):Promise<any> => {
    try {
        // const users = await user.find();
        // if(users) return res.json(users);

        const response : ResponseWithMessage<IUserData[]> = await getUsersListService();
        if (response) return res.status(response.statusCode).json(response);
        return res.json({ success: false, message: 'Unknown error.', statusCode: 500 });
    } catch (error) {
        console.log(error);
    }
}

//userRoles
const getUserRolesDataController = async (req:Request,res:Response,next:NextFunction):Promise<any> => {
    try {
        const response : ResponseWithMessage<string[]> = await getUserRolesDataService(req.body.username);
        if (response) return res.status(response.statusCode).json(response);
        return res.json({ success: false, message: 'Unknown error.', statusCode: 500 });
    } catch (error) {
        console.log(error);
    }
}

const getUserThemeDataController = async (req:Request,res:Response,next:NextFunction) : Promise<any> => {
    try {

        const response = await getUserThemesDataService(req.body.username);

        if (response.data == null || response.data == undefined)
            return res.status(response.statusCode).send(false);
        return res.status(response.statusCode).send(response.data.lights);
    } catch (error) {
        console.log(error);
    }
}

//edit-user-profile-data
//theme
const changeUserThemeDataController = async (req:Request,res:Response,next:NextFunction):Promise<any> => {
    try {
        const response : ResponseWithMessage<IUserThemesData> = await changeUserThemesDataService(req.body.username);
        
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}
//nickname
const changeUserNicknameDataController = async (req: Request, res:Response, next:NextFunction): Promise<any> => {
    try {
        const response : ResponseWithMessage<boolean> = await changeUserNicknameDataService(req.body.username, req.body.newUserNickname);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}
//firstname
const changeUserFirstNameDataController = async (req:Request, res:Response, next:NextFunction): Promise<any> => {
    try {
        const response : ResponseWithMessage<boolean> = await changeUserFirstNameDataService(req.body.username, req.body.newUserFirstName);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}
//lastname
const changeUserLastNameDataController = async (req:Request, res:Response, next:NextFunction): Promise<any> => {
    try {
        const response : ResponseWithMessage<boolean> = await changeUserLastNameDataService(req.body.username, req.body.newUserLastName);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}
//email
const changeUserEmailDataController = async (req:Request, res:Response, next:NextFunction): Promise<any> => {
    try {
        const response : ResponseWithMessage<boolean> = await changeUserEmailDataService(req.body.username, req.body.newUserEmail);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}
//dateOfBirth
const changeUserDateOfBirthDataController = async (req:Request, res:Response, next:NextFunction): Promise<any> => {
    try {
        const response : ResponseWithMessage<boolean> = await changeUserDateOfBirthDataService(req.body.username, req.body.newUserDateOfBirth);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}


export {
    getUserListController,
    getUserRolesDataController,
    changeUserThemeDataController,
    getUserThemeDataController,
    changeUserNicknameDataController,
    changeUserFirstNameDataController,
    changeUserLastNameDataController,
    changeUserEmailDataController,
    changeUserDateOfBirthDataController
}