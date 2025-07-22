import { Types } from "mongoose";

//blogLibraries
interface ICreateNewBlogLibraryRequestDto {
    title: string;
    description: string;
    username: string;
}

interface IUpdateBlogLibraryTitleRequestDto {
    id: Types.ObjectId;
    title: string;
}
interface IUpdateBlogLibraryDescriptionRequestDto {
    id: Types.ObjectId;
    description: string;
}
interface IUpdateBlogLibraryStatusRequestDto {
    id: Types.ObjectId;
}

interface IDeleteBlogLibraryRequestDto {
    id: Types.ObjectId;
}

interface IGetAllBlogLibrariesRequestDto {
    username?: string;
    blogPostID?: Types.ObjectId;
}

//blogPostsInLibrary
interface ICreateNewBlogPostInLibraryRequestDto {
    blogPostID: Types.ObjectId;
    libraryID: Types.ObjectId;
}

interface IUpdateBlogPostInLibraryRequestDto {
    id: Types.ObjectId;
    blogPostID: Types.ObjectId;
    libraryID: Types.ObjectId;
}
interface IDeleteBlogPostInLibraryRequestDto {
    blogPostID: Types.ObjectId;
    libraryID: Types.ObjectId;
}
interface IGetAllBlogPostsInLibraryRequestDto {
    libraryID: Types.ObjectId;
    page: number;
    limit: number;
}
interface IUpdateBlogPostInLibraryStatusRequestDto {
    blogPostID: Types.ObjectId;
    libraryID: Types.ObjectId;
    status: boolean;
}


//followingTags
interface ICreateNewFollowingTagRequestDto {
    tagID: Types.ObjectId;
    requestUsername: string;
}
interface IUpdateFollowingTagRequestDto {
    id: Types.ObjectId;
    tagID: Types.ObjectId;
    requestUsername: string;
}
interface IDeleteFollowingTagRequestDto {
    id: Types.ObjectId;
}
interface IGetAllFollowingTagsByUsernameRequestDto {
    username: string;
}
interface IUpdateFollowingTagStatusRequestDto {
    tagID: Types.ObjectId;
    requestUsername: string;
}
interface IGetAllBlogPostsByFollowingTagsRequestDto {
    username: string;
    page: number;
    limit: number;
}

export type {
    ICreateNewBlogLibraryRequestDto,
    ICreateNewBlogPostInLibraryRequestDto,
    IUpdateBlogLibraryTitleRequestDto,
    IUpdateBlogLibraryDescriptionRequestDto,
    IUpdateBlogLibraryStatusRequestDto,
    IUpdateBlogPostInLibraryRequestDto,
    IDeleteBlogLibraryRequestDto,
    IDeleteBlogPostInLibraryRequestDto,
    IGetAllBlogLibrariesRequestDto,
    IGetAllBlogPostsInLibraryRequestDto,
    IUpdateBlogPostInLibraryStatusRequestDto,
    ICreateNewFollowingTagRequestDto,
    IUpdateFollowingTagRequestDto,
    IDeleteFollowingTagRequestDto,
    IGetAllFollowingTagsByUsernameRequestDto,
    IUpdateFollowingTagStatusRequestDto,
    IGetAllBlogPostsByFollowingTagsRequestDto
}
