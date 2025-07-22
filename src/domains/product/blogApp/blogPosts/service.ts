import slugify from 'slugify';
import { blogPostSchemaExport, blogPostViewLogSchemaExport, blogPostVoteSchemaExport } from "./model.js";
import { userSchemaExport } from '../../../user/authentication/authModel.js';
import { blogCategorySchemaExport } from '../blogCategories/model.js';
import { subscribeNewsSchemaExport } from './model.js';
import { ISubscribeToNewsRequestDto, ICreateNewBlogPostRequestDto, IGetAllBlogPostsRequestDto, IGetBlogPostByCategoryIDRequestDto, IGetBlogPostByCategorySlugRequestDto, IGetBlogPostBySlugRequestDto, IGetBlogPostByUsernameAndCategoryIDRequestDto, IGetBlogPostByUsernameRequestDto, IGetBlogPostUserVoteControlRequestDto, IGetBlogPostVotesRequestDto, IUpdateBlogPostContentRequestDto, IUpdateBlogPostImageRequestDto, IUpdateBlogPostIntroRequestDto, IUpdateBlogPostMetaRequestDto, IUpdateBlogPostStatusRequestDto, IUpdateBlogPostTitleRequestDto, IUpdateBlogPostUserVotesRequestDto, ISearchInBlogPostsRequestDto, IUpdateBlogPostViewCountRequestDto, IUpdateBlogPostViewLogRequestDto } from "./requestTypes.d.js";
import { IBlogListResponseDto, IVoteResponseDto } from './responseTypes.js';
import { IBlogCategory } from '../blogCategories/modelTypes.js';
import { IBlogPostVote } from './modelTypes.js';
import { Types } from 'mongoose';


