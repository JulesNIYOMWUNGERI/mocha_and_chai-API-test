import express from 'express';

const router = express.Router();

import { getVideos,getVideoById,getTrendVideos,getSubVideos,getBySearch,createVideo,updateVideo,deleteVideo,addViews } from '../controllers/videoController.js'




router.post('/',createVideo);
router.patch('/:id',updateVideo);
router.delete('/:id',deleteVideo);
router.patch('/views/:id',addViews);
router.get('/find/:id',getVideoById);
router.get('/random',getVideos);
router.get('/trend',getTrendVideos);
router.get('/sub',getSubVideos);
router.get('/search',getBySearch);





export default router;