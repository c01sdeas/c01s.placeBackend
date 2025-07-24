import { userSchemaExport } from "../../../user/authentication/authModel.js";
import { blogCategorySchemaExport } from "../blogCategories/model.js";
import { blogPostSchemaExport, blogPostViewLogSchemaExport, blogPostVoteSchemaExport } from "../blogPosts/model.js";
import { IBlogPost, IBlogPostViewLog, IBlogPostVote } from "../blogPosts/modelTypes.js";
import { IGetAllBlogPostsByUsernameForLibraryRequestDto, IGetAllBlogPostsRequestDto } from "../blogPosts/requestTypes.js";
import { IBlogListResponseDto } from "../blogPosts/responseTypes.js";
import { blogPostInLibrarySchemaExport, followingTagSchemaExport, librarySchemaExport } from "./model.js";
import { IBlogPostInLibrary, IFollowingTag, ILibrary } from "./modelTypes.js";
import { ICreateNewBlogLibraryRequestDto, ICreateNewBlogPostInLibraryRequestDto, ICreateNewFollowingTagRequestDto, IDeleteBlogLibraryRequestDto, IDeleteBlogPostInLibraryRequestDto, IDeleteFollowingTagRequestDto, IGetAllBlogLibrariesRequestDto, IGetAllBlogPostsByFollowingTagsRequestDto, IGetAllBlogPostsInLibraryRequestDto, IGetAllFollowingTagsByUsernameRequestDto, IUpdateBlogLibraryDescriptionRequestDto, IUpdateBlogLibraryStatusRequestDto, IUpdateBlogLibraryTitleRequestDto, IUpdateBlogPostInLibraryRequestDto, IUpdateBlogPostInLibraryStatusRequestDto, IUpdateFollowingTagStatusRequestDto } from "./requestTypes.d.js";
import { IBlogLibraryResponseDto, IBlogPostInLibraryResponseDto, IFollowingTagResponseDto } from "./responseTypes.js";
import { Types } from "mongoose";
//blogLibrariesCRUD
const createNewBlogLibraryService = async (data:ICreateNewBlogLibraryRequestDto):Promise<ResponseWithMessage<boolean>> => {
    try {
        const newLibrary = new librarySchemaExport(data);
        await newLibrary.save();
        return { statusCode: 201, success: true, message: 'New library added.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const updateBlogLibraryTitleService = async (data:IUpdateBlogLibraryTitleRequestDto):Promise<ResponseWithMessage<boolean>> => {
    try {
        const library = await librarySchemaExport.findById(data.id);
        if (!library) return { statusCode: 200, success: false, message: 'Library not found.' };

        library.title = data.title;

        await library.save();   
        return { statusCode: 200, success: true, message: 'Library updated successfully.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const updateBlogLibraryDescriptionService = async (data:IUpdateBlogLibraryDescriptionRequestDto):Promise<ResponseWithMessage<boolean>> => {
    try {
        const library = await librarySchemaExport.findById(data.id);
        if (!library) return { statusCode: 200, success: false, message: 'Library not found.' };

        library.description = data.description;

        await library.save();
        return { statusCode: 200, success: true, message: 'Library updated successfully.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const updateBlogLibraryStatusService = async (data:IUpdateBlogLibraryStatusRequestDto):Promise<ResponseWithMessage<boolean>> => {
    try {
        const library = await librarySchemaExport.findById(data.id);
        if (!library) return { statusCode: 200, success: false, message: 'Library not found.' };

        library.status = !library.status;

        await library.save();
        return { statusCode: 200, success: true, message: 'Library updated successfully.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const deleteBlogLibraryService = async (data:IDeleteBlogLibraryRequestDto):Promise<ResponseWithMessage<boolean>> => {
    try {
        const library = await librarySchemaExport.findByIdAndDelete(data.id);
        if (!library) return { statusCode: 200, success: false, message: 'Library not found.' };
        return { statusCode: 200, success: true, message: 'Library deleted successfully.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const getAllBlogLibrariesByUsernameService = async (data:IGetAllBlogLibrariesRequestDto):Promise<ResponseWithMessage<IBlogLibraryResponseDto[]>> => {
    try {
        const libraries = await librarySchemaExport.find({ username: data.username }).sort({ createdAt: -1 }).lean();
        if (!libraries) return { statusCode: 200, success: false, message: 'Libraries not found.' };

        const formattedLibraries:IBlogLibraryResponseDto[] = await Promise.all(libraries.map(async (library:ILibrary) => {

            let blogPostInLibraryID : string | null = null;

            if (data.blogPostID) {
                let blogPostInLibrary = await blogPostInLibrarySchemaExport.findOne({ libraryID: library._id.toString(), blogPostID: data.blogPostID }).lean();
                if(blogPostInLibrary) blogPostInLibraryID = blogPostInLibrary.blogPostID.toString();
            }

            return {
                id: library._id.toString(),
                title: library.title,
                description: library.description,
                status: library.status,
                username: library.username,
                blogPostInLibraryID,
                createdAt: library.createdAt,
                updatedAt: library.updatedAt
            }
        }));
        return { statusCode: 200, success: true, message: 'Libraries found successfully.', data: formattedLibraries };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

//blogPostsInLibraries
const createNewBlogPostInLibraryService = async (data:ICreateNewBlogPostInLibraryRequestDto):Promise<ResponseWithMessage<boolean>> => {
    try {
        const library = await librarySchemaExport.findById(data.libraryID);
        if (!library) return { statusCode: 404, success: false, message: 'Library not found.' };
        const blogPost = await blogPostSchemaExport.findById(data.blogPostID);
        if (!blogPost) return { statusCode: 404, success: false, message: 'Blog post not found.' };

        const blogPostInLibraryExists = await blogPostInLibrarySchemaExport.exists({ blogPostID: data.blogPostID, libraryID: data.libraryID });
        if (blogPostInLibraryExists) return { statusCode: 200, success: false, message: 'Blog post already exists in library.' };
        
        const blogPostInLibrary = new blogPostInLibrarySchemaExport({
            blogPostID: blogPost._id,
            libraryID: library._id
        });
        await blogPostInLibrary.save();
        return { statusCode: 201, success: true, message: 'Blog post added to library.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const updateBlogPostInLibraryService = async (data:IUpdateBlogPostInLibraryRequestDto):Promise<ResponseWithMessage<boolean>> => {
    try {
        const blogPostInLibrary = await blogPostInLibrarySchemaExport.findById(data.id);
        if (!blogPostInLibrary) return { statusCode: 404, success: false, message: 'Blog post in library not found.' };
        blogPostInLibrary.blogPostID = new Types.ObjectId(data.blogPostID);
        blogPostInLibrary.libraryID = new Types.ObjectId(data.libraryID);
        await blogPostInLibrary.save();
        return { statusCode: 200, success: true, message: 'Blog post in library updated successfully.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const updateBlogPostInLibraryStatusService = async (data:IUpdateBlogPostInLibraryStatusRequestDto):Promise<ResponseWithMessage<boolean>> => {
    try {
        const blogPostInLibrary = await blogPostInLibrarySchemaExport.findOne({blogPostID:data.blogPostID, libraryID:data.libraryID});
        if (!blogPostInLibrary) return { statusCode: 404, success: false, message: 'Blog post in library not found.' };
        blogPostInLibrary.status = data.status;
        await blogPostInLibrary.save();
        return { statusCode: 200, success: true, message: 'Blog post in library updated successfully.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const deleteBlogPostInLibraryService = async (data:IDeleteBlogPostInLibraryRequestDto):Promise<ResponseWithMessage<boolean>> => {
    try {
        const blogPostInLibrary = await blogPostInLibrarySchemaExport.findOneAndDelete({blogPostID:data.blogPostID, libraryID:data.libraryID});
        if (!blogPostInLibrary) return { statusCode: 404, success: false, message: 'Blog post in library not found.' };
        return { statusCode: 200, success: true, message: 'Blog post in library deleted successfully.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const getAllBlogPostsInLibraryService = async (data:IGetAllBlogPostsInLibraryRequestDto):Promise<ResponseWithMessage<IBlogPostInLibraryResponseDto[]>> => {
    try {
        const blogPostsInLibrary = await blogPostInLibrarySchemaExport.find({ libraryID: data.libraryID }).populate('blogPostID').populate('libraryID').sort({ createdAt: -1 }).skip((data.page - 1) * data.limit).limit(data.limit).lean();
        if (!blogPostsInLibrary) return { statusCode: 200, success: false, message: 'Blog posts in library not found.' };

        const blogPost = await blogPostSchemaExport.findById(blogPostsInLibrary[0].blogPostID).lean();
        if (!blogPost) return { statusCode: 200, success: false, message: 'Blog post not found.' };

        const category = await blogCategorySchemaExport.findById(blogPost.categoryID).lean();
        if (!category) return { statusCode: 200, success: false, message: 'Category not found.' };

        const user = await userSchemaExport.findOne({ username: blogPost.username }).lean();
        if (!user) return { statusCode: 200, success: false, message: 'User not found.' };

        const votes = await blogPostVoteSchemaExport.find({ blogPostID: blogPost._id.toString() }).lean();

        const viewCount = await blogPostViewLogSchemaExport.aggregate([
            {
                $match: {
                    blogPostID: new Types.ObjectId(blogPost._id)
                }
            },
            {
                $group: {
                    _id: null,
                    totalViewCount: { $sum: "$viewCount" }
                }
            }
        ]);

        const formattedBlogPostsInLibrary:IBlogPostInLibraryResponseDto[] = blogPostsInLibrary.map(blogPostInLibrary => {
            return {
                id: blogPostInLibrary._id.toString(),
                blogPostID: blogPostInLibrary.blogPostID.toString(),
                libraryID: blogPostInLibrary.libraryID.toString(),
                createdAt: blogPostInLibrary.createdAt,
                updatedAt: blogPostInLibrary.updatedAt,
                title: blogPost.title,
                slug: blogPost.slug,
                image: blogPost.image,
                readingTime: blogPost.readingTime,
                meta: blogPost.meta,
                intro: blogPost.intro,
                content: blogPost.content,
                categoryID: blogPost.categoryID.toString(),
                categoryTitle: category.title,
                categorySlug: category.slug,
                username: blogPost.username,
                status: blogPost.status,
                blogPostInLibraryStatus: blogPostInLibrary.status,
                userNickname: user.userNickname,
                viewCount: viewCount[0]?.totalViewCount || 0,
                voteCount: votes.reduce((sum, vote) => sum + vote.vote, 0)
            }
        })
        return { statusCode: 200, success: true, message: 'Blog posts in library found successfully.', data: formattedBlogPostsInLibrary };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

//followingTags
const createNewFollowingTagService = async (data:ICreateNewFollowingTagRequestDto):Promise<ResponseWithMessage<boolean>> => {
    try {
        const followingTagExists = await followingTagSchemaExport.findOne({ tagID: data.tagID, username: data.requestUsername });
        if (followingTagExists && !followingTagExists.status){
            followingTagExists.status = !followingTagExists.status;
            await followingTagExists.save();
            return { statusCode: 200, success: true, message: 'Following tag created successfully.' };
        }
        if (followingTagExists && followingTagExists.status){
            return { statusCode: 200, success: false, message: 'Following tag already exists.' };
        }
        if (followingTagExists && !followingTagExists.status){
            followingTagExists.status = !followingTagExists.status;
            await followingTagExists.save();
            return { statusCode: 200, success: true, message: 'Following tag created successfully.' };
        }
        const followingTag = new followingTagSchemaExport({
            tagID: data.tagID,
            username: data.requestUsername
        });
        await followingTag.save();
        return { statusCode: 201, success: true, message: 'Following tag created successfully.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}
const deleteFollowingTagService = async (data:IDeleteFollowingTagRequestDto):Promise<ResponseWithMessage<boolean>> => {
    try {
        const followingTag = await followingTagSchemaExport.findById(data.id);
        if (!followingTag) return { statusCode: 200, success: false, message: 'Following tag not found.' };
        await followingTag.deleteOne();
        return { statusCode: 200, success: true, message: 'Following tag deleted successfully.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}
const updateFollowingTagStatusService = async (data:IUpdateFollowingTagStatusRequestDto):Promise<ResponseWithMessage<boolean>> => {
    try {
        const followingTag = await followingTagSchemaExport.findOne({tagID: data.tagID, username: data.requestUsername});
        if (!followingTag) return { statusCode: 200, success: false, message: 'Following tag not found.' };
        followingTag.status = !followingTag.status;
        await followingTag.save();
        return { statusCode: 200, success: true, message: 'Following tag updated successfully.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const getAllFollowingTagsByUsernameService = async (data: IGetAllFollowingTagsByUsernameRequestDto): Promise<ResponseWithMessage<IFollowingTagResponseDto[]>> => {
    try {
        // Get followed tags with populated data
        const followingTags = await followingTagSchemaExport
        .find({ username: data.username, status: true })
        .populate('tagID')
        .lean();

        // Handle no following tags case
        if (!followingTags.length) {
        return { 
            statusCode: 200, 
            success: true, 
            message: 'You are not following any tags yet.', 
            data: [] 
        };
        }

        // Extract tag IDs and usernames
        const tagIds = followingTags.map(ft => ft.tagID);
        const tagUsernames = Array.from(new Set(followingTags.map(ft => ft.username)));

        // Fetch related data in parallel
        const [tags, users] = await Promise.all([
        blogCategorySchemaExport.find({ _id: { $in: tagIds }, status: true }).lean(),
        userSchemaExport.find({ username: { $in: tagUsernames } }).lean()
        ]);

        // Create lookup maps
        const tagMap = new Map(tags.map(tag => [tag._id.toString(), tag]));
        const userMap = new Map(users.map(user => [user.username, user]));

        // Transform following tags to response format
        const formattedFollowingTags = followingTags.reduce<IFollowingTagResponseDto[]>(
        (acc, followingTag) => {
            const tagIdStr = followingTag.tagID.toString();
            const tag = tagMap.get(tagIdStr);
            
            if (!tag) {
            console.warn(`Tag not found for followingTag ID: ${followingTag._id}`);
            return acc;
            }
            
            const user = userMap.get(tag.username);
            if (!user) {
            console.warn(`User not found for tag: ${tag._id}, username: ${tag.username}`);
            return acc;
            }
            
            acc.push({
            id: followingTag._id.toString(),
            tagID: tagIdStr,
            tagTitle: tag.title,
            tagSlug: tag.slug,
            tagMeta: tag.meta,
            tagDescription: tag.description,
            tagImage: tag.image,
            tagStatus: tag.status,
            tagUsername: tag.username,
            tagUserNickname: user.userNickname,
            username: followingTag.username,
            status: followingTag.status,
            createdAt: followingTag.createdAt,
            updatedAt: followingTag.updatedAt
            });
            
            return acc;
        }, 
        []
        );

        return {
        statusCode: 200,
        success: true,
        message: 'Following tags retrieved successfully.',
        data: formattedFollowingTags
        };
    } catch (error) {
        console.error('Error retrieving following tags:', error);
        return {
        statusCode: 500,
        success: false,
        message: 'Internal server error. Please try again later.',
        error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
};

const getAllBlogPostsByFollowingTagsService = async (data: IGetAllBlogPostsByFollowingTagsRequestDto): Promise<ResponseWithMessage<IBlogListResponseDto[]>> => {
    try {

        const followingTags = await followingTagSchemaExport.find({ username: data.username, status: true }).lean();
        
        const tagIds = followingTags.map(ft => ft.tagID);
        const uniqueTagIds = [...new Set(tagIds)];
        
        const tags = await blogCategorySchemaExport.find({ 
            _id: { $in: uniqueTagIds },
            status: true
        }).lean();

        const blogPosts = await blogPostSchemaExport.find({ 
            categoryID: { $in: uniqueTagIds }, 
            status: true
        }).skip((data.page - 1) * data.limit).sort({ createdAt: -1 }).limit(data.limit).lean();

        const tagMap = new Map(tags.map(tag => [tag._id.toString(), tag]));
        
        const uniqueUsernames = [...new Set(tags.map(tag => tag.username))];
        
        const users = await userSchemaExport.find({ username: { $in: uniqueUsernames } }).lean();
        
        const userMap = new Map(users.map(user => [user.username, user]));

        const voteCount = await blogPostVoteSchemaExport.find({ blogPostID: { $in: blogPosts.map(bp => bp._id.toString()) } }).lean();
        

        const votesByBlogPostIdMap = voteCount.reduce((map, vote) => {
            const blogId = vote.blogPostID.toString();
            if (!map.has(blogId)) {
                map.set(blogId, []);
            }
            map.get(blogId)?.push(vote);
            return map;
        }, new Map<string, IBlogPostVote[]>());


        const viewCounts = await blogPostViewLogSchemaExport.aggregate([
            {
                $match: {
                    blogPostID: { $in: blogPosts.map(bp => bp._id) }
                }
            },
            {
                $group: {
                    _id: "$blogPostID",
                    totalViewCount: { $sum: 1 }
                }
            }
        ]);

        const viewCountMap = new Map(
            viewCounts.map(vc => [vc._id.toString(), vc.totalViewCount])
        );

        const fixImageUrls = (htmlContent:string) => {
            return htmlContent.replace(/<img\s+[^>]*src=["']([^"']+)["']/g, (match, src) => {
                return match.replace(src, `${process.env.BASE_IMG_URL}${src}`);
            });
        };

        const extractFirstImageSrc = (htmlContent: string): string | null => {
            if (!htmlContent) return null;
          
            // <img ... src="..." ...> etiketi için regex
            const imgRegex = /<img[^>]+src=["']?([^"'>\s]+)["']?/i;
            const match = imgRegex.exec(htmlContent);
          
            return match ? match[1] : null;
          };
        
        const formattedBlogPosts = blogPosts.reduce<IBlogListResponseDto[]>(
            (acc, blogPost) => {
                const tagIdStr = blogPost.categoryID.toString();
                const tag = tagMap.get(tagIdStr);
                
                if (!tag) {
                console.warn(`Tag not found for blogPost ID: ${blogPost._id}`);
                return acc;
                }
                
                const user = userMap.get(tag.username);
                if (!user) {
                console.warn(`User not found for tag: ${tag._id}, username: ${tag.username}`);
                return acc;
                }
                const votesForThisPost = votesByBlogPostIdMap.get(blogPost._id.toString()) || [];
                const totalVoteScore = votesForThisPost.reduce((sum, vote) => sum + vote.vote, 0);
                acc.push({
                    id: blogPost._id.toString(),
                    slug: blogPost.slug,
                    image: process.env.BASE_IMG_URL ? process.env.BASE_IMG_URL + extractFirstImageSrc(blogPost.content) : '',
                    readingTime: blogPost.readingTime,
                    meta: blogPost.meta,
                    title: blogPost.title,
                    intro: blogPost.intro,
                    content: fixImageUrls(blogPost.content),
                    categoryID: tagIdStr,
                    categoryTitle: tag.title,
                    categorySlug: tag.slug,
                    categoryStatus: tag.status,
                    username: tag.username,
                    status: blogPost.status,
                    userNickname: user.userNickname,
                    createdAt: blogPost.createdAt,
                    updatedAt: blogPost.updatedAt,
                    voteCount: totalVoteScore,
                    viewCount: viewCountMap.get(blogPost._id.toString()) || 0
                });
                
                return acc;
            }, 
            []
        );
        
        return {
        statusCode: 200,
        success: true,
        message: 'Blog posts retrieved successfully.',
        data: formattedBlogPosts
        };
    } catch (error) {
        console.error('Error retrieving following posts:', error);
        return {
        statusCode: 500,
        success: false,
        message: 'Internal server error. Please try again later.',
        error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
}

const getAllFollowingTagsService = async (): Promise<ResponseWithMessage<IFollowingTagResponseDto[]>> => {
    try {
        const followingTags = await followingTagSchemaExport.find().lean();
        
        // Handle empty case early
        if (!followingTags.length) {
            return { 
                statusCode: 200, 
                success: true, 
                message: 'No following tags found'
            };
        }

        // Extract tag IDs and create a set to avoid duplicates
        const tagIds = followingTags.map(ft => ft.tagID);
        const uniqueTagIds = [...new Set(tagIds)];
        
        // Get tags and create a map for quick lookup
        const tags = await blogCategorySchemaExport.find({ 
            _id: { $in: uniqueTagIds } 
        }).lean();
        
        const tagMap = new Map(tags.map(tag => [tag._id.toString(), tag]));
        
        // Extract unique usernames from tags
        const uniqueUsernames = [...new Set(tags.map(tag => tag.username))];
        
        // Get users and create a map for quick lookup
        const users = await userSchemaExport.find({ 
            username: { $in: uniqueUsernames } 
        }).lean();
        
        const userMap = new Map(users.map(user => [user.username, user]));

        // Transform data with proper undefined checks
        const formattedFollowingTags : IFollowingTagResponseDto[] = followingTags
            .map(followingTag => {
                const tag = tagMap.get(followingTag.tagID.toString());
                
                // Skip if tag not found
                if (!tag) {
                    console.warn(`Tag not found for ID: ${followingTag.tagID}`);
                    return null;
                }
                
                const user = userMap.get(tag.username);
                
                // Skip if user not found
                if (!user) {
                    console.warn(`User not found for username: ${tag.username}`);
                    return null;
                }
                
                return {
                    id: followingTag._id.toString(),
                    tagID: followingTag.tagID.toString(),
                    tagTitle: tag.title,
                    tagSlug: tag.slug,
                    tagMeta: tag.meta,
                    tagDescription: tag.description,
                    tagImage: tag.image,
                    tagStatus: tag.status,
                    tagUsername: tag.username,
                    tagUserNickname: user.userNickname,
                    username: followingTag.username,
                    status: followingTag.status,
                    createdAt: followingTag.createdAt,
                    updatedAt: followingTag.updatedAt
                };
            })
            .filter((item): item is IFollowingTagResponseDto => item !== null); // Type guard to filter out nulls

        return {
            statusCode: 200,
            success: true,
            message: 'Following tags retrieved successfully',
            data: formattedFollowingTags
        };
    } catch (error) {
        console.error('Error retrieving following tags:', error);
        return {
            statusCode: 500,
            success: false,
            message: 'Internal server error',
            error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
};

const getAllBlogPostsByUsernameForLibraryService = async (data: IGetAllBlogPostsByUsernameForLibraryRequestDto): Promise<ResponseWithMessage<IBlogListResponseDto[]>> => {
    try {
        const { username, page, limit } = data;
        const blogPosts = await blogPostSchemaExport.find({ username }).skip((page - 1) * limit).limit(limit).sort({ createdAt: -1 }).lean();
        const totalRecords = await blogPostSchemaExport.countDocuments({ username });
        const user = await userSchemaExport.findOne({ username }).lean();
        if (!user) {
            return { statusCode: 404, success: false, message: 'User not found.' };
        }

        const formattedBlogPosts: IBlogListResponseDto[] = (await Promise.all(
            blogPosts.map(async blogPost => {
              const category = await blogCategorySchemaExport.findById(blogPost.categoryID).lean();
              if (!category) {
                console.warn(`Category not found for ID: ${blogPost.categoryID}`);
                return null; // isteğe bağlı
              }
          
              const votes = await blogPostVoteSchemaExport.find({ blogPostID: blogPost._id.toString() }).lean();
              const totalVoteScore = votes.reduce((sum, vote) => sum + vote.vote, 0);
              const viewCount = await blogPostViewLogSchemaExport.aggregate([
                {
                  $match: {
                    blogPostID: new Types.ObjectId(blogPost._id)
                  }
                },
                {
                  $group: {
                    _id: null,
                    totalViewCount: { $sum: "$viewCount" }
                  }
                }
              ]);
          
              return {
                id: blogPost._id.toString(),
                slug: blogPost.slug,
                image: blogPost.image,
                readingTime: blogPost.readingTime,
                meta: blogPost.meta,
                title: blogPost.title,
                intro: blogPost.intro,
                content: blogPost.content,
                categoryID: category._id.toString(),
                categoryTitle: category.title,
                categorySlug: category.slug,
                username: blogPost.username,
                status: blogPost.status,
                userNickname: user.userNickname,
                createdAt: blogPost.createdAt,
                updatedAt: blogPost.updatedAt,
                voteCount: totalVoteScore,
                viewCount: viewCount[0]?.totalViewCount || 0,
              } as IBlogListResponseDto;
            })
          )).filter((x): x is IBlogListResponseDto => x !== null);
        return { statusCode: 200, success: true, message: 'Blog posts retrieved successfully.', data: formattedBlogPosts, totalRecords };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

export {
    //blogLibrariesCRUD
    createNewBlogLibraryService,
    updateBlogLibraryTitleService,
    updateBlogLibraryDescriptionService,
    updateBlogLibraryStatusService,
    deleteBlogLibraryService,
    getAllBlogLibrariesByUsernameService,

    //blogPostInLibrariesCRUD
    createNewBlogPostInLibraryService,
    updateBlogPostInLibraryService,
    updateBlogPostInLibraryStatusService,
    deleteBlogPostInLibraryService,
    getAllBlogPostsInLibraryService,

    getAllBlogPostsByUsernameForLibraryService,

    //followingTagsCRUD
    createNewFollowingTagService,
    deleteFollowingTagService,
    updateFollowingTagStatusService,
    getAllFollowingTagsByUsernameService,
    getAllBlogPostsByFollowingTagsService,
    getAllFollowingTagsService
}