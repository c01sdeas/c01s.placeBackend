import express from 'express';
const router = express.Router();
import {home, getAllTodos, addTodoUI} from './controller.js';

router.get('/', home);



// router.get('/addminnpannelllll1', adminPannel).post('/addminnpannelllll1', adminPannelPost);

// router.post('/uploadimage', uploadImage);

// router.get('/adminl0gin', loginForPannel).post('/adminl0gin', loginForPannelPost);

// router.get('/:blogId', blogContentPage).post('/:blogId', blogContentPagePost);

// router.get('/:blogId/comments', comments);

// router.get('/comments/allcomments', allComments);


router.get('/todos', getAllTodos);

// router.get('/addTodo', addTodoUI).post('/addtodo', addTodo);

export default router;