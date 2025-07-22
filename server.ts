import express, { Express, Request, Response } from "express";
const app : Express = express();


import fileUpload from 'express-fileupload';
// import expressLayouts from 'express-ejs-layouts';
// import path from 'path';

import logMiddleware from './src/middlewares/logger/logMiddleware.js';


// const productRoutes = require ('./src/domains/product/todoApp/index');

import blogAppRoutes from './src/domains/product/blogApp/index.js';

import authRoutes from './src/domains/user/authentication/authIndex.js';
// const userCrudRoutes = require('./src/domains/user/usercrud/index.js');

import userCrudRoutes from './src/domains/user/usercrud/userIndex.js';

import adminCrudRoutes from './src/domains/user/admin/adminIndex.js';

import bodyParser from "body-parser";
import session from 'express-session';
import crypto from 'crypto';
const sessionSecretKey = crypto.randomBytes(32).toString('hex');



// import './src/types/express-session'
import flash from 'connect-flash';
import db from './src/config/db.js'; db();
import cors from 'cors';
app.use(cors({
    origin: 'https://c01s.place',
    // origin: true,
    credentials: true
}));

app.set('trust proxy', 1);

app.use(session({
    secret: sessionSecretKey,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: true,
        httpOnly: true,
        sameSite: 'none'
    },
}));



app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(logMiddleware);


import authCrudMiddleware from "./src/middlewares/crudMiddlewares/authCrudMiddleware.js";
import userCrudMiddleware from "./src/middlewares/crudMiddlewares/userCrudMiddleware.js";
import adminCrudMiddleware from "./src/middlewares/crudMiddlewares/adminCrudMiddleware.js";

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(flash());

// app.use(fileUpload());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));


// app.use((req,res,next)=>{
//     res.locals.commentControl = req.flash('commentControl');
//     next();
// });

// app.use(express.static("frontend"));
app.use('/t-app/auth', authCrudMiddleware(['visitor']), authRoutes);
app.use('/t-app/user', [authCrudMiddleware([]), userCrudMiddleware(['user'])], userCrudRoutes);
app.use('/t-app/admin', [authCrudMiddleware([]), userCrudMiddleware(['user']), adminCrudMiddleware(['moderator'])], adminCrudRoutes);

app.use('/t-app/app/blog', [authCrudMiddleware(['visitor'])], blogAppRoutes);



export default app;