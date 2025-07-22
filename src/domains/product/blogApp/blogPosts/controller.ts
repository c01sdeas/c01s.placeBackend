import { Request, Response, NextFunction } from "express";
import { createNewBlogPostImageService, createNewBlogPostService, deleteBlogPostService, getAllBlogPostsService, getAllBlogPostsByCategoryIDService, getBlogPostBySlugService, updateBlogPostContentService, updateBlogPostImageService, updateBlogPostIntroService, updateBlogPostMetaService, updateBlogPostStatusService, updateBlogPostTitleService, getAllBlogPostsByUsernameService, getAllBlogPostsByUsernameAndCategoryIDService, getAllBlogPostsByCategorySlugService, subscribeToNewsService, updateBlogPostVoteService, getBlogPostVotesService, getBlogPostVoteCountService, getBlogPostUserVoteControlService, searchInBlogPostsService, updateBlogPostViewCountService, updateBlogPostViewLogService } from "./service.js";
import { IGetAllBlogPostsRequestDto, IGetBlogPostByCategoryIDRequestDto, IGetBlogPostByCategorySlugRequestDto, IGetBlogPostBySlugRequestDto, IGetBlogPostByUsernameAndCategoryIDRequestDto, IGetBlogPostByUsernameRequestDto, IGetBlogPostUserVoteControlRequestDto, IGetBlogPostVotesRequestDto, ISearchInBlogPostsRequestDto, IUpdateBlogPostViewLogRequestDto } from "./requestTypes.js";

//subscribeToNews
const subscribeToNewsController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const response = await subscribeToNewsService(req.body);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

//blogPostCUD
const createNewBlogPostImageController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const filePath = `/uploads/blogApp/blog-images/${req.file?.filename}`;
        const response = await createNewBlogPostImageService(filePath);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}
const createNewBlogPostController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const response = await createNewBlogPostService(req.body);

        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

const deleteBlogPostController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const response = await deleteBlogPostService(req.body.id);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

const updateBlogPostMetaController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const response = await updateBlogPostMetaService(req.body);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}
const updateBlogPostIntroController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const response = await updateBlogPostIntroService(req.body);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

//postVotes
const updateBlogPostVoteController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const response = await updateBlogPostVoteService(req.body);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

const getBlogPostVotesController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const data = {
            blogPostID: req.query.blogPostID
        } as IGetBlogPostVotesRequestDto;
        const response = await getBlogPostVotesService(data);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

const getBlogPostVoteCountController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const data = {
            blogPostID: req.query.blogPostID
        } as IGetBlogPostVotesRequestDto;
        const response = await getBlogPostVoteCountService(data);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

const getBlogPostUserVoteControlController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const data = {
            blogPostID: req.query.blogPostID,
            username: req.session?.username
        } as IGetBlogPostUserVoteControlRequestDto;
        const response = await getBlogPostUserVoteControlService(data);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

const updateBlogPostStatusController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const response = await updateBlogPostStatusService(req.body);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}
const updateBlogPostImageController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const response = await updateBlogPostImageService(req.body);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}
const updateBlogPostContentController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const response = await updateBlogPostContentService(req.body);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}
const updateBlogPostTitleController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const response = await updateBlogPostTitleService(req.body);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

const updateBlogPostViewCountController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const response = await updateBlogPostViewCountService(req.body);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

const updateBlogPostViewLogController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const data = {
            blogPostID: req.query.blogPostID,
            username: req.session?.username,
            viewerIp: req.ip,
            viewedAt: new Date()
        } as IUpdateBlogPostViewLogRequestDto;
        const response = await updateBlogPostViewLogService(data);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

//blogPostRead
const getAllBlogPostsController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const data = {
            page: Number(req.query.page),
            limit: Number(req.query.limit)
        } as IGetAllBlogPostsRequestDto;
        const response = await getAllBlogPostsService(data);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

const getBlogPostBySlugController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const data = {
            slug: req.query.slug
        } as IGetBlogPostBySlugRequestDto;
        const response = await getBlogPostBySlugService(data);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

const getAllBlogPostsByCategoryIDController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const data = {
            categoryID: req.query.categoryID,
            page: Number(req.query.page),
            limit: Number(req.query.limit)
        } as IGetBlogPostByCategoryIDRequestDto;
        const response = await getAllBlogPostsByCategoryIDService(data);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

const getAllBlogPostsByCategorySlugController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const data = {
            slug: req.query.slug,
            page: Number(req.query.page),
            limit: Number(req.query.limit)
        } as IGetBlogPostByCategorySlugRequestDto;
        const response = await getAllBlogPostsByCategorySlugService(data);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

const getAllBlogPostsByUsernameController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const data = {
            username: req.query.username,
            page: Number(req.query.page),
            limit: Number(req.query.limit)
        } as IGetBlogPostByUsernameRequestDto;
        const response = await getAllBlogPostsByUsernameService(data);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

const getAllBlogPostsByUsernameAndCategoryIDController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const data = {
            username: req.query.username,
            categoryID: req.query.categoryID,
            page: Number(req.query.page),
            limit: Number(req.query.limit)
        } as IGetBlogPostByUsernameAndCategoryIDRequestDto;
        const response = await getAllBlogPostsByUsernameAndCategoryIDService(data);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

const searchInBlogPostsController = async (req:Request, res:Response, next:NextFunction):Promise<any>=> {
    try {
        const data = {
            data: req.query.data
        } as ISearchInBlogPostsRequestDto;
        const response = await searchInBlogPostsService(data);
        return res.status(response.statusCode).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Unknown error.', statusCode: 500 });
    }
}

export {
    //blogPosts
    createNewBlogPostImageController,
    createNewBlogPostController,
    deleteBlogPostController,
    updateBlogPostMetaController,
    updateBlogPostIntroController,
    updateBlogPostVoteController,
    updateBlogPostViewCountController,
    updateBlogPostViewLogController,
    getBlogPostVotesController,
    getBlogPostVoteCountController,
    getBlogPostUserVoteControlController,

    updateBlogPostStatusController,
    updateBlogPostImageController,
    updateBlogPostContentController,
    updateBlogPostTitleController,
    getAllBlogPostsController,
    getBlogPostBySlugController,
    getAllBlogPostsByCategoryIDController,
    getAllBlogPostsByUsernameController,
    getAllBlogPostsByUsernameAndCategoryIDController,
    getAllBlogPostsByCategorySlugController,
    searchInBlogPostsController,

    //subscribeToNews
    subscribeToNewsController
}