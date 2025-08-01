import { Types } from 'mongoose';
import { IComment } from './modelTypes.js';
import { commentSchemaExport } from './model.js';
import { ICreateNewCommentRequestDto, IUpdateCommentRequestDto } from './requestTypes.js';
import { ICommentListResponseDto, ICommentResponseDto, ICommentDeleteResponseDto, ICommentUpdateResponseDto, ICreateNewCommentResponseDto, ICommentWithReplies, ICommentListWithRepliesResponseDto } from './responseTypes.js';
import { userSchemaExport } from '../../../user/authentication/authModel.js';

const createNewCommentService = async (data:ICreateNewCommentRequestDto):Promise<ICreateNewCommentResponseDto> => { 
    try {
        const newComment = new commentSchemaExport(data);
        await newComment.save();
        return { statusCode: 201, success: true, message: 'Comment added.', data: newComment };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false, data: null };
    }
}

const deleteCommentService = async (id:string):Promise<ICommentDeleteResponseDto> => { 
    try {
        const comment = await commentSchemaExport.findByIdAndDelete(id);
        if (!comment) return { statusCode: 200, success: false, message: 'Comment not found.', data: false };
        return { statusCode: 200, success: true, message: 'Comment deleted successfully.', data: true };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false, data: false };
    }
}

const updateCommentService = async (data:IUpdateCommentRequestDto):Promise<ICommentUpdateResponseDto> => { 
    try {
        const comment = await commentSchemaExport.findById(data.id);
        if (!comment) return { statusCode: 200, success: false, message: 'Comment not found.', data: null };
        comment.comment = data.comment;
        await comment.save();
        return { statusCode: 200, success: true, message: 'Comment updated successfully.', data: comment };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false, data: null };
    }
}

const getAllCommentsService = async ():Promise<ICommentListResponseDto> => { 
    try {
        const comments = await commentSchemaExport.find();
        return { statusCode: 200, success: true, message: 'Comments fetched successfully.', data: comments };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false, data: [] };
    }
}

const getAllCommentsByBlogPostIDService = async (
    blogPostID: string
): Promise<ICommentListWithRepliesResponseDto> => {
  try {
    const comments = await commentSchemaExport
      .find({ blogPostID: new Types.ObjectId(blogPostID) })
      .sort({ createdAt: -1 })
      .lean();

    const commentsWithUserNickname = await Promise.all(
      comments.map(async comment => {
        const user = await userSchemaExport.findOne({username: comment.username});
        return { ...comment, userNickname: user?.userNickname || comment.username };
      })
    );

    const map = new Map<string, ICommentWithReplies>();
    const roots: ICommentWithReplies[] = [];

    commentsWithUserNickname.forEach(comment => {
      map.set(comment._id.toString(), { ...comment, replies: [] });
    });

    map.forEach(comment => {
      if (comment.parentID) {
        const parent = map.get(comment.parentID.toString());
        if (parent) {
          parent.replies?.push(comment);
        }
      } else {
        roots.push(comment);
      }
    });

    return {
      statusCode: 200,
      success: true,
      message: 'Comments fetched successfully.',
      data: roots
    };
  } catch (error) {
    console.error(error);
    return {
      error: error,
      statusCode: 500,
      success: false,
      message: 'Unknown error! Please contact the admin.',
      data: []
    };
  }
};

const getCommentService = async (id:string):Promise<ICommentResponseDto> => { 
    try {
        const comment = await commentSchemaExport.findById(id);
        if (!comment) return { statusCode: 200, success: false, message: 'Comment not found.', data: null };
        return { statusCode: 200, success: true, message: 'Comment fetched successfully.', data: comment };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false, data: null };
    }
}

export {
    createNewCommentService,
    deleteCommentService,
    updateCommentService,
    getAllCommentsService,
    getAllCommentsByBlogPostIDService,
    getCommentService
}
