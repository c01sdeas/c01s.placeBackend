import express from 'express';
import { changeUserBanStatusPost, changeUserRolesPost } from './adminController.js';
import adminCrudMiddleware from '../../../middlewares/crudMiddlewares/adminCrudMiddleware.js';
const router = express.Router();

router.post('/change-user-roles', adminCrudMiddleware(['admin']), changeUserRolesPost);

router.post('/change-user-ban-status', changeUserBanStatusPost);

export default router;