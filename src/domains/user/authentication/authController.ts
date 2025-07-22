import { userAuthLogSchemaExport } from './authModel.js';
import {Request, Response, NextFunction} from 'express';
import { changeUserPasswordDataService, checkUserRecoveryKeyDataForUserPasswordRecoveryService, getNewUserRecoveryKeyForForgettenKeyService, getSessionUserDataService, usernameAvailableControlService, usernameAvailableControlForUserPasswordRecoveryService, userPasswordRecoveryService, userSignInService, userSignUpService } from './authService.js';

const usernameControlForUserSignUpController = async (req:Request,res:Response) : Promise<any> => {
    try {
        const response : ResponseWithMessage<string> = await usernameAvailableControlService(req.body.username); 
        if (response) return res.status(response.statusCode).json(response);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    } catch (err) {
        console.log(err);
    }
}

const signUpController = async (req:Request,res:Response,next:NextFunction) : Promise<any> => {
    try {
        const response : ResponseWithMessage<IUser> = await userSignUpService(req.body);
        if(response) return res.status(response.statusCode).json(response);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    } catch (error) {
        console.log(error);
    }
}

//auth
//write_service
// const tokenSecretKey = crypto.randomBytes(32).toString('hex');
const signInController = async (req:Request,res:Response,next:NextFunction) : Promise<any> => {  
    try {
        const userAuthLogData = await userSignInService(req.body);
        if (userAuthLogData.success==true && userAuthLogData.data) {
            if (userAuthLogData.data.username) {
                req.session.username = userAuthLogData.data.username;
                
            }
            return res.status(userAuthLogData.statusCode).json(userAuthLogData);
        } else(userAuthLogData.success==false)
            return res.status(userAuthLogData.statusCode).json(userAuthLogData);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

const signOutController = async (req:Request, res:Response, next:NextFunction):Promise<any> => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.error('Session destroy error:', err);
                return res.status(500).send({ message: 'Logout failed' });
            }
            res.clearCookie('connect.sid');
            return res.status(200).send({ message: 'Logged out' });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

const getSessionUserDataController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        req.body.username = req.session?.username;
        const serviceResponse = await getSessionUserDataService(req.body.username);
        return res.status(serviceResponse.statusCode).json(serviceResponse);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

//edit-profile-data
//change-password
const changeUserPasswordDataController = async (req:Request, res:Response): Promise<any> => {
    try {
        const response : ResponseWithMessage<boolean> = await changeUserPasswordDataService(req.body.username, req.body.oldUserPassword, req.body.newUserPassword);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

//password-recovery
const userPasswordRecoveryController = async (req:Request, res:Response, next:NextFunction): Promise<any> => {
    try {
        const response : ResponseWithMessage<string> = await userPasswordRecoveryService(req.body.username, req.body.key, req.body.userNewPassword);

        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

const usernameAvailableControlForUserPasswordRecoveryController = async (req:Request, res:Response, next:NextFunction):Promise<any> => {
    try {
        const response = await usernameAvailableControlForUserPasswordRecoveryService(req.body.username);

        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

const checkUserRecoveryKeyDataForUserPasswordRecoveryController = async (req:Request, res:Response, next:NextFunction):Promise<any> => {
    try {
        const response = await checkUserRecoveryKeyDataForUserPasswordRecoveryService(req.body.username, req.body.key);

        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

const getNewUserRecoveryKeyForForgettenKeyController = async (req:Request, res:Response):Promise<any> => {
    try {
        const response = await getNewUserRecoveryKeyForForgettenKeyService(req.body.username);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}



export {
    signUpController,
    signInController,
    signOutController,
    // getUserData,
    // tokenSecretKey,
    // getLoginData,
    // loggedUserLoginData,
    usernameControlForUserSignUpController,
    getSessionUserDataController,
    changeUserPasswordDataController,
    userPasswordRecoveryController,
    usernameAvailableControlForUserPasswordRecoveryController,
    checkUserRecoveryKeyDataForUserPasswordRecoveryController,
    getNewUserRecoveryKeyForForgettenKeyController
}