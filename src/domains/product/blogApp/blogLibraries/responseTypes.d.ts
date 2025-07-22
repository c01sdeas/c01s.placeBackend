interface IBlogLibraryResponseDto {
    id: string;
    title: string;
    description: string;
    status: boolean;
    username: string;
    blogPostInLibraryID: string | null;
    createdAt: Date;
    updatedAt: Date;
}
interface IBlogPostInLibraryResponseDto {
    libraryID: string;

    id: string;
    title: string;
    slug: string;
    image: string;
    readingTime: string;
    meta: string;
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
}

//followingTags
interface IFollowingTagResponseDto {
    id: string;
    tagID: string;
    tagTitle: string;
    tagSlug: string;
    tagMeta: string;
    tagDescription: string;
    tagImage: string;
    tagStatus: boolean;
    tagUsername: string;
    tagUserNickname: string;
    username: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type {
    IBlogLibraryResponseDto,
    IBlogPostInLibraryResponseDto,
    IFollowingTagResponseDto
}