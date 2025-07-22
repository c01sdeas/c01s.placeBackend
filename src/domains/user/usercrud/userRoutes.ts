// const { getUserList, userUpdateGet, userUpdate, deleteUserGet, deleteUser, changeUserThemeGet, changeUserTheme, getUserThemeData, updateUserPhotosGet, updateUserPhotosPost } = require('./controller');
import { getUserListController, getUserRolesDataController, changeUserThemeDataController, getUserThemeDataController, changeUserNicknameDataController, changeUserFirstNameDataController, changeUserLastNameDataController, changeUserEmailDataController, changeUserDateOfBirthDataController } from './userController.js';

import express from 'express';
const router = express.Router();

router.get('/list', getUserListController);

/*why is here?
router.get('/logged-user-data', getUserData);*/

router.post('/get-user-roles-data', getUserRolesDataController);

//theme
router.post('/change-user-theme-data', changeUserThemeDataController);

router.post('/get-user-theme-data', getUserThemeDataController);

//edit-user-profile-data
router.post('/change-user-nickname-data', changeUserNicknameDataController);

router.post('/change-user-firstname-data', changeUserFirstNameDataController);

router.post('/change-user-lastname-data', changeUserLastNameDataController);

router.post('/change-user-email-data', changeUserEmailDataController);

router.post('/change-user-date-of-birth-data', changeUserDateOfBirthDataController);

export default router;