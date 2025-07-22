import authCrudMiddleware from '../../../middlewares/crudMiddlewares/authCrudMiddleware.js';
import userCrudMiddleware from '../../../middlewares/crudMiddlewares/userCrudMiddleware.js';

import { signUpController, signInController, signOutController, getSessionUserDataController, changeUserPasswordDataController, userPasswordRecoveryController, usernameAvailableControlForUserPasswordRecoveryController, checkUserRecoveryKeyDataForUserPasswordRecoveryController, getNewUserRecoveryKeyForForgettenKeyController, usernameControlForUserSignUpController } from './authController.js';

import express from 'express';

const router = express.Router();

router.post('/username-control-for-signup', usernameControlForUserSignUpController);

router.post('/signup', signUpController);

router.get('/signin', signInController).post('/signin', signInController);

router.post('/signout', signOutController);


//user-app

// router.get('/logged-user-data', verifyToken, getUserData);

router.post('/get-session-user-data', [authCrudMiddleware([]), userCrudMiddleware(['user'])], getSessionUserDataController);

//edit-auth-data
router.post('/change-user-password-data', changeUserPasswordDataController);

router.post('/check-username-for-recovery', usernameAvailableControlForUserPasswordRecoveryController);
router.post('/check-user-recovery-key-data', checkUserRecoveryKeyDataForUserPasswordRecoveryController);
router.post('/user-password-recovery', userPasswordRecoveryController);

router.post('/get-new-user-recovery-key', [authCrudMiddleware([]), userCrudMiddleware(['user'])], getNewUserRecoveryKeyForForgettenKeyController);




// router.get('/login-data', verifyToken, getLoginData);

export default router;