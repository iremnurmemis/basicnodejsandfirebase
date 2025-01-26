import express from "express";
import { addCategory,getCategories,getCategoryById,updateCategory,deleteCategory} from "../controllers/categoryController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management
 */

/**
 * @swagger
 * /categories:
 *   post:
 *     operationId: addCategory  # 🌟 Burada API ismini belirtiyoruz
 *     summary: Add Category 🚀
 *     description: Adds a new category to the Firebase Realtime Database.
 *     tags:
 *       - Categories
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "SUV"
 *     responses:
 *       201:
 *         description: Category successfully added
 *       400:
 *         description: Category name is required
 *       500:
 *         description: Internal server error
 */
router.post("/", addCategory);

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of all categories
 */
router.get("/", getCategories);


/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get Category By ID
 *     description: Fetch a category by its unique ID.
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Category ID
 *         schema:
 *           type: string
 *           example: "-OHXSGXYhsmAN35O7Xpy"
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", getCategoryById);


/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update a category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Sedan"
 *     responses:
 *       200:
 *         description: Category updated successfully
 */
router.put("/:id", updateCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully
 */
router.delete("/:id", deleteCategory);



export default router;