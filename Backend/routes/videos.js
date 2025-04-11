import express from "express";
import {
  addVideo,
  addView,
  deleteVideo,
  getAllCategories,
  getByCategory,
  getByTag,
  getVideo,
  getVideosByUser,
  random,
  search,
  sub,
  trend,
  updateVideo,
} from "../controllers/video.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

// Create video
router.post("/", verifyToken, addVideo);
router.put("/:id", verifyToken, updateVideo);
router.delete("/:id", verifyToken, deleteVideo);
router.get("/find/:id", getVideo);
router.get("/user/:userId", getVideosByUser);
router.put("/view/:id", verifyToken, addView);
router.get("/trend", trend);
router.get("/random", random);
router.get("/sub", verifyToken, sub);
router.get("/tags", getByTag);
router.get("/category", getByCategory);
router.get("/categories", getAllCategories);
router.get("/search", search);

export default router;
