import express from "express"
import { addCar,getCars,getCarsByCategoryId,getCarById,updateCar,deleteCar} from "../controllers/carController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cars
 *   description: Cars management
 */


/**
 * @swagger
 * /cars:
 *   post:
 *     summary: Add a new car
 *     tags: [Cars]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               plate:
 *                 type: string
 *                 example: "34ABC123"
 *               model:
 *                 type: string
 *                 example: "Toyota Corolla"
 *               categoryId:
 *                 type: string
 *                 example: "OHXSGXYhsmAN35O7Xpy"
 *     responses:
 *       201:
 *         description: Car added successfully
 *       400:
 *         description: Missing fields
 *       500:
 *         description: Internal server error
 */
router.post("/", addCar);

/**
 * @swagger
 * /cars:
 *   get:
 *     summary: Get all cars
 *     tags: [Cars]
 *     responses:
 *       200:
 *         description: Successfully fetched all cars
 *       404:
 *         description: No cars found
 *       500:
 *         description: Internal server error
 */
router.get("/", getCars);

/**
 * @swagger
 * /cars/category/{categoryId}:
 *   get:
 *     summary: Get all cars by category ID
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched cars for the given category
 *       404:
 *         description: No cars found for this category
 *       500:
 *         description: Internal server error
 */
router.get("/category/:categoryId", getCarsByCategoryId);

/**
 * @swagger
 * /cars/{id}:
 *   get:
 *     summary: Get a car by ID
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched the car
 *       404:
 *         description: Car not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", getCarById);

/**
 * @swagger
 * /cars/{id}:
 *   put:
 *     summary: Update a car
 *     tags: [Cars]
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
 *               plate:
 *                 type: string
 *               model:
 *                 type: string
 *               categoryId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Car updated successfully
 *       404:
 *         description: Car not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", updateCar);

/**
 * @swagger
 * /cars/{id}:
 *   delete:
 *     summary: Delete a car
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car deleted successfully
 *       404:
 *         description: Car not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", deleteCar);


export default router;