import express from "express"
import { addComment, deleteComment, getComments, updateComment } from "../controllers/comment.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, addComment)
router.delete("/:id", verifyToken, deleteComment)
router.put("/edit/:id", verifyToken, updateComment)
router.get("/:videoId", getComments)
export default router;