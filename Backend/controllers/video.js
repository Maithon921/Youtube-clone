import { createError } from "../error.js";
import Video from "../models/Video.js";
import User from "../models/User.js";
import cloudinary from "../utils/cloudinary.js";

// Add video
export const addVideo = async (req, res, next) => {
  const newVideo = new Video({
    userId: req.user.id,
    title: req.body.title,
    description: req.body.description,
    imgUrl: req.body.imgUrl,
    videoUrl: req.body.videoUrl,
    // to use in cloudinary operation
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

// update current video
export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found"));

    if (video.userId !== req.user.id) {
      return next(createError(403, "You can update only your video"));
    }

    // Delete old Cloudinary file if new ones is uploaded
    if (
      req.body.videoUrl &&
      req.body.videoPublicId &&
      video.videoPublicId &&
      video.videoPublicId !== req.body.videoPublicId
    ) {
      await cloudinary.uploader.destroy(video.videoPublicId, {
        resource_type: "video",
      });
    }

    if (
      req.body.imgUrl &&
      req.body.imgPublicId &&
      video.imgPublicId &&
      video.imgPublicId !== req.body.imgPublicId
    ) {
      await cloudinary.uploader.destroy(video.imgPublicId, {
        resource_type: "image",
      });
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

// handling delete
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

// get particular video by id
export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};

// get video by user id to find how what video the user have uploaded
export const getVideosByUser = async (req, res, next) => {
  try {
    const videos = await Video.find({ userId: req.params.userId });
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

// handle view counts
export const addView = async (req, res, next) => {
  const userId = req.user?.id;
  const videoId = req.params.id;

  try {
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json("video not found");
    }
    // if the user have not watch the video then add the userId to viewBy array and update view count
    if (!video.viewBy.includes(userId)) {
      video.viewBy.push(userId);
      video.views = video.viewBy.length;
      await video.save();
    }
    res.status(200).json("View has been updated");
  } catch (err) {
    next(err);
  }
};

// get certain number of videos in random sequence everytime
export const random = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

// get videos from most view to least view
export const trend = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

// get videos from channel which user have subscribed
export const sub = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;

    // get videos from the channels the user have subscribed
    const list = await Promise.all(
      subscribedChannels.map((channelId) => {
        return Video.find({ userId: channelId });
      })
    );
    // sort newest to oldest
    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    next(err);
  }
};

// get videos by tags
export const getByTag = async (req, res, next) => {
  // convert to string based on comma
  const tags = req.query.tags.split(",");
  try {
    // looks of any of the tags is included in other videos or not and return at the most 10 videos
    const videos = await Video.find({ tags: { $in: tags } }).limit(10);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

// get all the categories availabe
export const getAllCategories = async (req, res, next) => {
  try {
    // taking the category only once
    const categories = await Video.distinct("category");
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};

// get video of one particular category
export const getByCategory = async (req, res, next) => {
  const { category } = req.query;
  try {
    // get all videos if category is all else get the videos of the particular category
    const videos =
      category === "All" ? await Video.find() : await Video.find({ category });
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

// get videos based on the keyword searched by user
export const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    // search either in title or category without regards to letter case
    const videos = await Video.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    }).limit(40);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};
