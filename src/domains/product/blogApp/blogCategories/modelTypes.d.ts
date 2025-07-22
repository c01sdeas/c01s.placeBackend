import { Schema, Document, Types } from "mongoose";
interface IBlogCategory extends Document {
    _id: Types.ObjectId;
    title: string;
    slug: string;
    description: string;
    image: string;
    status: boolean;
    meta: string;
    username: string;
    createdAt: Date;
    updatedAt: Date;
}

export type {
    IBlogCategory
}