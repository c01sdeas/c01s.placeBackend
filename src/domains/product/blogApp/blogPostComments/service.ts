import { Types } from 'mongoose';
import { commentSchemaExport, commentVoteSchemaExport } from './model.js';
import { ICreateNewCommentRequestDto, IUpdateCommentVoteRequestDto, IUpdateCommentRequestDto } from './requestTypes.js';
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

const updateCommentStatusService = async (id:string):Promise<ICommentDeleteResponseDto> => { 
    try {
        const comment = await commentSchemaExport.findById(id);
        if (!comment) return { statusCode: 200, success: false, message: 'Comment not found.', data: false };
        comment.status = !comment.status;
        await comment.save();
        return { statusCode: 200, success: true, message: 'Comment status updated successfully.', data: true };
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
  blogPostID: string,
  username: string
): Promise<ICommentListWithRepliesResponseDto> => {
  try {
    const comments = await commentSchemaExport
      .find({ blogPostID: new Types.ObjectId(blogPostID) })
      .sort({ createdAt: -1 })
      .lean();

    const commentIDs = comments.map(comment => comment._id);

    // Kullanıcının tüm oylarını tek seferde al
    const userVotes = await commentVoteSchemaExport.find({
      commentID: { $in: commentIDs },
      username: username,
    }).lean();

    // Oyları kolay erişim için map'e çevir
    const userVoteMap = new Map<string, number>();
    userVotes.forEach(vote => {
      userVoteMap.set(vote.commentID.toString(), vote.vote);
    });

    const commentsWithExtraData = await Promise.all(
      comments.map(async comment => {
        const user = await userSchemaExport.findOne({ username: comment.username });

        // Toplam oyları hesapla
        const allVotesForThisComment = await commentVoteSchemaExport.find({ commentID: comment._id });
        const voteCount = allVotesForThisComment.reduce((total, vote) => total + vote.vote, 0);

        return {
          ...comment,
          userNickname: user?.userNickname || comment.username,
          voteCount,
          vote: userVoteMap.get(comment._id.toString()) ?? 0, // Oy verilmemişse 0
        };
      })
    );

    const map = new Map<string, ICommentWithReplies>();
    const roots: ICommentWithReplies[] = [];

    commentsWithExtraData.forEach(comment => {
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
      data: roots,
    };
  } catch (error) {
    console.error(error);
    return {
      error: error,
      statusCode: 500,
      success: false,
      message: 'Unknown error! Please contact the admin.',
      data: [],
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

//commentLikes
const updateCommentVoteService = async (data:IUpdateCommentVoteRequestDto):Promise<ResponseWithMessage<boolean>> => { 
    try {
        const commentVote = await commentVoteSchemaExport.findOne({commentID: data.commentID, username: data.username});
        if (!commentVote){
            const newCommentVote = new commentVoteSchemaExport({
                commentID: data.commentID,
                username: data.username,
                vote: data.vote
            });
            await newCommentVote.save();
        } else {
            if(commentVote.vote === data.vote) data.vote = 0;
            commentVote.vote = data.vote;
            await commentVote.save();
        }
        return { statusCode: 200, success: true, message: 'Comment vote updated successfully.', data: true };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false, data: false };
    }
}

const getCommentVoteCountByUsernameService = async (data:{commentID:string, username:string}):Promise<ResponseWithMessage<number>> => { 
    try {
        const vote = await commentVoteSchemaExport.findOne({ commentID: data.commentID, username: data.username }).lean();
        if (!vote) return { statusCode: 200, success: false, message: 'Vote not found.', data: 0 };
        return { statusCode: 200, success: true, message: 'Vote fetched successfully.', data: vote.vote };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

export {
    createNewCommentService,
    deleteCommentService,
    updateCommentService,
    updateCommentStatusService,
    getAllCommentsService,
    getAllCommentsByBlogPostIDService,
    getCommentService,
    updateCommentVoteService,
    getCommentVoteCountByUsernameService
}
