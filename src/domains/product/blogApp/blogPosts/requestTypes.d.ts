interface ICreateNewBlogPostRequestDto {
    image?: string;
    meta: string;
    title: string;
    intro: string;
    content: string;
    categoryID: string;
    username: string;
}

interface IUpdateBlogPostTitleRequestDto {
    id: string;
    title: string;
}

interface IUpdateBlogPostContentRequestDto {
    id: string;
    content: string;
}

interface IUpdateBlogPostImageRequestDto {
    id: string;
    image: string;
}

interface IUpdateBlogPostMetaRequestDto {
    id: string;
    meta: string;
}

interface IUpdateBlogPostIntroRequestDto {
    id: string;
    intro: string;
}

interface IUpdateBlogPostUserVotesRequestDto {
    blogPostID: string;
    username: string;
    vote: number;
}

interface IGetBlogPostVotesRequestDto {
    blogPostID: string;
}

interface IGetBlogPostUserVoteControlRequestDto {
    blogPostID: string;
    username: string;
}

interface IUpdateBlogPostStatusRequestDto {
    id: string;
}

interface IGetAllBlogPostsRequestDto {
    page: number;
    limit: number;
}

interface IGetAllBlogPostsByUsernameForLibraryRequestDto {
    username: string;
    page: number;
    limit: number;
}

interface IGetBlogPostBySlugRequestDto {
    slug: string;
}

interface IGetBlogPostByCategoryIDRequestDto {
    categoryID: string;
    page: number;
    limit: number;
}

interface IGetBlogPostByCategorySlugRequestDto {
    slug: string;
    page: number;
    limit: number;
}

interface IGetBlogPostByUsernameRequestDto {
    username: string;
    page: number;
    limit: number;
}

interface IGetBlogPostByUsernameAndCategoryIDRequestDto {
    username: string;
    categoryID: string;
    page: number;
    limit: number;
}

interface ISubscribeToNewsRequestDto {
    email: string;
}

interface ISearchInBlogPostsRequestDto {
    data: string;
}

interface IUpdateBlogPostViewCountRequestDto {
    id: string;
}

interface IUpdateBlogPostViewLogRequestDto {
    blogPostID: string;
    viewerIp: string;
    username?: string;
    viewedAt: Date;
}

export type {
    ICreateNewBlogPostRequestDto,
    IUpdateBlogPostTitleRequestDto,
    IUpdateBlogPostContentRequestDto,
    IUpdateBlogPostImageRequestDto,
    IUpdateBlogPostMetaRequestDto,
    IUpdateBlogPostIntroRequestDto,
    IUpdateBlogPostUserVotesRequestDto,
    IGetBlogPostVotesRequestDto,
    IGetBlogPostUserVoteControlRequestDto,
    IUpdateBlogPostStatusRequestDto,
    IGetAllBlogPostsRequestDto,
    IGetAllBlogPostsByUsernameForLibraryRequestDto,
    IGetBlogPostBySlugRequestDto,
    IGetBlogPostByCategoryIDRequestDto,
    IGetBlogPostByCategorySlugRequestDto,
    IGetBlogPostByUsernameRequestDto,
    IGetBlogPostByUsernameAndCategoryIDRequestDto,
    ISubscribeToNewsRequestDto,
    ISearchInBlogPostsRequestDto,
    IUpdateBlogPostViewCountRequestDto,
    IUpdateBlogPostViewLogRequestDto,
}