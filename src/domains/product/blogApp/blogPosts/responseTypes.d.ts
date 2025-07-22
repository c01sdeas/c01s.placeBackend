interface IBlogListResponseDto {
    id: string;
    slug: string;
    image: string;
    readingTime: string;
    meta: string;
    title: string;
    intro: string;
    content: string;
    categoryID: string;
    categoryTitle: string;
    categorySlug: string;
    username: string;
    status: boolean;
    
    userNickname: string;
    createdAt: Date;
    updatedAt: Date;
    voteCount: number;
    viewCount: number;
}

interface IVoteResponseDto {
    id: string;
    blogPostID: string;
    username: string;
    vote: number;
    createdAt: Date;
    updatedAt: Date;
}

export type {
    IBlogListResponseDto,
    IVoteResponseDto
}