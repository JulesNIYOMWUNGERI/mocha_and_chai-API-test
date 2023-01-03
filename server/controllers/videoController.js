import mongoose from 'mongoose';

import Video from '../model/Video.js';



export const getVideos = async(req,res) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size:40 } }]);
        //aggregate method helps to get videos randomly

        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

export const getVideoById = async(req,res) => {
    const { id } = req.params;
    try {
        const video = await Video.findById(id);

        res.status(200).json(video);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

export const getTrendVideos = async(req,res) => {
    try {
        const videos = await Video.find().sort({views:-1});

        res.status(200).json(videos)
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

export const getSubVideos = async(req,res) => {
    try {
        const user = await User.findById(req.userId);
        const subscribedChannels = user.subscribedUsers;

        const list = await Promise.all(
            subscribedChannels.map((channelId) => {
                return Video.find({creatorId: channelId})
            })
        );

        res.status(200).json(list.flat().sort((a,b)=>b.createdAt - a.createdAt));
    } catch (error) {
        res.status(500).json({message:error.message})
    }
};

export const getBySearch = async(req,res) => {
    const { searchQuery,tags } = req.query;

    try {
        const videos = await Video.find({ $or: [ { title: { $regex: searchQuery, $options: "i" } }, { tags:{ $in: tags.split(',') } } ] }).limit(40);

        res.status(200).json( videos );
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const createVideo = async(req,res) => {
    const video = req.body;

    const newVideo = new Video({ ...video, creatorId:req.userId})
    try {
        const savedVideo = await newVideo.save();

        res.status(200).json(savedVideo);
    } catch (error) {
        res.status(409).json({message:error.message});
    }
};

export const updateVideo = async(req,res) => {
    const { id } = req.params;
    const { inputs } = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No video with such id:${id}`);

    const existingVideo = await Video.findById(id);

    if(existingVideo.creatorId !== req.userId) return res.status(404).send('you are not allowed to update this video.! create your own!.')

    const updatedVideo = inputs
    
    await Video.findByIdAndUpdate(id,updatedVideo,{ new: true });

    res.json(updatedVideo);

};

export const deleteVideo = async(req,res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No video with such id:${id}`);

    await Video.findByIdAndRemove(id);

    res.json({message:'Video deleted successfully'});
};

export const addViews = async(req,res) => {
    const { id } = req.params;
    try {
        await Video.findByIdAndUpdate(id,{
            $inc:{views:1}
        });
        res.status(200).json({message:'view added successfully'});
    } catch (error) {
        res.status(500).json({message:error.message})
    }
};



