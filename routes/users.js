import express from "express";
import { update, deleteUser, getUser, addTocart } from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//add product to cart
router.put("/add-to-cart", addTocart);
//update user
router.put("/:id", verifyToken, update);
//delete user
router.delete("/:id", verifyToken, deleteUser);
//get a user
router.get("/find/:id", getUser);
//subcribe a user

export default router;
