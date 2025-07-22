import { createNewBlogLibraryService, createNewBlogPostInLibraryService, createNewFollowingTagService, deleteBlogLibraryService, deleteBlogPostInLibraryService, deleteFollowingTagService, getAllBlogLibrariesByUsernameService, getAllBlogPostsByFollowingTagsService, getAllBlogPostsByUsernameForLibraryService, getAllBlogPostsInLibraryService, getAllFollowingTagsByUsernameService, getAllFollowingTagsService, updateBlogLibraryDescriptionService, updateBlogLibraryStatusService, updateBlogLibraryTitleService, updateBlogPostInLibraryService, updateBlogPostInLibraryStatusService, updateFollowingTagStatusService } from "./service.js";
import { Request, response, Response } from "express";
import { ICreateNewBlogLibraryRequestDto, ICreateNewBlogPostInLibraryRequestDto, IDeleteBlogLibraryRequestDto, IDeleteBlogPostInLibraryRequestDto, IGetAllBlogLibrariesRequestDto, IGetAllBlogPostsByFollowingTagsRequestDto, IGetAllBlogPostsInLibraryRequestDto, IGetAllFollowingTagsByUsernameRequestDto, IUpdateBlogLibraryDescriptionRequestDto, IUpdateBlogLibraryStatusRequestDto, IUpdateBlogLibraryTitleRequestDto, IUpdateBlogPostInLibraryRequestDto, IUpdateBlogPostInLibraryStatusRequestDto } from "./requestTypes.d.js";
import { Types } from "mongoose";
import { IGetAllBlogPostsByUsernameForLibraryRequestDto } from "../blogPosts/requestTypes.js";

//librariesCRUD
const createNewBlogLibraryController = async (req:Request, res:Response):Promise<any> => {
    try {
        if(!req.body.username || req.body.username === undefined || req.body.username === null || req.body.username === '') req.body.username = req.session?.username;
        const data = req.body as ICreateNewBlogLibraryRequestDto;
        const response = await createNewBlogLibraryService(data);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error,
            statusCode: 500,
            message: 'Unknown error! Please contact the admin.',
            success: false
        });
    }
}

const updateBlogLibraryTitleController = async (req:Request, res:Response):Promise<any> => {
    try {
        if(!req.body.username || req.body.username === undefined || req.body.username === null || req.body.username === '') req.body.requestUsername = req.session?.username;
        const data = req.body as IUpdateBlogLibraryTitleRequestDto;
        const response = await updateBlogLibraryTitleService(data);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error,
            statusCode: 500,
            message: 'Unknown error! Please contact the admin.',
            success: false
        });
    }
}
    
const updateBlogLibraryDescriptionController = async (req:Request, res:Response):Promise<any> => {
    try {
        if(!req.body.username || req.body.username === undefined || req.body.username === null || req.body.username === '') req.body.requestUsername = req.session?.username;
        const data = req.body as IUpdateBlogLibraryDescriptionRequestDto;
        const response = await updateBlogLibraryDescriptionService(data);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error,
            statusCode: 500,
            message: 'Unknown error! Please contact the admin.',
            success: false
        });
    }
}
    
const updateBlogLibraryStatusController = async (req:Request, res:Response):Promise<any> => {
    try {
        if(!req.body.username || req.body.username === undefined || req.body.username === null || req.body.username === '') req.body.requestUsername = req.session?.username;
        const data = req.body as IUpdateBlogLibraryStatusRequestDto;
        const response = await updateBlogLibraryStatusService(data);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error,
            statusCode: 500,
            message: 'Unknown error! Please contact the admin.',
            success: false
        });
    }
}
    
const deleteBlogLibraryController = async (req:Request, res:Response):Promise<any> => {
    try {
        const data = req.body as IDeleteBlogLibraryRequestDto;
        const response = await deleteBlogLibraryService(data);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error,
            statusCode: 500,
            message: 'Unknown error! Please contact the admin.',
            success: false
        });
    }
}

const getAllBlogLibrariesByUsernameController = async (req:Request, res:Response):Promise<any> => {
    try {
        const data = {
            username: req.session?.username,
            blogPostID: req.query.blogPostID
        } as IGetAllBlogLibrariesRequestDto;
        const response = await getAllBlogLibrariesByUsernameService(data);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error,
            statusCode: 500,
            message: 'Unknown error! Please contact the admin.',
            success: false
        });
    }
}

