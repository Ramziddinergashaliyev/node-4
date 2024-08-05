import express from "express";
import BlogsController from "../controller/blog.js";
const router = express.Router();

router.get("/api/blogs", BlogsController.get);
router.post("/api/blogs", BlogsController.create);

export default router;
