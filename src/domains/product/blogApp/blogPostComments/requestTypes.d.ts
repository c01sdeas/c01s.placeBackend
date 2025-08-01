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

export type {
    ICreateNewCommentRequestDto,
    IUpdateCommentRequestDto,
}