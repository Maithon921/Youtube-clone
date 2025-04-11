import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";
import { v2 as cloudinary } from "cloudinary";

// to edit user/channel detail
export const update = async (req, res, next) => {
  // check if the person trying to edit is the owner
  if (req.params.id !== req.user.id) {
    return next(createError(403, "You can update only your account"));
  }

  try {
    const user = await User.findById(req.params.id);

    // If new image is uploaded and previous is custom (not default), delete old one from loudinary
    if (req.body.img && user.img && !user.img.includes("pngplay.com")) {
      const publicId = user.img.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

// delete account or user
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Avoid deleting default avatar else delete
    const isCustomImg = user.img && !user.img.includes("default-avatar");

    if (isCustomImg) {
      const publicId = user.img.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// get a particular user
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// handling subscription
export const subscribe = async (req, res, next) => {
  try {
    // find and add the current user id to the channel it is trying to subscribe and increase the subscriber count
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json("Subscription successfull.");
  } catch (err) {
    next(err);
  }
};

// handle unsubscribe
export const unsubscribe = async (req, res, next) => {
  try {
    // find and remove the current userid from the channel it is trying to unsubscribe and decrease the subscriber count
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });
    res.status(200).json("Unsubscription successfull.");
  } catch (err) {
    next(err);
  }
};

// handling like
export const like = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    // find the video and add the userId to the like array and remove id from dislike
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      $pull: { dislikes: id },
    });
    res.status(200).json("Video liked");
  } catch (err) {
    next(err);
  }
};

// Handling dislike
export const dislike = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    // find the video and remove the userId from dislikes array and add it to like
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: id },
      $pull: { likes: id },
    });
    res.status(200).json("Video disliked");
  } catch (err) {
    next(err);
  }
};
