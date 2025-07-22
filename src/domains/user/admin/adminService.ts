import { userAuthDataSchemaExport } from "../authentication/authModel.js";
import { userRolesSchemaExport } from "../usercrud/userModel.js";

const changeUserRolesService = async (data:IChangeUserRolesRequestData):Promise<ResponseWithMessage<boolean>> => {
    try {
        const userWithRolesData = await userRolesSchemaExport.findOne({username: data.username});
        let roles : string[] = data.roles;
        if (!roles.includes('user'))
            roles.push('user');

        if (!userWithRolesData?.roles) {
            await new userRolesSchemaExport({username: data.username, roles: roles}).save();
        }

        if (userWithRolesData?.roles) {
            

            userWithRolesData.roles = roles;

            userWithRolesData.roles.forEach(element => {
                if (element==='') {
                    userWithRolesData.roles.unshift(element);
                }
            });

            await userWithRolesData.save();
        }
            

        return { statusCode: 200, success: true, message: 'User roles updated.' };
    } catch (error) {
        console.log(error);
        return { success: false, message: 'Internal Server Error', statusCode: 500 };
    }
}

const changeUserBanStatusService = async (username:string):Promise<ResponseWithMessage<boolean>> => {
    try {
        const userAuthData = await userAuthDataSchemaExport.findOne({username});
        if (userAuthData?.username) {
            userAuthData.status = !userAuthData.status;
            await userAuthData.save();
            return { success: true, statusCode: 200, message: 'Updated user ban status.' };
        } else
            return { success: false, message: 'User not found.', statusCode: 400 };
    } catch (error) {
        console.log(error);
        return { success: false, message: 'Internal Server Error', statusCode: 500 };
    }
}

export {
    changeUserRolesService,
    changeUserBanStatusService
}