//blogPostInLibrariesCRUD
const createNewBlogPostInLibraryController = async (req:Request, res:Response):Promise<any> => {
    try {
        const data = req.body as ICreateNewBlogPostInLibraryRequestDto;
        const response = await createNewBlogPostInLibraryService(data);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error,
            statusCode: 500,
            message: 'Unknown error! Please contact the admin.',
            success: false
        });
    }
}

const updateBlogPostInLibraryController = async (req:Request, res:Response):Promise<any> => {
    try {
        const data = req.body as IUpdateBlogPostInLibraryRequestDto;
        const response = await updateBlogPostInLibraryService(data);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error,
            statusCode: 500,
            message: 'Unknown error! Please contact the admin.',
            success: false
        });
    }
}

const updateBlogPostInLibraryStatusController = async (req:Request, res:Response):Promise<any> => {
    try {
        const data = req.body as IUpdateBlogPostInLibraryStatusRequestDto;
        const response = await updateBlogPostInLibraryStatusService(data);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error,
            statusCode: 500,
            message: 'Unknown error! Please contact the admin.',
            success: false
        });
    }
}

const deleteBlogPostInLibraryController = async (req:Request, res:Response):Promise<any> => {
    try {
        const data = req.body as IDeleteBlogPostInLibraryRequestDto;
        const response = await deleteBlogPostInLibraryService(data);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error,
            statusCode: 500,
            message: 'Unknown error! Please contact the admin.',
            success: false
        });
    }
}

const getAllBlogPostsInLibraryController = async (req:Request, res:Response):Promise<any> => {
    try {
        const data = {
            libraryID: req.query.libraryID as unknown as Types.ObjectId,
            page: Number(req.query.page),
            limit: Number(req.query.limit)
        } as IGetAllBlogPostsInLibraryRequestDto;
        const response = await getAllBlogPostsInLibraryService(data);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error,
            statusCode: 500,
            message: 'Unknown error! Please contact the admin.',
            success: false
        });
    }
}

//followingTags
const createNewFollowingTagController = async (req:Request, res:Response):Promise<any>=> {
    try {
        if(!req.body.username || req.body.username === undefined || req.body.username === null || req.body.username === '') req.body.requestUsername = req.session?.username;
        const response = await createNewFollowingTagService(req.body);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}
const deleteFollowingTagController = async (req:Request, res:Response):Promise<any>=> {
    try {
        const response = await deleteFollowingTagService(req.body);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}
const updateFollowingTagStatusController = async (req:Request, res:Response):Promise<any>=> {
    try {
        if(!req.body.username || req.body.username === undefined || req.body.username === null || req.body.username === '') req.body.requestUsername = req.session?.username;
        const response = await updateFollowingTagStatusService(req.body);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}
const getAllFollowingTagsByUsernameController = async (req:Request, res:Response):Promise<any>=> {
    try {
        const data = {
            username: req.session?.username
        } as IGetAllFollowingTagsByUsernameRequestDto;
        const response = await getAllFollowingTagsByUsernameService(data);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}
const getAllBlogPostsByFollowingTagsController = async (req:Request, res:Response):Promise<any>=> {
    try {
        const data = {
            username: req.session?.username,
            page: Number(req.query.page),
            limit: Number(req.query.limit)
        } as IGetAllBlogPostsByFollowingTagsRequestDto;
        const response = await getAllBlogPostsByFollowingTagsService(data);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}
const getAllFollowingTagsController = async (req:Request, res:Response):Promise<any>=> {
    try {
        const response = await getAllFollowingTagsService();
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

const getAllBlogPostsByUsernameForLibraryController = async (req:Request, res:Response):Promise<any>=> {
    try {
        const data = {
            username: req.session?.username,
            page: Number(req.query.page),
            limit: Number(req.query.limit)
        } as IGetAllBlogPostsByUsernameForLibraryRequestDto;
        const response = await getAllBlogPostsByUsernameForLibraryService(data);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}
    

export {
    createNewBlogLibraryController,
    updateBlogLibraryTitleController,
    updateBlogLibraryDescriptionController,
    updateBlogLibraryStatusController,
    deleteBlogLibraryController,
    getAllBlogLibrariesByUsernameController,
    //blogPostInLibrariesCRUD
    createNewBlogPostInLibraryController,
    updateBlogPostInLibraryController,
    updateBlogPostInLibraryStatusController,
    deleteBlogPostInLibraryController,
    getAllBlogPostsInLibraryController,
    getAllBlogPostsByUsernameForLibraryController,
    //followingTags
    createNewFollowingTagController,
    deleteFollowingTagController,
    updateFollowingTagStatusController,
    getAllFollowingTagsByUsernameController,
    getAllBlogPostsByFollowingTagsController,
    getAllFollowingTagsController
}
