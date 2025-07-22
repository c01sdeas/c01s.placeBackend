import {userAuthDataSchemaExport, userRecoveryKeySchemaExport, userSchemaExport, userAuthLogSchemaExport} from './authModel.js';
import { IUserSignInRequestData, IUserSignUpRequestData } from './authRequestTypes.js';
import { ValidationError } from '../../../types/errors.js';
const user = userSchemaExport;
const userAuthData = userAuthDataSchemaExport;
// const getUserData = getUserSchemaExport;
const userRecoveryKeySchema = userRecoveryKeySchemaExport;
const userAuthLog = userAuthLogSchemaExport;

import bcrypt from 'bcryptjs';
const usernameAvailableControlService = async (username: string): Promise<ResponseWithMessage<string>> => {
    try {        
        if (!username || username.length <= 2) {
            return { data: username, success: false, message: 'Username must be longer than 2 characters.', statusCode: 400 };
        }
        const existingUser = await user.findOne({ username: username });
        if (existingUser)
            return { data: username, success: false, message: 'Username is already taken.', statusCode: 400 };
            return { data: username, success: true, message: 'Username is available.', statusCode: 200 };
        
    } catch (error) {
        console.log(error);
        return { data: username, success: false, error: error, message: 'An error occurred while checking username availability.', statusCode: 500 };
    }
};


import crypto from 'crypto';
const userSignUpService = async (userData:IUserSignUpRequestData): Promise<ResponseWithMessage<IUser>> => {
    try {
            const newUser = new user(userData);
            const newUserAuthData = new userAuthData(userData);
    
            if (newUserAuthData.password && (newUserAuthData.password.length > 6)){
                newUserAuthData.password = await bcrypt.hash(newUserAuthData.password, 10);

                await new userRolesSchemaExport({username: userData.username, roles: ['user']}).save();

                await new userAuthLog({token: jwt.sign({ username: userData.username }, tokenSecretKey, { expiresIn: '1h' }), username: userData.username}).save();

                await newUser.save();
                await newUserAuthData.save();
            }
    
            //recoveryKey
            const userRecoveryKeyControl = await userRecoveryKeySchema.findOne({username: newUser.username});
            if (!userRecoveryKeyControl) {
                const userRecoveryKeyData = await new userRecoveryKeySchema({ username: newUser.username, key: crypto.randomBytes(8).toString('hex') }).save();
    
                if (userRecoveryKeyData) {

                    const afterSignupSuccessResponse = await user.findOne({username: userData.username});

                    if (afterSignupSuccessResponse)
                        return { success: true, message: userRecoveryKeyData.key, statusCode: 201 };
                    
                }

            }

            return { success: false, message: 'Internal Server Error.', statusCode: 500 };
    
        } catch (error) {
            console.log(error);
            
            const err = error as ValidationError;

            if (err instanceof Error) {
                if (err.name === 'ValidationError') {
                    const errors = Object.keys(err.errors).map(key => ({
                        // field: key,
                        success: false,
                        message: err.errors[key].message
                      }));
                    // return res.status(400).json({ errors });

                    return { success: false, error: errors, message: 'Validation Error', statusCode: 400 };
                }
        
                if (err.name === 'MongoServerError' && err.code === 11000 && Object.keys(err.keyValue)[0] == 'username') {
                    return { success: false, message: 'Username is already taken.', statusCode: 400 };
                }

                return { success: false, message: err.message || 'Internal Server Error', statusCode: 500 };
                
            }

            return { success: false, message: 'Internal Server Error', statusCode: 500 };
        }
}

//write-this
const tokenSecretKey = crypto.randomBytes(32).toString('hex');
import jwt from 'jsonwebtoken';
import { getUserBaseDataService } from '../usercrud/userService.js';
import { userRolesSchemaExport } from '../usercrud/userModel.js';
const userSignInService = async (userData:IUserSignInRequestData): Promise<ResponseWithMessage<IUserAuthLog>> => {
    try {

        const userAuthDataControl = await userAuthData.findOne({username: userData.username});

        if (userAuthDataControl != null && userAuthDataControl.status === false) {
            return { statusCode: 403, success: false, message: 'You are banned.' };
        }

        if (userAuthDataControl!=null && userAuthDataControl!=undefined){
            const passwordSameControl = await bcrypt.compare(userData.password, userAuthDataControl.password);
            
            if (passwordSameControl === false) return { statusCode: 401, success: false, message: 'Authentication failed.' };
            else{
                const userAuthLogControl = await userAuthLog.findOne({username: userData.username});
                
                if (userAuthLogControl!=null && userAuthLogControl!=undefined){
                    userAuthLogControl.token = jwt.sign({ username: userData.username }, tokenSecretKey, { expiresIn: '1h' });
                    await userAuthLogControl.save();
                }
                else
                await new userAuthLog({token: jwt.sign({ username: userData.username }, tokenSecretKey, { expiresIn: '1h' }), username: userData.username}).save();
        
                //data: userAuthLogControl
                if(userAuthLogControl)
                return {statusCode: 200, success: true, data: {username: userAuthLogControl.username, token: userAuthLogControl.token}, message: 'Authentication success!'};
            }
        }

        
        return { statusCode: 401, success: false, message: 'Authentication failed.' };
        
    } catch (error) {
        const err = error as ValidationError;   

        if (err instanceof Error) {
            if (err.name === 'ValidationError') {
                const errors = Object.keys(err.errors).map(key => ({
                    // field: key,
                    success: false,
                    message: err.errors[key].message
                    }));
                // return res.status(400).json({ errors });

                return { success: false, error: errors, message: 'Validation Error', statusCode: 400 };
            }
            
            return { success: false, message: err.message || 'Internal Server Error', statusCode: 500 };
            
        }

        return { statusCode: 500, success: false, message: 'Internal Server Error' };

    }
}

