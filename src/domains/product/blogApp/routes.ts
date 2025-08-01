import uploadImageMiddleware from "../../../middlewares/blogAppMiddlewares/uploadImageMiddleware.js";
import adminCrudMiddleware from "../../../middlewares/crudMiddlewares/adminCrudMiddleware.js";
import authCrudMiddleware from "../../../middlewares/crudMiddlewares/authCrudMiddleware.js";
import userCrudMiddleware from "../../../middlewares/crudMiddlewares/userCrudMiddleware.js";
import { getAllBlogPostsByCategorySlugController, getBlogPostUserVoteControlController, getBlogPostVoteCountController, searchInBlogPostsController, updateBlogPostViewCountController, updateBlogPostViewLogController } from "./blogPosts/controller.js";
import express from 'express';
import { createNewBlogPostController, deleteBlogPostController, getAllBlogPostsByUsernameAndCategoryIDController, getAllBlogPostsByCategoryIDController, getAllBlogPostsByUsernameController, getAllBlogPostsController, getBlogPostBySlugController, updateBlogPostContentController, updateBlogPostImageController, updateBlogPostIntroController, updateBlogPostMetaController, updateBlogPostStatusController, updateBlogPostTitleController, createNewBlogPostImageController, subscribeToNewsController, updateBlogPostVoteController, getBlogPostVotesController } from "./blogPosts/controller.js";
import { createNewBlogCategoryController, createNewBlogCategoryImageController, deleteBlogCategoryController, getAllBlogPostCategoriesByUsernameController, getAllBlogPostCategoriesController, getBlogPostCategoryBySlugController, updateBlogCategoryDescriptionController, updateBlogCategoryImageController, updateBlogCategoryMetaController, updateBlogCategoryStatusController, updateBlogCategoryTitleController } from "./blogCategories/controller.js";
import { createNewBlogLibraryController, createNewBlogPostInLibraryController, createNewFollowingTagController, deleteBlogLibraryController, deleteBlogPostInLibraryController, deleteFollowingTagController, getAllBlogLibrariesByUsernameController, getAllBlogPostsByFollowingTagsController, getAllBlogPostsByUsernameForLibraryController, getAllBlogPostsInLibraryController, getAllFollowingTagsByUsernameController, getAllFollowingTagsController, updateBlogLibraryDescriptionController, updateBlogLibraryStatusController, updateBlogLibraryTitleController, updateBlogPostInLibraryController, updateBlogPostInLibraryStatusController, updateFollowingTagStatusController } from "./blogLibraries/controller.js";
import { createNewCommentController, deleteCommentController, getAllCommentsByBlogPostIDController, getAllCommentsController, getCommentController, updateCommentController } from "./blogPostComments/controller.js";

const router = express.Router();

//blogPosts
router.post('/create-new-blog-post', [authCrudMiddleware([]), userCrudMiddleware(['user'])], createNewBlogPostController);

router.delete('/delete-blog-post', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], deleteBlogPostController);

router.patch('/update-blog-post-title', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], updateBlogPostTitleController);

router.patch('/update-blog-post-meta', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], updateBlogPostMetaController);

router.patch('/update-blog-post-intro', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], updateBlogPostIntroController);

router.patch('/update-blog-post-status', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], updateBlogPostStatusController);

router.patch('/update-blog-post-image', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], updateBlogPostImageController);

router.patch('/update-blog-post-content', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], updateBlogPostContentController);

router.post('/create-new-blog-post-image', [authCrudMiddleware([]), userCrudMiddleware(['user'])], uploadImageMiddleware('blog').single('image'), createNewBlogPostImageController);

router.patch('/update-blog-post-vote', [authCrudMiddleware([]), userCrudMiddleware(['user'])], updateBlogPostVoteController);

router.patch('/update-blog-post-view-count', updateBlogPostViewCountController);

router.get('/update-blog-post-view-log', updateBlogPostViewLogController);

router.get('/get-blog-post-votes', getBlogPostVotesController);

router.get('/get-blog-post-vote-count', getBlogPostVoteCountController);

router.get('/get-blog-post-user-vote-control', getBlogPostUserVoteControlController);

router.get('/get-all-blog-posts', getAllBlogPostsController);

router.get('/get-blog-post-by-slug', getBlogPostBySlugController);//slug

router.get('/get-all-blog-posts-by-category-id', getAllBlogPostsByCategoryIDController);

router.get('/get-all-blog-posts-by-category-slug', getAllBlogPostsByCategorySlugController);//slug

router.get('/get-all-blog-posts-by-username', getAllBlogPostsByUsernameController);

router.get('/get-all-blog-posts-by-username-and-category-id', getAllBlogPostsByUsernameAndCategoryIDController);

