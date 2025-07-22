import { Request, Response, NextFunction } from "express";
import { changeUserBanStatusService, changeUserRolesService } from "./adminService.js";

const changeUserRolesPost = async (req:Request, res:Response, next:NextFunction):Promise<any> => {
    try {
        const response = await changeUserRolesService(req.body);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

const changeUserBanStatusPost = async (req:Request, res:Response, next:NextFunction):Promise<any> => {
    try {
        const response = await changeUserBanStatusService(req.body.username);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

export {
    changeUserRolesPost,
    changeUserBanStatusPost
}