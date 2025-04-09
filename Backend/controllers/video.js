import { createError } from "../error.js";
import Video from "../models/Video.js";
import User from "../models/User.js";
import cloudinary from "../utils/cloudinary.js";

export const addVideo = async (req, res, next) => {
  const newVideo = new Video({
    userId: req.user.id,
    title: req.body.title,
    description: req.body.description,
    imgUrl: req.body.imgUrl,
    videoUrl: req.body.videoUrl,
    imgPublicId: req.body.imgPublicId,
    videoPublicId: req.body.videoPublicId,
    tags: req.body.tags,
    category: req.body.category,
  });

  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (err) {
    next(err);
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found"));

    if (video.userId !== req.user.id) {
      return next(createError(403, "You can update only your video"));
    }

    // Delete old Cloudinary media if new ones are being uploaded
    if (req.body.videoUrl && req.body.videoPublicId && video.videoPublicId && video.videoPublicId !== req.body.videoPublicId) {
      await cloudinary.uploader.destroy(video.videoPublicId, { resource_type: "video" });
    }

    if (req.body.imgUrl && req.body.imgPublicId && video.imgPublicId && video.imgPublicId !== req.body.imgPublicId) {
      await cloudinary.uploader.destroy(video.imgPublicId, { resource_type: "image" });
    }

    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...req.body,
        },
      },
      { new: true }
    );

    res.status(200).json(updatedVideo);
  } catch (err) {
    next(err);
  }
};


export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found"));

    if (req.user.id !== video.userId) {
      return next(createError(403, "You can delete only your video"));
    }

    // Delete from Cloudinary
    const cloudinaryResponses = [];

    if (video.imgPublicId) {
      const imgResult = await cloudinary.uploader.destroy(video.imgPublicId, {
        resource_type: "image",
      });
      cloudinaryResponses.push({ image: imgResult });
    }

    if (video.videoPublicId) {
      const vidResult = await cloudinary.uploader.destroy(video.videoPublicId, {
        resource_type: "video",
      });
      cloudinaryResponses.push({ video: vidResult });
    }

    // Delete from MongoDB
    await Video.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Video deleted successfully",
      cloudinaryResponses,
    });
  } catch (err) {
    next(err);
  }
};


export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};

export const getVideosByUser = async (req,res,next) =>{
  try{
      const videos = await Video.find({userId: req.params.userId})
      res.status(200).json(videos)
  }catch(err){
    next(err)
  }
}

export const addView = async (req, res, next) => {
  const userId = req.user?.id;
  const videoId = req.params.id;

  try {
    const video = await Video.findById(videoId);
    if(!video){
      return res.status(404).json("video not found")
    }
    if(!video.viewBy.includes(userId)){
      video.viewBy.push(userId);
      video.views = video.viewBy.length;
      await video.save();
    }
    res.status(200).json("View has been updated");
  } catch (err) {
    next(err);
  }
};

export const random = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};
export const trend = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};
export const sub = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;

    const list = await Promise.all(
      subscribedChannels.map((channelId) => {
        return Video.find({ userId: channelId });
      })
    );
    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    next(err);
  }
};

export const getByTag = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};


export const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};
