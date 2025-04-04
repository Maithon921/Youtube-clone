import { createError } from "../error.js";
import Comment from "../models/Comment.js"
import Video from "../models/Video.js"

export const addComment = async (req, res, next) => {
    const newComment = new Comment({...req.body, userId:req.user.id})
    try {
        const savedComment = await newComment.save();
        res.status(200).json(savedComment);
    } catch (err) {
        next(err)
    }
};
export const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(res.param.id);
        const video = await Video.findById(res.param.id);

        if(req.user.id === comment.user.id || res.user.id === video.userId){
            await Comment.findByIdAndDelete(req.params.id)
            res.status(200).json("Comment has been deleted");
        }else{
            return next(createError(403, "Yoy can delete only your comment"))
        }
    } catch (err) {
        next(err)
    }
};
export const getComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({videoId: req.params.videoId});
        res.status(200).json(comments);
    } catch (err) {
        next(err)
    }
};
