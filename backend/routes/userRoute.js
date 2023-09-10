import express from 'express';
const router =express.Router();

import { GetUserProfile, authUser, deleteUser, getUSerByID, getUsers, logoutUser, registerUser, updateUser, updateUserProfile } from '../controllers/userController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser).get(protect,admin,getUsers);
router.post('/logout' ,logoutUser);
router.post('/auth',authUser);
router.route('/profile').get(protect,GetUserProfile).put(protect,updateUserProfile);
router.route('/:id').delete(protect,admin,deleteUser).get(protect,admin, getUSerByID).put(protect,admin,updateUser);
export default router;