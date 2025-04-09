import mongoose from "mongoose";

const VideoSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    viewBy: {
      type: [String],
      default:[],
    },
    tags: {
      type: [String],
      default: [],
    },
    likes: {
      type: [String],
      default: [],
    },
    dislikes: {
      type: [String],
      default: [],
    },
    category:  {
      type: String,
    },
    videoPublicId: {
      type: String,
      required: true,
    },
    imgPublicId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Video", VideoSchema);
