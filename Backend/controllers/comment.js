import { createError } from "../error.js";
import Comment from "../models/Comment.js";
import Video from "../models/Video.js";

// Add a comment
export const addComment = async (req, res, next) => {
  const newComment = new Comment({ ...req.body, userId: req.user.id });

  try {
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    next(err);
  }
};

// Delete a comment
export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const video = await Video.findById(comment.videoId);

    if (!comment) return next(createError(404, "Comment not found"));
    if (!video) return next(createError(404, "Video not found"));

    // checks if it is the one who comments or the one who uploads the video
    if (req.user.id === comment.userId || req.user.id === video.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("Comment has been deleted");
    } else {
      return next(createError(403, "You can delete only your comment"));
    }
  } catch (err) {
    next(err);
  }
};

// Get all comments for a video
export const getComments = async (req, res, next) => {
  try {
    // get comment sort from new to old
    const comments = await Comment.find({ videoId: req.params.videoId }).sort({
      createdAt: -1,
    });
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};

// edit comment
export const updateComment = async (req, res, next) => {
  try {
    // looks for the comment
    const comment = await Comment.findById(req.params.id);

    if (!comment) return next(createError(404, "Comment not found"));
    // checks whether the user is the one who commented
    if (req.user.id !== comment.userId) {
      return next(createError(403, "You can only edit your comment"));
    }

    comment.description = req.body.description;
    const updatedComment = await comment.save();

    res.status(200).json(updatedComment);
  } catch (err) {
    next(err);
  }
};
