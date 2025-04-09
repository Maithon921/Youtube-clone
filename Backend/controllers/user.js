import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js"
import { v2 as cloudinary } from 'cloudinary';

// export const update = async (req, res, next) => {
//   if (req.params.id === req.user.id) {
//     try {
//       const updatedUser = await User.findByIdAndUpdate(
//         req.params.id,
//         {
//           $set: req.body,
//         },
//         { new: true }
//       );
//       res.status(200).json(updatedUser);
//     } catch (err) {
//       next(err);
//     }
//   } else {
//     return next(createError(403, "You can update only your account"));
//   }
// };

export const update = async (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return next(createError(403, "You can update only your account"));
  }

  try {
    const user = await User.findById(req.params.id);

    // If new image is uploaded and previous is custom (not default), delete old one
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

// export const deleteUser = async (req, res, next) => {
//   if (req.params.id === req.user.id) {
//     try {
//       const deletedUser = await User.findByIdAndDelete(req.params.id);
//       res.status(200).json({ message: "User deleted", deletedUser });
//     } catch (err) {
//       next(err);
//     }
//   } else {
//     return next(createError(403, "You can delete only your account"));
//   }
// };

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Avoid deleting default avatar
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

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const subscribe = async (req, res, next) => {
  try {
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
export const unsubscribe = async (req, res, next) => {
  try {
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
export const like = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: {likes:id},
      $pull: {dislikes:id}
    })
    res.status(200).json("Video liked")
  } catch (err) {
    next(err)
  }
};
export const dislike = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: {dislikes:id},
      $pull: {likes:id}
    })
    res.status(200).json("Video disliked")
  } catch (err) {
    next(err)
  }
};
