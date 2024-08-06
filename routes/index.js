import express from "express";
import BlogsController from "../controller/blog.js";
import UsersController from "../controller/user.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();

router.get("/api/blogs", BlogsController.get);
router.post("/api/blogs", BlogsController.create);

router.get("/api/users", auth, UsersController.get);
router.post("/api/users/sign-up", UsersController.post);
router.delete("/api/users/:id", UsersController.delete);
router.put("/api/users/:id", UsersController.put);
// router.post("/api/users/sign-in", UsersController.post);

export default router;
