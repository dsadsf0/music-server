import { Router } from "express";
import userController from "../controllers/userController.js";
import { body } from 'express-validator'
import authMiddleware from '../middlewares/authMiddleware.js'

const userRouter = new Router();

userRouter.post('/signup', 
  body('user[email]').isEmail().withMessage('Incorrect email'),
  body('user[password]')
    .isLength({ min: 6, max: 30 }).withMessage('Password must be 6-30 characters long'),
  body('user[username]')
    .isLength({ min: 4, max: 30 }).withMessage('Username must be 4-30 characters long')
    .isAlphanumeric().withMessage('Username may be contain a-z, A-Z, 0-9 only'),
  userController.create)
userRouter.post('/login',
  body('username')
    .isLength({ min: 4, max: 30 }).withMessage('Username must be 4-30 characters long')
    .isAlphanumeric().withMessage('Username may be contain a-z, A-Z, 0-9 only'),
  body('password')
    .isLength({ min: 6, max: 30 }).withMessage('Password must be 6-30 characters long'),
  userController.login)
userRouter.post('/logout', authMiddleware, userController.logout)
userRouter.get('/refresh', userController.refreshToken)
userRouter.get('/user/:id', authMiddleware, userController.getById)

userRouter.put('/user/like/song', authMiddleware, userController.likeSongById)
userRouter.put('/user/like/playlist', authMiddleware, userController.likePlaylistById)

userRouter.get('/user/liked/songs', authMiddleware, userController.likedSongs)
userRouter.get('/user/liked/playlists', authMiddleware, userController.likedPlaylists)

userRouter.get('/user/uploaded/songs', authMiddleware, userController.uploadedSongs)
userRouter.get('/user/uploaded/playlists', authMiddleware, userController.createdPlaylists)
userRouter.delete('/user/uploaded/playlists/:id', authMiddleware, userController.deletePlaylist)


// userRouter.put('/user', authMiddleware, userController.updateById)
// userRouter.delete('/user', authMiddleware, userController.deleteById)
// userRouter.post('/user/like', authMiddleware, userController.like)

export default userRouter