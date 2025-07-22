import { Schema, Model, model } from "mongoose";
import slugify from "slugify";
import { ISubscribeToNews, IBlogPost, IBlogPostVote, IBlogPostViewLog } from "./modelTypes.js";

const subscribeNewsSchema : Schema<ISubscribeToNews> = new Schema<ISubscribeToNews>({
    email: {
        type: String,
        required: [true, 'Email is required.'],
        match: [/.+\@.+\..+/, 'Please enter a valid email.'], 
        minlength: [1, 'E-mail must be at least 1 characters long.'],
        maxlength: [255, 'E-mail can be up to 255 characters.'],
        trim: true,
        unique: true,
    }
}, { timestamps: true });

const subscribeNewsSchemaExport : Model<ISubscribeToNews> = model('subscribeNews', subscribeNewsSchema, 'subscribedNews');

const blogPostSchema : Schema<IBlogPost> = new Schema<IBlogPost>({
    slug: {
        type: String,
        required: [true, 'Slug is required.'],
        trim: true,
        unique: true,
    },
    image: {
        type: String,
        trim: true,
    },
    readingTime: {
        type: String,
        required: [true, 'Time is required.'],
        trim: true,
    },
    meta: {
        type: String,
        required: [true, 'Meta is required.'],
        trim: true,
    },
    title: {
        type: String,
        required: [true, 'Title is required.'],
        trim: true,
    },
    intro: {
        type: String,
        required: [true, 'Intro is required.'],
        trim: true,
    },
    content: {
        type: String,
        required: [true, 'Content is required.'],
        trim: true,
    },
    categoryID: {
        type: Schema.Types.ObjectId,
        required: [true, 'Category is required.'],
        trim: true,
    },
    status: {
        type: Boolean,
        default: false,
        required: [true, 'Status is required.'],
        trim: true,
    },
    username: {
        type: String,
        required: [true, 'User is required.'],
        trim: true,
    }
}, { timestamps: true });

blogPostSchema.pre('save', async function (next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = slugify.default(this.title, { lower: true, strict: true });
    const existingPost = await this.model('blogPost').findOne({ slug: this.slug, _id: { $ne: this._id } });
    if (existingPost) {
      this.slug = `${this.slug}-${Date.now()}`;
    }
  }
  next();
});

const blogPostSchemaExport : Model<IBlogPost> = model('blogPost', blogPostSchema, 'blogPosts');

const blogPostVoteSchema : Schema<IBlogPostVote> = new Schema<IBlogPostVote>({
    blogPostID: {
        type: Schema.Types.ObjectId,
        required: [true, 'Blog post ID is required.'],
        trim: true,
    },
    username: {
        type: String,
        required: [true, 'Username is required.'],
        trim: true,
    },
    vote: {
        type: Number,
        required: [true, 'Vote is required.'],
        trim: true,
    }
}, { timestamps: true });

blogPostVoteSchema.index({ blogPostID: 1, username: 1 }, { unique: true });
const blogPostVoteSchemaExport : Model<IBlogPostVote> = model('blogPostVote', blogPostVoteSchema, 'blogPostVotes');

const blogPostViewLogSchema : Schema<IBlogPostViewLog> = new Schema<IBlogPostViewLog>({
    blogPostID: {
        type: Schema.Types.ObjectId,
        required: [true, 'Blog post ID is required.'],
        trim: true,
    },
    viewerIp: {
        type: String,
        required: [true, 'Viewer IP is required.'],
        trim: true,
    },
    username: {
        type: String,
        trim: true,
    },
    viewedAt: {
        type: Date,
        required: [true, 'Viewed at is required.'],
        trim: true,
    },
    viewCount: {
        type: Number,
        required: [true, 'View count is required.'],
        trim: true,
    }

}, { timestamps: true });

const blogPostViewLogSchemaExport : Model<IBlogPostViewLog> = model('blogPostViewLog', blogPostViewLogSchema, 'blogPostViewLogs');

export {
    blogPostSchemaExport,
    subscribeNewsSchemaExport,
    blogPostVoteSchemaExport,
    blogPostViewLogSchemaExport
}