router.get('/search-in-blog-posts', searchInBlogPostsController);


//blogCategories
router.post('/create-new-blog-category-image', [authCrudMiddleware([]), userCrudMiddleware(['user'])], uploadImageMiddleware('tag').single('image'), createNewBlogCategoryImageController);

router.post('/create-new-blog-category', [authCrudMiddleware([]), userCrudMiddleware(['user'])], createNewBlogCategoryController);

router.delete('/delete-blog-category', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], deleteBlogCategoryController);

router.patch('/update-blog-category-meta', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], updateBlogCategoryMetaController);

router.patch('/update-blog-category-status', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], updateBlogCategoryStatusController);

router.patch('/update-blog-category-image', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], uploadImageMiddleware('tag').single('image'), updateBlogCategoryImageController);

router.patch('/update-blog-category-description', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], updateBlogCategoryDescriptionController);

router.patch('/update-blog-category-title', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], updateBlogCategoryTitleController);

router.get('/get-all-blog-categories', getAllBlogPostCategoriesController);

router.get('/get-blog-post-category-by-slug', getBlogPostCategoryBySlugController);

router.get('/get-all-blog-categories-by-username', getAllBlogPostCategoriesByUsernameController);

//subscribeToNews
router.post('/subscribe-to-news', subscribeToNewsController);



//blogLibraries
router.post('/create-new-blog-library', [authCrudMiddleware([]), userCrudMiddleware(['user'])], createNewBlogLibraryController);

router.patch('/update-blog-library-title', [authCrudMiddleware([]), userCrudMiddleware(['user'])], updateBlogLibraryTitleController);

router.patch('/update-blog-library-description', [authCrudMiddleware([]), userCrudMiddleware(['user'])], updateBlogLibraryDescriptionController);

router.patch('/update-blog-library-status', [authCrudMiddleware([]), userCrudMiddleware(['user'])], updateBlogLibraryStatusController);

router.delete('/delete-blog-library', [authCrudMiddleware([]), userCrudMiddleware(['user'])], deleteBlogLibraryController);

router.get('/get-all-blog-libraries-by-username', [authCrudMiddleware([]), userCrudMiddleware(['user'])], getAllBlogLibrariesByUsernameController);

router.get('/get-all-blog-posts-by-username-for-library', [authCrudMiddleware([]), userCrudMiddleware(['user'])], getAllBlogPostsByUsernameForLibraryController);


//blogPostsInLibraries
router.post('/create-new-blog-post-in-library', [authCrudMiddleware([]), userCrudMiddleware(['user'])], createNewBlogPostInLibraryController);

router.patch('/update-blog-post-in-library', [authCrudMiddleware([]), userCrudMiddleware(['user'])], updateBlogPostInLibraryController);

router.patch('/update-blog-post-in-library-status', [authCrudMiddleware([]), userCrudMiddleware(['user'])], updateBlogPostInLibraryStatusController);

router.delete('/delete-blog-post-in-library', [authCrudMiddleware([]), userCrudMiddleware(['user'])], deleteBlogPostInLibraryController);

router.get('/get-all-blog-posts-in-library', [authCrudMiddleware([]), userCrudMiddleware(['user'])], getAllBlogPostsInLibraryController);

//followingTags
router.post('/create-new-following-tag', [authCrudMiddleware([]), userCrudMiddleware(['user'])], createNewFollowingTagController);

router.delete('/delete-following-tag', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], deleteFollowingTagController);

router.patch('/update-following-tag-status', [authCrudMiddleware([]), userCrudMiddleware(['user'])], updateFollowingTagStatusController);

router.get('/get-all-following-tags-by-username', [authCrudMiddleware([]), userCrudMiddleware(['user'])], getAllFollowingTagsByUsernameController);

router.get('/get-all-blog-posts-by-following-tags', [authCrudMiddleware([]), userCrudMiddleware(['user'])], getAllBlogPostsByFollowingTagsController);

router.get('/get-all-following-tags', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], getAllFollowingTagsController);


//blogPostComments
router.post('/create-new-comment', [authCrudMiddleware([]), userCrudMiddleware(['user'])], createNewCommentController);

router.delete('/delete-comment', [authCrudMiddleware([]), userCrudMiddleware(['user'])], deleteCommentController);

router.patch('/update-comment', [authCrudMiddleware([]), userCrudMiddleware(['user'])], updateCommentController);

router.get('/get-all-comments', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], getAllCommentsController);

router.get('/get-all-comments-by-blog-post-id', [authCrudMiddleware(['visitor'])], getAllCommentsByBlogPostIDController);

router.get('/get-comment', [authCrudMiddleware([]), userCrudMiddleware(['user'])], getCommentController);




export default router;