//subscribetonews
const subscribeToNewsService = async (data:ISubscribeToNewsRequestDto):Promise<ResponseWithMessage<boolean>> => {
    try {
        const newSubscribedUser = new subscribeNewsSchemaExport(data);
        if (await subscribeNewsSchemaExport.exists({ email: data.email })) return { statusCode: 400, success: false, message: 'You are already subscribed to news.' };
        await newSubscribedUser.save();
        return { statusCode: 201, success: true, message: 'Subscribed to news.'};
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

//blogCUD
const createNewBlogPostImageService = async (data:string):Promise<ResponseWithMessage<string>> => {
    try {
        return { statusCode: 201, success: true, message: 'Image added.', data };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}
const createNewBlogPostService = async (data:ICreateNewBlogPostRequestDto):Promise<ResponseWithMessage<boolean>> => {
    try {
        let slug = slugify.default(data.title, { lower: true, strict: true });

        let slugExists = await blogPostSchemaExport.exists({ slug });

        let counter = 1;
        while (slugExists) {
            slug = `${slug}-${counter}`;
            slugExists = await blogPostSchemaExport.exists({ slug });
            counter++;
        }

        if (data.image === null || data.image === undefined) data.image = '';

        const newBlogData = new blogPostSchemaExport({
            content: data.content,
            image: data.image,
            intro: data.intro,
            meta: data.meta,
            readingTime: Math.ceil((data.content.trim().split(/\s+/)).length / 200),
            slug,
            title: data.title,
            categoryID: data.categoryID,
            username: data.username
        });

        await newBlogData.save();
        return { statusCode: 201, success: true, message: 'New post added.' };


    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const deleteBlogPostService = async (id:string):Promise<ResponseWithMessage<boolean>> => {
    try {
        const post = await blogPostSchemaExport.findByIdAndDelete(id);
        if (!post) return { statusCode: 200, success: false, message: 'Post not found.' };
        return { statusCode: 200, success: true, message: 'Post deleted successfully.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const updateBlogPostTitleService = async (data:IUpdateBlogPostTitleRequestDto):Promise<ResponseWithMessage<boolean>> => {
    try {
        const post = await blogPostSchemaExport.findById(data.id);
        if (!post) return { statusCode: 200, success: false, message: 'Post not found.' };

        let slug = slugify.default(data.title, { lower: true, strict: true });

        let slugExists = await blogPostSchemaExport.exists({ slug });

        let counter = 1;
        while (slugExists) {
            slug = `${slug}-${counter}`;
            slugExists = await blogPostSchemaExport.exists({ slug });
            counter++;
        }

        post.slug = slug;
        post.title = data.title;

        await post.save();
        return { statusCode: 200, success: true, message: 'Post updated successfully.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const updateBlogPostContentService = async (data:IUpdateBlogPostContentRequestDto):Promise<ResponseWithMessage<boolean>> => {
    try {
        const post = await blogPostSchemaExport.findById(data.id);
        if (!post) return { statusCode: 200, success: false, message: 'Post not found.' };

        post.readingTime = Math.ceil((data.content.trim().split(/\s+/)).length / 200).toString();
        post.content = data.content;

        await post.save();
        return { statusCode: 200, success: true, message: 'Post updated successfully.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const updateBlogPostImageService = async (data:IUpdateBlogPostImageRequestDto):Promise<ResponseWithMessage<boolean>> => {
    try {
        const post = await blogPostSchemaExport.findById(data.id);
        if (!post) return { statusCode: 200, success: false, message: 'Post not found.' };

        post.image = data.image;

        await post.save();
        return { statusCode: 200, success: true, message: 'Post updated successfully.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const updateBlogPostMetaService = async (data:IUpdateBlogPostMetaRequestDto):Promise<ResponseWithMessage<boolean>> => {
    try {
        const post = await blogPostSchemaExport.findById(data.id);
        if (!post) return { statusCode: 200, success: false, message: 'Post not found.' };

        post.meta = data.meta;

        await post.save();
        return { statusCode: 200, success: true, message: 'Post updated successfully.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const updateBlogPostIntroService = async (data:IUpdateBlogPostIntroRequestDto):Promise<ResponseWithMessage<boolean>> => {
    try {
        const post = await blogPostSchemaExport.findById(data.id);
        if (!post) return { statusCode: 200, success: false, message: 'Post not found.' };

        post.intro = data.intro;

        await post.save();
        return { statusCode: 200, success: true, message: 'Post updated successfully.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

//postVotes
const updateBlogPostVoteService = async (data:IUpdateBlogPostUserVotesRequestDto):Promise<ResponseWithMessage<boolean>> => {
    try {
        const vote = await blogPostVoteSchemaExport.findOne({ blogPostID: data.blogPostID, username: data.username });
        if (!vote) {
            const newVote = new blogPostVoteSchemaExport({
                blogPostID: data.blogPostID,
                username: data.username,
                vote: data.vote
            });
            await newVote.save();
            return { statusCode: 200, success: true, message: 'Vote added successfully.' };
        } else {
            vote.vote = data.vote;
            await vote.save();
            return { statusCode: 200, success: true, message: 'Vote updated successfully.' };
        }
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}
const getBlogPostVotesService = async (data:IGetBlogPostVotesRequestDto):Promise<ResponseWithMessage<IVoteResponseDto[]>> => {
    try {
        const votes = await blogPostVoteSchemaExport.find({ blogPostID: data.blogPostID }).lean();
        const formattedVotes : IVoteResponseDto[] = votes.map(vote => ({
            id: vote._id.toString(),
            blogPostID: vote.blogPostID.toString(),
            username: vote.username,
            vote: vote.vote,
            createdAt: vote.createdAt,
            updatedAt: vote.updatedAt
        }));
        return { statusCode: 200, success: true, message: 'Votes fetched successfully.', data: formattedVotes };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const getBlogPostVoteCountService = async (data:IGetBlogPostVotesRequestDto):Promise<ResponseWithMessage<number>> => {
    try {
        const votes = await blogPostVoteSchemaExport.find({ blogPostID: data.blogPostID }).lean();
        const totalVotes = (votes.filter(vote => vote.vote === 1).length) - (votes.filter(vote => vote.vote === -1).length);
        return { statusCode: 200, success: true, message: 'Votes fetched successfully.', data: totalVotes };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const getBlogPostUserVoteControlService = async (data:IGetBlogPostUserVoteControlRequestDto):Promise<ResponseWithMessage<number>> => {
    try {
        const vote = await blogPostVoteSchemaExport.findOne({ blogPostID: data.blogPostID, username: data.username });
        if (!vote) return { statusCode: 200, success: false, message: 'Vote not found.' };
        return { statusCode: 200, success: true, message: 'Vote fetched successfully.', data: vote.vote };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}


const updateBlogPostStatusService = async (data:IUpdateBlogPostStatusRequestDto):Promise<ResponseWithMessage<boolean>> => {
    try {
        const post = await blogPostSchemaExport.findById(data.id);
        if (!post) return { statusCode: 200, success: false, message: 'Post not found.' };

        post.status = !post.status;

        await post.save();
        return { statusCode: 200, success: true, message: 'Post updated successfully.' };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const updateBlogPostViewCountService = async (data:IUpdateBlogPostViewCountRequestDto):Promise<ResponseWithMessage<number>> => {
    try {
        const post = await blogPostSchemaExport.findByIdAndUpdate(data.id, { $inc: { viewCount: 1 } }, { new: true, select: 'viewCount' }).lean();
        if (!post) return { statusCode: 200, success: false, message: 'Post not found.' };
        return { statusCode: 200, success: true, message: 'Post updated successfully.', data: post.viewCount };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const updateBlogPostViewLogService = async (data:IUpdateBlogPostViewLogRequestDto):Promise<ResponseWithMessage<number>> => {
    try {
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

        const existingLog = await blogPostViewLogSchemaExport.findOne({
            blogPostID: new Types.ObjectId(data.blogPostID),
            $or: [
                { viewerIp: data.viewerIp, username: data.username },
                { viewerIp: data.viewerIp },
                { username: data.username }
            ]
        });

        if (existingLog && existingLog.viewedAt < twentyFourHoursAgo) {
            await blogPostViewLogSchemaExport.findByIdAndUpdate(existingLog._id, {
                $inc: { viewCount: 1 },
                viewedAt: new Date()
            });
        } else if (!existingLog) {
            const viewLogNew = new blogPostViewLogSchemaExport({
                blogPostID: new Types.ObjectId(data.blogPostID),
                viewerIp: data.viewerIp,
                username: data.username,
                viewedAt: new Date(),
                viewCount: 1
            });
            await viewLogNew.save();
        }

        const viewCountNew = await blogPostViewLogSchemaExport.aggregate([
            { $match: { blogPostID: new Types.ObjectId(data.blogPostID) } },
            { $group: { _id: null, total: { $sum: "$viewCount" } } }
        ]);

        return {
            statusCode: 200,
            success: true,
            message: 'Post updated successfully.',
            data: viewCountNew[0]?.total || 0
        };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}


//blogRead
const getAllBlogPostsService = async (data:IGetAllBlogPostsRequestDto):Promise<ResponseWithMessage<IBlogListResponseDto[]>> => {
    try {
        const { page, limit } = data;
        
        const posts = await blogPostSchemaExport.find().sort({ status: -1, createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean();

        if (!posts || posts.length === 0) return { statusCode: 200, success: false, message: 'No posts found.' };

        

        // 2. Pull related users, categories and votes in a single query
        // With map we only get the required IDs/usernames.
        const userUsernames = [...new Set(posts.map(post => post.username))]; // Prevent repetitive usernames
        const categoryIDs = [...new Set(posts.map(post => post.categoryID).filter(Boolean))]; // Filter null/undefined categoryIDs
        const blogPostIDs = [...new Set(posts.map(post => post._id.toString()))]; // Prevent duplicate blog IDs

        const [users, categories, postVotes] = await Promise.all([
            userSchemaExport.find({ username: { $in: userUsernames } }).lean(),
            blogCategorySchemaExport.find({ _id: { $in: categoryIDs } }).lean(),
            blogPostVoteSchemaExport.find({ blogPostID: { $in: blogPostIDs } }).lean()
        ]);

        // 3. Convert the captured data into maps (objects) for quick access
        // This will allow us to search in O(1) time.
        const usersMap = users.reduce((map, user) => {
            map[user.username] = user;
            return map;
        }, {} as Record<string, IUser>);

        const categoriesMap = categories.reduce((map, category) => {
            map[category._id.toString()] = category;
            return map;
        }, {} as Record<string, IBlogCategory>);

        // group postVotes by blogPostID for quick access
        const postVotesMap = postVotes.reduce((map, vote) => {
            if (!map[vote.blogPostID.toString()]) {
                map[vote.blogPostID.toString()] = [];
            }
            map[vote.blogPostID.toString()].push(vote);
            return map;
        }, {} as Record<string, IBlogPostVote[]>);


        // 4. Create formattedPosts and merge data
        const formattedPosts = await Promise.all(posts.map(async post => {
            const image = extractFirstImageSrc(post.content);
            const user = usersMap[post.username];
            const category = categoriesMap[post.categoryID?.toString()] || null; // categoryID null check

            const votes = postVotesMap[post._id.toString()] || []; // Return empty array if no votes
            const netVoteScore = votes.reduce((sum, vote) => sum + vote.vote, 0);

            const viewLogCount = await blogPostViewLogSchemaExport.aggregate([
                { $match: { blogPostID: post._id } },
                { $group: { _id: null, total: { $sum: "$viewCount" } } }
            ]);

            return {
                ...post, // Copy all post data
                id: post._id,
                userNickname: user ? user.userNickname : null, // null if user not found
                categoryTitle: category ? category.title : null, // null if category not found
                categorySlug: category ? category.slug : null,   // null if category not found
                categoryStatus: category ? category.status : null,   // null if category not found
                categoryID: category ? category._id.toString() : null,
                voteCount: netVoteScore,
                viewCount: viewLogCount[0]?.total || 0,
                image: image ? `${process.env.BASE_IMG_URL}${image}` : null,
            } as IBlogListResponseDto;
        }));



        // const formattedPosts : IBlogListResponseDto[] = posts.map(post => ({
        //     id: post._id.toString(),
        //     slug: post.slug,
        //     image: post.image,
        //     readingTime: post.readingTime,
        //     meta: post.meta,
        //     title: post.title,
        //     intro: post.intro,
        //     content: post.content,
        //     createdAt: post.createdAt,
        //     updatedAt: post.updatedAt,
        //     categoryID: post.categoryID,
        //     categoryTitle: '',
        //     categorySlug: '',
        //     username: post.username,
        //     status: post.status,
        //     userNickname: '',
        //     voteCount: 0,
        // }));
        // const users = await userSchemaExport.find({ username: { $in: posts.map(post => post.username) } });
        // const categories = await blogCategorySchemaExport.find({ _id: { $in: formattedPosts.map(post => post.categoryID) } });
        // const postVotes = await voteSchemaExport.find({ blogPostID: { $in: posts.map(post => post._id.toString()) } });
        
        // formattedPosts.forEach(post => {
        //     const user = users.find(user => user.username === post.username);
        //     if (user) post.userNickname = user.userNickname;

        //     const category = categories.find(category => category._id.toString() === post.categoryID);
        //     if (category) {
        //         post.categoryTitle = category.title;
        //         post.categorySlug = category.slug;
        //     }

        //     const votes = postVotes.filter(vote => vote.blogPostID === post.id);
        //     post.voteCount = votes.length;
        // });



        return { statusCode: 200, success: true, message: 'Posts fetched successfully.', data: formattedPosts };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const extractFirstImageSrc = (htmlContent: string): string | null => {
  if (!htmlContent) return null;

  // <img ... src="..." ...> etiketi için regex
  const imgRegex = /<img[^>]+src=["']?([^"'>\s]+)["']?/i;
  const match = imgRegex.exec(htmlContent);

  return match ? match[1] : null;
};

const getBlogPostBySlugService = async (data:IGetBlogPostBySlugRequestDto):Promise<ResponseWithMessage<IBlogListResponseDto>> => {
    try {
        const { slug } = data;
        
        const post = await blogPostSchemaExport.findOne({ slug });
        if (!post) return { statusCode: 200, success: false, message: 'Post not found.' };
        const user = await userSchemaExport.findOne({ username: post.username });
        if (!user) return { statusCode: 200, success: false, message: 'User not found.' };
        const category = await blogCategorySchemaExport.findOne({ _id: post.categoryID });
        if (!category) return { statusCode: 200, success: false, message: 'Category not found.' };

        const fixImageUrls = (htmlContent:string) => {
            return htmlContent.replace(/<img\s+[^>]*src=["']([^"']+)["']/g, (match, src) => {
                return match.replace(src, `${process.env.BASE_IMG_URL}${src}`);
            });
        };

        const votes = await blogPostVoteSchemaExport.find({ blogPostID: post._id.toString() });
        
        const formattedPost : IBlogListResponseDto = {
            id: post._id.toString(),
            slug: post.slug,
            image: process.env.BASE_IMG_URL ? process.env.BASE_IMG_URL + extractFirstImageSrc(post.content) : '',
            readingTime: post.readingTime,
            meta: post.meta,
            title: post.title,
            intro: post.intro,
            content: fixImageUrls(post.content),
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            categoryID: post.categoryID.toString(),
            categoryTitle: category.title,
            categorySlug: category.slug,
            username: post.username,
            status: post.status,
            userNickname: user.userNickname,
            voteCount: votes.reduce((sum, vote) => sum + vote.vote, 0),
            viewCount: 0,
        };        
        
        return { statusCode: 200, success: true, message: 'Post fetched successfully.', data: formattedPost };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const getAllBlogPostsByCategoryIDService = async (data:IGetBlogPostByCategoryIDRequestDto):Promise<ResponseWithMessage<IBlogListResponseDto[]>> => {
    try {
        const { categoryID, page, limit } = data;
        const posts = await blogPostSchemaExport.find({ categoryID }).sort({ status: -1, createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean();
        if (!posts || posts.length === 0) return { statusCode: 200, success: false, message: 'No posts found.' };

        // 2. Pull related users, categories and votes in a single query
        // With map we only get the required IDs/usernames.
        const userUsernames = [...new Set(posts.map(post => post.username))]; // Prevent repetitive usernames
        const categoryIDs = [...new Set(posts.map(post => post.categoryID).filter(Boolean))]; // Filter null/undefined categoryIDs
        const blogPostIDs = [...new Set(posts.map(post => post._id.toString()))]; // Prevent duplicate blog IDs

        const [users, categories, postVotes, viewLogs] = await Promise.all([
            userSchemaExport.find({ username: { $in: userUsernames } }).lean(),
            blogCategorySchemaExport.find({ _id: { $in: categoryIDs } }).lean(),
            blogPostVoteSchemaExport.find({ blogPostID: { $in: blogPostIDs } }).lean(),
            blogPostViewLogSchemaExport.aggregate([
                {
                    $match: {
                    blogPostID: { $in: blogPostIDs }
                    }
                },
                {
                    $group: {
                    _id: null,
                    total: { $sum: "$viewCount" }
                    }
                }
            ]),
        ]);

        // 3. Convert the captured data into maps (objects) for quick access
        // This will allow us to search in O(1) time.
        const usersMap = users.reduce((map, user) => {
            map[user.username] = user;
            return map;
        }, {} as Record<string, IUser>);

        const categoriesMap = categories.reduce((map, category) => {
            map[category._id.toString()] = category;
            return map;
        }, {} as Record<string, IBlogCategory>);

        // group postVotes by blogPostID for quick access
        const postVotesMap = postVotes.reduce((map, vote) => {
            if (!map[vote.blogPostID.toString()]) {
                map[vote.blogPostID.toString()] = [];
            }
            map[vote.blogPostID.toString()].push(vote);
            return map;
        }, {} as Record<string, IBlogPostVote[]>);

        


        // 4. Create formattedPosts and merge data
        const formattedPosts = posts.map(post => {
            const user = usersMap[post.username];
            const category = categoriesMap[post.categoryID?.toString()]; // categoryID null check

            const votes = postVotesMap[post._id.toString()] || []; // Return empty array if no votes
            const netVoteScore = votes.reduce((sum, vote) => sum + vote.vote, 0);
            const image = extractFirstImageSrc(post.content);

            return {
                ...post, // Copy all post data
                id: post._id.toString(),
                userNickname: user ? user.userNickname : null, // null if user not found
                categoryTitle: category ? category.title : null, // null if category not found
                categorySlug: category ? category.slug : null,   // null if category not found
                categoryID: category ? category._id.toString() : null,
                voteCount: netVoteScore,
                image: image ? `${process.env.BASE_IMG_URL}${image}` : null,
                viewCount: viewLogs[0]?.total || 0,
            } as IBlogListResponseDto;
        });


        
        // const formattedPosts : IBlogListResponseDto[] = posts.map(post => ({
        //     id: post._id.toString(),
        //     slug: post.slug,
        //     image: post.image,
        //     readingTime: post.readingTime,
        //     meta: post.meta,
        //     title: post.title,
        //     intro: post.intro,
        //     content: post.content,
        //     createdAt: post.createdAt,
        //     updatedAt: post.updatedAt,
        //     categoryID: post.categoryID,
        //     categoryTitle: '',
        //     categorySlug: '',
        //     username: post.username,
        //     status: post.status,
        //     userNickname: '',
        //     voteCount: 0
        // }));
        // const users = await userSchemaExport.find({ username: { $in: posts.map(post => post.username) } });
        // const categories = await blogCategorySchemaExport.find({ _id: { $in: formattedPosts.map(post => post.categoryID) } });
        // const postVotes = await voteSchemaExport.find({ blogPostID: { $in: posts.map(post => post._id.toString()) } });
        // formattedPosts.forEach(post => {
        //     const user = users.find(user => user.username === post.username);
        //     if (user) post.userNickname = user.userNickname;

        //     const category = categories.find(category => category._id.toString() === post.categoryID);
        //     if (category) {
        //         post.categoryTitle = category.title;
        //         post.categorySlug = category.slug;
        //     }

        //     const votes = postVotes.filter(vote => vote.blogPostID === post.id);
        //     post.voteCount = votes.length;
        // });
        return { statusCode: 200, success: true, message: 'Posts fetched successfully.', data: formattedPosts };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const getAllBlogPostsByUsernameService = async (data:IGetBlogPostByUsernameRequestDto):Promise<ResponseWithMessage<IBlogListResponseDto[]>> => {
    try {
        const { username, page, limit } = data;
        const posts = await blogPostSchemaExport.find({ username }).sort({ status: -1, createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean();
        if (!posts || posts.length === 0) return { statusCode: 200, success: false, message: 'No posts found.' };
        
        // 2. Pull related users, categories and votes in a single query
        // With map we only get the required IDs/usernames.
        const userUsernames = [...new Set(posts.map(post => post.username))]; // Prevent repetitive usernames
        const categoryIDs = [...new Set(posts.map(post => post.categoryID).filter(Boolean))]; // Filter null/undefined categoryIDs
        const blogPostIDs = [...new Set(posts.map(post => post._id.toString()))]; // Prevent duplicate blog IDs

        const [users, categories, postVotes, viewLogs] = await Promise.all([
            userSchemaExport.find({ username: { $in: userUsernames } }).lean(),
            blogCategorySchemaExport.find({ _id: { $in: categoryIDs } }).lean(),
            blogPostVoteSchemaExport.find({ blogPostID: { $in: blogPostIDs } }).lean(),
            blogPostViewLogSchemaExport.aggregate([
                {
                    $match: {
                    blogPostID: { $in: blogPostIDs }
                    }
                },
                {
                    $group: {
                    _id: null,
                    total: { $sum: "$viewCount" }
                    }
                }
            ]),
        ]);

        // 3. Convert the captured data into maps (objects) for quick access
        // This will allow us to search in O(1) time.
        const usersMap = users.reduce((map, user) => {
            map[user.username] = user;
            return map;
        }, {} as Record<string, IUser>);

        const categoriesMap = categories.reduce((map, category) => {
            map[category._id.toString()] = category;
            return map;
        }, {} as Record<string, IBlogCategory>);

        // group postVotes by blogPostID for quick access
        const postVotesMap = postVotes.reduce((map, vote) => {
            if (!map[vote.blogPostID.toString()]) {
                map[vote.blogPostID.toString()] = [];
            }
            map[vote.blogPostID.toString()].push(vote);
            return map;
        }, {} as Record<string, IBlogPostVote[]>);

        // 4. Create formattedPosts and merge data
        const formattedPosts = posts.map(post => {
            const user = usersMap[post.username];
            const category = categoriesMap[post.categoryID?.toString()]; // categoryID null check
            const votes = postVotesMap[post._id.toString()] || []; // Return empty array if no votes
            const netVoteScore = votes.reduce((sum, vote) => sum + vote.vote, 0);
            const image = extractFirstImageSrc(post.content);


            return {
                ...post, // Copy all post data
                id: post._id.toString(),
                userNickname: user ? user.userNickname : null, // null if user not found
                categoryTitle: category ? category.title : null, // null if category not found
                categorySlug: category ? category.slug : null,   // null if category not found
                categoryID: category ? category._id.toString() : null,
                voteCount: netVoteScore,
                viewCount: viewLogs[0]?.total || 0,
                image: image ? `${process.env.BASE_IMG_URL}${image}` : null,
            } as IBlogListResponseDto;
        });

        return { statusCode: 200, success: true, message: 'Posts fetched successfully.', data: formattedPosts };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const getAllBlogPostsByUsernameAndCategoryIDService = async (data:IGetBlogPostByUsernameAndCategoryIDRequestDto):Promise<ResponseWithMessage<IBlogListResponseDto[]>> => {
    try {
        const { username, categoryID, page, limit } = data;
        const posts = await blogPostSchemaExport.find({ username, categoryID }).sort({ status: -1, createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean();
        if (!posts || posts.length === 0) return { statusCode: 200, success: false, message: 'No posts found.' };
        
        // 2. Pull related users, categories and votes in a single query
        // With map we only get the required IDs/usernames.
        const userUsernames = [...new Set(posts.map(post => post.username))]; // Prevent repetitive usernames
        const categoryIDs = [...new Set(posts.map(post => post.categoryID).filter(Boolean))]; // Filter null/undefined categoryIDs
        const blogPostIDs = [...new Set(posts.map(post => post._id.toString()))]; // Prevent duplicate blog IDs

        const [users, categories, postVotes, viewLogs] = await Promise.all([
            userSchemaExport.find({ username: { $in: userUsernames } }).lean(),
            blogCategorySchemaExport.find({ _id: { $in: categoryIDs } }).lean(),
            blogPostVoteSchemaExport.find({ blogPostID: { $in: blogPostIDs } }).lean(),
            blogPostViewLogSchemaExport.aggregate([
                {
                    $match: {
                    blogPostID: { $in: blogPostIDs }
                    }
                },
                {
                    $group: {
                    _id: null,
                    total: { $sum: "$viewCount" }
                    }
                }
            ]),
        ]);

        // 3. Convert the captured data into maps (objects) for quick access
        // This will allow us to search in O(1) time.
        const usersMap = users.reduce((map, user) => {
            map[user.username] = user;
            return map;
        }, {} as Record<string, IUser>);

        const categoriesMap = categories.reduce((map, category) => {
            map[category._id.toString()] = category;
            return map;
        }, {} as Record<string, IBlogCategory>);

        // group postVotes by blogPostID for quick access
        const postVotesMap = postVotes.reduce((map, vote) => {
            if (!map[vote.blogPostID.toString()]) {
                map[vote.blogPostID.toString()] = [];
            }
            map[vote.blogPostID.toString()].push(vote);
            return map;
        }, {} as Record<string, IBlogPostVote[]>);

        
        // 4. Create formattedPosts and merge data
        const formattedPosts = posts.map(post => {
            const user = usersMap[post.username];
            const category = categoriesMap[post.categoryID?.toString()]; // categoryID null check
            const votes = postVotesMap[post._id.toString()] || []; // Return empty array if no votes
            const netVoteScore = votes.reduce((sum, vote) => sum + vote.vote, 0);
            const image = extractFirstImageSrc(post.content);

            return {
                ...post, // Copy all post data
                id: post._id.toString(),
                userNickname: user ? user.userNickname : null, // null if user not found
                categoryTitle: category ? category.title : null, // null if category not found
                categorySlug: category ? category.slug : null,   // null if category not found
                categoryID: category ? category._id.toString() : null,
                voteCount: netVoteScore,
                viewCount: viewLogs[0]?.total || 0,
                image: image ? `${process.env.BASE_IMG_URL}${image}` : null,
            } as IBlogListResponseDto;
        });

        return { statusCode: 200, success: true, message: 'Posts fetched successfully.', data: formattedPosts };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const getAllBlogPostsByCategorySlugService = async (data:IGetBlogPostByCategorySlugRequestDto):Promise<ResponseWithMessage<IBlogListResponseDto[]>> => {
    try {
        const { slug, page, limit } = data;
        const category = await blogCategorySchemaExport.findOne({ slug }).lean();
        if (!category) return { statusCode: 200, success: false, message: 'Category not found.' };
        const posts = await blogPostSchemaExport.find({ categoryID: category._id }).sort({ status: -1, createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean();
        if (!posts || posts.length === 0) return { statusCode: 200, success: false, message: 'No posts found.' };

        const userUsernames = [...new Set(posts.map(post => post.username))];
        const categoryIDs = [...new Set(posts.map(post => post.categoryID).filter(Boolean))];
        const blogPostIDs = [...new Set(posts.map(post => post._id.toString()))];

        const [users, categories, postVotes, viewLogs] = await Promise.all([
            userSchemaExport.find({ username: { $in: userUsernames } }).lean(),
            blogCategorySchemaExport.find({ _id: { $in: categoryIDs } }).lean(),
            blogPostVoteSchemaExport.find({ blogPostID: { $in: blogPostIDs } }).lean(),
            blogPostViewLogSchemaExport.aggregate([
                {
                    $match: {
                    blogPostID: { $in: blogPostIDs }
                    }
                },
                {
                    $group: {
                    _id: null,
                    total: { $sum: "$viewCount" }
                    }
                }
            ]),
        ]);

        const usersMap = users.reduce((map, user) => {
            map[user.username] = user;
            return map;
        }, {} as Record<string, IUser>);

        const categoriesMap = categories.reduce((map, category) => {
            map[category._id.toString()] = category;
            return map;
        }, {} as Record<string, IBlogCategory>);

        const postVotesMap = postVotes.reduce((map, vote) => {
            if (!map[vote.blogPostID.toString()]) {
                map[vote.blogPostID.toString()] = [];
            }
            map[vote.blogPostID.toString()].push(vote);
            return map;
        }, {} as Record<string, IBlogPostVote[]>);

        const formattedPosts : IBlogListResponseDto[] = posts.map(post => {
            const user = usersMap[post.username];
            const category = categoriesMap[post.categoryID?.toString()];
            const votes = postVotesMap[post._id.toString()] || [];
            const netVoteScore = votes.reduce((sum, vote) => sum + vote.vote, 0);
            const image = extractFirstImageSrc(post.content);
            
            return {
                ...post,
                id: post._id.toString(),
                userNickname: user ? user.userNickname : null,
                categoryTitle: category ? category.title : null,
                categorySlug: category ? category.slug : null,
                categoryID: category ? category._id.toString() : null,
                voteCount: netVoteScore,
                viewCount: viewLogs[0]?.total || 0,
                image: image ? `${process.env.BASE_IMG_URL}${image}` : null,
            } as IBlogListResponseDto;
        });

        return { statusCode: 200, success: true, message: 'Posts fetched successfully.', data: formattedPosts };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}

const searchInBlogPostsService = async (data:ISearchInBlogPostsRequestDto):Promise<ResponseWithMessage<IBlogListResponseDto[]>> => {
    try {
        const posts = await blogPostSchemaExport.find({ title: { $regex: data.data, $options: 'i' }, status: true }).sort({ createdAt: -1 }).lean();
        if (!posts || posts.length === 0) return { statusCode: 200, success: false, message: 'No posts found.' };

        const userUsernames = [...new Set(posts.map(post => post.username))];
        const categoryIDs = [...new Set(posts.map(post => post.categoryID).filter(Boolean))];
        const blogPostIDs = [...new Set(posts.map(post => post._id.toString()))];

        const [users, categories, postVotes, viewLogs] = await Promise.all([
            userSchemaExport.find({ username: { $in: userUsernames } }).lean(),
            blogCategorySchemaExport.find({ _id: { $in: categoryIDs } }).lean(),
            blogPostVoteSchemaExport.find({ blogPostID: { $in: blogPostIDs } }).lean(),
            blogPostViewLogSchemaExport.aggregate([
                {
                    $match: {
                    blogPostID: { $in: blogPostIDs }
                    }
                },
                {
                    $group: {
                    _id: null,
                    total: { $sum: "$viewCount" }
                    }
                }
            ]),
        ]);

        const usersMap = users.reduce((map, user) => {
            map[user.username] = user;
            return map;
        }, {} as Record<string, IUser>);

        const categoriesMap = categories.reduce((map, category) => {
            map[category._id.toString()] = category;
            return map;
        }, {} as Record<string, IBlogCategory>);

        const postVotesMap = postVotes.reduce((map, vote) => {
            if (!map[vote.blogPostID.toString()]) {
                map[vote.blogPostID.toString()] = [];
            }
            map[vote.blogPostID.toString()].push(vote);
            return map;
        }, {} as Record<string, IBlogPostVote[]>);

        const formattedPosts : IBlogListResponseDto[] = posts.map(post => {
            const user = usersMap[post.username];
            const category = categoriesMap[post.categoryID?.toString()];
            const votes = postVotesMap[post._id.toString()] || [];
            const netVoteScore = votes.reduce((sum, vote) => sum + vote.vote, 0);
            const image = extractFirstImageSrc(post.content);

            return {
                ...post,
                id: post._id.toString(),
                userNickname: user ? user.userNickname : null,
                categoryTitle: category ? category.title : null,
                categorySlug: category ? category.slug : null,
                categoryID: category ? category._id.toString() : null,
                voteCount: netVoteScore,
                viewCount: viewLogs[0]?.total || 0,
                image: image ? `${process.env.BASE_IMG_URL}${image}` : null,
            } as IBlogListResponseDto;
        });

        return { statusCode: 200, success: true, message: 'Posts fetched successfully.', data: formattedPosts };
    } catch (error) {
        console.log(error);
        return { error: error, statusCode: 500, message: 'Unknown error! Please contact the admin.', success: false };
    }
}



export {
    //blogPost
    createNewBlogPostService,
    deleteBlogPostService,
    updateBlogPostTitleService,
    updateBlogPostContentService,
    updateBlogPostImageService,
    updateBlogPostMetaService,
    updateBlogPostIntroService,
    updateBlogPostVoteService,
    updateBlogPostViewCountService,
    getBlogPostVotesService,
    getBlogPostVoteCountService,
    getBlogPostUserVoteControlService,

    updateBlogPostStatusService,
    getAllBlogPostsService,
    createNewBlogPostImageService,
    getBlogPostBySlugService,

    getAllBlogPostsByCategoryIDService,
    getAllBlogPostsByUsernameService,
    getAllBlogPostsByUsernameAndCategoryIDService,
    getAllBlogPostsByCategorySlugService,
    searchInBlogPostsService,

    updateBlogPostViewLogService,
    //subscribeToNews
    subscribeToNewsService
}