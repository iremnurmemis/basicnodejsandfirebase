import express from "express";
import { createUser, getUserById } from "../controllers/userController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     description: Creates a new user in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - email
 *             properties:
 *               id:
 *                 type: string
 *                 description: The unique identifier for the user.
 *               name:
 *                 type: string
 *                 description: The name of the user.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *     responses:
 *       201:
 *         description: User created successfully.
 *       400:
 *         description: Invalid user data.
 *       500:
 *         description: Internal server error.
 */
router.post("/", createUser);

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     description: Retrieves user information based on the given user ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: User data retrieved successfully.
 *       400:
 *         description: userId is required.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:userId", getUserById);

export default router;
