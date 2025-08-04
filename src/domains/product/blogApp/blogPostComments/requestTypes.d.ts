interface ICreateNewCommentRequestDto {
    blogPostID: string;
    comment: string;
    parentID?: string;
    username: string;
}

interface IUpdateCommentRequestDto {
    id: string;
    comment: string;
}

interface IUpdateCommentVoteRequestDto {
    commentID: string;
    username: string;
    vote: number;
}

export type {
    ICreateNewCommentRequestDto,
    IUpdateCommentRequestDto,
    IUpdateCommentVoteRequestDto
}