import { Schema, Model, model } from "mongoose";
import slugify from "slugify";
import { IBlogCategory } from "./modelTypes.js";

const blogCategorySchema : Schema<IBlogCategory> = new Schema<IBlogCategory>({
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
    description: {
        type: String,
        required: [true, 'Description is required.'],
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

blogCategorySchema.pre('save', async function (next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = slugify.default(this.title, { lower: true, strict: true });
    const existingCategory = await this.model('blogCategory').findOne({ slug: this.slug, _id: { $ne: this._id } });
    if (existingCategory) {
      this.slug = `${this.slug}-${Date.now()}`;
    }
  }
  next();
});

const blogCategorySchemaExport : Model<IBlogCategory> = model('blogCategory', blogCategorySchema, 'blogCategories');

export {
    blogCategorySchemaExport
}