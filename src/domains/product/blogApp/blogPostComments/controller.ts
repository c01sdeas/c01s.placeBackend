import { NextFunction, Request, Response } from "express";
import { createNewCommentService, deleteCommentService, getAllCommentsByBlogPostIDService, getAllCommentsService, getCommentService, getCommentVoteCountByUsernameService, updateCommentService, updateCommentStatusService, updateCommentVoteService } from "./service.js";

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

const updateCommentStatusController = async (req:Request, res:Response, next:NextFunction):Promise<any> => {
    try {
        const {id} = req.body;
        const result = await updateCommentStatusService(id);
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
        if(!req.query.username || req.query.username === undefined || req.query.username === null || req.query.username === '') req.query.username = req.session?.username;
        const {blogPostID, username} = req.query;
        const result = await getAllCommentsByBlogPostIDService(blogPostID as string, username as string);
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

const updateCommentVoteController = async (req:Request, res:Response, next:NextFunction):Promise<any> => {
    try {
        if(!req.body.username || req.body.username === undefined || req.body.username === null || req.body.username === '') req.body.username = req.session?.username;
        const {commentID, username, vote} = req.body;
        const result = await updateCommentVoteService({commentID, username, vote});
        return res.status(result.statusCode).json(result);
    } catch (error) {
        next(error);
    }
}

const getCommentVoteCountByUsernameController = async (req:Request, res:Response, next:NextFunction):Promise<any> => {
    try {
        if(!req.query.username || req.query.username === undefined || req.query.username === null || req.query.username === '') req.query.username = req.session?.username;
        const {commentID, username} = req.query;
        const result = await getCommentVoteCountByUsernameService({commentID: commentID as string, username: username as string});
        return res.status(result.statusCode).json(result);
    } catch (error) {
        next(error);
    }
}

export {
    createNewCommentController,
    deleteCommentController,
    updateCommentStatusController,
    updateCommentController,
    getAllCommentsController,
    getAllCommentsByBlogPostIDController,
    getCommentController,
    updateCommentVoteController,
    getCommentVoteCountByUsernameController
}
