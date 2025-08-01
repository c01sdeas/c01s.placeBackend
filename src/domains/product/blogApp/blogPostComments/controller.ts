import { NextFunction, Request, Response } from "express";
import { createNewCommentService, deleteCommentService, getAllCommentsByBlogPostIDService, getAllCommentsService, getCommentService, updateCommentService } from "./service.js";

const createNewCommentController = async (req:Request, res:Response, next:NextFunction):Promise<any> => {
    try {
        if(!req.body.username || req.body.username === undefined || req.body.username === null || req.body.username === '') req.body.username = req.session?.username;
        const {blogPostID, comment, parentID, username} = req.body;
        const data = {blogPostID, comment, parentID, username};
        const result = await createNewCommentService(data);
        return res.status(result.statusCode).json(result);
    } catch (error) {
        next(error);
    }
}

const deleteCommentController = async (req:Request, res:Response, next:NextFunction):Promise<any> => {
    try {
        const {id} = req.body;
        const result = await deleteCommentService(id);
        return res.status(result.statusCode).json(result);
    } catch (error) {
        next(error);
    }
}

const updateCommentController = async (req:Request, res:Response, next:NextFunction):Promise<any> => {
    try {
        const {id, comment} = req.body;
        const result = await updateCommentService({id, comment});
        return res.status(result.statusCode).json(result);
    } catch (error) {
        next(error);
    }
}

const getAllCommentsController = async (req:Request, res:Response, next:NextFunction):Promise<any> => {
    try {
        const result = await getAllCommentsService();
        return res.status(result.statusCode).json(result);
    } catch (error) {
        next(error);
    }
}

const getAllCommentsByBlogPostIDController = async (req:Request, res:Response, next:NextFunction):Promise<any> => {
    try {
        const {blogPostID} = req.query;
        const result = await getAllCommentsByBlogPostIDService(blogPostID as string);
        return res.status(result.statusCode).json(result);
    } catch (error) {
        next(error);
    }
}

const getCommentController = async (req:Request, res:Response, next:NextFunction):Promise<any> => {
    try {
        const {id} = req.body;
        const result = await getCommentService(id);
        return res.status(result.statusCode).json(result);
    } catch (error) {
        next(error);
    }
}

export {
    createNewCommentController,
    deleteCommentController,
    updateCommentController,
    getAllCommentsController,
    getAllCommentsByBlogPostIDController,
    getCommentController
}