// //write-this

const getSessionUserDataService = async (username:string): Promise<ResponseWithMessage<IUserData>> => {
    try {
        const sessionUserBaseData = await getUserBaseDataService(username);

        if(sessionUserBaseData.data?.status)
            return { statusCode: 200, success: true, data: sessionUserBaseData.data };
        return { statusCode: 400, success: false, message: 'Internal Server Error' };
    } catch (error) {       
        console.log(error);
        return { statusCode: 500, success: false, message: 'Internal Server Error' };
    }
}

//edit-auth-data

//change-password
const changeUserPasswordDataService = async (username:string, oldUserPassword:string, newUserPassword:string):Promise<ResponseWithMessage<boolean>> => {
    try {
        const userAuthData = await userAuthDataSchemaExport.findOne({username});
        if (userAuthData && userAuthData.status && await bcrypt.compare(oldUserPassword, userAuthData.password)) {
            userAuthData.password = await bcrypt.hash(newUserPassword, 10);
            userAuthData.save();
            return { statusCode: 200, success: true, message: 'Password Updated.' };
        } else
            return { statusCode: 400, success: false, message: 'Something went wrong!' };
        
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

//password-recovery
const userPasswordRecoveryService = async (username:string, userRecoveryKey:string, userNewPassword:string):Promise<ResponseWithMessage<string>> => {
    try {
        const userRecoveryKeyData = await userRecoveryKeySchemaExport.findOne({username: username});
        const userAuthData = await userAuthDataSchemaExport.findOne({username});
        if (userAuthData && userAuthData.username && userAuthData.status && userRecoveryKeyData && userRecoveryKeyData.key === userRecoveryKey) {

            userAuthData.password = await bcrypt.hash(userNewPassword, 10);
            userAuthData.save();

            let recoveryKey = await userRecoveryKeySchema.findOne({username});
            if (recoveryKey) recoveryKey.key = crypto.randomBytes(8).toString('hex');
            else recoveryKey = new userRecoveryKeySchema({username, key: crypto.randomBytes(8).toString('hex')});

            recoveryKey.save();

            return { statusCode: 200, success: true, data: recoveryKey.key };
        } else {
            return { statusCode: 400, success: false, message: 'Something went wrong!' };
        }
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const usernameAvailableControlForUserPasswordRecoveryService = async (username: string): Promise<ResponseWithMessage<string>> => {
    try {
        const existingUser = await userAuthDataSchemaExport.findOne({username});
        if (existingUser && existingUser.status)    
            return { data: username, success: true, message: 'Account found.', statusCode: 200 };
            return { data: username, success: false, message: 'No account found with this username.', statusCode: 400 };
        
    } catch (error) {
        console.log(error);
        return { data: username, success: false, error: error, message: 'An error occurred while checking username availability.', statusCode: 500 };
    }
};
const checkUserRecoveryKeyDataForUserPasswordRecoveryService = async (username: string, key:string): Promise<ResponseWithMessage<boolean>> => {
    try {
        const existingUser = await userAuthDataSchemaExport.findOne({username});
        const userRecoveryKeyData = await userRecoveryKeySchema.findOne({username});
        if (existingUser && existingUser.status)
            

            if (userRecoveryKeyData && userRecoveryKeyData.key === key)
                return {statusCode: 200, success: true}
            else
                return {statusCode: 400, success: false, message: 'OOPS! The key is incorrect!'}
        else
            return {statusCode: 400, success: false, message: 'Account not found.'};
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const getNewUserRecoveryKeyForForgettenKeyService = async (username: string): Promise<ResponseWithMessage<string>> => {
    try {
        const userAuthData = await userAuthDataSchemaExport.findOne({username});
        if (userAuthData && userAuthData.username && userAuthData.status) {
            let recoveryKey = await userRecoveryKeySchema.findOne({username});
            if (recoveryKey) recoveryKey.key = crypto.randomBytes(8).toString('hex');
            else recoveryKey = new userRecoveryKeySchema({username, key: crypto.randomBytes(8).toString('hex')});
            recoveryKey.save();

            return {statusCode: 200, success: true, data: recoveryKey.key}
        } else return {statusCode: 400, success: false, message: 'Account not found.'};

        
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}



export {
    usernameAvailableControlService,
    userSignUpService,
    userSignInService,
    getSessionUserDataService,
    tokenSecretKey,
    changeUserPasswordDataService,
    userPasswordRecoveryService,
    usernameAvailableControlForUserPasswordRecoveryService,
    checkUserRecoveryKeyDataForUserPasswordRecoveryService,
    getNewUserRecoveryKeyForForgettenKeyService
}