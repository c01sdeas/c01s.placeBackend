import { IComment } from "./modelTypes.js";

interface ICommentListResponseDto extends ResponseWithMessage<IComment[]> {
    
}

interface ICommentResponseDto extends ResponseWithMessage<IComment> {
    
}

interface ICommentDeleteResponseDto extends ResponseWithMessage<boolean> {
    
}

interface ICommentUpdateResponseDto extends ResponseWithMessage<IComment> {
    
}

interface ICreateNewCommentResponseDto extends ResponseWithMessage<IComment> {
    
}

interface ICommentWithReplies extends IComment {
    replies?: ICommentWithReplies[];
}

interface ICommentListWithRepliesResponseDto extends ResponseWithMessage<ICommentWithReplies[]> {
    
}

export type {
    ICommentListResponseDto,
    ICommentResponseDto,
    ICommentDeleteResponseDto,
    ICommentUpdateResponseDto,
    ICreateNewCommentResponseDto,
    ICommentWithReplies,
    ICommentListWithRepliesResponseDto
}
