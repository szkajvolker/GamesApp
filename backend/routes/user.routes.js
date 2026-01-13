import express from "express";

import {
  addNewUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  userLogin,
} from "../controllers/user.controllers.js";
import { auth } from "../middleware/auth.js";
import { admin } from "../middleware/admin.js";
import { protectOwnUser } from "../middleware/protectOwnUser.js";

const router = express.Router();

router.post("/register", addNewUser);

router.post("/login", userLogin);

router.get("/me", auth, (req, res) => {
  res.status(200).json(req.user);
});
router.get("/all", auth, admin, getUsers);

router.get("/:id", auth, protectOwnUser, getUser);
router.put("/:id", auth, protectOwnUser, updateUser);
router.delete("/:id", auth, protectOwnUser, deleteUser);

export default router;
